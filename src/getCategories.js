// const request = require("request-promise");
const cheerio = require("cheerio");
const { Scraper } = require("./modules/Scraper/Scraper");

async function getCategories() {
  const scraper = new Scraper().go("https://mosbatesabz.com/");
  console.log("hi", await scraper.getResponse());
}

exports.getCategories = getCategories;
