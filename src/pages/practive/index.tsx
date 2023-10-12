import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { makeStyles } from "@mui/styles";
import { FastField, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { audio } from "../../assets";
import ButtonCommon from "../../components/common/button";
import { TextField } from "../../components/common/form/inputField";
import CompletePractive from "../../components/completePractive";
import { Language, TypeMean } from "../../contant/enums";
import { store } from "../../redux";
import BtnLearnAgian from "../../components/btnLearnSelect";

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
  const [focusInput, setFocusInput] = React.useState<number>(0);
  const audioElement: any = React.useRef<any>(null);
  const [didComplete, setDidComplete] = React.useState<number[]>([]);
  const [isShowCompletePractive, setIsShowCompletePractive] = React.useState<boolean>(false);
  const audioCelebrationElement = React.useRef<HTMLAudioElement | null>(null);
  const [vocabularysLearnAgian, setVocabularyLearnAgian] = React.useState<{ mean: string; vocabulary: string }[]>([]);

  const navigate = useNavigate();
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

  const showCompletePractive = () => {
    setIsShowCompletePractive(true);
    audioCelebrationElement.current && audioCelebrationElement.current.play();
  };

  const onVocabularyLearnAgian = (vocabulary: { mean: string; vocabulary: string }) => {
    setVocabularyLearnAgian([...vocabularysLearnAgian, vocabulary]);
  };

  return (
    <div className={classes.root}>
      <div className={classes.rootContent}>
        <Formik
          initialValues={genInitialValue().answers}
          enableReinitialize
          onSubmit={() => {
            console.log("");
          }}
        >
          {(formik) => {
            const hanldeChangeDirection = () => {
              const newArrVocabulary = [...dataVocabularys].sort(() => Math.random() - 0.5);
              setDataVocabularys(newArrVocabulary);
              changeDirection === Language.vn ? setChangeDirection(Language.en) : setChangeDirection(Language.vn);
              formik.handleReset();
              setDidComplete([]);
            };

            const lang = changeDirection === Language.vn ? TypeMean.vocabulary : TypeMean.mean;
            const compare = lang === TypeMean.vocabulary ? TypeMean.mean : TypeMean.vocabulary;

            const checkValue = (index: number) => {
              return dataVocabularys[index][compare] === formik.values[index]?.mean;
            };

            const checkAllValue = dataVocabularys.every((item, index) => {
              return item[compare] === formik.values[index].mean;
            });

            if (didComplete.includes(focusInput)) {
            } else {
              if (dataVocabularys[focusInput][compare] === formik.values[focusInput].mean) {
                audioElement.current.play();
                setDidComplete([...didComplete, focusInput]);
              }
            }

            const showLearnAgian = () => {
              setDataVocabularys(vocabularysLearnAgian);
              setVocabularyLearnAgian([]);
              formik.handleReset();
            };

            return (
              <Form>
                <div className="" style={{ padding: "20px" }}>
                  <BtnLearnAgian amount={vocabularysLearnAgian.length} showLearnAgian={showLearnAgian} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
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
                              width: "50%",
                            }}
                          >
                            <div className="" style={{ marginRight: "30px" }}>
                              {dataVocabularys[index][lang]}
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <FastField
                                component={TextField}
                                placeholder=""
                                label=""
                                {...formik.getFieldProps(`[${index}].mean`)}
                                onClick={() => setFocusInput(index)}
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
                                  <div
                                    className=""
                                    style={{ marginRight: "5px", cursor: "pointer" }}
                                    onClick={() => hanldeShowAnswer(index)}
                                  >
                                    {showAnswer === index ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                  </div>
                                  {showAnswer === index && <div className="">{dataVocabularys[index][compare]}</div>}
                                </div>
                                <div
                                  className=""
                                  onClick={() => {
                                    onVocabularyLearnAgian({
                                      mean: dataVocabularys[index].mean,
                                      vocabulary: dataVocabularys[index].vocabulary,
                                    });
                                  }}
                                  style={{ cursor: "pointer" }}
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
                  <ButtonCommon className={classes.btn} onEvent={showCompletePractive} disable={checkAllValue ? false : true}>
                    Hoàn thành
                  </ButtonCommon>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <CompletePractive open={isShowCompletePractive} />
      <audio src={audio.success} hidden ref={audioElement}></audio>
      <audio src={audio.celebration} hidden ref={audioCelebrationElement}></audio>
    </div>
  );
};

export default PractiveInputVocabularys;
