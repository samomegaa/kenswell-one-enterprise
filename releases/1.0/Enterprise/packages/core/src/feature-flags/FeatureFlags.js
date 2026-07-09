class FeatureFlags {

  constructor(flags = {}) {
    this.flags = { ...flags };
  }

  enabled(name) {
    return this.flags[name] === true;
  }

  disabled(name) {
    return !this.enabled(name);
  }

  all() {
    return { ...this.flags };
  }

  listEnabled() {
    return Object.keys(this.flags)
      .filter((key) => this.flags[key]);
  }

  listDisabled() {
    return Object.keys(this.flags)
      .filter((key) => !this.flags[key]);
  }

  set(name, value) {
    this.flags[name] = Boolean(value);
  }

}

module.exports = FeatureFlags;
