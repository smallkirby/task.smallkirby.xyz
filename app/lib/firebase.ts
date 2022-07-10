import type { Auth } from 'firebase/auth';
import type { Functions } from 'firebase/functions';
import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import { getApp, initializeApp } from 'firebase/app';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

let functions: Functions | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;

export function getProjectAuth(): Auth | null {
  if (!auth) {
    console.error('Firebase auth is not initialized');
  }
  return auth;
}

export function getProjectFunctions(): Functions | null {
  if (!functions) {
    console.error('Firebase functions is not initialized');
  }
  return functions;
}

export function getProjectFirestore(): Firestore | null {
  if (!firestore) {
    console.error('Firebase firestore is not initialized');
  }
  return firestore;
}


export function initFirebase(config: FirebaseOptions, NODE_ENV: string): FirebaseApp {
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

    return app;
  }
}
