import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

function getInitialState() {
  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  const storedFilter = JSON.parse(localStorage.getItem("filter")) || "all";
  return { items: storedItems, task: "", filter: storedFilter };
}

function reducer(state, action) {
  switch (action.type) {
    case "setTask":
      return { ...state, task: action.payload };
    case "clearTask":
      return { ...state, task: "" };
    case "addItem": {
      const uniqueId = uuidv4();
      return {
        ...state,
        items: [
          ...state.items,
          { id: uniqueId, task: state.task, isCompleted: false },
        ],
      };
    }
    case "deleteItem":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "toggleCompletedTask":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, isCompleted: !item.isCompleted }
            : { ...item }
        ),
      };
    case "setFilter":
      return { ...state, filter: action.payload };

    case "clearCompleted":
      return {
        ...state,
        items: state.items.filter((item) => item.isCompleted === false),
      };

    case "setItems":
      return { ...state, items: action.payload };

    default:
      throw new Error("unknown action type");
  }
}

export default function Main() {
  const [{ task, items, filter }, dispatch] = useReducer(
    reducer,
    undefined,
    getInitialState
  );

  useLocalStorage(items, filter);

  function handleAddItem(e) {
    e.preventDefault();
    if (task.trim()) {
      dispatch({ type: "addItem" });
      dispatch({ type: "clearTask" });
    }
  }

  let filteredItems;

  if (filter === "all") {
    filteredItems = items;
  }

  if (filter === "active") {
    filteredItems = items.filter((item) => item.isCompleted === false);
  }

  if (filter === "completed") {
    filteredItems = items.filter((item) => item.isCompleted === true);
  }

  return (
    <main className="px-4 max-w-[40rem] mx-auto -mt-24 lg:-mt-32">
      <Form handleAddItem={handleAddItem} task={task} dispatch={dispatch} />

      <ul
        className="text-veryDarkGrayBlue bg-lightGray dark:text-lightGrayBlue rounded-t-md dark:bg-dVeryDarkBlue min-h-[40vh]"
        onDrop={handleAddItem}
        onDragOver={(e) => e.preventDefault()}
      >
        <Item items={items} dispatch={dispatch} filteredItems={filteredItems} />
      </ul>

      <Filter items={items} dispatch={dispatch} filter={filter} />
    </main>
  );
}

function Form({ handleAddItem, task, dispatch }) {
  return (
    <form className="mb-6" onSubmit={handleAddItem}>
      <input
        type="text"
        className="text-veryDarkGrayBlue bg-lightGray dark:text-lightGrayBlue dark:bg-dVeryDarkBlue rounded-md w-full placeholder:text-darkGrayBlue dark:placeholder:text-dDarkGrayBlue py-4 px-10 md:py-5  outline-none border-lightGray focus:border-veryDarkGrayBlue dark:focus:border-dDarkGrayBlue border dark:border-dVeryDarkBlue"
        placeholder="Create a new todo.."
        value={task}
        onChange={(e) => dispatch({ type: "setTask", payload: e.target.value })}
        draggable
      />
    </form>
  );
}

function Item({ dispatch, filteredItems }) {
  return filteredItems.map((item) => {
    return (
      <li
        className=" w-full p-4 md:p-5 border-b border-lightGrayBlue dark:border-dSecondVeryDarkGrayBlue flex gap-4 items-center cursor-pointer"
        key={item.id}
        onClick={() =>
          dispatch({ type: "toggleCompletedTask", payload: item.id })
        }
      >
        <span
          className={`rounded-full w-6 h-6 lg:w-8 lg:h-8 border border-lightGrayBlue dark:border-dSecondVeryDarkGrayBlue flex justify-center items-center ${
            item.isCompleted && "bg-gradient-to-b from-gr1 to-gr2"
          }`}
        >
          {item.isCompleted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 rounded-full w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          )}
        </span>
        <p
          className={`flex-1 ${
            item.isCompleted && "line-through text-dDarkGrayBlue"
          }`}
        >
          {item.task}
        </p>
        <button
          onClick={() => dispatch({ type: "deleteItem", payload: item.id })}
        >
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

function Filter({ items, dispatch, filter }) {
  const itemsLeft = items.filter((item) => item.isCompleted === false);

  return (
    <>
      <div className="text-darkGrayBlue bg-lightGray dark:bg-dVeryDarkBlue w-full p-4 md:p-5 rounded-b-md flex justify-between mb-6 dark:text-dDarkGrayBlue">
        <p>
          {itemsLeft.length} {itemsLeft.length === 1 ? "item" : "items"} left
        </p>
        <button onClick={() => dispatch({ type: "clearCompleted" })}>
          Clear Completed
        </button>
      </div>
      <fieldset className="text-darkGrayBlue bg-lightGray dark:bg-dVeryDarkBlue w-full p-4 md:p-5 flex justify-center gap-4 dark:text-dDarkGrayBlue rounded-md">
        <button
          onClick={() => dispatch({ type: "setFilter", payload: "all" })}
          className={filter === "all" ? "text-brightBlue" : ""}
        >
          All
        </button>
        <button
          onClick={() => dispatch({ type: "setFilter", payload: "active" })}
          className={filter === "active" ? "text-brightBlue" : ""}
        >
          Active
        </button>
        <button
          onClick={() => dispatch({ type: "setFilter", payload: "completed" })}
          className={filter === "completed" ? "text-brightBlue" : ""}
        >
          Completed
        </button>
      </fieldset>
    </>
  );
}
