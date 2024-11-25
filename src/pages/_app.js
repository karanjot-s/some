import Sidebar from "@/components/Sidebar";
import { LoginProvider } from "@/util/LoginContext";
import "@/styles/globals.css";
import { Inter } from "@next/font/google";

const font = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function App({ Component, pageProps }) {
  return (
    <main
      className={`${font.variable} font-sans flex min-h-screen bg-slate-900 text-slate-50 pb-20 px-5 md:pb-2 md:pl-28`}
    >
      <LoginProvider>
        <Sidebar />
        <Component {...pageProps} />
      </LoginProvider>
    </main>
  );
}
