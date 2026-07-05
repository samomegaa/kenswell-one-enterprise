class NullStorageProvider {
  constructor() {
    this.name = 'null_storage';
  }

  async createUploadUrl({ storageKey }) {
    return {
      provider: this.name,
      storageKey,
      uploadUrl: `null://upload/${storageKey}`,
      method: 'PUT',
      headers: {},
    };
  }

  async createDownloadUrl({ storageKey }) {
    return {
      provider: this.name,
      storageKey,
      downloadUrl: `null://download/${storageKey}`,
      expiresInSeconds: 900,
    };
  }
}

module.exports = NullStorageProvider;
