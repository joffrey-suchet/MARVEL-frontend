import { useState, useEffect } from "react";

import axios from "axios";
import allHeros from "../images/all-heros.jpg";

const Comics = () => {
  const [dataComic, setDataComic] = useState();
  const [isLoadind, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          "https://joffrey-marvel-backend.herokuapp.com/comics"
        );
        setDataComic(response.data);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return isLoadind === true ? (
    <h1>En cours de chargement</h1>
  ) : (
    <section>
      <div className="allCharacters">
        {dataComic.results.map((comic, index) => {
          return (
            <main className="character" key={index}>
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

              <h3>{comic.title}</h3>
              <p>{comic.description}</p>
            </main>
          );
        })}
      </div>
    </section>
  );
};

export default Comics;
