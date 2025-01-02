import { AppSidebar } from '@/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="w-fit flex items-center gap-2 px-4 my-4">
          {' '}
          <SidebarTrigger className="-ml-1" />
        </div>
        <main
          suppressHydrationWarning
          className="flex flex-1 flex-col gap-4 p-4 pt-0"
        >
          {children}
        </main>
      </SidebarInset>
      ;
    </SidebarProvider>
  );
}
