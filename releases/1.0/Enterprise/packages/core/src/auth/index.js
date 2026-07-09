module.exports = {
  AuthenticationService: require('./AuthenticationService'),
  AuthenticationProviderRegistry: require('./AuthenticationProviderRegistry'),
  createAuthenticationService: require('./createAuthenticationService'),
  AuthenticationProvider: require('./providers/AuthenticationProvider'),
  LocalAuthenticationProvider: require('./providers/LocalAuthenticationProvider'),
};
