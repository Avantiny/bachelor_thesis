import { Video, getVideosTags } from './videosTagsService'
import { isNilOrEmpty } from './utils'
import { remove as removeDiacritics } from 'diacritics'
import React from 'react'

type State = {
  loading: boolean
  videos: Video[]
  filterNameValue: string
  selectedVideoId: null | number
  selectedTagsIds: number[]
  existNameFromUser: boolean
  existAuthor: boolean
  existComment: boolean
  existCompleted: boolean
  existYear: boolean
  yearFrom: number
  yearTo: number
  server: boolean
  //  gamepads: (Gamepad | null)[]
}

type VideoCtxApi = State & {
  onChangeFilterInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  similarVideosByTags: { video: Video; VideoID: number; matchCount: number }[]
  selectedVideo: Video | undefined
  filteredVideos: Video[]
  onVideoClick: (videoId: number) => void
  onAddTag: (tagId: number) => void
  onRemoveTag: (tagId: number) => void
  deleteAll: () => void
  allUniqTags: { id: number; name: string }[]
  onCheckUniqByName: (name: string, value: boolean) => void
  onChangeYearFrom: (year: number) => void
  onChangeYearTo: (year: number) => void
  onChangeServer: (s: boolean) => void
  //  pollGamepads: () => (Gamepad | null)[]
}

const getSimilarVideosByTags = (selectedVideoId: number | null, allVideos: Video[]) => {
  if (!selectedVideoId) {
    return []
  }
  const computedVideos = allVideos.map(video => ({
    VideoID: video.VideoID,
    // get uniq values
    uniqTags: [...new Set(video.videostags.map(tagConn => tagConn.TagID))],
  }))

  const currentVideo = computedVideos.find(video => video.VideoID === selectedVideoId)!

  const videoMatches = computedVideos
    .filter(video => video.VideoID !== selectedVideoId)!
    .map(video => {
      const matchCount = currentVideo.uniqTags.filter(tagId => video.uniqTags.includes(tagId))
        .length
      return { VideoID: video.VideoID, matchCount }
    })
    .filter(({ matchCount }) => matchCount > 0)
    // sort by most matched counts
    .sort((a, b) => b.matchCount - a.matchCount)
    .map(({ VideoID, matchCount }) => ({
      VideoID,
      matchCount,
      video: allVideos.find(v => v.VideoID === VideoID)!,
    }))

  return videoMatches
}

/*
//pro button zjistí hodnotu
const buttonValue = (b: GamepadButton) => {
  return (typeof (b) == 'number') ? b : b.value;
}

//pro  button zjistí, jestli je zmáčklé
const buttonPressed = (b: GamepadButton) => {
  return (typeof (b) == 'number') ? b > 0.1 : b.pressed
}

//zjišťuje, jestli je Gamepad standartní
const mappingString = (mapping: GamepadMappingType) => {
  return mapping || 'n/a';
}

*/

//formáování floatu
const formatFloat = (n: number, places: number) => {
  const m = Math.pow(10, places)
  return '' + parseFloat('' + Math.round(n * m) / m).toFixed(places)
}

export const VideoContext = React.createContext<VideoCtxApi>({} as any)

class VideoLogic extends React.Component<{}, State> {
  state: State = {
    loading: true,
    videos: [],
    filterNameValue: '',
    selectedVideoId: null,
    selectedTagsIds: [],
    // sliders
    yearFrom: 0,
    yearTo: 4000,
    // checkboxes
    existNameFromUser: false,
    existAuthor: false,
    existComment: false,
    existCompleted: false,
    existYear: false,
    server: false,
    //   gamepads: [],
  }

  async componentDidMount() {
    this.tick()
    this.setState({ loading: true })
    try {
      const videos = await getVideosTags()

      const videoYears = videos.map(video => video.Year).filter(Boolean)

      const minYear = Math.min(...videoYears)
      const maxYear = Math.max(...videoYears)
      this.setState({
        videos,
        yearFrom: minYear,
        yearTo: maxYear,
      })
      this.setState({ selectedVideoId: videos[0]?.VideoID ?? null })
    } catch (err) {}
    this.setState({ loading: false })
  }

  onChangeFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    this.setState({ filterNameValue: value })
  }

  tick() {
    const pollGamepads: (Gamepad | null)[] = [].slice.call(navigator.getGamepads())
    const activeGamepads = pollGamepads.filter(gamepad => gamepad) as Gamepad[]
    const gamepadAxis = activeGamepads.map(gamepad =>
      gamepad.axes.map(axis => formatFloat(axis, 5))
    )
    const leftVerticalAxis = parseFloat(gamepadAxis[0]?.map(axis => axis).slice(1, 2)[0])
    if (leftVerticalAxis !== NaN && (leftVerticalAxis < -0.1 || leftVerticalAxis > 0.1)) {
      window.scroll(0, window.scrollY + leftVerticalAxis * 100)
    }
    //   setTimeout(() => window.requestAnimationFrame(() => this.tick()),1000)
    window.requestAnimationFrame(() => this.tick())
  }

  render() {
    const filterNameValue = removeDiacritics(this.state.filterNameValue.toLowerCase())
    const filteredVideos = this.state.videos
      // by name
      .filter(video => {
        const author = removeDiacritics(video.Author?.toLowerCase() ?? '')
        const name = removeDiacritics(video.Name?.toLowerCase() ?? '')
        return name.includes(filterNameValue) || author.includes(filterNameValue)
      })
      // by tags
      .filter(video => {
        const videoTags = video.videostags.map(tag => tag.tag.tagID)
        return this.state.selectedTagsIds.every(tagId => videoTags.includes(tagId))
      })
      // year sliders
      .filter(video =>
        this.state.existYear
          ? video.Year >= this.state.yearFrom && video.Year <= this.state.yearTo
          : true
      )
      // if exist checkboxes
      .filter(video => {
        const acceptedRules = []
        if (this.state.existNameFromUser) {
          acceptedRules.push(isNilOrEmpty(video.NameFromUser))
        }
        if (this.state.existAuthor) {
          acceptedRules.push(isNilOrEmpty(video.Author))
        }
        if (this.state.existComment) {
          acceptedRules.push(isNilOrEmpty(video.Comment))
        }
        if (this.state.existCompleted) {
          acceptedRules.push(isNilOrEmpty(video.Completed !== 0))
        }
        if (this.state.existYear) {
          acceptedRules.push(isNilOrEmpty(video.Year))
        }
        return acceptedRules.every(b => b === false)
      })

    const selectedVideo = this.state.videos.find(
      video => video.VideoID === this.state.selectedVideoId
    )

    const allTags = filteredVideos
      .flatMap(video => video.videostags)
      .map(tag => ({ id: tag.TagID, name: tag.tag.Name }))

    const allUniqTags: { name: string; id: number }[] = []
    allTags.forEach(tag => {
      const foundUniqTag = allUniqTags.find(t => t.id === tag.id)
      if (!foundUniqTag) {
        allUniqTags.push(tag)
      }
    })

    const similarVideosByTags = getSimilarVideosByTags(
      this.state.selectedVideoId,
      this.state.videos
    )

    return (
      <VideoContext.Provider
        value={{
          ...this.state,
          filteredVideos,
          selectedVideo,
          allUniqTags,
          similarVideosByTags,
          onChangeFilterInput: this.onChangeFilterInput,
          onVideoClick: videoId => {
            this.setState({ selectedVideoId: videoId })
          },
          onAddTag: tagId => {
            // remove duplicities by new Set
            this.setState({
              selectedTagsIds: [...this.state.selectedTagsIds, tagId],
            })
          },
          onRemoveTag: tagId => {
            this.setState({
              selectedTagsIds: this.state.selectedTagsIds.filter(tId => tId !== tagId),
            })
          },
          deleteAll: () => {
            this.setState({ selectedTagsIds: [] })
          },
          onCheckUniqByName: (name, value) => {
            // @ts-ignore
            this.setState({ [name]: value })
          },
          onChangeYearFrom: year => this.setState({ yearFrom: year }),
          onChangeYearTo: year => this.setState({ yearTo: year }),
          onChangeServer: server => this.setState({ server: !server }),
        }}
      >
        {this.props.children}
      </VideoContext.Provider>
    )
  }
}

export default VideoLogic
