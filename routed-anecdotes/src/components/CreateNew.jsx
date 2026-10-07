import { useNavigate } from "react-router-dom";
import { useField, useAnecdotes } from "../hooks";

const CreateNew = () => {
  const nameField = useField("text");
  const contentField = useField("text");
  const infoField = useField("text");
  const { reset: resetName, ...nameInput } = nameField;
  const { reset: resetContent, ...contentInput } = contentField;
  const { reset: resetInfo, ...infoInput } = infoField;

  const { addAnecdote } = useAnecdotes();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAnecdote({
      content: contentField.value,
      author: nameField.value,
      info: infoField.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetName();
    resetContent();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...contentInput} />
        </div>
        <div>
          author
          <input name="author" {...nameInput} />
        </div>
        <div>
          url for more info
          <input name="info" {...infoInput} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
