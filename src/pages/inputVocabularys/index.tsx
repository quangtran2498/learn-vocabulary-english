import React from 'react'
import { makeStyles } from "@mui/styles";
import { FastField, Form, Formik, FieldArray } from "formik";
import AddIcon from "@mui/icons-material/Add";
import { store } from "../../redux";
import { TextField } from "../../components/common/Form/input-field";
import { setDataVocabuleryCustom } from "../../redux/slice/vocabulery";
import { useNavigate } from "react-router-dom";
import { path } from "../../contant/path";
import Guide from "../../components/guide";
import InputVocabuary from "../../components/guide/children/inputVocabuary";

const useStyles = makeStyles((theme) => {
  return {
    rootPage: {
      display:"flex",
      justifyContent:"space-between"
    },
    input: {
    },
    textTitle: {
      marginRight: "30px",
    },
    btn: {
      padding: "10px 50px",
      background: "red",
      margin: "0 auto",
      marginTop: "30px",
      width: "fit-content",
      borderRadius: "16px",
      color: "#fff",
      position:"relative"
    },
    contianerCoupleInput: {},
    rootItemVocabulary: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    rootInput: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    rootNumber: {
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      border: "1px solid",
    },
    rootAdd: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "24px",
    },
    contentAdd: {
      width: "48px",
      height: "48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      border: "1px solid",
      position:"relative"
    },
    removeItem: {
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "4px",
      border: "1px solid",
    },
    rootHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    widthIndex: {
      width: "10%",
    },
    widthInput: {
      width: "35%",
    },
    widthRemove: {
      width: "10%",
    },
    navGuide:{
      background: "#000000",
      padding:"24px 24px 0px 24px",
      width:"calc(20% - 48px)",
      height:"calc(100vh - 44px - 20px)",
      color:"#fff"
    },
    navContent:{
      width:"75%",
      marginTop: "30px",
      paddingRight:"24px"
    },
    highLightGuide:{
      padding:"20px",
      border:"1px solid red",
      borderRadius:"50%"
    },
    alignCnter:{
      display:"flex",
      justifyContent:"center"
    },
    fitContent:{
      width:""
    },
    relative:{
      position:"relative"
    }
  };
});

const InputVocabulary = () => {

  const [highLightGuide, setHighLightGuide] = React.useState(0)
  
  const vocabuleryNumber = store.getState().learnVocabulery.vocabuleryNumber || 5;
  const navigate = useNavigate()
  const classes = useStyles();

  const genInitialValue = () => {
    const inputVocabulary = {
      vocabulary: "",
      mean: "",
    };

    const answers = [];
    
    for (let i = 0; i < vocabuleryNumber; i++) {
      answers.push(inputVocabulary);
    }
    return { answers };
  };

  const getHighLightGuide = (index:number) => {
    setHighLightGuide(index)
  }

  return (
    <div className={classes.rootPage}>
      <div className={classes.navGuide}>
         <Guide>
           <InputVocabuary getHighLightGuide={getHighLightGuide} highLightGuide={highLightGuide}/>
         </Guide>
      </div>
      <div className={classes.navContent}>
      <Formik initialValues={genInitialValue()} onSubmit={() => {console.log("");
      }}>
        {(formik) => {
        //   console.log(formik.values, "34543543");
          const nextPractive = () => {
            navigate(path.practive)
            store.dispatch(setDataVocabuleryCustom(formik.values?.answers));
          };

          return (
            <Form>
              <FieldArray
                name="answers"
                render={({ push, remove }) => (
                  <div className="">
                    <div
                      className={classes.rootAdd}
                      onClick={() => push({ vocabulary: "", mean: "" })}
                    >
                      <div className={`${classes.contentAdd}`}>
                        <AddIcon sx={{ fontSize: "30px" }} />
                        <div className={highLightGuide===indexHighLightGuide.addInput ? "high-light-guide" : ""}></div>
                      </div>
                    </div>
                    <div className={classes.rootHeader}>
                      <div className={`${classes.widthIndex} ${classes.alignCnter}`}>
                      <span className={classes.relative}>
                        Stt
                        <div className={highLightGuide===indexHighLightGuide.index ? "high-light-guide" : ""}></div>
                        </span>
                        </div>
                      <div className={`${classes.widthInput}`}>
                      <span className={classes.relative}>
                      Từ vựng
                        <div className={highLightGuide===indexHighLightGuide.vocabulary ? "high-light-guide" : ""}></div>
                        </span>
                        </div>
                      <div className={`${classes.widthInput}`}>
                      <span className={classes.relative}>
                        Nghĩa
                        <div className={highLightGuide===indexHighLightGuide.mean ? "high-light-guide" : ""}></div>
                        </span>
                        </div>
                      <div className={`${classes.widthRemove}`}>
                        <span className={classes.relative}>
                        Xóa
                        <div className={highLightGuide===indexHighLightGuide.deleteInput ? "high-light-guide" : ""}></div>
                        </span>
                      </div>
                    </div>
                    <div className={classes.contianerCoupleInput}>
                      {Array(formik.values.answers.length)
                        .fill(0)
                        .map((item, index) => {
                          return (
                            <div
                              key={index}
                              className={classes.rootItemVocabulary}
                            >
                             
                              <div className={`${classes.widthIndex} ${classes.alignCnter}`}>
                              <div
                                className={`${classes.rootNumber}`}
                              >
                                {index}
                              </div>
                              </div>
                              <div
                                className={`${classes.input} ${classes.widthInput}`}
                              >
                                <div>
                                  <FastField
                                    component={TextField}
                                    placeholder="dien vao day"
                                    {...formik.getFieldProps(
                                      `answers[${index}].vocabulary`
                                    )}
                                  />
                                </div>
                              </div>
                              <div
                                className={`${classes.input} ${classes.widthInput}`}
                              >
                                <div>
                                  <FastField
                                    component={TextField}
                                    placeholder="dien vao day"
                                    {...formik.getFieldProps(
                                      `answers[${index}].mean`
                                    )}
                                  />
                                </div>
                              </div>
                              <div className={classes.widthRemove}>
                              <div
                                className={classes.removeItem}
                                onClick={() => remove(index)}
                              >
                                x
                              </div>

                              </div>
                            </div>
                          );
                        })}
                    </div>
                    <div className={`${classes.btn}`} onClick={nextPractive}>
                      submit
                      <div className={highLightGuide===indexHighLightGuide.practive ? "high-light-guide" : ""}></div>
                    </div>
                  </div>
                )}
              />
            </Form>
          );
        }}
      </Formik>

      </div>
    </div>
  );
};

export default InputVocabulary;

const indexHighLightGuide = {
  addInput:1,
  deleteInput:2,
  index:3,
  vocabulary:4,
  mean:5,
  practive:6
}