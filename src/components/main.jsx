import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TraitsTable from "./traitsTable";
import Table from "./table";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "50ch",
  },
}));

const Main = () => {
  // const [api, setApi] = useState("");
  // const [replaceToken, setReplaceToken] = useState("");
  // const [minToken, setMinToken] = useState(0);
  // const [maxToken, setMaxToken] = useState(0);

  ////// TEMP DATA
  const [api, setApi] = useState(
    "https://go.fission.app/json/REPLACE/index.json"
  );
  const [replaceToken, setReplaceToken] = useState("REPLACE");
  const [minToken, setMinToken] = useState(0);
  const [maxToken, setMaxToken] = useState(80);
  //////// TEMP DATA

  const [nftData, setnftData] = useState([]);
  const [apiIndex, setApiIndex] = useState(0);
  const [attributeKey, setAttributeKey] = useState("");
  const [traitsKeyArr, setTraitsKeyArr] = useState([]);

  const [hasResults, setHasResults] = useState(false);
  const [finalTraitsTable, setFinalTraitsTable] = useState([]);

  let traitsArr = [];

  const getTraitsArray = (data) => {
    // console.log("object keys are: ", keyArr);
    for (const key in data) {
      // I only want the value with arrays
      if (typeof data[key] === "object") {
        setAttributeKey(key);
        // just need to test first object in traits to get key
        setTraitsKeyArr(Object.keys(data[key][0]));
      }
    }
  };

  const fetchData = async () => {
    for (let count = minToken; count <= maxToken; count++) {
      const newApi = api.replace(replaceToken, count);

      const response = await fetch(newApi);
      const data = await response.json();

      data.id = count;
      getTraitsArray(data);

      setnftData((nftData) => [...nftData, data]);
      setApiIndex((apiIndex) => apiIndex + 1);
      setHasResults(true);
    }
  };

  // console.log("whats the whole array object again?", nftData);

  const getAllNames = () => {
    nftData.map((obj) => {
      // within each traits array obj
      obj[attributeKey].map((obj) => {
        //  create another big array list of objects with traits
        traitsArr.push(obj);
      });
    });

    return traitsArr;
  };

  useEffect(() => {
    const getResults = () => {
      let combinedArr = getAllNames();
      let ultimateTraitsObjArray = [];

      let keyObjArray = [];

      if (combinedArr.length > 0) {
        combinedArr.map((value) => {
          ultimateTraitsObjArray = [
            ...ultimateTraitsObjArray,
            {
              [value[traitsKeyArr[0]].toLowerCase()]: value[traitsKeyArr[1]],
            },
          ];
        });
      }

      let allKeys = ultimateTraitsObjArray.map((x) => Object.keys(x)[0]);
      let uniqueAllKeys = [...new Set(allKeys)];

      if (ultimateTraitsObjArray.length > 0) {
        for (let i = 0; i < uniqueAllKeys.length; i++) {
          // GENERATE GRID TABLE FROM HERE
          let resultCount = ultimateTraitsObjArray.reduce((p, c) => {
            let arrKey = c[uniqueAllKeys[i]];
            if (!p.hasOwnProperty(arrKey) && arrKey !== undefined) {
              p[arrKey] = 0;
            }
            if (arrKey !== undefined) {
              p[arrKey]++;
            }
            return p;
          }, {});

          keyObjArray.push([uniqueAllKeys[i], resultCount]);
        }
      }
      return keyObjArray;
    };

    hasResults && console.log(getResults());
    hasResults && setFinalTraitsTable(getResults());
    /// NOW YOU HAVE AN ARRAY OF ATTRIBUTES, HOW DO YOU DISPLAY IT DYNAMICALLY?????? ///////
  }, [hasResults, nftData]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div style={{ padding: 50 }}>
        <h1>NFTs Sniper</h1>
        <form noValidate autoComplete="off">
          <div>
            <TextField
              id="preset-name"
              label="Name of Preset"
              className={classes.textField}
            />
          </div>
          <div>
            <TextField
              id="contract-address"
              label="Contract Address"
              className={classes.textField}
            />
          </div>
          <div>
            <TextField
              id="api-url"
              label="API URL"
              className={classes.textField}
              onChange={(e) => setApi(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="replace-tokenid"
              label="String to replace TokenID's"
              className={classes.textField}
              onChange={(e) => setReplaceToken(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="min-token"
              label="Min Token ID"
              className={classes.textField}
              onChange={(e) => setMinToken(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="max-token"
              label="Max Token ID"
              className={classes.textField}
              onChange={(e) => setMaxToken(e.target.value)}
            />
          </div>
          <div>
            <Button
              style={{ marginTop: 20 }}
              variant="contained"
              onClick={() => {
                fetchData();
              }}
            >
              Search
            </Button>
          </div>
        </form>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexWrap: "wrap",
            width: "100vw",
          }}
        >
          <TraitsTable
            data={nftData}
            maxCount={maxToken ? maxToken - minToken + 1 : 0}
            index={apiIndex}
          />
          {finalTraitsTable?.map((arr) => {
            return <Table tableName={arr[0]} data={arr[1]} />;
          })}
        </div>
        <div style={{ marginTop: 20 }}>
          {nftData.map((nft, index) => {
            return (
              <img
                key={index}
                src={nft.image}
                alt={nft.description}
                width="100"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;

// https://go.fission.app/json/REPLACE/index.json

// etherscan for stoner cats: https://etherscan.io/address/0xd4d871419714b778ebec2e22c7c53572b573706e#readContract
// sample contract for stoner cats: 0xD4d871419714B778eBec2E22C7c53572b573706e
// sample API endpoint: https://go.fission.app/json/5/index.json
// total supply: 10420

// sample API endpoint for sevens https://ipfs.io/ipfs/QmeFW9dfPpv3wUCP97s6YsRpgzAm5G62S4aCZxmCZdahMe/1

// {
// "name": "Stoner Cats #5",
// "description": "Stoner Cats is an adult animated short series accessed exclusively by owning a collectible Stoner Cat NFT. The NFT sales directly fund the mini-pilot and all future content. The show is centered around five house cats who mysteriously become sentient. With their *higher* consciousness, they realize that their beloved owner needs rescue from a myriad of dangerous situations. With great *flower* comes great responsibility.",
// "image": "https://go.fission.app/json/5/image.jpg",
// "attributes": [
// {
// "trait_type": "Name",
// "value": "Reggie"
// },
// {
// "trait_type": "Backdrops",
// "value": "Lawn"
// },
// {
// "trait_type": "Left Arm",
// "value": "Cheese Plate"
// },
// {
// "trait_type": "Right Arm",
// "value": "Snap"
// },
// {
// "trait_type": "Collars",
// "value": "Blue Doge"
// },
// {
// "trait_type": "Eyes",
// "value": "Blitzed"
// },
// {
// "trait_type": "Accessories",
// "value": "Party"
// },
// {
// "trait_type": "Expressions",
// "value": "Ruh-roh"
// }
// ]
// }

// {
// "name": "Corgi from Block #1280",
// "description": "100% Purebred Crypto Corgi.\n  Attributes derived from block number 1280.\n  ",
// "image": "https://img.cryptocorgis.co/corgi/1280",
// "external_url": "https://cryptocorgis.co/corgis/1280",
// "properties": {
// "Base": "Thin Mint",
// "Mood": "Pleased",
// "Face": "Blue Shield Glasses",
// "Bottoms": "Jeans"
// }
// }
