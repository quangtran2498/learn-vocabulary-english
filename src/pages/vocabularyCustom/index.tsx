import React, { useEffect } from "react";
import Guide from "../../components/guide";
import InputVocabuary from "../../components/guide/children/inputVocabuary";
import { makeStyles } from "@mui/styles";
import { Outlet } from "react-router-dom";
import { path } from "../../contant/path";
 export interface PropsOutLetI {
  highLightGuide:number,
  getHighLightGuide:(index:number) => void,
  getPathUrl:(path:string) => void
}

const useStyles = makeStyles((theme) => {
  return {
    navGuide: {
      background: "#000000",
      padding: "24px 24px 0px 24px",
      width: "calc(20% - 48px)",
      height: "calc(100vh - 44px)",
      color: "#fff",
      position: "fixed",
      top: 44,
    },
  };
});

const VocabularyCustom = () => {
  const [highLightGuide, setHighLightGuide] = React.useState(0)
  const [pathUrl, setPathUrl] = React.useState<string>(window.location.pathname)
    
  const classes = useStyles();
  
  const getHighLightGuide = (index:number) => {
    setHighLightGuide(index)
  }

  const getPathUrl = (path:string) => {
    setPathUrl(path)
  }


  return (
    <div >
      <div className={classes.navGuide}>
        <Guide>
            {pathUrl===path.vocabularyCustom ? <InputVocabuary highLightGuide={highLightGuide} getHighLightGuide={getHighLightGuide}/> : <>quang</>}
           
        </Guide>
      </div>
       <Outlet context={{highLightGuide:highLightGuide,getHighLightGuide:getHighLightGuide,getPathUrl:getPathUrl}}/>
    </div>
  );
};

export default VocabularyCustom;
