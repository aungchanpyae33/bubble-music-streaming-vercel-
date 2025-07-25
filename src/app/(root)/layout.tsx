import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import NavBar from "@/ui/navtopBar/NavBar";

const inter = Inter({ subsets: ["latin"] });

import { Suspense } from "react";
import Main from "@/ui/Main/Main";
import Queue from "@/ui/Queue/Queue";
import AudioFooterBar from "@/ui/Footer/AudioFooterBar";
import Footer from "@/ui/Footer/Footer";
import { AuthProvider } from "@/lib/KindeAuth/AuthProvider";
import QueueWrapper from "@/ui/Queue/QueueWrapper";
import QueryClientPrv from "@/lib/tanstack/QueryClient";
import BeforeLoad from "@/ui/warning/BeforeLoad";
import ModalBox from "@/ui/general/modalBox/ModalBox";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientPrv>
      <AuthProvider>
        <html lang="en" className=" h-full bg-[#111111] text-white">
          <body
            className={`${inter.className} overflow-hidden relative h-full   flex flex-col`}
            style={{}}
          >
            <BeforeLoad />
            <NavBar />
            <div className="scr flex flex-1 overflow-hidden relative">
              <Suspense
                fallback={
                  <div className="px-1  h-full flex-1 overflow-y-scroll bg-green-700"></div>
                }
              >
                <Main>
                  {children}
                  <Footer />
                </Main>
                <QueueWrapper>
                  <Queue />
                </QueueWrapper>
              </Suspense>
              <ModalBox />
              {/* <TabCap /> */}
            </div>
            <Suspense
              fallback={
                <div className="w-full  flex   items-center  h-[70px] bg-red-950"></div>
              }
            >
              <AudioFooterBar />
            </Suspense>
          </body>
        </html>
      </AuthProvider>
    </QueryClientPrv>
  );
}
