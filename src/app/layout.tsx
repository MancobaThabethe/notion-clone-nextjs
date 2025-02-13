import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from "sonner";
import SidebarProvider from "@/providers/SidebarProvider";

export const metadata: Metadata = {
  title: "Notion Clone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`bg-black text-white`}
        >
          <SidebarProvider>
            <Header />
              <div className="flex min-h-screen">
                {/* Side bar */}
                <Sidebar />
                <div className="flex-1 md:p-3 bg-gray-400 overflow-y-auto scrollbar-hide">
                  {children}
                </div>
              </div>
            </SidebarProvider>
            <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
    
  );
}
