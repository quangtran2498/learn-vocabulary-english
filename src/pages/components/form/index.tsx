import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FastField, Form, Formik } from "formik";
import ButtonCommon from "../../../components/common/button";
import BtnLearnAgian from "../../../components/btnLearnSelect";
import { TextField } from "../../../components/common/form/inputField";
import { makeStyles } from "@mui/styles";
import { VocabularysI } from "../../../types/vocabularys";
import { Language, TypeMean } from "../../../contant/enums";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
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

interface IProps {
  initialValue: any;
  dataVocabularys: VocabularysI[] | { mean: string; vocabulary: string }[];
  onUpdateVocabularys: (vocabularys: VocabularysI[]) => void;
}

const FormQuestion = (props: IProps) => {
  const [changeDirection, setChangeDirection] = React.useState<Language>(Language.vn);
  const [didComplete, setDidComplete] = React.useState<number[]>([]);
  const [vocabularysLearnAgian, setVocabularyLearnAgian] = React.useState<VocabularysI[] | { mean: string; vocabulary: string }[] | any>(
    []
  );
  const [focusInput, setFocusInput] = React.useState<number>(0);
  const [showAnswer, setShowAnswer] = React.useState<number | null>(null);

  const { initialValue, dataVocabularys, onUpdateVocabularys } = props;
  const classes = useStyles();
  const hanldeShowAnswer = (index: number) => {
    showAnswer === index ? setShowAnswer(null) : setShowAnswer(index);
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValue}
        onSubmit={() => {
          console.log("");
        }}
      >
        {(formik) => {
          // console.log(formik.values, "12345");

          const hanldeChangeDirection = () => {
            const newArrVocabulary: any = [...dataVocabularys].sort(() => Math.random() - 0.5);
            onUpdateVocabularys(newArrVocabulary);
            changeDirection === Language.vn ? setChangeDirection(Language.en) : setChangeDirection(Language.vn);
            formik.handleReset();
            setDidComplete([]);
          };

          const lang = changeDirection === Language.vn ? TypeMean.vocabulary : TypeMean.mean;
          const compare = lang === TypeMean.vocabulary ? TypeMean.mean : TypeMean.vocabulary;

          const checkValue = (index: number) => {
            return dataVocabularys[index][compare] === formik.values[index]?.mean;
          };

          //   if (checkValue(focusInput)) {
          //     const elementInput: any = document.querySelectorAll(".MuiInputBase-input");
          //     elementInput[focusInput + 1].focus();
          //   }

          const checkAllValue = dataVocabularys.every((item, index) => {
            return item[compare] === formik.values[index]?.mean;
          });

          if (didComplete.includes(focusInput)) {
          } else {
            if (dataVocabularys[focusInput][compare] === formik.values[focusInput]?.mean) {
              //   handlePlayAudio();
              setDidComplete([...didComplete, focusInput]);
            }
          }

          const onVocabularyLearnAgian = (vocabulary: { mean: string; vocabulary: string }) => {
            setVocabularyLearnAgian([...vocabularysLearnAgian, vocabulary]);
          };

          const showLearnAgian = () => {
            onUpdateVocabularys(vocabularysLearnAgian);
            setVocabularyLearnAgian([]);
            formik.resetForm();
          };

          return (
            <Form>
              <div className="" style={{ padding: "20px" }}>
                <BtnLearnAgian amount={vocabularysLearnAgian.length} showLearnAgian={showLearnAgian} />
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {Array(dataVocabularys.length)
                    .fill(0)
                    .map((item, index) => {
                      return (
                        <div
                          key={index}
                          className=""
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "48%",
                          }}
                        >
                          <div className="" style={{ marginRight: "30px" }}>
                            {dataVocabularys[index][lang]}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FastField
                              component={TextField}
                              className={"input-question"}
                              placeholder=""
                              label=""
                              {...formik.getFieldProps(`[${index}].mean`)}
                              onClick={() => setFocusInput(index)}
                              disabled={dataVocabularys[index][compare] === formik.values[index]?.mean}
                            />
                            <div className="" style={{ marginLeft: "20px" }}>
                              {checkValue(index) ? <CheckIcon sx={{ color: "green" }} /> : <CloseIcon sx={{ color: "red" }} />}
                              <div
                                className=""
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div className="" style={{ marginRight: "5px" }} onClick={() => hanldeShowAnswer(index)}>
                                  {showAnswer === index ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </div>
                                {showAnswer === index && <div className="">{dataVocabularys[index][compare]}</div>}
                              </div>
                              <div
                                className=""
                                onClick={() => {
                                  onVocabularyLearnAgian({
                                    mean: dataVocabularys[index]?.mean,
                                    vocabulary: dataVocabularys[index]?.vocabulary,
                                  });
                                }}
                              >
                                học lại
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
                <ButtonCommon className={classes.btn} disable={checkAllValue ? false : true}>
                  Hoàn thành
                </ButtonCommon>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormQuestion;
