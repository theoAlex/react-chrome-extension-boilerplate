import React, { Component } from 'react'
import styled from 'styled-components'

export default class SvgIcon extends Component {
  render() {
    const { icon, height, width, right, left, top, bottom, fill } = this.props
    return (
      <StyledSvg
        dangerouslySetInnerHTML={{__html: require(`!!html-loader!../../../chrome/assets/icons/icon-${icon}.svg`)}}
        className={`svg-${icon}`}
        width={width}
        height={height}
        right={right}
        left={left}
        top={top}
        bottom={bottom}
        fill={fill}
      />
    )
  }
}

const StyledSvg = styled.div`
height: auto;
width: auto;
svg {
  position: relative;
  right: ${props => props.right ? props.right + 'px': '0'};
  left: ${props => props.left ? props.left + 'px' : '0'};
  top: ${props => props.top ? props.top + 'px' : '0'};
  bottom: ${props => props.bottom ? props.bottom + 'px' : '0'};
  width: ${props => props.width ? props.width + 'px' : '0'};
  height: ${props => props.height ? props.height + 'px' : '0'};
  fill: ${props => props.fill ? props.fill : '0'};
  * {
    fill: ${props => props.fill ? props.fill : '0'};
  }
}
`
