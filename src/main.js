console.log("进来了");

getCSS.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/style.css ");
  request.onreadystatechange = () => {
    // download successfully but do not know whether loading right section or not
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status <= 300) {
        console.log("Successfully load 'style.css'");
        // create style tag
        const style = document.createElement("style");
        // add content to style tag
        style.innerHTML = request.response;
        // insert into head
        document.head.appendChild(style);
      } else {
        alert("加载失败");
      }
    }
  };
  request.send();
};

getJS.onclick = () => {
  // 1
  const request = new XMLHttpRequest();
  // 2
  request.open("GET", "/main2.js");
  // 3
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status <= 300) {
        const script = document.createElement("script");
        script.innerHTML = request.response;
        document.body.appendChild(script);
      } else {
        alert("加载失败");
      }
    }
  };
  // 4
  request.send();
};

getHTML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/second.html");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status <= 300) {
        const div = document.createElement("div");
        div.innerHTML = request.response;
        document.body.appendChild(div);
      } else {
        alert("加载失败");
      }
    }
  };
  request.send();
};

getXML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/test.xml");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status <= 300) {
        const dom = request.responseXML;
        const content = dom.getElementsByTagName("warning")[0].textContent;
        console.log(content.trim());
      } else {
        alert("加载失败");
      }
    }
  };
  request.send();
};

getJSON.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/test.json");
  request.onreadystatechange = () => {
    if (
      request.readyState === 4 &&
      request.status >= 200 &&
      request.status <= 300
    ) {
      const object = JSON.parse(request.response);
      uName.textContent = object.name;
    }
  };
  request.send();
};

let n = 1;
getPage.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", `/page${n + 1}.json`);
  request.onreadystatechange = () => {
    if (
      request.readyState === 4 &&
      request.status >= 200 &&
      request.status <= 300
    ) {
      console.log(request.response);
      const array = JSON.parse(request.response);
      array.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.id;
        list.appendChild(li);
      });
    }
  };
  n += 1;
  request.send();
};
