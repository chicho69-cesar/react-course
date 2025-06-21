/* Los archivos fixtures nos ayudan mucho cuando queremos hacer testing sobre
stores que manejan diferentes estados, en general un fixture es como un objeto
que representa el valor de un estado en un determinado punto en el tiempo */

export const initialState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const authenticatedState = {
  status: 'authenticated',
  uid: '123ABC',
  email: 'demo@google.com',
  displayName: 'Demo User',
  photoURL: 'https://demo.com/demo.jpg',
  errorMessage: null
}

export const noAuthenticatedState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const demoUser = {
  uid: '123ABC',
  email: 'demo@google.com',
  displayName: 'Demo User',
  photoURL: 'https://demo.com/demo.jpg',
}
