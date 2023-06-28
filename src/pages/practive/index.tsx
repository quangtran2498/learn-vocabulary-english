
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { makeStyles } from "@mui/styles";
import { FastField, Form, Formik } from "formik";
import React from "react";
import { TextField } from "../../components/common/form/inputField";
import { store } from "../../redux";

const useStyles = makeStyles((theme) => {
  return {
    root:{
       display:"flex",
       justifyContent:"flex-end"
    },
    rootContent:{
      width:"75%"
    },
    test: {
      color: theme.custom?.text.pinkSubTitle,
    },
    input: {
      width: "48%",
    },
    textTitle: {
      marginRight: "30px",
    },
    rootBtn:{
      ...theme.custom?.flexBox.centerCenter
    },
    btn: {
      padding: "10px 50px",
      background: "red",
      marginTop: "30px",
      width: "fit-content",
      borderRadius: "16px",
      color: "#fff",
    },
    contianerCoupleInput: {
      padding: "20px",
    },
  };
});

const PractiveInputVocabularys = () => {
  const dataVocablary = store.getState().learnVocabulery.dataVocabuleryCustom;
  
  const [changeDirection, setChangeDirection] = React.useState("vn");
  const [dataVocabularys, setDataVocabularys] = React.useState(dataVocablary);
  
  const [showAnswer, setShowAnswer] = React.useState<number | null>(null);

  const classes = useStyles();

  const genInitialValue = () => {

    const inputVocabulary = {
      mean: "",
    };

    const answers = [];

    for (let i = 0; i < dataVocabularys.length; i++) {
      answers.push(inputVocabulary);
    }
    return { answers };
  };

  const hanldeShowAnswer = (index:number) => {
    showAnswer === index ? setShowAnswer(null) : setShowAnswer(index)
  };

  return (
    <div className={classes.root}>
      <div className={classes.rootContent}>
        <Formik
          initialValues={genInitialValue().answers}
          onSubmit={() => {
            console.log("");
          }}
        >
          {(formik) => {
            const hanldeChangeDirection = () => {
              const newArrVocabulary = [...dataVocabularys].sort(
                () => Math.random() - 0.5
              );

              setDataVocabularys(newArrVocabulary);
              changeDirection === "vn"
                ? setChangeDirection("en")
                : setChangeDirection("vn");
              formik.handleReset();
            };

            const checkValue = (index: number) => {
              if (changeDirection === "vn") {
                return dataVocabularys[index]?.vocabulary ===
                  formik.values[index]?.mean
                  ? true
                  : false;
              } else {
                return dataVocabularys[index]?.mean ===
                  formik.values[index]?.mean
                  ? true
                  : false;
              }
            };

            return (
              <Form>
                <div className="" style={{ padding: "20px" }}>
                  <div>
                    {Array(dataVocabularys.length)
                      .fill(0)
                      .map((item, index) => {
                        return (
                          <div
                            key={index}
                            className=""
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div className="" style={{ marginRight: "30px" }}>
                              {changeDirection === "vn"
                                ? dataVocabularys[index]?.mean
                                : dataVocabularys[index]?.vocabulary}
                            </div>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <FastField
                                component={TextField}
                                placeholder=""
                                label=""
                                {...formik.getFieldProps(`[${index}].mean`)}
                              />
                              <div className="" style={{ marginLeft: "20px" }}>
                                {checkValue(index) ? (
                                  <CheckIcon sx={{ color: "green" }} />
                                ) : (
                                  <CloseIcon sx={{ color: "red" }} />
                                )}
                                <div
                                  className=""
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    className=""
                                    style={{ marginRight: "5px" }}
                                    onClick={() => hanldeShowAnswer(index)}
                                  >
                                    {showAnswer === index ? (
                                      <VisibilityOffIcon />
                                    ) : (
                                      <VisibilityIcon />
                                    )}
                                  </div>
                                  {showAnswer === index && (
                                    <div className="">
                                      {changeDirection === "vn"
                                        ? dataVocabularys[index].vocabulary
                                        : dataVocabularys[index].mean}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className={classes.rootBtn}>
                  <div
                    className={classes.btn}
                    style={{ marginRight: "10px" }}
                    onClick={hanldeChangeDirection}
                  >
                    Đổi chiều
                  </div>
                  <div className={classes.btn} onClick={hanldeChangeDirection}>
                    Hoàn thành
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default PractiveInputVocabularys;
