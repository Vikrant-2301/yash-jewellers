import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileFloatingDock from "../components/MobileFloatingDock";

export const metadata = {
  title: "Yash Jewellers | Kanpur & Delhi Bullion Benchmark · Estd. 1975",
  description: "Exquisite Gold, Kundan Polki, Temple Jewellery & Certified Diamonds. Kanpur's most trusted jewellery house since 1975.",
  keywords: "Yash Jewellers, Gold Jewellery Kanpur, 22K Hallmarked Gold, Kundan Polki, Temple Jewellery, Live Bullion Rates",
  openGraph: {
    title: "Yash Jewellers · A Legacy Cast in Gold",
    description: "Handcrafted high jewellery, 100% BIS Hallmarked gold, and genuine live landed bullion rates.",
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
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <MobileFloatingDock />
      </body>
    </html>
  );
}
