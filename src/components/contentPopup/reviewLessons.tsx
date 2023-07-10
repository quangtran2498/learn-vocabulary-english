import React from "react";
import ButtonCommon from "../common/button/index";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { path } from "../../contant/path";
import PopupService from "../../utils/popupService";

const useStyles = makeStyles((theme) => {
  return {
    rootBtn: {
      ...theme.custom?.flexBox.spaceBetweenCenter,
    },
    btn: {
      width: "48%",
    },
    textDesc: {
      textAlign: "center",
    },
  };
});

const ReviewLessonsPopup = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const onReviewLessons = () => {    
    navigate(path.reviewLessons);
    PopupService.instance.current.close()
  };
  const onClosePopup = () => {
    PopupService.instance.current.close()
  };
  
  return (
    <div>
      <p className={classes.textDesc}>
        Bạn có muốn ôn lại bài cũ hôm qua không
      </p>
      <div className={classes.rootBtn}>
        <ButtonCommon onEvent={onReviewLessons} halfWidth>
          có
        </ButtonCommon>
        <ButtonCommon onEvent={onClosePopup} halfWidth>
          không
        </ButtonCommon>
      </div>
    </div>
  );
};

export default ReviewLessonsPopup;
