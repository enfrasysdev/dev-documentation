const getChildren = require("./childscript");

module.exports = {
  title: "Dev Team Docs",
  description: "Documentation for Enfrasys Consulting's Development Team",
  //base: "/dev-documentation/",
  markdown: {
    toc: { includeLevel: [1, 2, 3] },
    lineNumbers: true
  },
  themeConfig: {
    lastUpdated: "Last Updated",
    repo: "enfrasysdev/dev-documentation",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "Edit this page on Github",
    logo: "/images/leaf.svg",
    sidebarDepth: 1,
    sidebar: [
      {
        title: "Home",
        collapsable: false,
        children: getChildren("./docs/")
      },
      {
        title: "Azure Services",
        children: getChildren("./docs/azure-services/")
      },
      {
        title: "Power Platform",
        children: getChildren("./docs/power-platform/")
      },
      {
        title: "API Manager",
        children: getChildren("./docs/api-manager/")
      },
      {
        title: "i-DO",
        children: getChildren("./docs/i-do/")
      },
      {
        title: "i-Transform",
        children: getChildren("./docs/i-transform/")
      },
      {
        title: "Cloud Solution Provider",
        children: getChildren("./docs/csp/")
      },
      {
        title: "Useful Scripts",
        children: getChildren("./docs/useful-scripts/")
      },
      {
        title: "GitHub",
        children: getChildren("./docs/github/")
      },
      {
        title: "VuePress",
        children: getChildren("./docs/vuepress/")
      }
    ],
    nav: [{ text: "Home", link: "/" }]
  },
  plugins: ["@vuepress/back-to-top", "@vuepress/nprogress"]
};
