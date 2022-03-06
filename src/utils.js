export const fetchHtmlNodes = (html) => {
  return fetch("https://copycat-test-api.herokuapp.com/parsehtml", {
    method: "POST",
    body: JSON.stringify({ html }),
  })
    .then((response) => response.json())
    .then((data) => {
      const divs = data["html"].map((obj) => {
        const keys = Object.keys(obj.elem);
        const div = document.createElement("div");
        const elem = document.createElement(keys[0]);
        parseHtml(obj.elem[keys[0]][0], elem);
        div.append(elem);
        return { name: traverseDiv(elem), content: div.innerHTML, count: obj.count };
      });
      return divs;
    });
};

const parseHtml = (contents, parent) => {
  if (contents["_attributes"])
    Object.keys(contents["_attributes"]).map((attr) => {
      const value = contents["_attributes"][attr];
      parent.setAttribute(attr, value.toString());
    });
  if (contents["_value"]) parent.innerHTML = contents["_value"];
  Object.keys(contents).map((key) => {
    if (key !== "_attributes" && key !== "_value") {
      const child = document.createElement(key);
      parent.append(parseHtml(contents[key][0], child));
    }
  });
  return parent;
};

const traverseDiv = (element) => {
  if (element.tagName === "DIV" && element.childNodes.length) return traverseDiv(element.childNodes[0]);
  return element.tagName;
};
