import React, { useContext, useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';



function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  // const { user } = useContext(AuthContext);


  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    props.onSubmit({
      id: uuidv4(),
      text: input
    });
    setInput('');

  //   if (todo) {
  //     const data = new FormData();
  //     data.append("todo", todo.text);

  //     try {
  //       let todoRes = await axios.post('http://localhost:2000/api/v1/todo', 
  //       data,
  //       {
  //           headers: {
  //               'content-type': 'application/json',
  //               'access-token': user.token
  //           }
  //       });

  //       if (todoRes.data.success) return toast.success(todoRes.data.msg);  

  //     } catch (err) {
  //         if (!err.response.data.success) return toast.error(err.response.data.msg);   
  //     }
  //   }
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
