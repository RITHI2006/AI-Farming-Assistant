import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Verify root element exists
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found!')
}

// Add error handlers
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  console.error('Error details:', {
    message: event.message,
    filename: event.filename,
    
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  })
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})

// Render app
console.log('Starting app render...')
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

console.log('App rendered successfully')

