import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import "../styles/nprogress.css";
import { Router } from "next/router";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
  return (
    <div>
      <Head>
        <title>Oh My Poll!</title>
        <link rel="icon" href="https://favmoji.asheeshh.ga/🗳"></link>
        <meta
          property="og:image"
          content="https://s6.imgcdn.dev/BodXM.png"
        ></meta>
        <meta property="og:title" content="Oh My Poll!"></meta>
        <meta
          property="og:description"
          content="🗳️ Create and share your own polls!"
        ></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="twitter:title" content="Oh My Poll!" />
        <meta
          name="twitter:description"
          content="🗳️ Create and share your own polls!"
        />
        <meta name="twitter:image" content="https://s6.imgcdn.dev/BodXM.png" />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}

export default MyApp;
