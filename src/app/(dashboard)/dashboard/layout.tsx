import SideBar from './sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SideBar>{children}</SideBar>;
}
