import React, { Component } from 'react'
import { Title } from '../../styles/content'
import { csv } from 'd3-fetch'
import { data, serialize } from './data'

class WorldHappiness extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    csv(data, d => serialize(d)).then(d => this.setState({ data: d }))
  }

  render() {
    return (
      <React.Fragment>
        <Title>World Happiness Report</Title>
        {this.state.data && this.state.data.map((d, i) => 
          <div key={i}>{JSON.stringify(d)}</div>
        )}
      </React.Fragment>
    )
  }
}

export default WorldHappiness