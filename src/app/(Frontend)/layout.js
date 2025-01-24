import "../globals.css";
import Header from "../Component/header";
import Footer from "../Component/Footer";
import { Asap } from 'next/font/google';
import Script from "next/script";
export const metadata = {
  title: "Holiday Homes in Dubai | Luxurious Stays & Unmatched Comfort",
  description: "Experience luxury with Eshani Vacation Home! Premium holiday homes in Dubai with modern amenities, prime locations, and 24/7 guest support for an unforgettable stay.",
  verification: {
    google: '8J9bQT8c6I9jENCMTy9d_QScQMMuXXsL0_WVTLh8oxk',
    
  }
};
const asap = Asap({
  subsets: ['latin'],
  weights: ['400', '700'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={asap.className}>
      <head>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RPKTWGXKVX%22>"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RPKTWGXKVX');
          `}
        </Script>
      </head>

        <main className="py-4">
          <Header />
          {children}
          <Footer />
        </main>

      </body>
    </html>
  );
}
