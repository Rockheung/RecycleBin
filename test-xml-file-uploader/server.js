const fs = require("fs");
const path = require("path");
const express = require("express");
const formidable = require("formidable");

const app = express();

function formMiddleware(req, res, next) {
  console.log(
    '🚀 ~ file: server.js ~ line 10 ~ formMiddleware ~ req.headers["content-type"]',
    req.headers["content-type"]
  );
  if (!req.headers["content-type"].includes("multipart/form-data")) {
    next();
    return;
  }

  const form = formidable();
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    req.fields = fields;
    req.files = files;
    next();
  });
}

app.use(express.static("public"));
app.use(express.text({ type: "application/xml" }));
app.use(formMiddleware);

app.post("/api/xml-string", (req, res, next) => {
  const _filename =
    [
      req.query.filename || "file",
      Date.now().toString(16),
      parseInt(1000 * Math.random()).toString(16),
    ].join("_") + ".xml";
  fs.writeFile(path.join(__dirname, "uploads", _filename), req.body, (err) => {
    if (err) {
      next(err);
      return;
    }
    res.send();
  });
});

app.post("/api/xml-file", (req, res, next) => {
  const _file =  req.files['xmlFile'];

  const _filename = [
    _file.originalFilename || "file",
    Date.now().toString(16),
    parseInt(1000 * Math.random()).toString(16),
  ].join("_") + ".xml";
  fs.copyFile(_file.filepath, path.join(__dirname, "uploads", _filename), (err) => {
    if (err) {
      next(err);
      return
    }
    res.send();
  })
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000);
