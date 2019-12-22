import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { scaleBand, scaleUtc, scaleLinear, scaleTime, scaleSequential} from 'd3-scale'
import * as d3 from 'd3';
import Axes from './Axes'
import Line from './Line'
import data from './data'
import ReactTooltip from 'react-tooltip'
// import Focus from './focus'
// import ToolTipLine from './ToolTipLine'
import {timeFormat, timeParse} from "d3-time-format"

class Chart extends Component {
  constructor(props) {
    super(props)
    this.xScale = scaleLinear()
    this.yScale = scaleLinear()
    this.xScale.type = "Linear"
    this.yScale.type = "Linear"
}    
  render() {
    console.log(this)
    const props = this.props
    const max = d3.max(props.dataModel, d => Math.abs(d.y))
    const min = d3.min(props.dataModel, d => Math.abs(d.y))
    const xScale = this.xScale
                 .domain(d3.extent(props.dataModel, d => d.date))
                 .range([props.margins.left, props.width - props.margins.right])
    
    const yScale = this.yScale
                 .domain([0, max]).nice()
                 .range([props.height - props.margins.bottom, props.margins.top])
    return (
      <div>
          <svg  width={props.width} height={props.height}>
            <Axes
              scales={{ xScale, yScale }}
              margins={props.margins}
              svgDimensions={{width: props.width, height: props.height}}
            />
            <Line scales = {{ xScale, yScale }}
              svgDimensions={{width: props.width, height: props.height}}
              margins={props.margins}
              maxvalue={max}
              minvalue={min}
              data={props.dataModel} 
            />
          </svg> 
            <ReactTooltip 
              id='lineTooltiplineChart'
              html={true} 
              border={true}/>
          </div>
        );
      }
}
Chart.defaultProps = {
  margins: {top: 20, right: 60, bottom: 40, left: 70},
  width: 850,
  height: 400,
  dataModel: data
}
Chart.propTypes = {
  // dataModel: PropTypes.object.isRequired,
  margins: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
}
export default Chart;
