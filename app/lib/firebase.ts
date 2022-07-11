import type { Auth } from 'firebase/auth';
import type { Functions } from 'firebase/functions';
import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import { getApp, initializeApp } from 'firebase/app';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

let initialized = false;
let functions: Functions | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;

class FirebaseInstanceError extends Error {
  constructor(target: 'app' | 'auth' | 'store' | 'functions', message: string) {
    super(`${target}: ${message}`);
    this.name = 'FirebaseInstanceError';
  }
}

export function getProjectAuth(): Auth {
  if (!auth) {
    throw new FirebaseInstanceError('auth', 'not initialized');
  }
  return auth;
}

export function getProjectFunctions(): Functions {
  if (!functions) {
    throw new FirebaseInstanceError('functions', 'not initialized');
  }
  return functions;
}

export function getProjectFirestore(): Firestore {
  if (!firestore) {
    throw new FirebaseInstanceError('store', 'not initialized');
  }
  return firestore;
}


function initFirebase(config: FirebaseOptions, NODE_ENV: string): FirebaseApp {
  if (initialized) {
    return getApp();
  }

  try {
    return getApp();
  } catch (e: any) {
    const app = initializeApp(config);

    functions = getFunctions(app);
    if (NODE_ENV === 'development') {
      console.log('Using emulated functions.');
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }

    auth = getAuth(app);
    if (NODE_ENV === 'development') {
      console.log('Using emulated auth.');
      connectAuthEmulator(auth, 'http://localhost:9099');
    }

    firestore = getFirestore(app);
    if (NODE_ENV === 'development') {
      console.log('Using emulated firestore.');
      connectFirestoreEmulator(firestore, 'localhost', 8888);
    }

    initialized = true;
    return app;
  }
}

export function initFirebaseBrowserOnly(config: FirebaseOptions, NODE_ENV: string) {
  if (typeof document !== 'undefined') {
    initFirebase(config, NODE_ENV);
  }
}
