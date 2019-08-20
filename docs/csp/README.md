# Cloud Solution Provider

[Microsoft Cloud Solution Provided (aka CSP)](https://partner.microsoft.com/en-GB/membership/cloud-solution-provider/) enables partners to directly manage their entire Microsoft cloud customer lifecycle. Partners in this program utilize dedicated in-product tools to directly provision, manage, and support their customer subscriptions.

There are two version of CSP, the Direct(Tier 1) model and the indirect (Tier 2) model.

<img :src="$withBase('/images/csp-tier.png')">

## Vision

::: tip
Enfrasys Consulting is Tier-2 CSP which under Rhipe and Crayon (Tier-1 CSP). Customre do purchase cloud solution services and licenes from us. </br>
:::
Our vision is to create a portal which able to use by Tier-2 CSP.
</br></br>
The portal should includes these main modules:

<ul>
    <li>Margin adjustment for each customer</li>
    <li>Overview of all usage for each customer</li>
    <li>Generate monthly report for customer</li>
</ul>

## API : Tier-1 CSP Partner

Our CSP data and customer usage will need to retrieve from Rhipe and Crayon (Tier-1 CSP partner). In order for us to get it, we will need to <strong>leverage</strong> on their provided API.

### Rhipe

Rhipe details <br/>
API details

### Crayon

Crayon details <br/>
API details

## Azure Cosmos DB

After we get our data from Tier-1 CSP. The data is needed to store in our Azure Cosmos DB.

<table>
    <tbody>
        <tr>
            <td style="text-align: right;"><strong>Resource Name:</strong></td>
            <td style="text-align: left;">ecsb-csp-cosmos</td>
        </tr>
        <tr style="background-color:#fff !important">
            <td style="text-align: right;"><strong>Resource Group:</strong></td>
            <td style="text-align: left;">CSP-RG</td>
        </tr>
        <tr style="background-color:#fff !important">
            <td style="text-align: right;"><strong>Subscription:</strong></td>
            <td style="text-align: left;">Visual Studio Enterprise - MPN</td>
        </tr>
        <tr style="background-color:#fff !important">
            <td style="text-align: right;"><strong>Subscriptions ID:</strong></td>
            <td style="text-align: left;">9e844db3-bef0-44ca-95af-273e8f174339</td>
        </tr>
    </tbody>

</table>
