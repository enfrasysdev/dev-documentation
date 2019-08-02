# Azure Services

<p align="center">
  <img width="300" src="/images/undraw_collecting.svg" alt="logo">
</p>

This page contains all details for everything related services provided by Azure.

## Log Analytics

### VM Availability

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

## Documentation

<iframe src="https://docs.microsoft.com/en-us/flow/"></iframe>
