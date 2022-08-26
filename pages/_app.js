import '../styles/globals.css'
import Error from '../components/error/Error';
import {RecoilRoot} from "recoil";

function MyApp({Component, pageProps}) {
    return <RecoilRoot><Error><Component {...pageProps} /></Error></RecoilRoot>
}

export default MyApp
