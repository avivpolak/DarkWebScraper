import React from "react";
import { useDispatch, useStore } from "react-redux";
import Header from "./Header";
import { add, remove } from "../features/keywords/keywordsSlice";
function Todo({ todo, removeTodo }) {
    return (
        <div className="alert">
            {todo}
            <div>
                <button onClick={() => removeTodo(todo)}>x</button>
            </div>
        </div>
    );
}

function TodoForm({ addTodo }) {
    const [value, setValue] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </form>
    );
}

export default function KeyWords() {
    const dispatch = useDispatch();
    const store = useStore().getState();
    const KeyWordsState = store.KeyWordsReducer;


    const addTodo = (text) => {
        dispatch(add(text));
    };

    const removeTodo = (text) => {
        dispatch(remove(text));
    };

    return (
        <div>
            <Header />
            <div className="app">
                <div className="todo-list">
                    {KeyWordsState.map((todo,index) => (
                        <Todo key={index} todo={todo} removeTodo={removeTodo} />
                    ))}
                    <TodoForm addTodo={addTodo} />
                </div>
            </div>
        </div>
    );
}
