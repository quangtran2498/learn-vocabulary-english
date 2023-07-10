import React, { useEffect } from "react";
import { getUserVocabularyApi } from "../../service/get-user-vocabulary";
import { makeStyles } from "@mui/styles";
import ContianerPage from "../../components/container/index";
import { isEmpty } from "lodash";
import { VocabularysI } from "../../types/vocabularys";
import { ItemLocalstorage } from "../../contant/enums";


const useStyles = makeStyles((theme) => {
  return {
    root:{
       paddingTop:"30px"
    },
    item: {
      display: "flex",
      width: "50%",
      justifyContent: "space-between",
      borderBottom: "1px solid #ccc",
      paddingBottom: "2px",
      marginBottom: "8px",
    },
    index:{
        width:"10%"
    },
    width45:{
        width:"45%"
    }
  };
});
const UserVocabulary = () => {
  const [dataUserVocabulary, setDataUserVocabulary] = React.useState<VocabularysI[]>([]);
  const classes = useStyles();

  const callGetUserVocabulary = async () => {
    try {
      const res = await getUserVocabularyApi();
      setDataUserVocabulary(res.data);
    } catch {
      const vocaburatys = JSON.parse(localStorage.getItem(ItemLocalstorage.vocabularys) || "");
      const data:VocabularysI[] = !isEmpty(vocaburatys) ? vocaburatys : dataTest
      setDataUserVocabulary(data);

    }
  };

  useEffect(() => {
    callGetUserVocabulary();
  }, []);

  return (
    <div className={classes.root}>
      <ContianerPage>
        {dataUserVocabulary.map((item: VocabularysI, index) => {
          return (
            <div key={index} className={classes.item}>
              <div className={classes.index}>{index + 1}</div>
              <div className={`${classes.width45}`}>{item.vocabulary}</div>
              <div className={`${classes.width45}`}>{item.mean}</div>
            </div>
          );
        })}
      </ContianerPage>
    </div>
  );
};

export default UserVocabulary;

const dataTest = [
  { userId: 328, vocabulary: "name", mean: "ten", date: "2023-07-08" },
  { userId: 328, vocabulary: "age", mean: "tuoi", date: "2023-07-06" },
]