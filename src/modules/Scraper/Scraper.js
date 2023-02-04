const request = require("request-promise");

class Scraper {
  #url;
  #timeout;

  #response;

  constructor(timeout = 2000) {
    this.#timeout = timeout;
  }

  async go(url) {
    this.#url = url;
    this.#response = await this.#getUrlContent();
    return this;
  }

  getResponse() {
    return this.#response;
  }

  async #getUrlContent() {
    return await request.get(this.#url);
  }

  #sleep(miliseconds) {
    return new Promise((resolve) => setTimeout(resolve, this.miliseconds));
  }
}

exports.Scraper = Scraper;
