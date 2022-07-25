import React, { useState } from "react";
import "./styles.css";
import InputTodo from "../src/components/InputTodo";
import IncomleteTodos from "../src/components/IncompleteTodos";
import CompleteTodos from "./components/CompleteTodos";

// 状態が変化する要素をstateとして定義する
export default function App() {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);

  const [completeTodos, setCompleteTodos] = useState([]);

  // eventにvalueが入る
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    // 空文字の場合はスキップ
    if (todoText === "") {
      return false;
    }
    // pushだとうまくいかない
    // incompleteTodos.push(todoText);
    // setIncompleteTodos(incompleteTodos);
    //https://zenn.dev/gunners6518/articles/4c06488cfa402e
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    // const newTodos = incompleteTodos.filter((value) => value !== todo);
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
    // onClickDelete(index);
  };

  const onClickBack = (index) => {
    // 完了TODOから削除
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    // 未完了TODOに戻す
    const newIncomplteTodos = [...incompleteTodos, completeTodos[index]];

    // 各stateを更新
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncomplteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        // disabled={incompleteTodos.length >= 5 ? true : false}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodoは5個までです。消化しろ〜。
        </p>
      )}
      <IncomleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
}
