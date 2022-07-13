import type { FirebaseOptions } from 'firebase/app';

// global config
export type GlobalConfig = {
  firebase: FirebaseOptions,
  NODE_ENV: string,
};
