import { useState, useEffect } from "react";
import anecdoteService from "../services/anecdotes";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    const fetchAnecdotes = async () => {
      try {
        const data = await anecdoteService.getAll();
        setAnecdotes(data);
      } catch (error) {
        console.error("Error fetching anecdotes:", error);
      }
    };

    fetchAnecdotes();
  }, []);

  return { anecdotes };
};
