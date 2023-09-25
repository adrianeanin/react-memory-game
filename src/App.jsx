import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
const apiKey = import.meta.env.VITE_EMOJI_API_KEY;

function App() {
  const [data, setData] = useState(null);

  const hook = () => {
    const req = axios.get(`https://emoji-api.com/emojis?access_key=${apiKey}`);

    req.then((res) => {
      setData(res.data);
      console.log(res.data);
    });
    req.catch((error) => {
      console.error("Error fetching data:", error);
    });
  };

  useEffect(hook, []);

  return (
    <>
      {data && (
        <div>
          <h2>Data:</h2>
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          {data.map((e, index) => {
            return (
              <div className="display" key={index}>
                {e.character}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
