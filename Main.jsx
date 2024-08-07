import { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialState = { items: [], task: "" };

function reducer(state, action) {
  switch (action.type) {
    case "setTask":
      return { ...state, task: action.payload };
    case "addItem": {
      const uniqueId = uuidv4();
      return {
        ...state,
        items: [...state.items, { id: uniqueId, task: state.task }],
      };
    }
  }
}

function Main() {
  // const [task, setTask] = useState("");
  // const [items, setItems] = useState([]);
  const [{ task, items }, dispatch] = useReducer(reducer, initialState);

  function handleAddItem(text) {
    if (text.trim()) {
      dispatch({ type: "addItem" });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleAddItem(task);
  }

  function handleDragStart(e) {
    e.dataTransfer.setData("text", task);
  }

  function handleDrop(e) {
    e.preventDefault();

    const droppedTask = e.dataTransfer.getData("text");

    handleAddItem(droppedTask);
  }

  // function handleDeleteItem(id) {
  //   setItems((items) => items.filter((item) => item.id !== id));
  // }

  return (
    <main className="px-4 max-w-[40rem] mx-auto -mt-24 lg:-mt-32">
      <Form
        handleSubmit={handleSubmit}
        task={task}
        onSetTask={setTask}
        handleDragStart={handleDragStart}
      />

      <ul
        className="text-lightGrayBlue rounded-t-md bg-dVeryDarkBlue min-h-[40vh]"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <Item items={items} onDeleteItem={handleDeleteItem} />
      </ul>

      <Filter items={items} />
    </main>
  );
}

export default Main;

function Form({ handleSubmit, task, onSetTask, handleDragStart }) {
  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <input
        type="text"
        className="text-lightGrayBlue bg-dVeryDarkBlue rounded-md w-full placeholder:text-dDarkGrayBlue py-4 px-10 md:py-5  outline-none focus:border-dDarkGrayBlue border border-dVeryDarkBlue"
        placeholder="Create a new todo.."
        value={task}
        onChange={(e) => onSetTask(e.target.value)}
        draggable
        onDragStart={handleDragStart}
      />
    </form>
  );
}

function Item({ items, onDeleteItem }) {
  return items.map((item) => {
    return (
      <li
        className=" w-full p-4 md:p-5 border-b border-dSecondVeryDarkGrayBlue flex gap-4 items-center"
        key={item.id}
      >
        <span className="rounded-full w-6 h-6 lg:w-8 lg:h-8 border border-dSecondVeryDarkGrayBlue"></span>
        <p className="flex-1">{item.task}</p>
        <button onClick={() => onDeleteItem(item.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-dDarkGrayBlue"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </li>
    );
  });
}

function Filter({ items }) {
  return (
    <>
      <div className="bg-dVeryDarkBlue w-full p-4 md:p-5 rounded-b-md flex justify-between mb-6 text-dDarkGrayBlue">
        <p>{items.length} items left</p>
        <button>Clear Completed</button>
      </div>
      <fieldset className="bg-dVeryDarkBlue w-full p-4 md:p-5 flex justify-center gap-4 text-dDarkGrayBlue rounded-md">
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </fieldset>
    </>
  );
}
