import React, { Component } from 'react'
import { Title } from '../../styles/content'
import { csv } from 'd3-fetch'
import { scaleBand, scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'
import { data, serialize } from './data'
import { theme } from '../../utils'

const svg = {
  width: 900,
  height: 360
}

const BarChart = ({ data, selectedKey }) => {
  const xScale = scaleBand()
    .domain([0, data.length])
    .range([0, svg.width])
    .padding(10)

  const yScale = scaleLinear()
    .domain(extent(data.map(d => d[selectedKey])))
    .range([svg.height, 0])

  return (
    <svg width={svg.width} height={svg.height}>
      {data.map((d, i)=> {
        return (
        <React.Fragment>
          <rect
            className={d.country}
            key={`${d}-${i}`}
            y={0}
            x={yScale(d[selectedKey])}
            width={1}
            height={yScale(d[selectedKey])}
            fill={theme.color.pink}
          />
          {/* <text x={10} y={10}>{d.country}</text> */}
        </React.Fragment>
      )})}
    </svg>
  )
}
  
/**
 * Sort data by ascending or descending key
 * @param {Array}   data  array of data
 * @param {String}  key   key name
 * @param {string}  sort  sort, default desc
*/
const getDataSortedByKey = (data, key, sort = 'desc') => (data
  .sort((a, b) => sort === 'desc' 
    ? b[key] - a[key] 
    : a[key] - b[key]
  )
)

class WorldHappiness extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    /** data ingestion */
    csv(data, d => serialize(d)).then(d => this.setState({ data: d }))
  }

  render() {
    if (!this.state.data) {
      return null
    }

    const sortedData = getDataSortedByKey(this.state.data, 'generosity')

    return (
      <React.Fragment>
        <Title>World Happiness Report</Title>
        <BarChart data={sortedData} selectedKey={'generosity'} />
        {sortedData.map((d, i) => (<div key={i}>{JSON.stringify(d)}</div>))}
      </React.Fragment>
    )
  }
}

export default WorldHappiness