const fs = require("fs-extra");
const path = require("path");
const { minify } = require("html-minifier-terser");
const CleanCSS = require("clean-css");

const srcDir = "./src";
const distDir = "./dist";

// dist leeren
fs.emptyDirSync(distDir);

// HTML-Dateien minifizieren
fs.readdirSync(srcDir).filter(f => f.endsWith(".html")).forEach(file => {
  const html = fs.readFileSync(path.join(srcDir, file), "utf8");
  minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyJS: true,
    minifyCSS: true,
  }).then(minified => {
    fs.outputFileSync(path.join(distDir, file), minified);
    console.log("✔ HTML:", file);
  });
});

// CSS-Dateien minifizieren
fs.readdirSync(srcDir).filter(f => f.endsWith(".css")).forEach(file => {
  const css = fs.readFileSync(path.join(srcDir, file), "utf8");
  const minified = new CleanCSS().minify(css).styles;
  fs.outputFileSync(path.join(distDir, file), minified);
  console.log("✔ CSS:", file);
});

// andere Dateien einfach kopieren (z. B. Bilder, JS, PNG, etc.)
fs.copySync(srcDir, distDir, {
  filter: src => !src.endsWith(".html") && !src.endsWith(".css")
});
