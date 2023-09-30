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
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(12);
  const [gameOverCount, setGameOverCount] = useState(0);

  const getEmojiData = () => {
    const req = axios.get(`https://emoji-api.com/emojis?access_key=${apiKey}`);

    req.then((res) => {
      console.log(res);
      const sliced = res.data.slice(startIndex, endIndex);

      const shuffled = helpers.shuffleArray([...sliced], sliced.length - 1);
      setData(sliced);
      setShuffledData(shuffled);
    });

    req.catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  const handleClick = (emojiCodePoint) => {
    const shuffled = helpers.shuffleArray([...data], data.length - 1);
    setShuffledData(shuffled);

    if (!isClicked) setIsClicked(emojiCodePoint);

    setScore((prev) => prev + 1);

    if (isClicked === emojiCodePoint) {
      setDisplayLoss(true);
      gameOver();
      startIndex += 20;
      endIndex += 20;
      getEmojiData();
      return;
    }
  };

  const checkWin = () => {
    if (score === 12) {
      setDisplayWin(true);
      gameOver();
    }
  };

  const gameOver = () => {
    setIsClicked(null);
    if (score > best) setBest(score);
    setScore(0);
    setGameOverCount((prev) => prev + 1);
    if (gameOverCount > 0 && gameOverCount % 3 === 0) {
      setStartIndex((prev) => prev + 20);
      setEndIndex((prev) => prev + 20);
      getEmojiData();
    }
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

  useEffect(checkWin, [score]);
  useEffect(resetWin, [displayWin]);
  useEffect(resetLoss, [displayLoss]);
  useEffect(getEmojiData, [startIndex, endIndex]);

  return (
    <>
      <header className="header">
        <h1>Memoji</h1>
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
