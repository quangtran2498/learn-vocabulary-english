import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { makeStyles } from "@mui/styles";
import { FastField, Form, Formik } from "formik";
import React from "react";
import { TextField } from "../../components/common/form/inputField";
import { store } from "../../redux";
import ButtonCommon from "../../components/common/button";
import { Language, TypeMean } from "../../contant/enums";
import { useNavigate } from "react-router-dom";
import { path } from "../../contant/path";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "flex-end",
    },
    rootContent: {
      width: "75%",
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
    rootBtn: {
      ...theme.custom?.flexBox.centerCenter,
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
  
  const navigate = useNavigate()
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

  const hanldeShowAnswer = (index: number) => {
    showAnswer === index ? setShowAnswer(null) : setShowAnswer(index);
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
              const newArrVocabulary = [...dataVocabularys].sort( () => Math.random() - 0.5 );
              setDataVocabularys(newArrVocabulary);
              changeDirection === Language.vn ? setChangeDirection(Language.en) : setChangeDirection(Language.vn);
              formik.handleReset();
            };
            
            const backHome = () => {
               navigate(path.home)
            }

            const lang = changeDirection === Language.vn ? TypeMean.vocabulary : TypeMean.mean;
            const compare = lang === TypeMean.vocabulary ? TypeMean.mean : TypeMean.vocabulary;

            const checkValue = (index: number) => {
              return (
                dataVocabularys[index][compare] === formik.values[index]?.mean
              );
            };

            const checkAllValue = dataVocabularys.every((item, index) => {
              return item[compare] === formik.values[index].mean;
            });

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
                              {dataVocabularys[index][lang]}
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
                                      {dataVocabularys[index][compare]}
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
                  <ButtonCommon
                    className={classes.btn}
                    onEvent={hanldeChangeDirection}
                    style={{ marginRight: "10px" }}
                    disable={checkAllValue ? false : true}
                  >
                    Đổi chiều
                  </ButtonCommon>
                  <ButtonCommon
                    className={classes.btn}
                    onEvent={backHome}
                    disable={checkAllValue ? false : true}
                  >
                    Hoàn thành
                  </ButtonCommon>
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
