import "./Meme.css";
import { useState } from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    color: "#ffffff",
    image: "https://i.imgflip.com/1bij.jpg",
  });

  function getMemeImage() {
    const url = "https://api.imgflip.com/get_memes";
    fetch(url)
      .then((res) => res.json()) // parse response as JSON
      .then((data) => {
        const memeImages = data.data.memes;
        const randomNumber = Math.floor(Math.random() * memeImages.length);
        const url = memeImages[randomNumber].url;
        setMeme((prevMeme) => ({
          ...prevMeme,
          image: url,
        }));
      })
      .catch((error) => console.log("error", error));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main className="meme">
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          value={meme.topText}
          onChange={handleChange}
          name="topText"
        />
        <input
          type="text"
          placeholder="Bottom text"
          value={meme.bottomText}
          onChange={handleChange}
          name="bottomText"
        />
        <div className="input-color">
          <label htmlFor="color">Color </label>
          <input
            type="color"
            name="color"
            onChange={handleChange}
            value={meme.color}
            id="color"
          />
        </div>
        <button onClick={getMemeImage}>Get a new meme image 🖼</button>

        <div className="meme-container">
          <img src={meme.image} alt="meme" />
          <h2 className="meme-text top" style={{ color: meme.color }}>
            {meme.topText}
          </h2>
          <h2 className="meme-text bottom" style={{ color: meme.color }}>
            {meme.bottomText}
          </h2>
        </div>
      </div>
    </main>
  );
}
