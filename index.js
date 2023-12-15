const fs = require("fs");
const http = require("http");
const { json } = require("stream/consumers");
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

const dataJson = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const server = http.createServer((req, res) => {
  if (req.url === "/overview" || req.url === "/") {
    res.writeHead(200, {
      "Content-type": "text/html",
      "Who-is-kiran": "my-wife",
    });
    res.end("<h1 style='color:green;'>This is OVERVIEW</h1>");
  } else if (req.url === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(dataJson);
  } else if (req.url === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
      "Who-is-kiran": "my-wife",
    });
    res.end("<h1 style='color:green;'>This is PRODUCT</h1>");
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
