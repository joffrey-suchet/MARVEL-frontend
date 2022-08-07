import { useState, useEffect } from "react";

import axios from "axios";
import allHeros from "../images/all-heros.jpg";
const Comics = () => {
  const [dataComic, setDataComic] = useState();
  const [isLoadind, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [counter, setCounter] = useState(1);
  const [pageInput, setPageInput] = useState("");

  const skip = counter * 100 - 100;

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://joffrey-marvel-backend.herokuapp.com/comics?title=${input}&skip=${skip}`
        );
        setDataComic(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [input, counter]);

  return isLoadind === true ? (
    <h1>En cours de chargement</h1>
  ) : (
    <section>
      <input
        type="text"
        placeholder="Votre comics"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <div className="button">
        <button
          onClick={() => {
            if (counter > 1) {
              setCounter(counter - 1);
            }
          }}
        >
          -
        </button>
        <p>{counter}</p>
        <button
          onClick={() => {
            if (counter < dataComic.count / 100) {
              setCounter(counter + 1);
            }
          }}
        >
          +
        </button>
      </div>
      <div className="allCharacters">
        {dataComic.results.map((comic, index) => {
          return (
            <div className="character" key={index}>
              {comic.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                <img src={allHeros} alt />
              ) : (
                <img
                  src={`${comic.thumbnail.path}${"."}${
                    comic.thumbnail.extension
                  }`}
                  alt="comic"
                />
              )}
              <div className="name-description">
                <h3>{comic.title}</h3>
                <p>{comic.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Comics;
