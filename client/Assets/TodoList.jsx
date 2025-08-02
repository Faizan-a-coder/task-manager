import { useState,useEffect } from "react";
import {v4 as uuidv4} from "uuid";
import axios from "axios";

export default function TodoList(){
    let [todos, setTodos] = useState([{task: "sample task",id: uuidv4(), isDone: false}]);
    let [newTodo, setNewTodo] = useState("");
    // let [array, setArray] = useState([]);

    const fetchApi = async () =>{
        try{
        const response = await axios.get("http://localhost:8080/tasks");
        console.log(response.data);
        setTodos(response.data);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);

    let addNewTask = async () => {
  const newTask = { task: newTodo, id: uuidv4(), isDone: false };
  try {
    await axios.post("http://localhost:8080/tasks", newTask);
    setTodos((prevTodos) => [...prevTodos, newTask]);
    setNewTodo("");
  } catch (error) {
    console.error("Error adding task", error);
  }
};
    
    let updateTodoValue =(event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/tasks/${id}`);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  } catch (error) {
    console.error("Error deleting task", error);
  }
};

    let markAllDone = () =>{
        setTodos( (prevTodos) => (
            prevTodos.map((todo) => {
            return {
                ...todo,
                isDone: true,
            };
        })
    ));
    };

let markAsDone = async (id) => {
  try {
    const res = await axios.put(`http://localhost:8080/tasks/${id}`);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: res.data.isDone } : todo
      )
    );
  } catch (error) {
    console.error("Error updating task", error);
  }
};


    return (
        <div>

            {/* {array.map((item, index) => (
                 <p key={index}>{item.task}</p>
            ))} */}
            <input placeholder="Add a Task"
            value={newTodo}
             onChange={updateTodoValue}
              >
            </input>
            <br></br>
            <br></br>

            <button onClick={addNewTask}>Add Task</button>
            <br></br>
            <br></br>

        <hr></hr>
            <h4>List of Task</h4>

            <ul>
              { todos.map((todo) => (
                 <li key={todo.id}>
                 <span style={todo.isDone ? {textDecorationLine: "line-through"}: {}}>
                    {todo.task}</span>   
                 &nbsp;&nbsp;&nbsp;&nbsp;
                 <button onClick={ () => deleteTodo(todo.id)}>Delete</button>
                  <button onClick={ () => markAsDone(todo.id)}> Mark as Done</button>
                    </li>
                ))}
            </ul>
            <br></br>
            <br></br>
            <button onClick={markAllDone}>Mark All as Done</button>
        </div>
    );
}
