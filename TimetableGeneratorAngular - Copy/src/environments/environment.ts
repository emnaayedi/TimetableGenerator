// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseURI :  'http://localhost:56654/api',
  gatewayEndpoint: 'http://localhost:9999',
  firebase : {
    apiKey: 'AIzaSyBiUHy07aEruI_ZgBmg-A8ez6bBc-W1gtw',
    authDomain: 'smart-library1.firebaseapp.com',
    databaseURL: 'https://smart-library1.firebaseio.com',
    projectId: 'smart-library1',
    storageBucket: 'smart-library1.appspot.com',
    messagingSenderId:'215824460430',
    appId: '1:215824460430:web:3b0715e5b5534aaa77b7df',
    measurementId: 'G-6Z961QEE78'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
