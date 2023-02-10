// const request = require("request-promise");
const cheerio = require("cheerio");
const { Category } = require("./models/Category");
const { Database } = require("./modules/Database/Database");
const { Scraper } = require("./modules/Scraper/Scraper");

async function getCategories() {
  // const database = new Database();

  function getSubMenuItems(menuItem, parentId = null) {
    const subMenuItems = $(menuItem).find("ul").eq(0).find("> li");
    if (subMenuItems?.length) {
      subMenuItems.each((_, subItem) => {
        // console.log("sub", $(subItem).find(" > a").text());
        Category.create({
          title: $(subItem).find(" > a").text(),
          parent_id: parentId,
        }).then((result) => {
          getSubMenuItems(subItem, result.id);
        });
      });
    }
  }

  const scraper = new Scraper().go("https://mosbatesabz.com/");
  const html = await scraper.getResponse();
  const $ = cheerio.load(html);
  // console.log("html", html);
  const menu = $(".whb-header-bottom .wd-header-nav > ul.menu");

  const rootMenuItems = $(menu).find("> li");

  rootMenuItems.each((_, rootMenuItem) => {
    // console.log("item", item);
    const rootMenuItemText = $(rootMenuItem).find(" > a > span").text();
    // console.log("-", rootMenuItemText);
    Category.create({
      title: rootMenuItemText,
      parent_id: null,
    }).then((result) => {
      getSubMenuItems(rootMenuItem, result.id);
    });
  });
}

exports.getCategories = getCategories;
