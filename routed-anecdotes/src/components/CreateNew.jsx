import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
  const nameField = useField("text");
  const contentField = useField("text");
  const infoField = useField("text");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: contentField.value,
      author: nameField.value,
      info: infoField.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = (e) => {
    e.preventDefault();
    nameField.reset();
    contentField.reset();
    infoField.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...contentField} />
        </div>
        <div>
          author
          <input name="author" {...nameField} />
        </div>
        <div>
          url for more info
          <input name="info" {...infoField} />
        </div>
        <button>create</button>
        <button
          type="button"
          onClick={handleReset}
        >
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
