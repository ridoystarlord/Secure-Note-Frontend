import '../styles/globals.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Hydrate state={pageProps.dehydratedState}> */}
      <Component {...pageProps} />
      <Toaster position="bottom-right" reverseOrder={false} />
      {/* </Hydrate> */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
