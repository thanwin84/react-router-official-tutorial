import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Root, {
  loader as rootLoader,
  action as rootAction
} from './routes/root.jsx'
import Contact, {
  loader as contactLoader,
  action as contactAction
} from './routes/Contact.jsx'
import ErrorPage from './error-page.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import './index.css'
import EditContact, {action as editContactAction} from './routes/Edit.jsx'
import {action as destroyAction} from './routes/Destroy'
import Index from './routes/index.jsx'


// const router = createBrowserRouter([
//   {
//     path:  '/',
//     element:  <Root/>,
//     errorElement: <ErrorPage/>,
//     loader: rootLoader,
//     action: rootAction,
//     children: [
//       {index: true, element: <Index/>},
//       {
//         path: "contacts/:contactId",
//         element: <Contact/>,
//         loader: contactLoader,
//         action: contactAction

//       },
//       {
//         path: "contacts/:contactId/edit",
//         element: <EditContact/>,
//         loader: contactLoader,
//         action: editContactAction
//       },
//       {
//         path: "contacts/:contactId/destroy",
//         action: destroyAction,
//         errorElement: <div>Opps: There was an error</div>
//       }
//     ]
//   },
  
// ])
// we can also create routes using JSX
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path='/' 
      element={<Root/>} 
      loader={rootLoader} 
      action={rootAction}
      errorElement = {<ErrorPage/>}
    >
      {/* we want to show the error in root page */}
      <Route errorElement={<ErrorPage/>}>
        <Route index element={<Index/>}/>
        <Route 
          path = "contacts/:contactId"
          element = {<Contact/>}
          loader = {contactLoader}
          action = {contactAction}
        />
        <Route
          path = "contacts/:contactId/edit" 
          element = {<EditContact/>} 
          loader = {contactLoader} 
          action = {editContactAction}
        />
        <Route
          path = "contacts/:contactId/destroy" 
          action = {destroyAction}
          errorElement = {<div>Opps: There was an error</div>}
        />
      </Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
