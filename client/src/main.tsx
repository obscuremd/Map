import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import { ClerkProvider } from '@clerk/clerk-react'
import { app } from './hooks/firebaseConfig.tsx'
app

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ClerkProvider>
  </React.StrictMode>,
)
