import '../globals.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body>
        <div className="admin-container">
          {children}
        </div>
      </body>
    </html>
  );
}