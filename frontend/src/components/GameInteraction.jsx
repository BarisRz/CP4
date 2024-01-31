import { Rating } from "react-simple-star-rating";
import { useState, useEffect } from "react";

function GameInteraction({ game }) {
  const [rating, setRating] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };
  return (
    <div className="flex items-center">
      <Rating
        onClick={handleRating}
        className="custom-rating"
        SVGclassName="inline-block"
        initialValue={game.rating}
        transition
        allowFraction
        fillColor="#26ccf2"
        emptyColor="#333232"
      />
      <p>({game.rating})</p>
    </div>
  );
}

export default GameInteraction;
