//缓存对象用来存验证码

class Cache {
  constructor() {
    this.cache = {};
  }

  setCache(key, value, timeout) {
    this.cache[key] = {
      value: value,
      timeout: timeout ? Date.now() + timeout : null
    }
  }

  getCache(key) {
    if (this.cache[key] && (!this.cache[key].timeout || this.cache[key].timeout > Date.now())) {
      return this.cache[key].value
    }
    this.clearCache(key)
    return null;
  }

  clearCache(key) {
    delete this.cache[key]
  }
}

const cache = new Cache();

export default cache;