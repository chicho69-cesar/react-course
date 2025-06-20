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
  status: 'checking',
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
