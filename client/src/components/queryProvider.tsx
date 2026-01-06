"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // We use useState to lazily initialize the QueryClient.
  // 1. It ensures the client is created only ONCE per component mount.
  //    If we just used `new QueryClient()` directly in the body, it would recreate
  //    the client (and wipe the cache) on every single re-render of this component.
  // 2. We use a function initializer `() => new QueryClient()` so it only runs on the first render.
  // 3. We don't use a global variable to avoid sharing the cache between different users
  //    during Server-Side Rendering (SSR) in Next.js.
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
