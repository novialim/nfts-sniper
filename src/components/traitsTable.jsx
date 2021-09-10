import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { COLUMNS } from "./constants/columnHeaders";

export default function TraitsTable({ data, maxCount, index }) {
  const [attributeCount, setAttributeCount] = useState({});

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

  // create row table
  for (const attr in attributeCount) {
    attrRows.push({
      id: attrRows.length + 1,
      amount: attr,
      total: attributeCount[attr],
      percentage:
        ((attributeCount[attr] / sumValues(attributeCount)) * 100).toFixed(2) +
        "%",
    });
  }

  return (
    <div style={{ marginRight: 20, marginBottom: 20 }}>
      <h2>
        Getting NFT {index} out of {maxCount}
      </h2>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={attrRows}
          columns={COLUMNS}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}

// have to figure out the NAME OF THE KEY
// how do we add data.ID as table ID????
