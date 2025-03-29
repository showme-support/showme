import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Config, Provider } from 'lib'

const config: Config = {
  errorScope: "network",
  errorThreshold: 4,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider
    config={config}
    >
    <App />
    </Provider>
  </StrictMode>,
)
