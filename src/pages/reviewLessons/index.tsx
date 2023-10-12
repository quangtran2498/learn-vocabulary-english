import { makeStyles } from "@mui/styles";
import { isEmpty } from "lodash";
import moment from "moment";
import React from "react";
import { audio } from "../../assets";
import ClosePage from "../../components/closePage";
// import CompletePractive from "../../components/completePractive";
import { ItemLocalstorage } from "../../contant/enums";
import { VocabularysI } from "../../types/vocabularys";
import FormQuestion from "../components/form";

const useStyles = makeStyles(() => {
  return {
    root: {
      display: "flex",
      justifyContent: "flex-end",
    },
    rootContent: {
      width: "75%",
    },
    catalog: {
      padding: "8px 16px",
      borderRadius: "20px",
      cursor: "pointer",
      marginRight: "8px",
      border: "1px solid #ccc",
    },
    itemSelectRange: {
      padding: "4px 10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };
});

const ReviewLessons = () => {
  const vocaburatysLocal = JSON.parse(localStorage.getItem(ItemLocalstorage.vocabularys) || "");
  const data: VocabularysI[] = !isEmpty(vocaburatysLocal) ? vocaburatysLocal : dataTest;
  const findVocabularysYesterday = data.filter((item: VocabularysI) => {
    return moment(item.date).isSame(moment().subtract(1, "day"), "day"); //! thay 0 thanh 1
  });

  const checkData = () => {
    if (!isEmpty(findVocabularysYesterday)) {
      return findVocabularysYesterday;
    } else if (!isEmpty(vocaburatysLocal)) {
      return vocaburatysLocal.splice(0, 10);
    } else {
      return dataTest;
    }
  };

  // const [isShowCompletePractive, setIsShowCompletePractive] = React.useState<boolean>(false);
  const [catalog, setCatalog] = React.useState<"last" | "part">("last");
  const [dataVocabularys, setDataVocabularys] = React.useState<VocabularysI[] | { mean: string; vocabulary: string }[]>(checkData());
  const [numberPart, setNumberPart] = React.useState<number>(0);

  // const audioElement = React.useRef<HTMLAudioElement | null>(null);
  const audioCelebrationElement = React.useRef<HTMLAudioElement | null>(null);

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

  // const showCompletePractive = () => {
  //   setIsShowCompletePractive(true);
  //   handlePlayAudioCelebration();
  // };

  // const handlePlayAudio = () => {
  //   audioElement.current && audioElement.current.play();
  // };
  // const handlePlayAudioCelebration = () => {
  //   audioCelebrationElement.current && audioCelebrationElement.current.play();
  // };

  const onChangeLearnCatalog = () => {
    setCatalog("part");
    setDataVocabularys(vocaburatysLocal.slice(0, 20));
  };

  const onNumberPart = (index: number) => {
    setNumberPart(index);
    const numberRange = index * 20;
    setDataVocabularys(vocaburatysLocal.slice(numberRange, numberRange + 20));
  };
  const part = Math.ceil(vocaburatysLocal.length / 20);

  const onUpdateVocabularys = (vocabularys: VocabularysI[] | { mean: string; vocabulary: string }[]) => {
    setDataVocabularys(vocabularys);
  };

  return (
    <>
      <div>
        <ClosePage />
      </div>
      <div className="" style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
        <div
          className={classes.catalog}
          style={catalog === "last" ? { background: "green", color: "#fff" } : {}}
          onClick={() => {
            setCatalog("last");
            setDataVocabularys(findVocabularysYesterday);
          }}
        >
          Hôm qua
        </div>
        <div
          className={classes.catalog}
          onClick={onChangeLearnCatalog}
          style={catalog === "part" ? { background: "green", color: "#fff" } : {}}
        >
          Học theo phần
        </div>
      </div>
      {catalog === "part" && (
        <div className="" style={{ display: "flex", justifyContent: "center", marginBottom: "24px", gap: "8px", flexWrap: "wrap" }}>
          {Array(part)
            .fill(0)
            .map((item, index) => {
              return (
                <div
                  className={classes.itemSelectRange}
                  style={numberPart === index ? { background: "green", color: "#fff" } : {}}
                  onClick={() => onNumberPart(index)}
                >
                  {index}
                </div>
              );
            })}
        </div>
      )}
      <div className={classes.root}>
        <div className={classes.rootContent}>
          <FormQuestion
            initialValue={genInitialValue().answers}
            onUpdateVocabularys={onUpdateVocabularys}
            dataVocabularys={dataVocabularys}
          />
        </div>
      </div>
      {/* <CompletePractive open={isShowCompletePractive} /> */}
      {/* <audio src={audio.success} hidden ref={audioElement}></audio> */}
      <audio src={audio.celebration} hidden ref={audioCelebrationElement}></audio>
    </>
  );
};

export default ReviewLessons;

const dataTest = [
  { userId: 328, vocabulary: "name", mean: "ten", date: "2023-07-08" },
  { userId: 328, vocabulary: "age", mean: "tuoi", date: "2023-07-06" },
];
