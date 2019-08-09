module.exports = {
  title: "Dev Team Docs",
  description: "Documentation for Enfrasys Consulting's Development Team",
  //base: "/dev-documentation/",
  markdown: {
    toc: { includeLevel: [1, 2, 3] },
    lineNumbers: true
  },
  themeConfig: {
    displayAllHeaders: true,
    lastUpdated: "Last Updated",
    repo: "enfrasysdev/dev-documentation",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "Edit this page on Github",
    logo: "/images/leaf.svg",
    sidebarDepth: 0,
    sidebar: [
      {
        title: "Home",
        collapsable: false,
        children: ["/"]
      },
      {
        title: "Azure Services",
        children: ["/azure-services/"]
      },
      {
        title: "Power Platform",
        children: ["/power-platform/"]
      },
      {
        title: "i-Transform",
        children: ["/i-transform/"]
      },
      {
        title: "Cloud Solution Provider",
        children: ["/csp/"]
      },
      {
        title: "Useful Scripts",
        children: ["/useful-scripts/"]
      },
      {
        title: "GitHub",
        children: ["/github/"]
      },
      {
        title: "VuePress",
        children: ["/vuepress/"]
      }
    ],
    nav: [{ text: "Home", link: "/" }]
  },
  plugins: ["@vuepress/back-to-top", "@vuepress/nprogress"]
};
