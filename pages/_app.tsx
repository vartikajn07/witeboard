import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import ModalManager from "@/common/components/modal/components/ModalManager";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Witeboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RecoilRoot>
        <ToastContainer />
        <ModalManager />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}
