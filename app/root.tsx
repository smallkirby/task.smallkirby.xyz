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
import type { GlobalConfig } from '../typings/config';
import { useEffect } from 'react';
import { initFirebaseBrowserOnly } from './lib/firebase';
import { watchUserLoginState } from './lib/session';
import Header from '~/components/common/Header';
// @ts-ignore
import styles from './styles/index.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
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
        <div className='mt-16 w-2/3 mx-auto'>
          <Outlet/>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
