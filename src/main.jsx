import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CommentContextProvider } from './helper/context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CommentContextProvider>
      <App />
    </CommentContextProvider>
  </StrictMode>,
)
