import Confetti from "react-confetti";

const PaperFireWork = () => {
  return (
    <Confetti
      width={window.innerWidth - 50}
      height={window.innerHeight - 50}
      opacity={1}
      tweenDuration={2000}
    />
  );
};

export default PaperFireWork;
