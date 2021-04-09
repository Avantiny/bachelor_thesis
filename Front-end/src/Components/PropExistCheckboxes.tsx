import { Col, Input, Label, Row } from 'reactstrap'
import { VideoContext } from '../VideoLogic'
import React, { useContext } from 'react'
import YearRange from './YearRange'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 2rem;
`
const CheckboxRow = styled(Row)`
  margin-left: 20px;
`

const PropExistCheckboxes = () => {
  const {
    existNameFromUser,
    existAuthor,
    existComment,
    existCompleted,
    existYear,
    onCheckUniqByName,
  } = useContext(VideoContext)

  return (
    <Wrapper>
      <Row>
        <Col>
          <h4>Must include</h4>
        </Col>
      </Row>

      <CheckboxRow>
        <Col>
          <Label>
            <Input
              type={'checkbox'}
              checked={existNameFromUser}
              onChange={e => onCheckUniqByName('existNameFromUser', e.target.checked)}
            />
            User name
          </Label>
        </Col>
        <Col>
          <Label>
            <Input
              type={'checkbox'}
              checked={existAuthor}
              onChange={e => onCheckUniqByName('existAuthor', e.target.checked)}
            />
            Author
          </Label>
        </Col>
        <Col>
          <Label>
            <Input
              type={'checkbox'}
              checked={existComment}
              onChange={e => onCheckUniqByName('existComment', e.target.checked)}
            />
            Comment
          </Label>
        </Col>
      </CheckboxRow>

      <CheckboxRow>
        <Col>
          <Label>
            <Input
              type={'checkbox'}
              checked={existYear}
              onChange={e => onCheckUniqByName('existYear', e.target.checked)}
            />
            Year
          </Label>

          {existYear && (
            <div>
              <YearRange />
            </div>
          )}
        </Col>
        <Col>
          <Label>
            <Input
              type={'checkbox'}
              checked={existCompleted}
              onChange={e => onCheckUniqByName('existCompleted', e.target.checked)}
            />
            Completed
          </Label>
        </Col>
        <Col></Col>
      </CheckboxRow>
    </Wrapper>
  )
}
export default PropExistCheckboxes
