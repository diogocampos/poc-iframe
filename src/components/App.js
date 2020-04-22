import React from 'react'

import Success from './Sucess'
import UserData from './UserData'

const STEPS = {
  userData: UserData,
  success: Success,
}

function App({ config }) {
  const [stepIndex, setStepIndex] = React.useState(0)

  const stepKey = config.steps[stepIndex]
  const CurrentStep = STEPS[stepKey]

  async function handleNext(data) {
    const result = await config.onNext({ step: stepKey, data })
    if (result.ok) {
      setStepIndex(stepIndex + 1)
    } else {
      alert(result.error)
    }
  }

  return (
    <div className="App">
      <p>Config:</p>
      <pre>{JSON.stringify(config, null, 2)}</pre>
      <CurrentStep onNext={handleNext} />
    </div>
  )
}

export default App
