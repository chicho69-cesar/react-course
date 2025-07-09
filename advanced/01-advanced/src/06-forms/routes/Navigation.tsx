import { Suspense } from 'react'
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router'

import logo from '../../assets/react.svg'
import AuthPage from '../pages/AuthPage'
import FormikAbstraction from '../pages/FormikAbstraction'
import FormikBasicPage from '../pages/FormikBasicPage'
import FormikComponents from '../pages/FormikComponents'
import FormikYupPage from '../pages/FormikYupPage'
import AuthFormikPage from '../pages/AuthFormikPage'
import DynamicForm from '../pages/DynamicForm'

export default function Navigation() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <BrowserRouter>
        <div className='main-layout'>
          <nav>
            <img src={logo} alt='React Logo' />
  
            <ul>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) => isActive ? 'nav-active' : ''}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to='/formik-abstraction'
                  className={({ isActive }) => isActive ? 'nav-active' : ''}
                >
                  Formik Abstraction
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to='/formik-basic'
                  className={({ isActive }) => isActive ? 'nav-active' : ''}
                >
                  Formik Basic
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to='/formik-components'
                  className={({ isActive }) => isActive ? 'nav-active' : ''}
                >
                  Formik Components
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to='/formik-yup'
                  className={({ isActive }) => isActive ? 'nav-active' : ''}
                >
                  Formik Yup
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to='/auth'
                  className={({ isActive }) => isActive ? 'nav-active' : ''}
                >
                  Auth
                </NavLink>
              </li>

              <li>
                <NavLink
                  to='/auth-formik'
                  className={({ isActive }) => isActive ? 'nav-active' : ''}
                >
                  Auth Formik
                </NavLink>
              </li>

              <li>
                <NavLink
                  to='/dynamic-form'
                  className={({ isActive }) => isActive ? 'nav-active' : ''}
                >
                  Dynamic Form
                </NavLink>
              </li>
            </ul>
          </nav>
  
          <Routes>
            <Route path='/' element={<h1>Home Page</h1>} />
            <Route path='/formik-abstraction' element={<FormikAbstraction />} />
            <Route path='/formik-basic' element={<FormikBasicPage />} />
            <Route path='/formik-components' element={<FormikComponents />} />
            <Route path='/formik-yup' element={<FormikYupPage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/auth-formik' element={<AuthFormikPage />} />
            <Route path='/dynamic-form' element={<DynamicForm />} />

            <Route path='/*' element={<Navigate to='/' replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Suspense>
  )
}
