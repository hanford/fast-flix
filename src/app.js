import React, { PureComponent } from 'react'
import styled from 'styled-components'

import FabFan from './fan'
import Modal from './modal'

const FRAME_TOGGLE_FUNCTION = 'SpeedPlaybackToggle'

export default class SpeedFrame extends PureComponent {

  state = {
    open: true,
    info: false,
    btns: [
      {name: '0.75x', onClick: () => this.setAndForget(0.75), background: '#F8B195'},
      {name: '1x', onClick: () => this.setAndForget(1), background: '#F67280'},
      {name: '1.25x', onClick: () => this.setAndForget(1.25), background: '#C06C84'},
      {name: '1.5x', onClick: () => this.setAndForget(1.5), background: '#6C5B7B'},
      {name: '2x', onClick: () => this.setAndForget(2), background: '#355C7D'},
      {name: '?', onClick: () => this.toggleInfo(), background: '#42bc97'},
      {name: '𝘅', onClick: () => this.toggleFrame(), background: '#f05b4b'}
    ],
    videos: []
  }

  toggleInfo = () => {
    this.setState({ info: !this.state.info })
  }

  setAndForget = speed => {
    this.setSpeed(speed)
    this.toggleFrame()
  }

  setSpeed = speed => {
    const { videos } = this.state

    videos.forEach(v => v.playbackRate = speed)
  }

  detect = () => {
    const videos = document.querySelectorAll('video')

    console.log({ videos })

    this.setState({ videos })
  }

  componentDidMount () {
    window[FRAME_TOGGLE_FUNCTION] = this.toggleFrame

    this.detect()
  }

  toggleFrame = () => {
    this.setState({ open: !this.state.open })
  }

  static isReady () {
    return typeof window[FRAME_TOGGLE_FUNCTION] !== 'undefined'
  }

  static toggle () {
    if (window[FRAME_TOGGLE_FUNCTION]) {
      window[FRAME_TOGGLE_FUNCTION]()
    }
  }

  render () {
    const {
      open,
      btns,
      info,
      videos
    } = this.state

    return (
      <Container>
        <FabFan
          open={open}
          options={btns}
        />

        <Modal
          open={info}
          toggle={this.toggleInfo}
          videos={videos}
          setSpeed={this.setSpeed}
          detect={this.detect}
        />
      </Container>
    )
  }
}

const Container = styled.div`
  position: relative;
`
