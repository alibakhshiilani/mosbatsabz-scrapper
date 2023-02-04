const cheerio = require("cheerio");
const { Scraper } = require("./modules/Scraper/Scraper");

async function getProductsByCategory() {
  const scraper = new Scraper().go("https://mosbatesabz.com/");
  console.log("hi", await scraper.getResponse());
}

exports.getProductsByCategory = getProductsByCategory;
