import 'antd/dist/antd.css';
import '../styles/globals.css'

import Layout from "../components/layout/Layout";
import { Footer } from 'antd/lib/layout/layout';

function MyApp({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /><Footer style={{ 
    borderTop: '1px solid #e8e8e8',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    textAlign: 'center'
    }}
    >
    Ant Design ©2022 
</Footer></Layout>
}

export default MyApp
