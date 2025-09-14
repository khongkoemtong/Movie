import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import Testing from './components/ui/Testing.jsx'
import Main from './components/controls/Main.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Main/>
  </StrictMode>,
)
