import React from "react";
import CloseIcon from "../../assets/icons/close";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { path } from "../../contant/path";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "flex-end",
      paddingTop:"40px",
      paddingRight:"40px"
    },
    item:{
        width:"fit-content",
        transform: "scale(1.5)",
        cursor:"pointer"
    }
  };
});
const ClosePage = () => {
  const navigate= useNavigate()
  const classes = useStyles();
  const onClosePage = () => {
    navigate(path.home)
  }
  return (
    <div className={classes.root}>
      <div className={classes.item} onClick={onClosePage}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default ClosePage;
