import React, { Component } from 'react'

export default class LoadingAnimation extends Component {
  render() {
    const { width, height } = this.props
    return (
      <div style={{position: 'relative', left: '-50%'}}>
        <svg width={width}  height={height}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-ellipsis" style={{background: 'none'}}>
        <circle cx="84" cy="50" r="0" fill="#da3732">
        <animate attributeName="r" values="10;0;0;0;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="0s">
        </animate>
        <animate attributeName="cx" values="84;84;84;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="0s">
        </animate>
        </circle>
        <circle cx="16" cy="50" r="9.80402" fill="#f7be33">
        <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="-1.25s">
        </animate>
        <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="-1.25s">
        </animate>
        </circle>
        <circle cx="84" cy="50" r="0.195978" fill="#e4762f">
        <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="-0.625s">
        </animate>
        <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="-0.625s">
        </animate>
        </circle>
        <circle cx="83.3337" cy="50" r="10" fill="#da3732">
        <animate attributeName="r" values="0;10;10;10;0" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="0s">
        </animate>
        <animate attributeName="cx" values="16;16;50;84;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="0s">
        </animate>
        </circle>
        <circle cx="49.3337" cy="50" r="10" fill="#da3732">
        <animate attributeName="r" values="0;0;10;10;10" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="0s">
        </animate>
        <animate attributeName="cx" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" calcMode="spline" dur="2.5s" repeatCount="indefinite" begin="0s">
        </animate>
        </circle>
        </svg>
      </div>
    )
  }
}
