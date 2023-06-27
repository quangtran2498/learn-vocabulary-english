import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {  
  return {
    abc:{
      color:theme.custom?.background.pink
    }
  }
})

const Home = () => {
  const classes = useStyles()
  return (
    <div className={classes.abc}>Home</div>
  )
}

export default Home