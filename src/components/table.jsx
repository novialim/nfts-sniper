import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function Table({
  tableName,
  data,
  maxCount,
  retrieveSelectedNFTs,
}) {
  const [sortModel, setSortModel] = useState([
    {
      field: "percentage",
      sort: "asc",
    },
  ]);

  const numOfKeys = Object.keys(data).length;

  const getSelectedNFTs = (ids) => {
    const selectedRowData = attrRows.filter((row) => ids.includes(row.id));
    retrieveSelectedNFTs(selectedRowData);
  };

  const attrRows = [];

  // create row table
  Object.keys(data).map((key) => {
    attrRows.push({
      id: attrRows.length + 1,
      name: tableName,
      values: key,
      amount: data[key],
      percentage: ((data[key] / maxCount) * 100).toFixed(2),
      score: maxCount / numOfKeys / data[key].toFixed(0),
    });
  });

  return (
    <div
      style={{
        width: 450,
        border: "1px solid gray",
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
        padding: 10,
      }}
    >
      {/* tableName is also traits key */}
      <h2>{tableName}</h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ height: 370, width: "100%" }}>
          <DataGrid
            sortingOrder={["desc", "asc"]}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            rows={attrRows}
            columns={COLUMNS}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            disableColumnMenu
            onSelectionModelChange={(ids) => {
              getSelectedNFTs(ids);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export const COLUMNS = [
  {
    field: "values",
    headerName: "Values",
    width: 100,
    editable: false,
  },
  {
    field: "amount",
    headerName: "Amt",
    width: 90,
    editable: false,
  },
  {
    field: "percentage",
    headerName: "%",
    type: "number",
    width: 80,
    editable: false,
  },
  {
    field: "score",
    headerName: "Score",
    type: "number",
    width: 100,
  },
];
