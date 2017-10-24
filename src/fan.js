import React, { PureComponent } from 'react'
import { Motion, StaggeredMotion, spring, presets } from 'react-motion'
import styled from 'styled-components'

const ANIMATION_AMOUNT = 150

export default class FabFan extends PureComponent {

  nextStyle = previousStyles => {
    const { open } = this.props

    return previousStyles.map((_, i) => {
      if (i === 0) {
        return {
          opacity: spring(open ? 1 : 0),
          springIn: spring(open ? 0 : ANIMATION_AMOUNT, presets.stiff)
        }
      } else {
        const lastButtonPreviousPos = previousStyles[i - 1].springIn

        return {
          springIn: spring(lastButtonPreviousPos, presets.stiff)
        }
      }
    })
  }

  render () {
    const { options } = this.props

    const optsWithStyle = options.map(r => {
      return {
        ...r,
        style: {springIn: ANIMATION_AMOUNT, opacity: 0}
      }
    })

    return (
      <StaggeredMotion
        defaultStyles={optsWithStyle.map(o => o.style)}
        styles={this.nextStyle}
      >
        {
          styles => (
            <Container>
              {
                styles.map(({ springIn }, i) => (
                  <Button
                    key={i}
                    onClick={optsWithStyle[i].onClick}
                    backgroundColor={optsWithStyle[i].background}
                    style={{transform: `translate3d(${springIn}px, 0, 0)`}}
                  >
                    {optsWithStyle[i].name}
                  </Button>
                ))
              }
            </Container>
          )
        }
      </StaggeredMotion>
    )
  }
}

const Button = styled.button`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  padding: 10px;
  border-color: transparent;
  cursor: pointer;
  outline: none;
  text-align: center;
  box-sizing: content-box;
  box-shadow: 0 10px 30px rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  margin: 10px;
  justify-content: center;
  font-weight: 900;
  letter-spacing: 0.03em;
  color: white;
  font-size: 16px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  font-size: 16;
  z-index: 9999999;
  transform: translateZ(50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`
