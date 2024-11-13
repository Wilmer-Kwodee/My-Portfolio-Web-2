import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import InsertPage from './InsertPage.jsx'
import UpdatePage from './UpdatePage.jsx'
import InsertPageNew from './InsertPageNew.jsx'
import './index.css'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App/>
    },
    {
      path: '/insert',
      element: <InsertPageNew/>
    },
    {
      path: '/update/:id',
      element: <UpdatePage/>
    },
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
