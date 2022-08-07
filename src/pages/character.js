import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import allHeros from "../images/all-heros.jpg";

const Character = () => {
  const { characterId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://joffrey-marvel-backend.herokuapp.com/comics/${characterId}`
        );
        setData(response.data);
        setIsloading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return isLoading === true ? (
    <h1>En cours de chargement</h1>
  ) : (
    <section>
      <div className="allCharacters">
        {data.comics.map((character, index) => {
          //   comicsId.map();
          return (
            <Link to="/comics" key={index}>
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

export default Character;
