import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
        display: "grid",
        gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
        gap:10,
        width:"600px",
        height:"600px"
    },
    item: {
      width: "100%",
      background:"red",
    },
    bgTarget:{
        background:"#fff",
    
    }
  };
});
const Lego = () => {
    const list = [0,1,2,3,4,5,6,7,8].sort( () => Math.random() - 0.5 )
    const [listPosition, setListPosition] = React.useState<number[]>(list)
    const [targetDefualt, setTargetDefault] = React.useState<number>(list[8])

    const [target, setTarget] = React.useState<number>(10)
    
    const classes = useStyles()
    console.log(listPosition,"listPosition");
    
   
  const reverse = (index1:number,index2:number) => {
    //! array.splice(array.indexOf(index2), 1, array[index1])[0] cắt index bị thay thế khi click vào và thay thế vị trị đó bằng index thằng click vào sau đó lấy giá trị của thằng bị click vào bằng giá trị của thằng bị cắt
    let array = listPosition    
    array[index1] = array.splice(array.indexOf(index2), 1, array[index1])[0]; 
    // console.log(array,"array");
    
    setListPosition(array)
  }

  const onTarget = (index:number) => {
    reverse(index,targetDefualt)
    setTarget(index)
  }
  
  return (
    <div className={classes.root}>
      {listPosition
        .map((item, index) => {          
          return (
            <div key={index} className={`${classes.item} ${index===target && classes.bgTarget} ${target > 8 && index===8 && classes.bgTarget}`} onClick={() => onTarget(index)}>
              {item}
            </div>
          );
        })}
    </div>
  );
};

export default Lego;
