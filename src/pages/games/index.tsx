import { makeStyles } from "@mui/styles";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Guide from "../../components/guide";
import GuideGames from "../../components/guide/games";
import { path } from '../../contant/path';
import { store } from "../../redux";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { colors } from "../../colors";
import ClosePage from "../../components/closePage";

export interface PropsOutLetI {
  highLightGuide: number;
  getHighLightGuide: (index: number) => void;
  getPathUrl: (path: string) => void;
}

const useStyles = makeStyles((theme) => {
  return {
    navGuide: {
      background: "#000000",
      padding: "24px 24px 0px 24px",
      width: "calc(20% - 48px)",
      height: "100vh",
      color: "#fff",
      position: "fixed",
    },
    rootContent: {
      display: "flex",
      justifyContent: "flex-end",
      paddingTop:"24px",
    },
    content: {
      width: `calc(100% - ${theme.custom?.varRoot.navLeft} - 5%)`,
    },
    navGanes:{
      display:"flex",
      marginBottom:"24px"
    },
    gameItem:{
      padding:"10px 24px",
      borderRadius:"16px",
      fontWeight:600,
      textTransform:"capitalize",
      border:"1px solid #ccc",
      marginRight:"10px"      
    },
    highLightGame:{
      color:"#fff",
      background:colors.greenMain,
      border:"none"
    },
    navChange:{
      position: "fixed",
      height:"100vh",
      right:0,
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      paddingRight:"16px"
    },
    changeItem: {
      height: "50px",
      width: "50px",
      ...theme.custom?.flexBox.centerCenter,
      background: colors.greenMain,
      borderRadius: "50%",
      marginBottom: "20px",
      position: "relative",
      cursor: "pointer",
      "&:hover": {
        "& div": {
          background: colors.greenMain,
          transform: "translateX(0)",
          color: colors.white,
        }
      },
    },
    childChangeItem: {
      position: "absolute",
      padding: "0px 24px 0 16px",
      top: 0,
      width: "max-content",
      borderRadius: "30px 0 0 30px",
      height: "50px",
      zIndex: "-1",
      right: 27,
      ...theme.custom?.flexBox.verticalCenter,
      transition: "all 0.6s",
      color: "transparent",
      fontWeight: 600,
      fontSize: "15px",
      transform: "translateX(12%)",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },

  };
});

const Games = () => {
  const [highLightGuide, setHighLightGuide] = React.useState(0);
  const [highLightGame, setHighLightGame] = React.useState(1);
  const [changeLanguagePractive, setChangeLanguagePractive] = React.useState("vn");

  const [pathUrl, setPathUrl] = React.useState<string>(
    window.location.pathname
  );
  
  const navigate = useNavigate()
  const heightHeader = store.getState().getHeightHeader.heightHeader
  const classes = useStyles();

  const getHighLightGuide = (index: number) => {
    setHighLightGuide(index);
  };

  const getPathUrl = (path: string) => {
    setPathUrl(path);
  };

 const onPlayGame = (path:string,id:number) => {
    navigate(path)
    setHighLightGame(id)
 }

 const onGetChangeLanguagePractive = () => {
  changeLanguagePractive==="vn" ? setChangeLanguagePractive("en") : setChangeLanguagePractive("vn")
 }

  return (
    <div>
      <div className={classes.navGuide}>
        <Guide>
          <GuideGames />
        </Guide>
      </div>
      <div className={classes.navChange}>
         <div className={`${classes.changeItem}`}>
            <AutorenewIcon sx={{color:colors.white}}/>
            <div className={classes.childChangeItem} onClick={onGetChangeLanguagePractive}>Đảo ngôn ngữ</div>
         </div>
         <div className={`${classes.changeItem}`}>
           <ShuffleIcon sx={{color:colors.white}}/>
           <div className={classes.childChangeItem}>Học ngẫu nhiên</div>
         </div>
      </div>
      <div>
        <ClosePage />
      </div>
      <div className={classes.rootContent} style={{height:`calc(100vh - 64px - 24px)`}}>
        <div className={classes.content}>
          <div className={classes.navGanes}>
            {data.map((game) => {
              return (
                <div key={game.id} className={`${classes.gameItem} ${highLightGame === game.id ? classes.highLightGame : ""}`} onClick={() => onPlayGame(game.link,game.id)}>{game.game}</div>
              )
            })}
          </div>
          <Outlet
            context={{
              highLightGuide: highLightGuide,
              getHighLightGuide: getHighLightGuide,
              getPathUrl: getPathUrl,
              changeLanguage:changeLanguagePractive,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Games;

const data = [
  {id:1,game:"xếp hình",link:path.gameImageVocabulary},
  {id:2,game:"bắn súng",link:path.gameGun},

]