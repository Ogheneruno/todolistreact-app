import React, { useContext, useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import './todoList.css';
import Intro from './Intro';
import Mainwrapper from './view/Mainwrapper';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { RiWindowsFill } from 'react-icons/ri';
import Login from './pages/auth/login/Login';



function TodoList() {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]);

//   const [filteredTodos, setFilteredTodos] = useState([]);
//     const [status, setStatus] = useState('all');


  const addTodo = async (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    
    if (todo) {
      const data = new FormData();
      data.append("todo", todo.text);

      try {
        let todoRes = await axios.post('https://todolistsreactappapi.herokuapp.com/api/v1/todo',
        data,
        
        {
            headers: {
                'content-type': 'application/json',
                'access-token': user.token
            }
        });

        if (todoRes.data.success) return toast.success(todoRes.data.msg); 
      
      } catch (err) {
          if (!err.response.data.success) return toast.error(err.response.data.msg);   
      }
    }
  };

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(todo => (todo._id === todoId ? newValue.text : todo)));
    
    if (newValue) {
      const data = newValue.text;
      // data.append('todo', newValue.text);
      try {
        let updateTodoRes = await axios.post(`https://todolistsreactappapi.herokuapp.com/api/v1/todo/put/${todoId}`,
        data
        );
        if (updateTodoRes.data.success) return toast.success(updateTodoRes.data.msg);  

      } catch (err) {
          if (!err.response.data.success) return toast.error(err.response.data.msg);   
      }
    }
    
  };

  const removeTodo = async (id) => {
    const removedArr = [...allTodos].filter(todo => todo._id !== id);

    setTodos(removedArr);

    try {
			let removeTodoRes = await axios.delete(
				`https://todolistsreactappapi.herokuapp.com/api/v1/todo/delete/${id}`,
				{
					headers: {
						"content-type": "application/json",
						"access-token": user.token,
					},
				},
			);
			if (removeTodoRes.data.success) toast.success(removeTodoRes.data.msg);
		} catch (err) {
			if (!err.response.data.success) return toast.error(err.response.data.msg);
		}
  };

  const completeTodo = id => {
    let updatedTodos = allTodos.map( async (todo) => {
      if (todo._id === id) {
        todo.isComplete = !todo.isComplete;
        try {
          // let isCompleteRes = await axios.post(
          //   `https://localhost:2000/api/v1/todo`,
          //   todos,
          //   {
          //     headers: {
          //       "content-type": "application/json",
          //       "access-token": user.token,
          //     },
          //   },
          // );
          // if (isCompleteRes.data.success) toast.success(isCompleteRes.data.msg);
        } catch (err) {
          if (!err.response.data.success) return toast.error(err.response.data.msg);
        }
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
      getLocalTodos();
  }, []);

  useEffect(() => {
      saveLocalTodos();
  }, [todos]);

  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
      if (localStorage.getItem('todos') === null) {
          localStorage.setItem('todos', JSON.stringify([]));
      } else {
          let todoLocal = JSON.parse(localStorage.getItem('todos'));
          setTodos(todoLocal);
      }
  };

  const getAllTodos = async () => {
    let res = await axios.get("https://todolistsreactappapi.herokuapp.com/api/v1/todo", {headers: {
            'content-type': 'application/json',
            'access-token': user ? user.token : ""
        }
    });

    setAllTodos(res.data.allTodos);

  };

  useEffect(() => {
    getAllTodos();
  }, [allTodos]);

  useEffect(() => {
    // addTodo();
  }, [allTodos])

  return (
    <Mainwrapper>
        <Intro>

        {
          user ?
            <>
              <h1 style={{fontFamily: "'Poppins', sans-serif"}}>What's the Plan for Today?</h1>
              <TodoForm onSubmit={addTodo} />
              <div className='todoList' style={{fontFamily: "'Poppins', sans-serif"}}>
                <Todo
                    todos={allTodos}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                    style={{fontFamily: "'Poppins', sans-serif"}}
                />
              </div>
            </> :
            <>
              <Login />
            </>
          }
            
        </Intro>
    </Mainwrapper>
  );
}

export default TodoList;
