//缓存对象用来存验证码

class Cache {
  constructor() {
    this.cache = {};
    setInterval(() => {
      this.clearIntervalCache();
    }, 900000);
  }
  clearIntervalCache() {
    let maxTime = 3;
    let pickNum = 10;
    let timeOutRate = 1;
    for (let i = 0; i < maxTime && timeOutRate > 0.3; i++) {
      timeOutRate = this.pickRandomAndGetTimeoutRate(pickNum);
    }
  }

  pickRandomAndGetTimeoutRate(pickNum) {
    let timeOutNums = 0;
    for (let i = 0; i < pickNum; i++) {
      let randomKey = cache[Math.random() * cache.length];
      if (this.cache[randomKey]?.timeout < Date.now()) {
        timeOutNums += 1;
        this.clearCache(randomKey);
      }
    }
    let timeOutRate = timeOutNums / pickNum;
    return timeOutRate;
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