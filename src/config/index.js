const config = {
  // Services
  AUTH_URL: process.env.REACT_APP_GATEWAY_URL + process.env.REACT_APP_AUTH_SERVICE_SUFFIX || '',
  FLIGHTS_URL: process.env.REACT_APP_GATEWAY_URL + process.env.REACT_APP_SERVICES_SUFFIX || '',
  PROFILE_URL: process.env.REACT_APP_GATEWAY_URL + process.env.REACT_APP_SERVICES_SUFFIX + process.env.REACT_APP_PROFILE_SERVICE_SUFFIX || '',
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
};

export default config;
