# Retrieved site creators for all sites in Sharepoint

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

<img :src="$withBase('/images/get-site-owner-01.gif')">

3.

```
!function(){let e=[];Object.keys(window).filter(e=>e.includes("temp")).forEach(o=>{e.push(...window[o].Row)}),copy(e)}();
```
