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
  
  const addAnecdote = async (anecdote) => {
    try {
      const newAnecdote = await anecdoteService.createNew(anecdote);
      setAnecdotes((prevAnecdotes) => [...prevAnecdotes, newAnecdote]);
    } catch (error) {
      console.error("Error adding anecdote:", error);
    }
  };

  const deleteAnecdote = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this anecdote?")) {
        await anecdoteService.remove(id);
        setAnecdotes((prevAnecdotes) => prevAnecdotes.filter((anecdote) => anecdote.id !== id));
      }
    } catch (error) {
      console.error("Error deleting anecdote:", error);
    }
  };

  return { anecdotes, addAnecdote, deleteAnecdote };
};
