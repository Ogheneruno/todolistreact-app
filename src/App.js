import './App.css';
import Mainwrapper from './components/view/Mainwrapper';
import { Routes, Route, Link } from "react-router-dom";
import Mainfield from './components/view/Mainfield';
import TodoList from './components/TodoList';
import Login from './components/pages/auth/login/Login';
import Register from './components/pages/auth/register/Register';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Mainfield />}></Route>
        <Route path="/todo" element={<TodoList />}></Route>
        <Route path="/login" element= {<Login />}></Route>
        <Route path="/register" element= {<Register />}></Route>
        {/* <Route path="/profile" component= {Profile}></Route> */}
      </Routes>

      <Toaster 
      position="top-right"
      toastOptions={{
        duration: 5000,
        success: {
          style: {
            background: 'green',
            color: 'white'
          },
        },
        error: {
          style: {
            background: 'red',
            color: 'white'
          },
        },
      }}
    />

    </div>
  );
}

export default App;
