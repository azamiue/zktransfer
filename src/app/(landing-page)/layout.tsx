import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import SmoothScrolling from "@/components/SmoothScrolling";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main id="main" className="overflow-x-hidden">
        <SmoothScrolling>{children}</SmoothScrolling>
      </main>
      <Footer />
    </>
  );
}
