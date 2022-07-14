import type { LoaderFunction, MetaFunction, LinksFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type { GlobalConfig } from './typings/config';
import { useEffect } from 'react';
import { initFirebaseBrowserOnly } from './lib/firebase';
import { watchUserLoginState } from './lib/session';
import Header from 'components/common/Header';
import cmcss from 'codemirror/lib/codemirror.css';
import wywiwya from './styles/wywiwya.css';
import styles from './styles/index.css';
import showhint from 'codemirror/addon/hint/show-hint.css';
import foldgutter from 'codemirror/addon/fold/foldgutter.css';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: cmcss },
    { rel: 'stylesheet', href: wywiwya },
    { rel: 'stylesheet', href: showhint },
    { rel: 'stylesheet', href: foldgutter },
  ];
};

export const loader: LoaderFunction = () => {
  const firebaseConfig = {
    apiKey: FB_APIKEY,
    authDomain: FB_AUTHDOMAIN,
    projectId: FB_PROJECTID,
    storageBucket: FB_STORAGEBUCKET,
    messagingSenderId: FB_MESSAGINGSENDERID,
    appId: FB_APPID,
    measurementId: FB_MEASUREMENTID,
  };

  const config: GlobalConfig = {
    firebase: firebaseConfig,
    NODE_ENV,
  };

  return json(config);
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'TASKS',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  const config = useLoaderData<GlobalConfig>();
  initFirebaseBrowserOnly(config.firebase, config.NODE_ENV);

  useEffect(() => {
    watchUserLoginState();
  }, []);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className='bg-skblack'>
        <Header />
        <div className='mt-16 w-full md:w-2/3 mx-auto px-1 md:px-4'>
          <Outlet/>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
