import React from "react";
import { makeStyles } from "@mui/styles";
import { FastField, Form, Formik } from "formik";
import { TextField } from "../../../components/common/form/inputField";
import { useOutletContext } from "react-router-dom";
import { PropsOutLetI } from "../../vocabularyCustom";
import { colors } from "../../../colors";
import { sourceImages } from "../../../assets";
import PopupService from "../../../utils/popupService";
interface PropsOutlet extends PropsOutLetI {
  changeLanguage:string
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
      cursor:"pointer"
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

  const ramdomImageNumber = Math.floor(Math.random() * dataImage.length)
  const [indexQuestions, setIndexQuestions] = React.useState<number | null>( null );
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
  const propsOutlet:PropsOutlet = useOutletContext()
  const {changeLanguage} = propsOutlet   
  
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
         
         const checkAllValue =  data.every((item,index) => {
           return item[compare] === formik.values[index].mean
          })
          
          checkAllValue && console.log("quang test");
          
          
          return (
            <div className={classes.root}>
              <div className={classes.rootImage}>
                <img style={{ width: "100%" }} src={dataImage[randomNumber].url} alt="" />
                <div className={classes.rootVocabularys}>
                  <div className={classes.containerVocabularys}>
                  {data.map((vocabulary, index) => {

                    return (
                      <div
                        key={vocabulary.id}
                        className={`${classes.vocabularyItem} 
                        ${ data[index][compare] === formik.values[index].mean ? classes.hideItem : ""} 
                        ${ indexQuestions === index ? classes.highLightItem : "" }`}
                        onClick={() => onGetIndexQuestions(index)}
                      >
                        {data[index][compare] === formik.values[index].mean ? "" : vocabulary[lang]}
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

const data = [
  { id: 1, vocabulary: "me", mean: "toi" },
  { id: 2, vocabulary: "name", mean: "ten" },
  { id: 3, vocabulary: "age", mean: "tuoi" },
  { id: 4, vocabulary: "too", mean: "cung" },
  { id: 5, vocabulary: "good", mean: "tot" },
  { id: 6, vocabulary: "food", mean: "thuc an" },
  { id: 7, vocabulary: "eat", mean: "an" },
  { id: 8, vocabulary: "class", mean: "lop" },
  { id: 9, vocabulary: "like", mean: "thich" },
];

const dataImage = [
  {id:1,url:sourceImages.games.alasca},
  {id:2,url:sourceImages.games.disney},
  {id:3,url:sourceImages.games.doremon},
  {id:4,url:sourceImages.games.minecraft},
  {id:5,url:sourceImages.games.moon},
  {id:6,url:sourceImages.games.sevenUncle},
  {id:7,url:sourceImages.games.threeBear},
]