import type { LoaderFunction, MetaFunction, LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
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
import calendar from 'styles/calendar.css';
import githubcode from 'highlight.js/styles/github-dark-dimmed.css';
import preview from 'styles/preview.css';
import Footer from 'components/common/Footer';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: cmcss },
    { rel: 'stylesheet', href: wywiwya },
    { rel: 'stylesheet', href: showhint },
    { rel: 'stylesheet', href: foldgutter },
    { rel: 'stylesheet', href: calendar },
    { rel: 'stylesheet', href: githubcode },
    { rel: 'stylesheet', href: preview },
  ];
};

export const loader: LoaderFunction = () => {
  const firebaseConfig = {
    apiKey: process.env.FB_APIKEY,
    authDomain: process.env.FB_AUTHDOMAIN,
    projectId: process.env.FB_PROJECTID,
    storageBucket: process.env.FB_STORAGEBUCKET,
    messagingSenderId: process.env.FB_MESSAGINGSENDERID,
    appId: process.env.FB_APPID,
    measurementId: process.env.FB_MEASUREMENTID,
  };

  const config: GlobalConfig = {
    firebase: firebaseConfig,
    NODE_ENV: process.env.NODE_ENV,
  };

  return json(config);
};

export const meta: MetaFunction = () => ( {
  'charset': 'utf-8',
  'title': 'TASKS',
  'description': 'Uouo fish life :)',
  'viewport': 'width=device-width,initial-scale=1',
  'og:title': 'TASKS',
  'og:url': 'https://task.smallkirby.xyz',
  'og:description': 'Uouo fish life :)',
  'og:image': 'https://task.smallkirby.xyz/img/logo.png',
  'og:site_name': 'task.smallkirby.xyz',
  'twitter:card': 'summary_large_image',
  'twitter:creator': '@smallkirby',
  'twitter:site': '@smallkirby',
} );

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
      <body className='bg-skblack pb-0'>
        <Header />
        <div className='flex flex-col flex-shrink flex-grow flex-1 min-h-screen'>
          <Outlet/>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
