import React, { PureComponent } from 'react'
import { Motion, spring, presets } from 'react-motion'
import styled from 'styled-components'

export default class ModalComponent extends PureComponent {
  setCustomPlayback = ({ target: { value } }) => {
    this.props.setSpeed(value)
  }

  render () {
    const { open, toggle, videos, detect } = this.props

    return (
      <Motion
        style={{
          reveal: spring(open ? 1 : 0),
          scale: spring(open ? 1 : 0, presets.stiff)
        }}
      >
        {({ reveal, scale }) => (
          <Overlay
            open={open}
            style={{
              opacity: reveal,
              display: reveal > 0.05 ? 'flex' : 'none'
            }}
            onClick={toggle}
          >
            <Modal style={{transform: `scale(${scale})`}} onClick={event => event.stopPropagation()}>
              <Title>Fast Flix 🍿</Title>

              {
                videos.length > 0 && (
                  <div>
                    <Row>
                      <div>Custom playback speed</div>
                      <Input type='number' onChange={this.setCustomPlayback} placeholder='1.00' />
                    </Row>
                    <br />
                  </div>
                )
              }

              <Row>
                <div>Videos detected:</div>
                <div>{videos.length}</div>
              </Row>

              <br />

              <button onClick={detect}>Detect Videos</button>

              <p>For the extension to work properly, you'll need to make sure the video is already loaded on the website. Do to some limitations we can't preemptively set playback speed. Like the extension? Leave a review, star it on github</p>
            </Modal>
          </Overlay>
        )}
      </Motion>
    )
  }
}

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.4);
  opacity: 0;
  align-items: center;
  justify-content: center;
  z-index: 9999999;
  color: rgba(0,0,0,0.9);
`

const Modal = styled.div`
  width: 500px;
  transform-origin: center;
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
`

const Title = styled.h1`
  font-weight: 900;
  font-size: 18px;
  margin: 10px 0;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.1);
`
