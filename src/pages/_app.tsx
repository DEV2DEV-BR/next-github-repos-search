import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Mulish } from "@next/font/google";

const mulish = Mulish({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={mulish.className}>
      <Component {...pageProps} />
    </main>
  );
}
