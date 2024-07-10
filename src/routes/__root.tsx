import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import Navbar from "../components/navbar";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: Home,
});

function Home() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);
  return (
    <>
      <Navbar />
      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
