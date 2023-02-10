const request = require("request-promise");

class Scraper {
  #url;
  #timeout;

  #response;

  constructor(timeout = 2000) {
    this.#timeout = timeout;
  }

  go(url) {
    this.#url = url;
    this.#response = this.#getUrlContent();
    return this;
  }

  getResponse() {
    return this.#response;
  }

  #getUrlContent() {
    return request.get(this.#url);
  }
}

exports.Scraper = Scraper;
