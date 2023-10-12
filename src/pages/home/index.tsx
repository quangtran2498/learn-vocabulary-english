import { makeStyles } from "@mui/styles";
import Header from "../../components/header";

const useStyles = makeStyles((theme) => {
  return {
    abc: {
      color: theme.custom?.background.pink,
    },
  };
});

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Header />
    </div>
  );
};

export default Home;
