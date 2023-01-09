import type { AppProps } from 'next/app'
import DefaultLayout from '@components/DefaultLayout';
export default function MyApp({ Component, pageProps }: AppProps) {

  return
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
}