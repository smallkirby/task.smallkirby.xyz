import type { LoaderFunction, MetaFunction } from '@remix-run/cloudflare';
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
import { initFirebase } from './lib/firebase';

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
  initFirebase(config.firebase, config.NODE_ENV);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
