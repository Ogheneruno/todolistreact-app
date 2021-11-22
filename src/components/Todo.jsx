import React, { useState, useEffect, useContext } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';


const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };


  // const [allTodos, setAllTodos] = useState([]);
  //   const { user } = useContext(AuthContext)

  //   const getAllTodos = async () => {
  //     let res = await axios.get("http://localhost:2000/api/v1/todo", {headers: {
  //             'content-type': 'application/json',
  //             'access-token': user ? user.token : ""
  //         }
  //     });

  //     setAllTodos(res.data.allTodos);

  //   }

  //   useEffect(() => {
  //       getAllTodos();
  //   }, [...allTodos, allTodos])


  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo._id)} 
        style={{cursor: 'pointer'}}
      >
        {todo.todo}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo._id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo._id, value: todo.todo })}
          className='edit-icon'
        />
        
      </div>
    </div>
  ));
};
export default Todo;
