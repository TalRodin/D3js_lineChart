import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';
import * as d3 from 'd3';

export default class Line extends Component {
  constructor(props) {
    super(props);
    // this.colorScale = scaleLinear()
    //   .domain([this.props.minValue, this.props.maxValue])
    //   .range(['#d971bb', '#5142f5'])
    //   .interpolate(interpolateLab)
  }
  render() {
    const { scales, margins, data, svgDimensions} = this.props;
    const { xScale, yScale } = scales;
    const { height, width } = svgDimensions;
    console.log(xScale)
    let line = d3.line()
      .x(d => xScale((d.date)))
      .y(d => yScale(d.y));

    return (
      <g >
        <path
          d={line(data)}
          fill={'#e3f2fd'}
          stroke={'steelblue'}
          strokeWidth={'1.5'}
          strokeLinejoin={'round'}
          strokeLinecap={'round'}
        />
      </g>
    );
  }
}