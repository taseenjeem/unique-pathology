import TanStackProvider from "@/providers/TanstackProvider";
import { Inter } from "next/font/google";
import NextUI from "@/providers/NextUI";
import "@/styles/globals.scss";
import NavigationBar from "@/components/common/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Unique Pathology",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light bg-accent">
      <body className={inter.className}>
        <TanStackProvider>
          <NextUI>
            <NavigationBar />
            <main>{children}</main>
          </NextUI>
        </TanStackProvider>
      </body>
    </html>
  );
}
