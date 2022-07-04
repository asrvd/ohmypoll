import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import "../styles/nprogress.css";
import { Router } from "next/router";

function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());
  return (
    <div>
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}

export default MyApp;
