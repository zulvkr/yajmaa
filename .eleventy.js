const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-es");
const htmlmin = require("html-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

module.exports = function (eleventyConfig) {

  // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Use LazyImages Plugin https://github.com/liamfiddler/eleventy-plugin-lazyimages#readme

  if (env == "prod") {
    eleventyConfig.addPlugin(lazyImagesPlugin, {
      imgSelector: ".lazy",
      transformImgPath: (imgPath) => {
        if (imgPath.startsWith('/') && !imgPath.startsWith('//')) {
          return `_site${imgPath}`;
        }
        return imgPath;
      },
    });
  }

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  // Modify image path to thumbnail folder
  eleventyConfig.addFilter("thumb", path => {
    return path.replace("/img/", "/img/thumb/");
  });

  // JSON to string
  eleventyConfig.addFilter("jsonStringify", jsonObj => {
    return JSON.stringify(jsonObj);
  });

  //Native currency filter
  eleventyConfig.addFilter("rupiah", value => {
    const valueRupiah = new Intl.NumberFormat("id-ID").format(value);
    return "Rp " + valueRupiah.replace(/,/g, ".");
  });

  // Minify CSS
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Minify JS
  eleventyConfig.addFilter("jsmin", function (code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return code;
    }
    return minified.code;
  });

  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  // only content in the `posts/` directory
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  // only content in the `posts/` directory and limit to 6
  eleventyConfig.addCollection("sixPosts", function (collectionApi) {
    const allPosts = collectionApi.getFilteredByGlob("src/posts/*.md");
    let six = [];
    for (i = 0; i < 6; i++) {
      six.unshift(allPosts[i]);
    };
    return six;
  });

  // only content in the `fundraises/` directory
  eleventyConfig.addCollection("fundraises", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/fundraises/*.md");
  });

  // Copy folders with static assets except img folder
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/_includes/assets");

  // I need to know how code below works
  /* Markdown Plugins */
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let markdownItAttrs = require('markdown-it-attrs');
  let emoji = require('markdown-it-emoji');
  let markdownContainer = require('markdown-it-container');
  let markdownItClass = require('@toycode/markdown-it-class');
  
  let classMapping = { img: 'lazy' }
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: false
  };

  eleventyConfig.setLibrary(
    "md",
    markdownIt(options)
      .use(markdownItAnchor, opts)
      .use(markdownItAttrs)
      .use(emoji)
      .use(markdownContainer, "container")
      .use(markdownItClass, classMapping)
  );

  return {
    templateFormats: ["md", "njk", "html"],
    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};