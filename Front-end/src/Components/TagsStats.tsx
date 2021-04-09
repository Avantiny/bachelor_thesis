import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Col, Container, Row } from 'reactstrap'
import { Video } from '../videosTagsService'
import { VideoContext } from '../VideoLogic'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

const ContainerWrapper = styled.div`
  padding-top: 2rem;
  /* background: #f7f8f5; */
`

const ChartRow = styled(Row)`
  margin-bottom: 5rem;

  .col {
    margin: auto;
  }
`

const H3 = styled.h3`
  margin-bottom: 2rem;
`

const machineNames = [
  'Machine(car)',
  'Machine(TVset)',
  'Machine(camera)',
  'Machine (tank)',
  'Machine (airplane)',
  'Machine (vision/fisheye)',
]

const elementNames = ['Element(air)', 'Element(water)', 'Element(fire)', 'Element (earth)']

const noiseNames = [
  'Noise (air)',
  'Noise(image)',
  'Noise (clapping)',
  'Noise (water)',
  'Noise (explosion)',
  'Noise (explosion)',
  'Noise (airplane)',
  'Noise (car)',
  'Noise (fire)',
]

const musicNames = [
  'Music(electronic)',
  'Music(acoustic)',
  'Music(vocal)',
  'Music (electronic)',
  'Music (acoustic/violin)',
]

const imageProcessingNames = [
  'Image processing (Digital Image Articulator)',
  'Image_processing(Interactor)',
  'Image_processing (keying)',
  'Image processing (Scann Processor)',
  'Image processing (stroboscopic effect)',
  'Image processing (software Imagine)',
]

const getNameInBrackets = (name: string) => {
  const afterBracet = name.split('(')[1]
  return afterBracet.split(')')[0]
}

const getTagsCount = (allVideos: Video[], tagName: string) =>
  allVideos.flatMap(video => video.videostags.filter(tagConn => tagConn.tag.Name === tagName))
    .length

const TagsStats = () => {
  const { videos } = useContext(VideoContext)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
    })
    setWindowWidth(window.innerWidth)
  }, [])

  const machineCount = machineNames.map(name => ({
    name: getNameInBrackets(name),
    count: getTagsCount(videos, name),
  }))

  const elementsCount = elementNames.map(name => ({
    name: getNameInBrackets(name),
    count: getTagsCount(videos, name),
  }))

  const noiseCount = noiseNames.map(name => ({
    name: getNameInBrackets(name),
    count: getTagsCount(videos, name),
    // eslint-disable-next-line no-bitwise
    fill: `${'#' + (((1 << 24) * Math.random()) | 0).toString(16)}`,
  }))

  const musicCount = musicNames.map(name => ({
    name: getNameInBrackets(name),
    count: getTagsCount(videos, name),
    //   fill: `${"#"+((1<<24)*Math.random()|0).toString(16)}`,
  }))

  const imageProcessingCount = imageProcessingNames.map(name => ({
    name: getNameInBrackets(name),
    count: getTagsCount(videos, name),
  }))

  const videoYears = videos.map(video => video.Year).filter(Boolean)

  const minYear = Math.min(...videoYears)
  const maxYear = Math.max(...videoYears)

  const byYearsData = Array.from({ length: maxYear - minYear + 1 })
    .map((_, i) => i + minYear)
    .map(year => ({
      year,
      videosCount: videos.filter(video => video.Year === year).length,
      tagsCount: videos.filter(video => video.Year === year).flatMap(video => video.videostags)
        .length,
    }))

  // look to bootstrap for md
  const isMobile = windowWidth < 720
  return (
    <ContainerWrapper>
      <Container>
        <Row>
          <Col>
            <h2>Overall statistics</h2>
          </Col>
        </Row>

        <hr />
        <ChartRow>
          <Col xl={6}>
            <H3>Tags by years</H3>
            <ResponsiveContainer height={400} width={'100%'}>
              <LineChart data={byYearsData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='year' />
                <YAxis yAxisId='left' />
                <YAxis yAxisId='right' orientation='right' />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId='left'
                  type='monotone'
                  dataKey='videosCount'
                  stroke='#8884d8'
                  activeDot={{ r: 8 }}
                />
                <Line yAxisId='right' type='monotone' dataKey='tagsCount' stroke='#82ca9d' />
              </LineChart>
            </ResponsiveContainer>
          </Col>

          <Col xl={6}>
            <H3>Machines</H3>
            <ResponsiveContainer height={400} width={'100%'}>
              <BarChart data={machineCount}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='count' fill='#82ca9d' />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </ChartRow>

        <hr />
        <ChartRow>
          <Col xl={6}>
            <H3>Music</H3>
            <ResponsiveContainer height={400} width={'100%'}>
              <PieChart>
                <Pie
                  dataKey='count'
                  isAnimationActive={false}
                  data={musicCount}
                  cx={200}
                  cy={200}
                  outerRadius={80}
                  fill='#8884d8'
                  label
                />{' '}
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>

          <Col xl={6} style={isMobile ? { height: 700 } : {}}>
            <H3>Noise</H3>

            <ResponsiveContainer height={400} width={'100%'}>
              <RadialBarChart
                cx={150}
                cy={150}
                innerRadius={20}
                outerRadius={140}
                barSize={10}
                data={noiseCount}
              >
                <RadialBar
                  // minAngle={15}
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  // clockWise
                  dataKey='count'
                />
                <Legend
                  iconSize={10}
                  width={120}
                  height={140}
                  layout='vertical'
                  verticalAlign='bottom'
                  wrapperStyle={{
                    top: isMobile ? 350 : 0,
                    left: isMobile ? 0 : 350,
                    lineHeight: '24px',
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </Col>
        </ChartRow>

        <hr />
        <ChartRow>
          <Col xl={6}>
            <H3>Elements</H3>
            <ResponsiveContainer height={500} width={'100%'}>
              <RadarChart
                cx={isMobile ? 150 : 300}
                cy={250}
                outerRadius={isMobile ? 70 : 150}
                data={elementsCount}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey='name' />
                <PolarRadiusAxis />
                <Radar dataKey='count' stroke='#8884d8' fill='#8884d8' fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </Col>

          <Col xl={6}>
            <H3>Image processing</H3>
            <ResponsiveContainer height={500} width={'100%'}>
              <RadarChart
                cx={isMobile ? 200 : 300}
                cy={250}
                outerRadius={isMobile ? 70 : 150}
                data={imageProcessingCount}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey='name' />
                <PolarRadiusAxis />
                <Radar dataKey='count' stroke='#8884d8' fill='#8899d8' fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </Col>
        </ChartRow>
      </Container>
    </ContainerWrapper>
  )
}

export default TagsStats
