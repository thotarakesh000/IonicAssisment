import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'IonicAssignment',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: false,
      launchFadeOutDuration: 3000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '149694519196-u8u6qirl6bjt2ts0v30tnpo8jf5mngrg.apps.googleusercontent.com',
      androidClientId:'149694519196-4gal0ldjjrsvpmh0j9aobudra74084dk.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
