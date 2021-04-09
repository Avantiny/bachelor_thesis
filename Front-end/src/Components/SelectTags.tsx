import { Button, Col, Row } from 'reactstrap'
import { VideoContext } from '../VideoLogic'
import React, { useContext } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 2rem;
`
const SelectTags = () => {
  const { onAddTag, onRemoveTag, deleteAll, allUniqTags, selectedTagsIds } = useContext(
    VideoContext
  )

  return (
    <Wrapper>
      <Row>
        <Col>
          <h4>Tags</h4>
        </Col>
      </Row>

      <Row>
        <Col>
          {allUniqTags.map(tag => {
            const isSelected = selectedTagsIds.includes(tag.id)
            return (
              <Button
                key={tag.id}
                size='sm'
                color='secondary'
                outline={!isSelected}
                onClick={() => {
                  if (isSelected) {
                    onRemoveTag(tag!.id)
                  } else {
                    onAddTag(tag.id)
                  }
                }}
              >
                {tag.name}
              </Button>
            )
          })}
          {/* </div> */}
        </Col>
      </Row>

      <Row>
        <Col>
          {selectedTagsIds.length > 0 && (
            <Button size='sm' color='danger' onClick={deleteAll}>
              {' '}
              uncheck all tags
            </Button>
          )}
        </Col>
      </Row>
    </Wrapper>
  )
}

export default SelectTags
