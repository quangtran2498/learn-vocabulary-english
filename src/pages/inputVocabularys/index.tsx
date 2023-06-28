import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import { FastField, FieldArray, Form, Formik } from "formik";
import { useNavigate, useOutletContext } from "react-router-dom";
import { TextField } from "../../components/common/form/inputField";
import { path } from "../../contant/path";
import { store } from "../../redux";
import { setDataVocabuleryCustom } from "../../redux/slice/vocabulery";
import { PropsOutLetI } from "../vocabularyCustom";

const useStyles = makeStyles((theme) => {
  return {
    rootPage: {
      display:"flex",
      justifyContent:"flex-end"
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
      height:"calc(100vh - 44px)",
      color:"#fff",
      position:"fixed",
      top:44
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

  const propsOutlet:PropsOutLetI = useOutletContext()
  const {highLightGuide,getPathUrl} = propsOutlet   
  
  return (
    <>
    <div className={classes.rootPage}>
      <div className={classes.navContent}>
        <Formik
          initialValues={genInitialValue()}
          onSubmit={() => {
            console.log("");
          }}
        >
          {(formik) => {

            const checkValueAllVocabulary = formik.values.answers.every((item) => item.vocabulary && item.mean)

            const nextPractive = () => {
              if(checkValueAllVocabulary) {
                getPathUrl(path.practive)
                navigate(path.practive);
                store.dispatch(setDataVocabuleryCustom(formik.values?.answers));
              } else {
                 alert("Bạn chưa điền hết thông tin")
              }
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
                          <div className={ highLightGuide === indexHighLightGuide.addInput ? "high-light-guide" : "" } ></div>
                        </div>
                      </div>
                      <div className={classes.rootHeader}>
                        <div
                          className={`${classes.widthIndex} ${classes.alignCnter}`}
                        >
                          <span className={classes.relative}>
                            Stt
                            <div className={ highLightGuide === indexHighLightGuide.index ? "high-light-guide" : "" } ></div>
                          </span>
                        </div>
                        <div className={`${classes.widthInput}`}>
                          <span className={classes.relative}>
                            Từ vựng
                            <div className={ highLightGuide === indexHighLightGuide.vocabulary ? "high-light-guide" : "" } ></div>
                          </span>
                        </div>
                        <div className={`${classes.widthInput}`}>
                          <span className={classes.relative}>
                            Nghĩa
                            <div className={ highLightGuide === indexHighLightGuide.mean ? "high-light-guide" : "" } ></div>
                          </span>
                        </div>
                        <div className={`${classes.widthRemove}`}>
                          <span className={classes.relative}>
                            Xóa
                            <div className={ highLightGuide === indexHighLightGuide.deleteInput ? "high-light-guide" : "" } ></div>
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
                                <div
                                  className={`${classes.widthIndex} ${classes.alignCnter}`}
                                >
                                  <div className={`${classes.rootNumber}`}>
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
                      <div className={`${classes.btn}`} onClick={nextPractive} style={checkValueAllVocabulary ? {opacity:1} : {opacity:0.5}}>
                        Bắt đầu luyện tập
                        <div
                          className={
                            highLightGuide === indexHighLightGuide.practive
                              ? "high-light-guide"
                              : ""
                          }
                        ></div>
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
    </>
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