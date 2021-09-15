export default function ImageTable({ nftData }) {
  console.log("hello hello", nftData);

  //// NEED TO FIND THE KEY FOR IMAGE???? MAYBE LATER PART

  const renderContent = () => {
    if (nftData.length > 0) {
      nftData.map((data) => {
        console.log(Object.values(data));
      });
      return <h1>hello</h1>;
    }
    return null;
  };
  return (
    <div style={{ marginTop: 20 }}>
      {nftData?.map((nft, index) => {
        return (
          <img key={index} src={nft.image} alt={nft.description} width="100" />
        );
      })}
      {/* {renderContent()} */}
    </div>
  );
}
