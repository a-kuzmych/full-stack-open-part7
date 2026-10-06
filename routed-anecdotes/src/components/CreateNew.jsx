import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
  const nameField = useField("text");
  const contentField = useField("text");
  const infoField = useField("text");
  const { reset: resetName, ...nameInput } = nameField;
  const { reset: resetContent, ...contentInput } = contentField;
  const { reset: resetInfo, ...infoInput } = infoField;
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
