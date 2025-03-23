import { useState, useEffect } from 'react'
import './App.css'
import defaultText from './default_text.txt'
import ComplianceReview from './components/ComplianceReview'
import * as mock_api from './mock_api'
import { Violation } from './types'

function App() {
  const [count, setCount] = useState(0)
  const [paragraph, setParagraph] = useState(defaultText)
  const [violations, setViolations] = useState(Array<Violation>)
  const [suggestions, setSuggestions] = useState({})
  const [selectedViolation, setSelectedViolation] = useState(null)

  useEffect(() => {
    const loadText = async () => {
      try {
        const response = await fetch(defaultText)
        const text = await response.text()
        setParagraph(text)  
      } catch (error) {
        console.error(`Error fetching default text: ${error}`)
      }
    }

    loadText()
    loadViolations()
  }, [])

  const loadViolations = async () => {
    const violations = await mock_api.fetchViolations()
    setViolations(violations)
  }

  const onViolationClick = () => {
    console.log("Violation clicked!")
  }

  return (
    <>
      <ComplianceReview paragraph={paragraph} onViolationClick={onViolationClick} violations={violations} />
    </>
  )
}

export default App
