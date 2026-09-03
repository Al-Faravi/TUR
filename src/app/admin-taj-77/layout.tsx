import AdminWrapper from './AdminWrapper';

export const metadata = {
  title: 'Admin Dashboard - Taj Uddin Rashed',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminWrapper>{children}</AdminWrapper>
  );
}