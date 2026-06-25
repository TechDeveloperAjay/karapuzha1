import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppConnect from "@/components/layout/WhatsAppConnect";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppConnect />
    </div>
  );
}