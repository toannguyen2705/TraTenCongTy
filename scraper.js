const scrapeCategory = async (browser, url) =>
  new Promise(async (resolve, reject) => {
    try {
      let page = await browser.newPage();
      console.log(">> Mở tab mới...");

      await page.goto(url);
      await page.waitForSelector(
        "body > div > div.col-xs-12.col-sm-9 > div:nth-child(2) > form > div > input"
      );
      await page.focus(
        "body > div > div.col-xs-12.col-sm-9 > div:nth-child(2) > form > div > input"
      );
      await page.type(
        "body > div > div.col-xs-12.col-sm-9 > div:nth-child(2) > form > div > input",
        "kế toán"
      );
      await page.click(
        "body > div > div.col-xs-12.col-sm-9 > div:nth-child(2) > form > div > div > button"
      );

      await page.waitForNavigation();
      const currentUrl = page.url();
      for (let k = 1; k <= 2; k++) {
        if (k === 1) {
          page.goto(currentUrl);
          await page.waitForSelector(
            `body > div > div.col-xs-12.col-sm-9 > ul > li.active > a`
          );
        } else {
          await page.goto(currentUrl.concat(`/?page=${k}`));
        }

        let taxListing = await page.$$(
          "body > div > div.col-xs-12.col-sm-9 > div:nth-child(3) > div"
        );

        for (let j = 2; j <= taxListing.length; j++) {
          if (j === 6 || j === 28) {
            continue;
          } else {
            await page.click(
              `body > div > div.col-xs-12.col-sm-9 > div:nth-child(3) > div:nth-child(${j}) > a`
            );
          }
          await page.waitForTimeout(1000);
          // const companyName = await page.$$eval(".jumbotron", (trs) => {
          //   let result = "";
          //   Array.from(trs, (tr) => {
          //     const th = tr.querySelector("span");
          //     result = th.innerText?.trim();
          //   });
          //   return result;
          // });
          // const dataReusltInfoCompany = await page.$$eval(
          //   ".jumbotron",
          //   (trs) => {
          //     const reusltInfoCompany = {};
          //     Array.from(trs, (tr) => {
          //       const columns = [
          //         "companyNameEn",
          //         "companyNameShort",
          //         "taxID",
          //         "address",
          //         "owners",
          //         "phone",
          //       ];
          //       const capitalizeFirstLetterOfEachWord = (str) => {
          //         let splitStr = str?.toLowerCase()?.split(" ");
          //         for (let i = 0; i < splitStr?.length; i++) {
          //           splitStr[i] =
          //             splitStr[i].charAt(0).toUpperCase() +
          //             splitStr[i].substring(1);
          //         }
          //         return splitStr?.join(" ");
          //       };
          //       const tds = tr.querySelectorAll("td");

          //       const eleI = tds[0].querySelector("i");
          //       const text = tds[1]?.innerText?.trim();
          //       const classNameOfEleI = eleI?.className;

          //       switch (classNameOfEleI) {
          //         case "fa fa-globe":
          //           reusltInfoCompany[columns[0]] =
          //             capitalizeFirstLetterOfEachWord(text);
          //         case "fa fa-reorder":
          //           reusltInfoCompany[columns[1]] = text;
          //         case "fa fa-hashtag":
          //           reusltInfoCompany[columns[2]] = text;
          //         case "fa fa-map-marker":
          //           reusltInfoCompany[columns[3]] =
          //             capitalizeFirstLetterOfEachWord(text);
          //         case "fa fa-user":
          //           reusltInfoCompany[columns[4]] =
          //             capitalizeFirstLetterOfEachWord(text);
          //         case "fa fa-phone":
          //           reusltInfoCompany[columns[5]] = text;
          //         default:
          //       }
          //     });

          //     return reusltInfoCompany;
          //   }
          // );
          const companyName = await page.$$eval(".jumbotron", (trs) => {
            let result = {};
            Array.from(trs, (tr) => {
              result = tr.innerText?.trim();
            });
            return result;
          });
          console.log(companyName);
          // console.log(dataReusltInfoCompany);
          await page.goto(currentUrl.concat(`&page=${k}`));
        }
      }
      resolve();
    } catch (error) {
      console.log("Lỗi ở scrape category: " + error);
      reject(error);
    }
  });

module.exports = {
  scrapeCategory,
};
