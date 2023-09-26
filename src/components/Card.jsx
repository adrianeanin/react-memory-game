const Card = ({ emojiData, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      {emojiData.character}
    </div>
  );
};

// console.log(isClicked);

// clicked ? console.log("you lose") : setScore((prev) => prev + 1);
// console.log(score);
// setBest(score);

export default Card;
