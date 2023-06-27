import { makeStyles } from "@mui/styles";
import React from "react";

interface PropsI {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "1200px",
      margin: "0 auto",
    },
  };
});

const ContianerPage = ({ children }: PropsI) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>;
};

export default ContianerPage;
