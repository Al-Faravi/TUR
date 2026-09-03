import "./globals.css";

export const metadata = {
  title: "Taj Uddin Rashed - Portfolio",
  description: "Official portfolio of Taj Uddin Rashed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth" data-scroll-behavior="smooth">
      <body>
        {children}
      </body>
    </html>
  );
}