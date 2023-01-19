// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  COLLABORATOR_MS: 'https://esigi.envolti.com.br/coll/api/v1/',
  PROJECT_MS: 'https://esigi.envolti.com.br/projects/api/v1/',
  CONFIG_MS: 'https://esigi.envolti.com.br/config/api/v1/registers/',
  CUSTOMER_MS: 'https://esigi.envolti.com.br/customer/api/v1/',
  portal: 'https://aws-amplify.d3tee2p1a2jxch.amplifyapp.com/login',
  port: 'https://aws-amplify.d3tee2p1a2jxch.amplifyapp.com:',
  message: 'LOCAL',
  protocol: 'https',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
