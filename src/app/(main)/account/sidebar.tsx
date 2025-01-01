import { AccountSidebar } from '@/components/account-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function SideBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-center sidebar-content-h overflow-hidden">
      <SidebarProvider
        className="max-w-screen-2xl"
        style={
          {
            '--sidebar-width': '19rem',
          } as React.CSSProperties
        }>
        <AccountSidebar />
        <SidebarInset className="">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
            {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
