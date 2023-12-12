import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import React from "react";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { authProvider } from "@/libs/provider/auth";


export function getServerSideProps(context: GetServerSidePropsContext) {    
  
    return {
      props : {}
    }
  }


// create _app.tsx function next js
export default function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                gcTime: 1000 * 60 * 60 * 24, // 24 hours
            }
        }
    }))

    return <QueryClientProvider client={queryClient} >
        <HydrationBoundary state={pageProps.dehydratedState}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </HydrationBoundary>

    </QueryClientProvider>
}

