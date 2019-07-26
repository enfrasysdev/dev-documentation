module.exports = {
  title: "Dev Team Docs",
  description: "Just playing around",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    displayAllHeaders: true,
    repo: "enfrasysdev/development-team-documentation",
    editLinks: true,
    editLinkText: "Edit this page on Github",
    logo: "/images/visual-studio-code-insiders-icon.png",
    sidebar: "auto",
    sidebarDepth: 1,
    sidebar: [
      {
        title: "Home",
        collapsable: false,
        children: ["/"]
      },
      {
        title: "Power Platform",
        children: ["/power-platform/"]
      },
      {
        title: "i-Transform",
        children: ["/"]
      },
      {
        title: "Cloud Solution Provider",
        children: ["/csp/", "/csp/cosmosdb", "/csp/cspapi"]
      },
      {
        title: "GitHub",
        children: ["/github/"]
      },
      {
        title: "VuePress",
        children: ["/vuepress/", "/vuepress/exampleloadfromapi"]
      }
    ],
    nav: [
      { text: "Home", link: "/" },
      { text: "Github", link: "https://www.github.com" }
    ],
    lastUpdated: true
  }
};
