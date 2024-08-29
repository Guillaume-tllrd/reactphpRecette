import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./input.css"
import { Provider } from 'react-redux'
import rootReducer from "./Redux/reducers"
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
