#! /usr/bin/env node
const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const figlet = require("figlet");
const { startScraping } = require("../src/startScraping");

const usage = chalk.keyword("violet")(
  // "\nUsage: sabz-scrapper \n" +
  boxen(chalk.green("\n" + "mosbatesabz.com Scrapper" + "\n"), {
    // padding: 1,
    borderColor: "green",
    dimBorder: true,
  }) + "\n"
);

yargs
  .usage(usage)
  .option("sc", {
    alias: "scrape-categories",
    describe: "Scrape All Categories Data",
    type: "string",
    demandOption: false,
  })
  .option("sp", {
    alias: "scrape-products",
    describe: "Scrape All Products With Categories Data",
    type: "string",
    demandOption: false,
  })
  .option("spi", {
    alias: "scrape-products-by-id",
    describe: "Scrape Products Of Category Based On CatId",
    type: "string",
    demandOption: false,
  })
  .option("wd", {
    alias: "with-details",
    describe: "Scrape From Single Pages (With Detail)",
    type: "string",
    demandOption: false,
  })
  .help(true).argv;

// console.log(yargs.argv);
const argv = require("yargs/yargs")(process.argv.slice(2)).argv;

if (
  argv.sc == null &&
  argv.sp == null &&
  argv.spi == null &&
  argv.wd == null &&
  argv["scrape-categories"] == null &&
  argv["scrape-products"] == null &&
  argv["scrape-products-by-id"] == null &&
  argv["with-details"] == null
) {
  console.log(
    chalk.yellow(figlet.textSync("Sabz Scraper", { horizontalLayout: "full" }))
  );
  yargs.showHelp();
  return;
}
if (
  argv.sc == null &&
  argv.sp == null &&
  argv.spi == null &&
  argv.wd == null &&
  argv["scrape-categories"] == null &&
  argv["scrape-products"] == null &&
  argv["scrape-products-by-id"] == null &&
  argv["with-details"] == null
) {
  yargs.showHelp();
  return;
}

// const scrapeCategories = argv.sc || argv["scrape-categories"];

const scrapeProducts = argv.sp || argv["scrape-products"];

const scrapeWithDetails = argv.wd || argv["with-details"];

// const scrapeProductsById = argv.spi || argv["scrape-products-by-id"];

// console.log(scrapeCategories, scrapeProducts, scrapeProductsById);

startScraping(scrapeProducts, scrapeWithDetails);
// return 1;
