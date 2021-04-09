import { Col, Container, Navbar, NavbarBrand, Row, Spinner } from 'reactstrap'
import { VideoContext } from './VideoLogic'
import FilteredStats from './Components/FilteredStats'
import PropExistCheckboxes from './Components/PropExistCheckboxes'
import React, { useContext } from 'react'
import SelectTags from './Components/SelectTags'
import TagsStats from './Components/TagsStats'
import VideoList from './Components/VideoList'
import VideoPreview from './Components/VideoPreview'
import styled from 'styled-components'

const LoadingWrapper = styled.div`
  display: flex;
  height: 100vh;

  > div {
    margin: auto;
  }
`

const VideoDetailWrapper = styled.div`
  /* background: #424874; */
  margin-bottom: 4rem;
  padding-bottom: 4rem;
  padding-top: 2rem;
`

const CenterSpinner = styled(Spinner)`
  height: 10rem;
  width: 10rem;
`

const FilterWrapper = styled(Container)`
  margin-bottom: 4rem;
  min-height: 800px;
`

const View = () => {
  const videoLogicData = useContext(VideoContext)
  const loading = videoLogicData.loading

  if (loading) {
    return (
      <LoadingWrapper>
        <div>
          <CenterSpinner />
        </div>
      </LoadingWrapper>
    )
  }

  return (
    <>
      {/* <GamepadList /> */}
      <Navbar color='light' light expand='md'>
        <NavbarBrand href='/'>Bakalářská práce - Dominik Kuře</NavbarBrand>
      </Navbar>

      <VideoDetailWrapper>
        <VideoPreview />
      </VideoDetailWrapper>

      <FilterWrapper>
        <Row>
          <Col md={4}>
            <VideoList />
          </Col>
          <Col md={{ size: 7, offset: 1 }}>
            <Row>
              <Col md={12}>
                <SelectTags />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <PropExistCheckboxes />
              </Col>
            </Row>
          </Col>
        </Row>
      </FilterWrapper>
      <FilteredStats />
      <TagsStats />
    </>
  )
}

export default View
