import { makeStyles } from "@mui/styles";
import React from "react";
import Confetti from "react-confetti";
import ButtonCommon from "../common/button/index";
import { sourceImages } from "../../assets";
import PaperFireWork from "../paperFireworks";
import { useNavigate } from "react-router-dom";
import { path } from "../../contant/path";
interface PropsI {
  content?: React.ReactNode;
  open: boolean;
  onEvent?:() => void
}

const useStyles = makeStyles((theme) => {
  return {
    root: {
      position: "fixed",
      top: 0,
      width: "100%",
      background: "rgba(0,0,0,0.1)",
      height: "100vh",
      ...theme.custom?.flexBox.centerCenter,
    },
    content: {
      width: "400px",
      background: "#fff",
      padding: "16px",
      borderRadius: "16px",
    },
    textTitle: {
      textAlign: "center",
      textTransform: "capitalize",
    },
    rootIcon: {
      width: "40%",
      margin: "0 auto",
      marginBottom: "24px",
    },
  };
});

const CompletePractive = (props: PropsI) => {
  const { content, open,onEvent } = props;
  const classes = useStyles();
  const navigate = useNavigate()

  const backHome = () => {
    navigate(path.home);
  };
  return (
    <>
      {open && (
        <div className={classes.root}>
          <div className={classes.content}>
            <div className={classes.rootIcon}>
              <img
                style={{ width: "100%" }}
                src={sourceImages.icons.icon}
                alt=""
              />
            </div>
            <h4 className={classes.textTitle}>chúc mừng bạn đã hoàn thành</h4>
            <ButtonCommon onEvent={onEvent && onEvent || backHome}>ok</ButtonCommon>
          </div>
          <PaperFireWork />
        </div>
      )}
    </>
  );
};

export default CompletePractive;
