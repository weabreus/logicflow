import "../styles/globals.css";

// components
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <html className="h-full bg-gray-100">
      <head />
      <body className="h-full overflow-hidden">
        <div className="flex h-full flex-col">
          {/* Top nav*/}
          <Navbar />

          {/* Bottom section */}
          <div className="flex min-h-0 flex-1 overflow-hidden">
            {/* Narrow sidebar*/}
            <Sidebar/>

            {/* Main area */}
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
