import '../styles/globals.scss'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import Header from '../components/Header'

import store from '../store/index'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </Provider>
  )
}

export default MyApp
