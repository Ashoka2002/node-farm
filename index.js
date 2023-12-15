const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./moduals/replaceTemplate");

///////////////////////////////////////////////////
//FILES
//synchronous code or blocking code

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// const textOut = `This is output about avocado: ${textIn}.\nCreate on: ${new Date()}`;

// fs.writeFileSync("./txt/output.txt", textOut);

//Asynchronous code or non blocking code

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(`${data2}\n${data3}`);
//       fs.writeFile("./txt/ashok.txt", `${data2}\n${data3}`, "utf-8", (err) =>
//         console.log("File succesfully writen 🍾🥂")
//       );
//     });
//   });
// });

// console.log("Reading data...");

////////////////////////////////////////////
//SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const dataJson = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(dataJson);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //OVERVIEW PAGE
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardHTML = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHTML);
    res.end(output);

    //PRODUCT PAGE
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API PAGE
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(dataJson);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>page not found <span style='color:red;'>404<span><h1>");
  }
});

server.listen(5000, () => {
  console.log(`server running on http://localhost:5000/`);
});
