import styles from "./JokePage.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

function JokePage() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getJoke() {
    try {
      const response = await axios.get(
        `https://official-joke-api.appspot.com/jokes/random`
      );
      setJoke(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getJoke();
  }, []);

  async function handleNext() {
    await getJoke();
  }

  return (
    <>
      {loading && <p>Loading..</p>}
      {!loading && (
        <div className={styles.jokeContainer}>
          <div className={styles.question}>{joke.setup}</div>
          <div className={styles.answer}>{joke.punchline}</div>
          <button className={styles.next} onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default JokePage;
