import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function SingleCard() {
  const { cardId } = useParams();
  return (
    <>
      <Navbar></Navbar>
      <h1>CARTA SINGOLA</h1>
    </>
  );
}

export default SingleCard;
