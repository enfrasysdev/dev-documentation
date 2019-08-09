var fs = require("fs");

module.exports = function(path) {
  var files = fs.readdirSync(path);
  console.log(path);
  var parent = path
    .split("/")
    .slice(-2, -1)
    .join("");
  console.log(parent);
  var list = [];
  for (var i in files) {
    if (files[i].includes(".md")) {
      var filename = files[i]
        .split(".")
        .slice(0, -1)
        .join(".");
      if (filename.includes("README")) filename = "";
      if (parent.includes("docs")) list.push(`/${filename}`);
      else list.push(`/${parent}/${filename}`);
    }
  }
  console.log(`${path}: `, list);
  list;
  return list;
};
