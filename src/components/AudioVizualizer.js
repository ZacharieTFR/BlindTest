import React, { Component } from 'react';
import * as d3 from 'd3';

export default class AudioVizualizer extends Component {
  drawFrequencyChart() {
    const h = window.innerHeight;
    if (!window.AudioContext) {
      if (!window.webkitAudioContext) {
        return;
      }
      window.AudioContext = window.webkitAudioContext;
    }
    const audioCtx = new AudioContext();
    const audioElement = this.props.audio.current;

    const audioSrc = audioCtx.createMediaElementSource(audioElement);
    const analyser = audioCtx.createAnalyser();

    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    const frequencyData = new Uint8Array(300);
    analyser.getByteFrequencyData(frequencyData);

    const svg = d3
      .select('body')
      .append('svg')
      .attr('id', 'frequency-chart')
      .attr('height', h)
      .attr('width', window.innerWidth);

    svg
      .selectAll('rect')
      .data(frequencyData)
      .enter()
      .append('rect')
      .attr('x', function(d, i) {
        return i * (window.innerWidth / frequencyData.length);
      })
      .attr('width', window.innerWidth / frequencyData.length - 1);

    function drawChart() {
      requestAnimationFrame(drawChart);

      analyser.getByteFrequencyData(frequencyData);

      svg
        .selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
          return h - d / 0.6;
        })
        .attr('height', function(d) {
          return d / 0.6;
        })
        .attr('fill', 'url(#svg-icons-gradient)');
    }
    drawChart();
  }

  componentDidMount() {
    this.drawFrequencyChart();
  }

  render() {
    return <div />;
  }
}
