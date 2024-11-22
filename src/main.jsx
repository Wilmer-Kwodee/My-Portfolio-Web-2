import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import InsertPageNew from './InsertPageNew.jsx'
import UpdatePage from './UpdatePage.jsx'
import Home from './Home.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/control-room',
      element: <App/>
    },
    // ^ nahhh  teralu keren for now...
    // {
    //   path: '/',
    //   element: <App/>
    // },
    {
      path: '/insert',
      element: <InsertPageNew/>
    },
    {
      path: '/update/:id',
      element: <UpdatePage/>
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
