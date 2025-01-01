import SideBar from './sidebar';

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SideBar>{children}</SideBar>;
}
