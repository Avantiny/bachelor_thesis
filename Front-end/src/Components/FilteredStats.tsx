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
  /* background: #f6f5f8; */
`

const ChartRow = styled(Row)`
  .col {
    margin: auto;
  }
`

const H3 = styled.h3`
  margin-bottom: 2rem;
`
const getTagsCount = (allVideos: Video[], tagName: string) =>
  allVideos.flatMap(video => video.videostags.filter(tagConn => tagConn.tag.Name === tagName))
    .length

const FilteredStats = () => {
  const { filteredVideos, allUniqTags } = useContext(VideoContext)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth)
    })
    setWindowWidth(window.innerWidth)
  }, [])

  const allAuthors = filteredVideos.map(video => video.Author)
  const allUniqAuthors = allAuthors.filter((v: any, i: number, a: any) => a.indexOf(v) === i)

  const authorsCount = allUniqAuthors.map(name => ({
    name: name !== null ? name : 'anonymní',
    count: filteredVideos.filter(video => video.Author === name).length,
  }))

  const tagsCount = allUniqTags.map(name => ({
    name: name.name,
    count: getTagsCount(filteredVideos, name.name),
  }))

  const allCompleted = filteredVideos.map(video => video.Completed)
  const allUniqCompleted = allCompleted.filter((v: any, i: number, a: any) => a.indexOf(v) === i)

  const completedCount = allUniqCompleted.map(boo => ({
    name: boo ? 'yes' : 'no',
    count: filteredVideos.filter(video => video.Completed === boo).length,
  }))

  const videoYears = filteredVideos.map(video => video.Year).filter(Boolean)

  const minYear = Math.min(...videoYears)
  const maxYear = Math.max(...videoYears)

  const byYearsData = Array.from({ length: maxYear - minYear + 1 })
    .map((_, i) => i + minYear)
    .map(year => ({
      year,
      videosCount: filteredVideos.filter(video => video.Year === year).length,
      tagsCount: filteredVideos
        .filter(video => video.Year === year)
        .flatMap(video => video.videostags).length,
    }))

  // look to bootstrap for md
  const isMobile = windowWidth < 720
  return (
    <ContainerWrapper>
      <Container>
        <Row>
          <Col>
            <h2>Statistics for results</h2>
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
            <H3>Top authors</H3>
            <ResponsiveContainer height={400} width={'100%'}>
              <BarChart data={authorsCount}>
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
            <H3>Top 20 tags</H3>
            <ResponsiveContainer height={500} width={'100%'}>
              <RadarChart
                cx={isMobile ? 150 : 300}
                cy={250}
                outerRadius={isMobile ? 70 : 150}
                data={tagsCount.sort((a, b) => b.count - a.count).slice(0, 20)}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey='name' />
                <PolarRadiusAxis />
                <Radar dataKey='count' stroke='#8884d8' fill='#8884d8' fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </Col>

          <Col xl={6}>
            <H3>Completed</H3>
            <ResponsiveContainer height={400} width={'100%'}>
              <PieChart>
                <Pie
                  dataKey='count'
                  isAnimationActive={false}
                  data={completedCount}
                  cx={200}
                  cy={200}
                  outerRadius={80}
                  fill='#82ca9d'
                  label
                />{' '}
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </ChartRow>
      </Container>
    </ContainerWrapper>
  )
}

export default FilteredStats
