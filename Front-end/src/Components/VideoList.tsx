import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from 'reactstrap'
import { VideoContext } from '../VideoLogic'
import React, { useContext, useEffect, useState } from 'react'

const PAGE_OFFSET = 20

const VideoList = () => {
  const { filterNameValue, filteredVideos, onChangeFilterInput, onVideoClick } = useContext(
    VideoContext
  )
  const [page, setPage] = useState(0)

  // magic
  useEffect(() => {
    setPage(0)
  }, [filteredVideos.length])

  const getNextPage = () => {
    setPage(Math.min(page + 1, Math.floor(filteredVideos.length / PAGE_OFFSET)))
  }

  const getPrevPage = () => {
    setPage(Math.max(0, page - 1))
  }

  return (
    <>
      <Card>
        <CardHeader>Filtered items</CardHeader>
        <CardBody>
          <label>
            Search:
            <Input placeholder='video' onChange={onChangeFilterInput} value={filterNameValue} />
          </label>

          {[...filteredVideos].splice(page * PAGE_OFFSET, PAGE_OFFSET).map(video => (
            <div key={video.VideoID}>
              <a href={`#`} onClick={() => onVideoClick(video.VideoID)}>
                {video.Name}
              </a>
              <small> - {video.Author ?? 'anonymní'}</small>
            </div>
          ))}
        </CardBody>

        <CardFooter>
          <Pagination>
            <PaginationItem>
              <PaginationLink onClick={getPrevPage} previous /*href='#'*/ />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink>{page + 1}</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink next onClick={getNextPage} />
            </PaginationItem>
          </Pagination>
        </CardFooter>
      </Card>

      <Row>
        <Col>
          <small>
            <b>Number of results: {filteredVideos.length}</b>
          </small>
        </Col>
      </Row>
    </>
  )
}

export default VideoList
