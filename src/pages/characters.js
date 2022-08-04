import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import allHeros from "../images/all-heros.jpg";
const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [input, setInput] = useState("");
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://joffrey-marvel-backend.herokuapp.com/characters`
        );
        setData(response.data);
        setIsloading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // console.log(data.results);

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

      <div className="allCharacters">
        {data.results.map((character, index) => {
          return (
            <Link to="/comics">
              <div className="character" key={index}>
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
                <h3>{character.name}</h3>
                <p>{character.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Characters;
