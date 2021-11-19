import React, { useContext, useRef } from 'react';
import './login.css';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, InputBase } from '@material-ui/core';
import Intro from '../../../Intro';
import Mainwrapper from '../../../view/Mainwrapper';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../../../context/AuthContext';
import {loginCall} from '../../../../apiCalls';





const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '85%',
        marginTop: '1rem',
        fontFamily: "'Poppins', sans-serif",
        marginLeft: '5.3rem',
        [theme.breakpoints.down('md')]: {
            marginLeft: 0
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: 10
        }
      },
    },

    btn1: {
        backgroundColor: '#3f51b5',
        color: '#fff',
        fontWeight: 'bold',
        width: '100%',
        padding: '10px',
        maxWidth: '20%',
        textAlign: 'center',
        marginTop: '20px',
        '&:hover': {
            backgroundColor: 'blue',
            color: '#fff',
        },
        [theme.breakpoints.down('md')]: {
            maxWidth: '30%',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '50%'
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: '50%'
        }
    },

  }));



const Login = () => {
    const classes = useStyles();
    const userInput = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const { isFetching, dispatch } = useContext(AuthContext);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!userInput.current.value) return toast.error('Email is required.');
        if(!password.current.value) return toast.error('Password is required.');

        const user = {
            userInput: userInput.current.value,
            password: password.current.value,
        }

        loginCall(user, dispatch, navigate);
  
    }

    return (
        <Mainwrapper>
            <Intro>
                <div className="login">
                    <div className="holder">
                        
                        <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">

                            <TextField id="outlined-basic" type="email" label="Email" variant="outlined" inputRef={userInput} />
                            <TextField id="outlined-basic" type="password" label="Password" variant="outlined" inputRef={password} />

                            <Button type={'submit'} className={classes.btn1} variant="contained">
                                Sign In
                            </Button>

                        </form>
                    </div>
                </div>
            </Intro>
        </Mainwrapper>
    )
}

export default Login;
