import AccoutSideBar from "./sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return <AccoutSideBar>{children}</AccoutSideBar>
}