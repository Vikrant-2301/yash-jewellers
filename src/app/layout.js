import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileFloatingDock from "../components/MobileFloatingDock";
import { RatesProvider } from "../context/RatesContext";
import { BUSINESS_DETAILS } from "../config/business";

export const metadata = {
  title: "Yash Jewellers | 100% BIS Hallmarked Fine Jewellery & Live Gold Rates · Chaubepur, Kanpur",
  description: "Exquisite 22K BIS Hallmarked Gold, Kundan Polki, Temple Jewellery & Certified Diamonds. Transparent live daily gold rates at Yash Jewellers, Chaubepur, Kanpur.",
  keywords: "Yash Jewellers, Yash Jewellers Kanpur, Chaubepur Jewellers, Gold Jewellery Kanpur, 22K Hallmarked Gold, Kundan Polki, Temple Jewellery, Live Gold Rate Kanpur",
  openGraph: {
    title: "Yash Jewellers · Fine Heritage Jewellery & Live Gold Rates",
    description: "Handcrafted high jewellery, 100% BIS Hallmarked gold, and authentic live daily gold rates in Kanpur.",
    type: "website",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen bg-[#FAF7F2] text-[#270611]">
        <RatesProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <MobileFloatingDock />
        </RatesProvider>
      </body>
    </html>
  );
}
