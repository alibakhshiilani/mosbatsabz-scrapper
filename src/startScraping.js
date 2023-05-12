const cheerio = require("cheerio");
const { httpService } = require("./app/httpService");
const { logger } = require("./app/logger");
const { Category } = require("./models/Category");
const { Product } = require("./models/Product");

async function startScraping(scrapeProducts, scrapeWithDetails) {
  logger("log", "Start Scraping");
  // let $ = null;
  // const defaultDelay = 10000;

  // function delay(time) {
  //   return new Promise((resolve) => setTimeout(resolve, time));
  // }

  async function getProductsByCatUrl(catId, url, pageNumber = 1) {
    // console.log("url2", url);
    let totalPages = 1;
    // await delay(defaultDelay);
    await httpService
      .get(url + "page/" + pageNumber)
      .then((response) => {
        const $ = cheerio.load(response.data);
        totalPages = Number(
          $(".page-numbers").find("li:nth-last-child(2) > a").text()
        );
        $(".product-grid-item").each(async (index, product) => {
          if (!scrapeWithDetails) {
            Product.createIfNotExist({
              category_id: catId,
              title: $(product).find(".wd-entities-title").text(),
              price:
                ($(product).find(".price > span > bdi").length
                  ? $(product).find(".price > span > bdi").text()
                  : $(product).find(".price > del > span > bdi").text()
                ).replace(/[^0-9\.]+/g, "") || 0,
              url: $(product).find(".wd-entities-title > a").attr("href"),
            });
          } else {
            // await delay(defaultDelay);
            await httpService
              .get($(product).find(".product-element-top > a").attr("href"))
              .then((response) => {
                const $ = cheerio.load(response.data);
                Product.createIfNotExist({
                  category_id: catId,
                  title: $(".product-image-summary .product_title").text(),
                  price: $(".product-image-summary .price bdi").length
                    ? $(".product-image-summary .price bdi").text()
                    : $(".product-image-summary .price del").text(),
                  description: $(
                    "woocommerce-product-details__short-description > p"
                  ).text(),
                  entitle: $(
                    ".product-image-summary .english-name-product"
                  ).text(),
                  code: $(".product-image-summary .sku_wrapper .sku").text(),
                  export_code: $(
                    ".product-image-summary .barcode-varedati"
                  ).text(),
                  url: $(product).find(".product-element-top > a").attr("href"),
                });
              })
              .catch((error) => {
                console.error(error);
              });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });

    if (pageNumber < totalPages) {
      // await delay(defaultDelay);
      getProductsByCatUrl(catId, url, pageNumber + 1);
    }
  }

  function getSubMenuItems(menuItem, parentId = null) {
    const subMenuItems = $(menuItem).find("ul").eq(0).find("> li");
    if (subMenuItems?.length) {
      subMenuItems.each((_, subItem) => {
        // console.log("sub", $(subItem).find(" > a").text());
        Category.createIfNotExist({
          title: $(subItem).find(" > a").text(),
          parent_id: parentId,
          url: $(subItem).find(" > a").attr("href"),
        })
          .then(function (result) {
            getSubMenuItems(subItem, result.id);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    } else {
      console.log(
        "products of category => ",
        $(menuItem).find("> a").attr("href")
      );
      getProductsByCatUrl(parentId, $(menuItem).find("> a").attr("href"), 1);
    }
  }

  httpService
    .get("https://mosbatesabz.com/")
    .then((response) => {
      console.log("status", response.status);
      // return;
      $ = cheerio.load(response.data);

      const menu = $(".whb-header-bottom .wd-header-nav > ul.menu");

      const rootMenuItems = $(menu).find("> li");

      if (rootMenuItems?.length) {
        rootMenuItems.each((index, rootMenuItem) => {
          console.log("index", index);
          const indexesToSkip = [0, 1, 11, 12];
          if (!indexesToSkip.includes(index)) {
            Category.createIfNotExist({
              title: $(rootMenuItem).find(" > a > span").text(),
              parent_id: null,
              url: $(rootMenuItem).find(" > a").attr("href"),
            })
              .then(function (result) {
                // console.log("result", result);
                getSubMenuItems(rootMenuItem, result.id);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        });
      } else {
        console.error("Menu Not Detected !");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

exports.startScraping = startScraping;
