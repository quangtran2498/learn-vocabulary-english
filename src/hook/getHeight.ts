import React from "react";

const getHeightHeader = () => {
  const [height, setHeight] = React.useState<number | null>(null);

  React.useEffect(() => {
    const header = document.getElementById("header");
    const heightHeader = header?.clientHeight || null;
    setHeight(heightHeader)
  }, []);

  return height
};

export default getHeightHeader;
