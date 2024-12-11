import Head from 'next/head';
import AppSidebar from '../Component/admin/sidebar';
import '../../app/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
        <meta charSet="UTF-8" />
        <title>My App</title>
        {/* Add other head elements */}
      </head>
      <body className="flex">
        <div className="w-1/10">
          <AppSidebar />
        </div>
        <main className="py-4 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
