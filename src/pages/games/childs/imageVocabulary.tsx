import React from "react";
import { makeStyles } from "@mui/styles";
import { FastField, Form, Formik } from "formik";
import { TextField } from "../../../components/common/form/inputField";
import { useOutletContext } from "react-router-dom";
import { PropsOutLetI } from "../../vocabularyCustom";
import { colors } from "../../../colors";
import { sourceImages } from "../../../assets";
import PopupService from "../../../utils/popupService";
import { ItemLocalstorage } from "../../../contant/enums";
import { VocabularysI } from "../../../types/vocabularys";
import { isEmpty } from "lodash";
interface PropsOutlet extends PropsOutLetI {
  changeLanguage:string
  dataVocabularys:VocabularysI[]
}

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    rootImage: {
      width: "75%",
      position: "relative",
      maxWidth:"700px",
      margin:"0 auto"
    },
    rootVocabularys: {
      position: "absolute",
      top: 0,
      width: "100%",
      height: "calc(100% - 5px)",
    },
    containerVocabularys:{
        display: "grid",
        gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
        height:"100%",
        gap:10
    },
    vocabularyItem: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#fff",
      opacity: 0.9,
      fontSize: "24px",
      fontWeight: 600,
      cursor:"pointer",
      textAlign:"center"
    },
    rootInput: {
      display: "flex",
      justifyContent: "center",
      background: colors.greenMain,
      padding:"16px 32px 16px 32px",
      width:"fit-content",
      margin:"0 auto",
      borderRadius:"12px"
    },
    input: {
      maxWidth: "500px",
      width: "400px",
    },
    hideItem: {
      background: "none !important",
    },
    highLightItem: {
        background:colors.greenMain,
      color:"#fff"

    },
  };
});
const ImageVocabulary = () => {
  
  const propsOutlet:PropsOutlet = useOutletContext()
  const {changeLanguage,dataVocabularys} = propsOutlet   

  const ramdomImageNumber = Math.floor(Math.random() * dataImage.length)
  const [indexQuestions, setIndexQuestions] = React.useState<number | null>(null);
  const [randomNumber, setRandomNumber] = React.useState(ramdomImageNumber)
  
  const classes = useStyles();
  const initialValue = [
    { mean: "" },
    { mean: "" },
    { mean: "" },
    { mean: "" },
    { mean: "" },
    { mean: "" },
    { mean: "" },
    { mean: "" },
    { mean: "" },
  ];
  
  const lang = changeLanguage === "vn" ? "vocabulary" : "mean"
  const compare = lang === "vocabulary" ? "mean" : "vocabulary"
  
  const onGetIndexQuestions = (index: number) => {
    setIndexQuestions(index);
    const inputElement:any = document.querySelector(".MuiInputBase-input")
    inputElement.focus()
  };

  return (
    <div style={{ height: "calc(100% - 70px)" }}>
      <Formik initialValues={initialValue} onSubmit={(value) => {}}>
        {(formik) => {
         
         const checkAllValue =  dataVocabularys.every((item,index) => {
           return item[compare] === formik.values[index].mean
          })
          
          checkAllValue && console.log("quang test");  
          
          return (
            <div className={classes.root}>
              <div className={classes.rootImage}>
                <img style={{ width: "100%" }} src={dataImage[randomNumber].url} alt="" />
                <div className={classes.rootVocabularys}>
                  <div className={classes.containerVocabularys}>
                  {dataVocabularys.map((vocabulary, index) => {
                    return (
                      <div
                        key={vocabulary.userId}
                        className={`${classes.vocabularyItem} 
                        ${dataVocabularys[index][compare] === formik.values[index].mean ? classes.hideItem : ""} 
                        ${indexQuestions === index ? classes.highLightItem : "" }`}
                        onClick={() => onGetIndexQuestions(index)}
                      >
                        {dataVocabularys[index][compare] === formik.values[index].mean ? "" : vocabulary[lang]}
                      </div>
                    );
                  })}

                  </div>
                </div>
              </div>

              <div className={classes.rootInput}>
                <div className={classes.input}>
                  <FastField
                    component={TextField}
                    placeholder=""
                    label=""
                    {...formik.getFieldProps(`[${indexQuestions}].mean`)}
                  />
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default ImageVocabulary;

const dataImage = [
  {id:1,url:sourceImages.games.alasca},
  {id:2,url:sourceImages.games.disney},
  {id:3,url:sourceImages.games.doremon},
  {id:4,url:sourceImages.games.minecraft},
  {id:5,url:sourceImages.games.moon},
  {id:6,url:sourceImages.games.sevenUncle},
  {id:7,url:sourceImages.games.threeBear},
]