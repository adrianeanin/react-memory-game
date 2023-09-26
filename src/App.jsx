import { useState, useEffect } from "react";
import axios from "axios";
import "./assets/styles/index.css";
const apiKey = import.meta.env.VITE_EMOJI_API_KEY;
import Card from "./components/Card";

function App() {
  const [data, setData] = useState(null);

  const getEmojiData = () => {
    const req = axios.get(`https://emoji-api.com/emojis?access_key=${apiKey}`);

    req.then((res) => {
      const sliced = res.data.slice(100, 112);
      setData(sliced);
      // setData(res.data);
      console.log(res.data);
    });

    req.catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  useEffect(getEmojiData, []);

  const handleClick = () => {};

  return (
    <>
      <header className="header">
        <h1>Emoji Memory Game</h1>
        <p>
          Score points by clicking on an emoji, but don't click on any more than
          once!
        </p>

        <div className="scores">
          <div className="score">Score:</div>
          <div className="best-score">Best:</div>
        </div>
      </header>

      <main>
        {data && (
          <div>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            <div className="card-container">
              {data.map((emoji, index) => (
                <Card key={index} emojiData={emoji} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
