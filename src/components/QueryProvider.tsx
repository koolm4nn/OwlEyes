"use client"; // Ensure this file is treated as client-side component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {useState, ReactNode} from "react";

/**
 * Wraps the React Query 'QueryClientProvider' to initialize and provide the QueryClient
 * throughout the React component tree.
 * 
 * - Uses 'useState' to ensure that the 'QueryClient' instance is only created once per render.
 * - This component must be a client component because React Query relies on hooks like `'useState', 
 *   which only run on the client side.
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The child components that will have access to the query client
 */
export default function QueryProvider({ children }: {children:ReactNode}) {
    // Create a single QueryClient instance per component mount
    const [queryClient] = useState(() => new QueryClient);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}