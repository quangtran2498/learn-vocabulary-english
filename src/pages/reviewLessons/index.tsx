import React, { useEffect } from "react";
import { Language, ItemLocalstorage, TypeMean } from "../../contant/enums";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import { FastField, Form, Formik } from "formik";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { TextField } from "../../components/common/form/inputField";
import { isEmpty } from "lodash";
import { VocabularysI } from "../../types/vocabularys";
import ClosePage from "../../components/closePage";
import ButtonCommon from "../../components/common/button";
import { useNavigate } from "react-router-dom";
import { path } from "../../contant/path";
import CompletePractive from "../../components/completePractive";
import audio from "../../assets/audio/audio-complete.wav";

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

const ReviewLessons = () => {

  const [isShowCompletePractive, setIsShowCompletePractive] = React.useState<boolean>(false);
  const [focusInput, setFocusInput] = React.useState<number>();
  const audioElement:any = React.useRef<any>(null)
  
  const vocaburatys = JSON.parse(
    localStorage.getItem(ItemLocalstorage.vocabularys) || ""
  );

  const data: VocabularysI[] = !isEmpty(vocaburatys) ? vocaburatys : dataTest;

  const findVocabularysYesterday = data.filter((item: VocabularysI) => {
    return moment(item.date).isSame(moment().subtract(1, "day"), "day"); //! thay 0 thanh 1
  });

  const checkData = !isEmpty(findVocabularysYesterday) ? findVocabularysYesterday : dataTest;

  const [changeDirection, setChangeDirection] = React.useState<Language>( Language.vn );
  const [dataVocabularys, setDataVocabularys] = React.useState<VocabularysI[]>(checkData);

  const [showAnswer, setShowAnswer] = React.useState<number | null>(null);

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
  };

  const handlePlayAudio = () => {
    audioElement.current.play()
  };

  const getFocusInput = (index:number) => {
    setFocusInput(index)
  }

  return (
    <>
      <div>
        <ClosePage />
      </div>
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

              const playAudio = React.useCallback(() => {
                // console.log(focusInput && dataVocabularys[focusInput][compare] === formik.values[focusInput]?.mean,"24234234");
                
                focusInput ? dataVocabularys[focusInput][compare] === formik.values[focusInput]?.mean && handlePlayAudio() : null
              },[formik.values[focusInput && focusInput || 0].mean])

              playAudio()
                      
              return (
                <Form>
                  <div className="" style={{ padding: "20px" }}>
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
                              // onClick={() => getFocusInput(index)}
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
                                  placeholder=""
                                  label=""
                                  {...formik.getFieldProps(`[${index}].mean`)}
                                  onClick={() => getFocusInput(index)}
                                />
                                <div
                                  className=""
                                  style={{ marginLeft: "20px" }}
                                >
                                  {checkValue(index) ? ( <CheckIcon sx={{ color: "green" }} /> ) : ( <CloseIcon sx={{ color: "red" }} /> )}
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
                                      {showAnswer === index ? ( <VisibilityOffIcon /> ) : ( <VisibilityIcon /> )}
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
                      onEvent={showCompletePractive}
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
      <CompletePractive open={isShowCompletePractive} />
      <audio src={audio} controls ref={audioElement}></audio>
    </>
  );
};

export default ReviewLessons;

const dataTest = [
  { userId: 328, vocabulary: "name", mean: "ten", date: "2023-07-08" },
  { userId: 328, vocabulary: "age", mean: "tuoi", date: "2023-07-06" },
];
