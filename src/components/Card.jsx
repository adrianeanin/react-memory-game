const Card = ({ emojiData, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      {emojiData.character}
    </div>
  );
};

export default Card;
