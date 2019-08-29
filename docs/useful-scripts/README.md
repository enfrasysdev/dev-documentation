# SharePoint - Retrieved site creators for all sites

## Steps

1. Insert your company sharepoint hostname in the following link:

```js
https://<INSERT_COMPANY_HOSTNAME_HERE>-admin.sharepoint.com/_layouts/15/online/AdminHome.aspx#/siteManagement
```

Example output: `https://enfrasysconsulting-admin.sharepoint.com/_layouts/15/online/AdminHome.aspx#/siteManagement`

2. Navigate to your modified link above and sign in if necessary.

::: warning IMPORTANT
You need to be a **Sharepoint Administrator** of the tenant to have permission to view this page.
:::

<img :src="$withBase('/images/get-site-owner.gif')">

3.

```
(async function() {
  const SP_URL = window.location.origin;

  function convertToCSV(objArray) {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";
    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line != "") line += ",";
        line += array[i][index];
      }
      str += line + "\r\n";
    }
    return str;
  }

  function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
      items.unshift(headers);
    }
    // Convert Object to JSON
    const jsonObject = JSON.stringify(items);
    const csv = convertToCSV(jsonObject);

    var exportedFilename = fileTitle + ".csv" || "export.csv";

    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilename);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  async function getUsersAsync(url) {
    const jsonString = sessionStorage.getItem(
      "sp-client-shared;0.1.5;OAuthUtility;https://graph.microsoft.com"
    );
    const jsonObj = JSON.parse(jsonString);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jsonObj.accessToken}`,
        "Content-Type": "application/json"
      }
    });
    let data = await response.json();
    return data;
  }

  async function getEntireUserList(url) {
    let chunk = await getUsersAsync(url);
    if (chunk.hasOwnProperty("@odata.nextLink")) {
      console.log("continuing");
      let chunkNext = await getEntireUserList(chunk["@odata.nextLink"]);
      let chunkCombined = chunk.value.concat(chunkNext);
      return chunkCombined;
    } else {
      console.log("done");
      return chunk.value;
    }
  }

  async function getSitesAsync() {
    let response = await fetch(
      `${SP_URL}/_api/web/lists/GetByTitle('DO_NOT_DELETE_SPLIST_TENANTADMIN_AGGREGATED_SITECOLLECTIONS')/RenderListDataAsStream`,
      {
        credentials: "include",
        headers: {
          accept: "application/json;odata.metadata=minimal",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/json;charset=utf-8",
          "odata-version": "4.0"
        },
        referrer: `${SP_URL}/_layouts/15/online/AdminHome.aspx`,
        referrerPolicy: "no-referrer-when-downgrade",
        body:
          '{"parameters":{"ViewXml":"<View><Query><Where><And><IsNull><FieldRef Name=\\"TimeDeleted\\"/></IsNull><Neq><FieldRef Name=\\"State\\"/><Value Type=\'Integer\'>0</Value></Neq></And></Where><OrderBy><FieldRef Name=\'Title\' Ascending=\'true\' /></OrderBy></Query><ViewFields><FieldRef Name=\\"SiteId\\"/><FieldRef Name=\\"Title\\"/><FieldRef Name=\\"SiteUrl\\"/><FieldRef Name=\\"LastActivityOn\\"/><FieldRef Name=\\"StorageUsed\\"/><FieldRef Name=\\"StorageUsedPercentage\\"/><FieldRef Name=\\"StorageQuota\\"/><FieldRef Name=\\"ShareByEmailEnabled\\"/><FieldRef Name=\\"ShareByLinkEnabled\\"/><FieldRef Name=\\"AllowGuestUserSignIn\\"/><FieldRef Name=\\"SensitivityLabel\\"/><FieldRef Name=\\"TemplateId\\"/><FieldRef Name=\\"TemplateName\\"/><FieldRef Name=\\"TemplateTitle\\"/><FieldRef Name=\\"IsGroupConnected\\"/><FieldRef Name=\\"GroupId\\"/><FieldRef Name=\\"CreatedBy\\"/><FieldRef Name=\\"TimeCreated\\"/><FieldRef Name=\\"TimeDeleted\\"/><FieldRef Name=\\"NumOfFiles\\"/><FieldRef Name=\\"FileViewedOrEdited\\"/><FieldRef Name=\\"PageViews\\"/><FieldRef Name=\\"ExternalSharing\\"/><FieldRef Name=\\"PrimaryAdmin\\"/><FieldRef Name=\\"HubSiteId\\"/></ViewFields></View>","DatesInUtc":true}}',
        method: "POST",
        mode: "cors"
      }
    );
    let data = await response.json();
    return data;
  }

  const headers = {
    ID: "ID",
    PermMask: "PermMask",
    FSObjType: "FSObjType",
    ContentTypeId: "ContentTypeId",
    FileRef: "FileRef",
    SMTotalSize: "SMTotalSize",
    SiteId: "SiteId",
    Title: "Title",
    SiteUrl: "SiteUrl",
    LastActivityOn: "LastActivityOn",
    "LastActivityOn.FriendlyDisplay": "LastActivityOn.FriendlyDisplay",
    StorageUsed: "StorageUsed",
    "StorageUsed.": "StorageUsed.",
    StorageUsedPercentage: "StorageUsedPercentage",
    "StorageUsedPercentage.calculated": "StorageUsedPercentage.calculated",
    StorageQuota: "StorageQuota",
    "StorageQuota.": "StorageQuota.",
    ShareByEmailEnabled: "ShareByEmailEnabled",
    "ShareByEmailEnabled.value": "ShareByEmailEnabled.value",
    ShareByLinkEnabled: "ShareByLinkEnabled",
    "ShareByLinkEnabled.value": "ShareByLinkEnabled.value",
    AllowGuestUserSignIn: "AllowGuestUserSignIn",
    "AllowGuestUserSignIn.value": "AllowGuestUserSignIn.value",
    TemplateId: "TemplateId",
    "TemplateId.": "TemplateId.",
    TemplateName: "TemplateName",
    TemplateTitle: "TemplateTitle",
    IsGroupConnected: "IsGroupConnected",
    "IsGroupConnected.value": "IsGroupConnected.value",
    GroupId: "GroupId",
    CreatedBy: "CreatedBy",
    TimeCreated: "TimeCreated",
    "TimeCreated.FriendlyDisplay": "TimeCreated.FriendlyDisplay",
    TimeDeleted: "TimeDeleted",
    "TimeDeleted.FriendlyDisplay": "TimeDeleted.FriendlyDisplay",
    NumOfFiles: "NumOfFiles",
    "NumOfFiles.": "NumOfFiles.",
    FileViewedOrEdited: "FileViewedOrEdited",
    "FileViewedOrEdited.": "FileViewedOrEdited.",
    PageViews: "PageViews",
    "PageViews.": "PageViews.",
    ExternalSharing: "ExternalSharing",
    PrimaryAdmin: "PrimaryAdmin",
    HubSiteId: "HubSiteId",
    State: "State",
    "State.": "State.",
    ItemChildCount: "ItemChildCount",
    FolderChildCount: "FolderChildCount",
    userPrincipalName: "userPrincipalName"
  };

  const today = new Date().toISOString().slice(0, 10);
  const fileTitle = `SiteCreators_${today}`;

  console.log("getting users from MS Graph API...");
  async function initiateList() {
    const entireList = await getEntireUserList(
      "https://graph.microsoft.com/v1.0/users?$select=displayName,userPrincipalName&$top=999"
    );
    return entireList;
  }

  const entireList = await initiateList();
  getSitesAsync().then(r => {
    let items = r.Row;
    items.forEach((item, index) => {
      items[index]["Title"] = items[index]["Title"].replace(/,/g, ";");
      items[index]["StorageQuota"] = items[index]["StorageQuota"].replace(
        /,/g,
        ""
      );
      items[index]["StorageUsed"] = items[index]["StorageUsed"].replace(
        /,/g,
        ""
      );
      const currentUPN = entireList.find(
        x => x.displayName === items[index]["CreatedBy"]
      );
      items[index]["userPrincipalName"] =
        typeof currentUPN !== "undefined" ? currentUPN.userPrincipalName : "";
    });
    exportCSVFile(headers, items, fileTitle);
  });
})();
```
