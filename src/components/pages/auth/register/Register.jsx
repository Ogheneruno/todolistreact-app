import React, { useRef } from 'react';
import axios from 'axios';
import './register.css';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Mainwrapper from '../../../view/Mainwrapper';
import Intro from '../../../Intro';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '85%',
        fontFamily: "'Poppins', sans-serif",
        marginLeft: '12.1rem',
        [theme.breakpoints.down('md')]: {
            marginLeft: '9rem'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: 12
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
        marginLeft: '20rem',
        '&:hover': {
            backgroundColor: 'blue',
            color: '#fff',
        },
        [theme.breakpoints.down('md')]: {
            maxWidth: '30%',
            marginLeft: '15rem',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '50%',
            marginLeft: 5,

        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: '60%'
        }
    },

    textfield: {
       
    }

  }));



const Register = () => {
    const classes = useStyles();
    const fullname = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!fullname.current.value) return toast.error('Username is required.');
        if(!email.current.value) return toast.error('Email is required.');
        if(!password.current.value) return toast.error('Password is required.');

        const user = {
            fullname: fullname.current.value,
            email: email.current.value,
            password: password.current.value,
        }

        try {
            let res = await axios.post('https://todolistsreactappapi.herokuapp.com/api/v1/auth/register', user);
            if (res.data.success) toast.success(res.data.msg);
            navigate("/login");

        } catch (err) {

            if (!err.response.data.success) return toast.error(err.response.data.msg);
            console.log(err.response.data)
        }
  
    }

    return (
        <Mainwrapper>
            <Intro>
                <div className="register">
                    <div className="holder">
                        
                        <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">

                            <TextField className={classes.textfield} id="outlined-basic" type="text" label="Username" variant="outlined" inputRef={fullname} />

                            <TextField id="outlined-basic" type="email" label="Email" variant="outlined" inputRef={email} />

                            <TextField id="outlined-basic" type="password" label="Password" variant="outlined" inputRef={password} />
                            
                            <Button type={'submit'} className={classes.btn1} variant="contained">
                                Sign Up
                            </Button>

                        </form>
                    </div>
                </div>
            </Intro>
        </Mainwrapper>
    )
}

export default Register;
