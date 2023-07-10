import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { path } from "../../contant/path";

const useStyles = makeStyles((theme) => {
  return {
    header: {
      background: "#000000",
      position:"fixed",
      top:0,
      width:"100%"
    },
    root: {
      ...theme.custom?.flexBox.spaceBetweenCenter,
      width: "1200px",
      margin: "0 auto",
    },
    navLeft: {
      color: "#fff",
      cursor:"pointer"

    },
    navRight: {
      ...theme.custom?.flexBox.spaceBetweenCenter,
      width: "60%",
      color: "#fff",
      textTransform: "capitalize",
      fontWeight: 500,
    },
    navItem: {
      padding: "16px 0",
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
    <div id="header" className={classes.header}>
      <div className={classes.root}>
        <div className={classes.navLeft} onClick={() => onNavigate(path.home)}>Daily english</div>
        <div className={classes.navRight}>
          <div className={classes.navItem} onClick={() => onNavigate(path.home)}>home</div>
          <div className={classes.navItem} onClick={() => onNavigate(path.vocabularyCustom)}>tu vung tu chon</div>
          <div className={classes.navItem}>tu vung theo chu de</div>
          <div className={classes.navItem} onClick={() => onNavigate(path.userVocabulary)}>tu vung da hoc</div>
          <div className={classes.navItem} onClick={() => onNavigate(path.gameImageVocabulary)}>trò chơi</div>
        </div>
      </div>
    </div>
  );
};

export default Header;

