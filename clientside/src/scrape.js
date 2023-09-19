const puppeteer = require("puppeteer");
const fs = require("fs/promises");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.lapstoneandhammer.com/collections/womens-footwear-apparel");

  const products = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll(".product-item"))

    return items.map((item, index) => ({
      name: item.querySelector(".caption > .title").textContent.trim(),
      image: item.querySelector(".image-wrapper > a > img").src,
      price: item.querySelector(".caption > .price")?.textContent?.trim().replace("_",""),
      vendor: item.querySelector(".caption > .vendor").textContent.trim(),
      gender: "women",
      id: index + 160,
    }));
  });

  await fs.writeFile("products.json",JSON.stringify(products)
  );

  console.log("Output written to products.json");
  console.log(products.length);

  await browser.close();
})();













