import React from "react";


import { useDispatch, useStore } from "react-redux";
import Header from "./Header";
import {  remove } from "../features/alerts/alertsSlice";
function Alert({ alert, removeTodo }) {
  return (
      <div className="alert">
          {alert.keyword}
          {alert.isFullMatch}
          {alert.paste.title}
          {alert.paste.author}
          {alert.paste.date}
          {alert.paste.labels}
          <div>
              <button onClick={() => removeTodo(alert.paste.title)}>x</button>
          </div>
      </div>
  );
}



export default function Alerts() {
  const dispatch = useDispatch();
  const store = useStore().getState();
  const alertsState = store.alertsReducer;


    
      const removeTodo = text => {
        dispatch(remove(text))
      };
    
    return (
        <div>
            <Header />
            <div className="app">
      <div className="todo-list">
      {alertsState.map((alert,index) => (
                        <Alert key={index} alert={alert} removeTodo={removeTodo} />
                    ))}

      </div>
    </div>
        </div>
    );
}
