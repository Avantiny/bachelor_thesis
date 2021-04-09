import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Table,
} from 'reactstrap'
import { VideoContext } from '../VideoLogic'
import React, { useContext } from 'react'
import styled from 'styled-components'

const Iframe = styled.iframe`
  width: 100%;
  height: 400px;
`
const VideoPreview = () => {
  const { onVideoClick, similarVideosByTags, selectedVideo, onChangeServer, server } = useContext(
    VideoContext
  )

  const video = selectedVideo
  if (!video) {
    return <h1>video neni vybrane</h1>
  }

  const url = [
    `http://147.229.147.152/videoStream.php?videoPath=${video.PathId}&token=15DFJK2N8sdfcxvb6MKasdHBV3sdf689123SDJBNV5JQfsdPVMSDAsdfHBV`,
    `https://mediartlive.music.phil.muni.cz/tagging/videoStream.php?videoPath=${video.PathId}&token=15DFJK2N8sdfcxvb6MKasdHBV3sdf689123SDJBNV5JQfsdPVMSDAsdfHB`,
  ]

  const getUrl = () => {
    if (!server) {
      return url[0]
    } else {
      return url[1]
    }
  }

  // {`https://mediartlive.music.phil.muni.cz/tagging/videoStream.php?videoPath=${video.PathId}&token=15DFJK2N8sdfcxvb6MKasdHBV3sdf689123SDJBNV5JQfsdPVMSDAsdfHB`
  // await fetch('http://147.229.147.152/videoStream.php?videoPath=woody/1-2-3-4(1).mp4&token=15DFJK2N8sdfcxvb6MKasdHBV3sdf689123SDJBNV5JQfsdPVMSDAsdfHBV')
  return (
    <Container>
      <Row>
        <Col lg={8} style={{ marginBottom: '20px' }}>
          <Card>
            <CardBody>
              <Iframe src={getUrl()} />
            </CardBody>
            <Button onClick={() => onChangeServer(server)} size='sm' color='link'>
              Mediartlive server: {`${server}`}
            </Button>
            <CardHeader>
              <h2>{video.Name}</h2>
              <div>Author: {video.Author}</div>
              <div>Comment: {video.Comment}</div>
              <div>Year: {video.Year}</div>
              <div>Completed: {video.Completed}</div>
            </CardHeader>
          </Card>
        </Col>
        <Col lg={4}>
          <Row style={{ flexDirection: 'column' }}>
            <Col style={{ marginBottom: '20px' }}>
              <Card>
                <CardHeader>
                  <h4>Similar videos ({similarVideosByTags.length})</h4>
                </CardHeader>
                <small>
                  <CardBody>
                    <ListGroup style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                      {similarVideosByTags.map(v => (
                        <ListGroupItem key={v.VideoID} className='justify-content-between'>
                          <a href={`/#`} onClick={() => onVideoClick(v.video.VideoID)}>
                            {v.video.Name}
                          </a>
                          ({Number(v.matchCount)})<small> - {v.video.Author ?? 'anonymní'}</small>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </CardBody>
                </small>
              </Card>
            </Col>

            <Col style={{ alignItems: 'stretch' }}>
              <small>
                <Card>
                  <CardHeader>
                    <h4>Tags timeline ({video.videostags.length})</h4>
                  </CardHeader>
                  <CardBody>
                    <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                      <Table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Start</th>
                            <th>Stop</th>{' '}
                          </tr>
                        </thead>
                        <tbody>
                          {video.videostags.map(tag => (
                            <tr key={tag.ID}>
                              <td>{tag.tag.Name}</td>
                              <td>
                                <small>{tag.StartTime}</small>
                              </td>
                              <td>
                                <small>{tag.StopTime}</small>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </small>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
export default VideoPreview
