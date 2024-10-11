import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider ,createBrowserRouter } from 'react-router-dom'
import store from './store/store.js'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import AddPost from './components/AddPost.jsx'
import Post from  './components/Post.jsx'
import EditPost from './components/EditPost.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

const route=createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/login',
        element:
        (
        <AuthLayout Children={<Login />} authenticaion={false} > </AuthLayout> )
      },
      {
        path:'/signup',
        element:<AuthLayout Children={<Signup />} authenticaion={false} />
      },
      {
        path:'/add-post',
        element:<AuthLayout Children={<AddPost />} authenticaion={true} />
      },
      {
        path:'/edit-post/:slug',
        element:<AuthLayout Children={<EditPost />} authenticaion={true} />
      }
      ,{
        path:'/post/:slug',
        element:<Post/>
      }
    ]

  }


])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={route} >
    <ScrollToTop />
    </RouterProvider>  
  </Provider>,
)
