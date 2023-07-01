import React from "react";
import { makeStyles } from "@mui/styles";
// import { suorceIcon } from '../../../assets/icon/index';
//! type
interface PropsI {
  onClose?: () => void;
}

const useStyles = makeStyles((theme) => {
  return {
    styleDefault: {
      display: "flex",
      justifyContent: "flex-end",
    },
  };
});
const HeaderCloseModal = ({ onClose }: PropsI) => {
  const classes = useStyles();
  return (
    <div onClick={onClose} className={classes.styleDefault}>
      x
    </div>
  );
};

export default HeaderCloseModal;
