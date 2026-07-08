function createBootstrapContext({
  compositionRoot,
  container,
  lifecycle,
  configuration,
  plugins,
} = {}) {
  return Object.freeze({
    compositionRoot,
    container,
    lifecycle,
    configuration,
    plugins,
    createdAt: new Date().toISOString(),
  });
}

module.exports = {
  createBootstrapContext,
};
