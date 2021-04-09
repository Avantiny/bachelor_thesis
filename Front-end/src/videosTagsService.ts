import axios from 'axios'

const BE_URL = `http://${window.location.hostname}:3001`

// TODO: add optional keys (nullable fields)
type Tag = {
  tagID: number
  Name: string
}

type VideoTagLink = {
  ID: number
  VideoID: number
  UserId: number
  StartTime: number
  StopTime: number
  TagID: number
  tag: Tag
}

export type Video = {
  VideoID: number
  Name: string
  NameFromUser: string
  Author: string
  Year: number
  Comment: string
  Completed: 0 | 1
  PathId: string
  videostags: VideoTagLink[]
}

export const getVideosTags = async () => {
  const res = await axios.get<Video[]>(`${BE_URL}/all-data`)
  return res.data
}
