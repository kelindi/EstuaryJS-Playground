// NOTE(jim)
// To use file system routing, you must have `page.tsx`.

import { headers } from 'next/headers';
import PutFile from '@root/pages/putFile';
import '@root/global.scss';
import { AppContextProvider } from '@root/context/app';

async function makeExampleRequest({ host }) {
  try {
    const res = await fetch(`http://${host}/api`);
    return res.json();
  } catch (e) {
    return { text: null, example: null };
  }
}

import DefaultLayout from '@components/DefaultLayout';
import { AppContext } from '@root/context/app';

export default async function Page(props) {
  const currentHeaders = headers();
  const data = await makeExampleRequest({ host: currentHeaders.get('host') });
  return <AppContextProvider>//have defaultlayout render the current page dynamically
    <DefaultLayout>
      {..pageProps}
    </DefaultLayout>
  </AppContextProvider>;
}
