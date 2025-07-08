import {
  lazy,
  type LazyExoticComponent,
  type ReactNode
} from 'react'

type JSXComponente = () => ReactNode | ReactNode[]

interface Route {
  to: string
  path: string
  name: string
  Component: LazyExoticComponent<JSXComponente> | JSXComponente
}

const Lazy1 = lazy(() => import('../pages/LazyPage1'))
const Lazy2 = lazy(() => import('../pages/LazyPage2'))
const Lazy3 = lazy(() => import('../pages/LazyPage3'))

export const routes: Route[] = [
  {
    to: '/lazy1',
    path: 'lazy1',
    name: 'Lazy Page 1',
    Component: Lazy1
  },
  {
    to: '/lazy2',
    path: 'lazy2',
    name: 'Lazy Page 2',
    Component: Lazy2
  },
  {
    to: '/lazy3',
    path: 'lazy3',
    name: 'Lazy Page 3',
    Component: Lazy3
  },
]
