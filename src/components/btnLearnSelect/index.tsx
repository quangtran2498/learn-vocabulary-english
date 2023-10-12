import { makeStyles } from "@mui/styles";

interface IProps {
  amount: number;
  showLearnAgian: () => void;
}

const useStyles = makeStyles(() => {
  return {
    style: {
      position: "fixed",
      top: "50%",
      zIndex: 1,
      right: 20,
      background: "green",
      padding: "20px",
      borderRadius: "50%",
      color: "#fff",
      cursor: "pointer",
    },
    showAmount: {
      position: "absolute",
      top: -10,
      right: -5,
      fontSize: "12px",
      color: "#333",
      background: "#fff",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid #ccc",
    },
  };
});
const BtnLearnAgian = ({ amount, showLearnAgian }: IProps) => {
  const classes = useStyles();
  return (
    <div className={classes.style} onClick={showLearnAgian}>
      btn
      <div className={classes.showAmount}>{amount ? amount : "0"}</div>
    </div>
  );
};

export default BtnLearnAgian;
