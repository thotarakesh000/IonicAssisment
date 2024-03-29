// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  login:"https://ionicnode-demo.onrender.com/api/login",
  loginSocialUser:"https://ionicnode-demo.onrender.com/api/loginSocialUser",
  register:"https://ionicnode-demo.onrender.com/api/register",
  movieData:"https://api.themoviedb.org/3/movie/popular?api_key=c7436e2513f4c04b9271bd03344dd0af&page=",
  movieUrl: "https://api.themoviedb.org/3/movie/",
  userData:"https://ionicnode-demo.onrender.com/api/userInfo"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
