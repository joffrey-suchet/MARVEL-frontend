import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import allHeros from "../images/all-heros.jpg";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [input, setInput] = useState("");
  const [counter, setCounter] = useState(1);
  const skip = counter * 100 - 100;

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://joffrey-marvel-backend.herokuapp.com/characters?name=${input}&skip=${skip}`
        );
        setData(response.data);
        setIsloading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [input, counter]);

  // console.log(data.results);
  // console.log(data.count);
  return isLoading === true ? (
    <h1>En cours de chargement</h1>
  ) : (
    <section>
      <input
        type="text"
        placeholder="Votre personnage"
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
            if (counter < data.count / 100) {
              setCounter(counter + 1);
            }
          }}
        >
          +
        </button>
      </div>
      <div className="allCharacters">
        {data.results.map((character, index) => {
          // console.log(character.comics);
          return (
            <Link to={`/character/${character._id}`} key={index}>
              <div className="character">
                {character.thumbnail.path ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                  <img src={allHeros} alt="all-heros" />
                ) : (
                  <img
                    src={`${character.thumbnail.path}${"."}${
                      character.thumbnail.extension
                    }`}
                    alt="character_picture"
                  />
                )}
                <div className="name-description">
                  <h3>{character.name}</h3>
                  <p>{character.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Characters;
