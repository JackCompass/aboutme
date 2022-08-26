import '../styles/globals.css'
import Error from '../components/error/Error';

function MyApp({ Component, pageProps }) {
  return <Error><Component {...pageProps} /></Error>
}

export default MyApp
