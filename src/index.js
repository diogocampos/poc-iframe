import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './components/App'

listenOnce(window, 'message', (event) => {
  const config = event.data
  startApp({
    ...config,
    onNext: (data) => {
      return postMessage(window.parent, data, event.origin)
    },
  })
})

function startApp(config) {
  ReactDOM.render(
    inIframe() ? (
      <React.StrictMode>
        <App config={config} />
      </React.StrictMode>
    ) : (
      <p>Esta página deve ser carregada dentro de um iframe.</p>
    ),
    document.getElementById('root'),
  )
}

// Helpers

async function postMessage(targetWindow, data, targetOrigin) {
  console.log(targetOrigin)
  targetWindow.postMessage(data, '*')
  return new Promise((resolve) => {
    listenOnce(window, 'message', (event) => resolve(event.data))
  })
}

function listenOnce(element, eventName, listener) {
  return element.addEventListener(eventName, listener, { once: true })
}

function inIframe() {
  // https://stackoverflow.com/a/326076/4062603
  try {
    return window.self !== window.top
  } catch (err) {
    return true
  }
}
