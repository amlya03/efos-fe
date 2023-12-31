// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // ======================== PROD ===============================
  // baseUrl: 'https://efos-be.megasyariah.co.id:8803/api/',
  // baseUrl: 'http://10.20.81.135:8803/api/',

  // ======================== SIT ===============================
  // baseUrl: 'http://10.20.34.110:8808/api/',

  // ======================== UAT ===============================
  // baseUrl: 'http://10.20.34.110:8805/api/',

  // ======================== DEV ===============================
  baseUrl: 'http://localhost:8888/api/',
//   baseUrl: 'http://10.20.34.110:8888/api/',

  // ======================== Dukcapil ===============================
  baseUrlDukcapil: 'http://10.20.82.12:8083/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
