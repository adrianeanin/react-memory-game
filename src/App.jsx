import { useState, useEffect } from "react";
import Card from "./components/Card";
import axios from "axios";
import "./assets/styles/index.css";
import helpers from "./components/helpers";
const apiKey = import.meta.env.VITE_EMOJI_API_KEY;

const App = () => {
  const [data, setData] = useState(null);
  const [shuffledData, setShuffledData] = useState(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [isClicked, setIsClicked] = useState(null);
  const [displayLoss, setDisplayLoss] = useState(false);
  const [displayWin, setDisplayWin] = useState(false);

  const getEmojiData = () => {
    const req = axios.get(`https://emoji-api.com/emojis?access_key=${apiKey}`);

    req.then((res) => {
      const sliced = res.data.slice(100, 112);
      const shuffled = helpers.shuffleArray([...sliced], sliced.length - 1);
      console.log(sliced);
      setData(sliced);
      setShuffledData(shuffled);
    });

    req.catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  const resetWin = () => {
    if (displayWin) {
      const winTimeout = setTimeout(() => {
        setDisplayWin(false);
      }, 3000);

      return () => clearTimeout(winTimeout);
    }
  };

  const resetLoss = () => {
    if (displayLoss) {
      const lossTimeout = setTimeout(() => {
        setDisplayLoss(false);
      }, 2000);

      return () => clearTimeout(lossTimeout);
    }
  };

  useEffect(resetWin, [displayWin]);
  useEffect(resetLoss, [displayLoss]);
  useEffect(getEmojiData, []);

  const handleClick = (emojiCodePoint) => {
    const shuffled = helpers.shuffleArray([...data], data.length - 1);
    setShuffledData(shuffled);

    if (!isClicked) setIsClicked(emojiCodePoint);

    if (isClicked === emojiCodePoint) {
      setDisplayLoss(true);
      gameOver();
      return;
    }

    if (score === shuffledData.length) {
      setDisplayWin(true);
      gameOver();
      return;
    }

    setScore((prev) => prev + 1);
  };

  const gameOver = () => {
    setIsClicked(null);
    if (score > best) setBest(score);
    setScore(0);
    return;
  };

  return (
    <>
      <header className="header">
        <h1>Emoji Memory Game</h1>
        <p>
          Score points by clicking on an emoji, but don't click on any more than
          once!
        </p>

        {displayWin && (
          <div className="win">Wow 😄 you have a great memory!</div>
        )}

        <div className="scores">
          <div className="score">Score: {score}</div>
          <div className="best-score">Best: {best}</div>

          {displayLoss && <div className="loss">Game Over</div>}
        </div>
      </header>

      <main>
        {data && (
          <div>
            <div className="card-container">
              {shuffledData.map((emoji) => (
                <Card
                  emojiData={emoji}
                  key={emoji.codePoint}
                  onClick={() => handleClick(emoji.codePoint)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default App;
