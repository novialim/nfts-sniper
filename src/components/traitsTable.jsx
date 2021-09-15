import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { COLUMNS } from "./constants/columnHeaders";

export default function TraitsTable({ data, maxCount, index }) {
  const [attributeCount, setAttributeCount] = useState({});
  const [sortModel, setSortModel] = useState([
    {
      field: "percentage",
      sort: "asc",
    },
  ]);

  useEffect(() => {
    let attributeObj = {};

    const calculateAttributeCount = () => {
      //need to prop in the array object key as attributes might not always be the key name
      data.map(({ attributes }) => {
        attributeObj[attributes.length] =
          attributeObj[attributes.length] + 1 || 1;
      });
      setAttributeCount(attributeObj);
    };
    calculateAttributeCount();
  }, [data]);

  const attrRows = [];

  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b);
  const numOfKeys = Object.keys(attributeCount).length;

  // create row table
  for (const attr in attributeCount) {
    attrRows.push({
      id: attrRows.length + 1,
      amount: attr,
      total: attributeCount[attr],
      percentage:
        ((attributeCount[attr] / sumValues(attributeCount)) * 100).toFixed(2) +
        "%",
      score: maxCount / numOfKeys / attributeCount[attr],
    });
  }

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
      <h2>Amount of Traits</h2>
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
        />
      </div>
    </div>
  );
}

// have to figure out the NAME OF THE KEY
// how do we add data.ID as table ID????
