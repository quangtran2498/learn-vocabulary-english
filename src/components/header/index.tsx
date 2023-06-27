import React from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { path } from "../../contant/path";
const useStyles = makeStyles((theme) => {
  return {
    header: {
      background: "#000000",
    },
    root: {
      ...theme.custom?.flexBox.spaceBetweenCenter,
      width: "1200px",
      margin: "0 auto",
    },
    navLeft: {
      color: "#fff",
    },
    navRight: {
      ...theme.custom?.flexBox.spaceBetweenCenter,
      width: "60%",
      color: "#fff",
      textTransform: "capitalize",
      fontWeight: 500,
    },
    navItem: {
      padding: "10px 0",
      cursor:"pointer"
    },
  };
});


const Header = () => {

  const classes = useStyles();
  const navigate = useNavigate()
  const onNavigate = (path:string) => {
    navigate(path)
  }
  
  return (
    <div className={classes.header}>
      <div className={classes.root}>
        <div className={classes.navLeft}>Daily english</div>
        <div className={classes.navRight}>
          <div className={classes.navItem} onClick={() => onNavigate(path.home)}>home</div>
          <div className={classes.navItem} onClick={() => onNavigate(path.inputVocabulary)}>tu vung tu chon</div>
          <div className={classes.navItem} onClick={() => onNavigate(path.practive)}>tu vung theo chu de</div>
          <div className={classes.navItem}>tu vung da hoc</div>
        </div>
      </div>
    </div>
  );
};

export default Header;

