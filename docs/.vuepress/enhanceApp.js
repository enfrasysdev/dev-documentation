import * as Msal from "msal";

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements to the app
  const applicationConfig = {
    auth: {
      clientId: "4ba2eb8d-32dc-411a-9912-8b53f559d764", // This is SYBA client ID
      authority:
        "https://login.microsoftonline.com/db992bae-4cb3-4086-8c91-55255b0c39fe", // This is tenant info
      redirectUri: window.location.origin
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true
    }
  };

  const graphScope = {
    scopes: ["User.Read"]
  };

  const authRedirectCallBack = (error, response) => {
    if (error) {
      console.log(error);
    } else {
      if (response.tokenType === "access_token") {
        // console.log("token type is: " + response.tokenType);
      } else {
        // console.log("token type is: " + response.tokenType);
      }
    }
  };

  let msalInstance = new Msal.UserAgentApplication(applicationConfig);
  msalInstance.handleRedirectCallback(authRedirectCallBack);

  router.beforeEach((to, from, next) => {
    console.log(to);
    if (msalInstance.getAccount()) {
      next();
      return;
    } else {
      msalInstance.loginRedirect(graphScope).then(
        res => {
          if (msalInstance.getAccount()) {
            next("/");
          } else {
            next("/login/");
          }
        },
        () => {
          next("/login/");
        }
      );
    }
  });
};
