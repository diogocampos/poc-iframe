import React from 'react'
import ReactDOM from 'react-dom'

function IFrame({ title, children }) {
  const [iframe, setIframe] = React.useState(null)

  return (
    <iframe title={title} onLoad={(event) => setIframe(event.target)}>
      {iframe && ReactDOM.createPortal(children, iframe.contentDocument.body)}
    </iframe>
  )
}

export default IFrame
