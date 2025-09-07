import axios from "axios";  // 👈 keep this for backend selection

// 👇 this decides which backend to use (local or online)
axios.defaults.baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"            // when running locally
    : "https://greencart-55ri.onrender.com"; // when deployed on Netlify

import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './route/index'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
