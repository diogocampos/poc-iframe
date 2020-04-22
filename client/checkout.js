window.TransparentCheckout = function ({ iframe, onNextStep, ...config }) {
  const checkoutOrigin = 'http://localhost:3000'

  // inicialização
  iframe.addEventListener('load', () => {
    iframe.contentWindow.postMessage(config, checkoutOrigin)
  })

  // callback
  window.addEventListener('message', async (event) => {
    if (event.origin !== checkoutOrigin) return
    try {
      await onNextStep(event.data)
      iframe.contentWindow.postMessage({ ok: true }, checkoutOrigin)
    } catch (err) {
      iframe.contentWindow.postMessage({ error: err.message }, checkoutOrigin)
    }
  })
}
