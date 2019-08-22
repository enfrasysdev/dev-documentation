# Log Analytics

<div style="text-align:center">
<img :src="$withBase('/images/azure-log-analytics.svg')" height="80"></div>

Azure Log Analytics is an Azure resource and isa container where data is collected, aggregated, analyzed and presented in Azure Monitor. You can have multiple workspaces per Azure subscription, and you can have access to more than one workspace, with the ability to easily query across them.

## Getting Started

::: tip Prerequisite

Prepare your own [Log Analytics Workspace environment](https://docs.microsoft.com/en-gb/azure/azure-monitor/learn/quick-collect-azurevm)
:::

### [Get started with Log Analytics](https://docs.microsoft.com/en-us/azure/azure-monitor/log-query/get-started-portal)

In this tutorial you will learn how to use Log Analytics in the Azure portal to write Azure Monitor log queries. It will teach you how to:

<ul>
<li>Use Log Analytics to write a simple query</li>
<li>Understand the schema of your data</li>
<li>Filter, sort, and group results</li>
<li>Apply a time range</li>
<li>Create charts</li>
<li>Save and load queries</li>
<li>Export and share queries</li>
</ul>

### [Get started with log queries](https://docs.microsoft.com/en-us/azure/azure-monitor/log-query/get-started-queries)

In this tutorial you will learn to write log queries in Azure Monitor. It will teach you how to:

<ul>
<li>Understand query structure</li>
<li>Sort query results</li>
<li>Filter query resultes</li>
<li>Filter query results</li>
<li>Specify a time range</li>
<li>Select which fields to include in the results</li>
<li>Define and use custom fields</li>
<li>Aggregate and group results</li>
</ul>

## Useful Queries

### VM Availability (in Power BI Advanced Query Editor)

```js
let AnalyticsQuery =
let Source = Json.Document(Web.Contents("https://api.loganalytics.io/v1/workspaces/"&#"Log Analytics Workspace ID"&"/query",
[Query=[#"query"="let start_time=(datetime("""&Text.From(#"Start Date")&"""));
let end_time=(datetime("""&Text.From(#"End Date")&"""));
Heartbeat
| where TimeGenerated > start_time and TimeGenerated < end_time
| make-series heartbeat_per_min=count() default=0 on TimeGenerated in range(start_time, end_time, 1m) by Computer
| mv-expand heartbeat_per_min, TimeGenerated",#"x-ms-app"="OmsAnalyticsPBI",#"prefer"="ai.response-thinning=true"],Timeout=#duration(0,0,4,0)])),
TypeMap = #table(
{ "AnalyticsTypes", "Type" },
{
{ "string",   Text.Type },
{ "int",      Int32.Type },
{ "long",     Int64.Type },
{ "real",     Double.Type },
{ "timespan", Duration.Type },
{ "datetime", DateTimeZone.Type },
{ "bool",     Logical.Type },
{ "guid",     Text.Type },
{ "dynamic",  Text.Type }
}),
DataTable = Source[tables]{0},
Columns = Table.FromRecords(DataTable[columns]),
ColumnsWithType = Table.Join(Columns, {"type"}, TypeMap , {"AnalyticsTypes"}),
Rows = Table.FromRows(DataTable[rows], Columns[name]),
Table = Table.TransformColumnTypes(Rows, Table.ToList(ColumnsWithType, (c) => { c{0}, c{3}}))
in
Table,
    #"Changed Type" = Table.TransformColumnTypes(AnalyticsQuery,{{"TimeGenerated", type datetimezone}}),
    #"Calculated Local Time" = Table.TransformColumns(#"Changed Type",{{"TimeGenerated", DateTimeZone.ToLocal, type datetimezone}})
in #"Calculated Local Time"
```
