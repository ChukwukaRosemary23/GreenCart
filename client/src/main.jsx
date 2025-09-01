import axios from "axios";  // 👈 added this

// 👇 this decides which backend to use (local or online)
axios.defaults.baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"            // when running locally
    : "https://greencart-55ri.onrender.com"; // when deployed on Netlify

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './route/index'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

// ❌ REMOVED Toaster import - we have one in App.js already
// import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    {/* ❌ REMOVED Toaster - we have one in App.js already */}
  </Provider>
)