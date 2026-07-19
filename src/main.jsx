import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.replayIntegration(),
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1,   // oddiy sessiyalarning 10%
  replaysOnErrorSampleRate: 1.0,   // xato bo'lган sessiyalarning 100%
})

// PostHog — analytics (foydalanuvchi xatti-harakati)
posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  capture_pageview: true,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostHogProvider>
  </StrictMode>,
)