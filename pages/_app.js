import "../styles/globals.css";
import { MusicProvider } from "../contexts/MusicContext";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <MusicProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MusicProvider>
  );
}
