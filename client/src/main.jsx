import axios from "axios";  // 👈 added this

// 👇 this decides which backend to use (local or online)
axios.defaults.baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"            // when running locally
    : "https://greencart-55ri.onrender.com"; // when deployed on Netlify

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './route/index'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

// ✅ Import Toaster
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    {/* ✅ Add Toaster so it works globally */}
    <Toaster position="top-right" reverseOrder={false} />
  </Provider>
  // </StrictMode>,
)
