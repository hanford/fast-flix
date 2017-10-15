import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

if (App.isReady()) {
  App.toggle()
} else {
  Boot()
}

function Boot () {
  const root = document.createElement('div')
  document.body.appendChild(root)

  ReactDOM.render(<App />, root)
}
