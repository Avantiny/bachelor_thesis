import { VideoContext } from '../VideoLogic'
import React, { useContext } from 'react'

const YearRange = () => {
  const { yearFrom, videos, yearTo, onChangeYearFrom, onChangeYearTo } = useContext(VideoContext)

  const videoYears = videos.map(video => video.Year).filter(Boolean)

  const minYear = Math.min(...videoYears)
  const maxYear = Math.max(...videoYears)
  return (
    <div>
      <div>
        year from:
        <input
          type='range'
          min={minYear}
          max={maxYear}
          step='1'
          value={yearFrom}
          onChange={e => {
            onChangeYearFrom(parseInt(e.target.value, 10))
          }}
        />
        {yearFrom}
      </div>
      <div>
        year to:
        <input
          type='range'
          min={minYear}
          max={maxYear}
          step='1'
          value={yearTo}
          onChange={e => {
            onChangeYearTo(parseInt(e.target.value, 10))
          }}
        />
        {yearTo}
      </div>
    </div>
  )
}
export default YearRange
