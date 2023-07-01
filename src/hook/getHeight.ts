import React from "react";
import { store } from "../redux";
import { setHeightHeader } from "../redux/slice/varCss";

const getHeightHeader = () => {
  const [height, setHeight] = React.useState<number | null>(null);

  React.useEffect(() => {
    const header = document.getElementById("header");
    const heightHeader = header?.clientHeight || null;
    setHeight(heightHeader)
    store.dispatch(setHeightHeader(heightHeader || 0))
  }, []);

  return height
};

export default getHeightHeader;
