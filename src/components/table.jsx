import React, { useState, useEffect } from "react";

export default function Table({ tableName, data }) {
  console.log(data);
  return (
    <div
      style={{
        width: 300,
        border: "1px solid gray",
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
        padding: 10,
      }}
    >
      <h1>{tableName}</h1>
      {console.log("tableName", tableName)}

      <div style={{ display: "flex", flexDirection: "column" }}>
        {Object.keys(data).map(function (key) {
          return (
            <div>
              {key}: &nbsp;&nbsp; {data[key]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
