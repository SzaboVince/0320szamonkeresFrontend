import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import { TrainPage } from './pages/TrainPage.tsx'
import { FormPage } from './pages/FormPage.tsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'',
        element:<TrainPage/>
      },
      {
        path:'form',
        element: <FormPage/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
