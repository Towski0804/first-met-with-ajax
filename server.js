let http = require("http");
let fs = require("fs");
let url = require("url");
let port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

let server = http.createServer(function (request, response) {
  let parsedUrl = url.parse(request.url, true);
  let pathWithQuery = request.url;
  let queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  let path = parsedUrl.pathname;
  let query = parsedUrl.query;
  let method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);

  if (path === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    let content = fs.readFileSync("src/index.html").toString();
    const page1 = fs.readFileSync("db/page1.json").toString();
    const array = JSON.parse(page1);
    const result = array.map((item) => `<li>${item.id}</li>`).join("");
    content = content.replace("{{page1}}", `<ul id="list">${result}</ul>`);
    response.write(content);
    response.end();
  } else if (path === "/main.js") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.write(fs.readFileSync("src/main.js"));
    response.end();
  } else if (path === "/style.css") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    response.write(fs.readFileSync("src/style.css"));
    response.end();
  } else if (path === "/main2.js") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.write(fs.readFileSync("src/main2.js"));
    response.end();
  } else if (path === "/second.html") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(fs.readFileSync("src/second.html"));
    response.end();
  } else if (path === "/test.xml") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/xml;charset=utf-8");
    response.write(fs.readFileSync("src/test.xml"));
    response.end();
  } else if (path === "/test.json") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.write(fs.readFileSync("src/test.json"));
    response.end();
  } else if (path === "/page2.json") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.write(fs.readFileSync("db/page2.json"));
    response.end();
  } else if (path === "/page3.json") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json;charset=utf-8");
    response.write(fs.readFileSync("db/page3.json"));
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`你访问的页面不存在`);
    response.end();
  }

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);
