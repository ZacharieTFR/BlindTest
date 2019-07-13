import React, { Component } from 'react';

export default class Timer extends Component {
  resetAnimation() {
    const timerOutline = document.getElementsByClassName('timer-outline')[0];
    if (timerOutline) {
      var newOutline = timerOutline.cloneNode(true);
      timerOutline.parentNode.replaceChild(newOutline, timerOutline);
    }
  }

  pauseAnimation() {
    const timerOutline = document.getElementsByTagName('circle')[1];
    timerOutline.style.animationPlayState = 'paused';
    timerOutline.style.WebkitAnimationPlayState = 'paused';
  }

  playAnimation() {
    const timerOutline = document.getElementsByTagName('circle')[1];
    timerOutline.style.animationPlayState = 'running';
    timerOutline.style.WebkitAnimationPlayState = 'running';
  }

  componentDidMount() {
    let timerOutline = this.refs.timerOutline;
    // Edge doesn't support getTotalLength
    if (
      window.SVGCircleElement &&
      typeof SVGCircleElement.prototype.getTotalLength === 'function'
    ) {
      let length = timerOutline.getTotalLength();
      timerOutline.style.strokeDasharray = length + ' ' + length;
      timerOutline.style.strokeDashoffset = length;
    }
  }

  render() {
    return (
      <svg className="picture" viewBox="0 0 250 250" preserveAspectRatio="none">
        <circle
          cx="50%"
          cy="50%"
          r="120"
          fill="#fff"
          stroke="#007bff33"
          strokeWidth="4"
        />
        <circle
          ref="timerOutline"
          className="timer-outline"
          id="timer-outline"
          cx="50%"
          cy="50%"
          r="120"
          fill="none"
          stroke="#007bff"
          strokeWidth="4"
        />
        <circle cx="50%" cy="50%" r="115" fill="none" />
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          fill="#343a40"
          fontWeight={400}
          fontFamily="Helvetica,monospace"
          fontSize="5em"
        >
          {this.props.text}
        </text>
      </svg>
    );
  }
}
