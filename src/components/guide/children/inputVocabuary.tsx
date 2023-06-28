import React from "react";
import { makeStyles } from "@mui/styles";
import { useOutletContext } from "react-router-dom";

interface PropsI {
  getHighLightGuide?: (index: number) => void;
  highLightGuide?: number;
}

const useStyles = makeStyles((theme) => {
  return {
    guideTitle: {
      fontSize: "20px",
    },
    ul: {
      paddingLeft: "20px",
      lineHeight: "36px",
    },
    highLight: {
      color: "red",
    },
  };
});

const InputVocabuary = ({ highLightGuide, getHighLightGuide }: PropsI) => {
  const classes = useStyles();   
  return (
    <div>
      <div className={classes.guideTitle}>Hướng dẫn</div>
      <ul className={classes.ul}>
        {data.map((item) => {
          return (
            <li
              key={item.id}
              className={`${
                item.id === highLightGuide ? classes.highLight : ""
              }`}
              onMouseOver={() => getHighLightGuide && getHighLightGuide(item.id)}
              onMouseOut={() => getHighLightGuide && getHighLightGuide(0)}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InputVocabuary;

const data = [
  { id: 1, title: "Thêm từ vựng" },
  { id: 2, title: "Xóa từ vựng" },
  { id: 3, title: "Số thứ tự" },
  { id: 4, title: "Từ vựng" },
  { id: 5, title: "Nghĩa của từ vựng" },
  { id: 6, title: "Bắt đầu luyện tập" },
];
