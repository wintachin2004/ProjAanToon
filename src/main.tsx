import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// main.tsx - จุดเริ่มต้นของแอป
// - ห่อแอปด้วย provider ระดับบน (เช่น AuthProvider) เพื่อให้คอมโพเนนต์ลูกเข้าถึง context ได้
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)
