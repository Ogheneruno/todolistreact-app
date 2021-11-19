import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';





const useStyles = makeStyles((theme) => ({
    intro: {
        background: 'white',
        margin: '4% 4% 0.2%',
        borderRadius: '30px',
        wordWrap: 'break-word',
        fontFamily: "'Poppins', sans-serif",
        padding: 30,
        fontWeight: 'bold',
        [theme.breakpoints.down('md')]: {
            margin: '1%',
        },
        [theme.breakpoints.down('sm')]: {
            padding: 20,
        },
        [theme.breakpoints.down('xs')]: {
            padding: 10,
        }
    },

    header: {
        fontSize: '4rem',
        marginBottom: 10,
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1rem',
        }
    },

    text: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 300,
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.7rem',
        }
    },

    auth: {
        display: 'flex',
        gap: 80,
        fontFamily: "'Poppins', sans-serif",
        textShadow: '2px 2px 8px rgba(0, 0, 0,.6)',
        justifyContent: 'center',
        paddingBottom: '10px',
        margin: '0 30%',
        fontSize: '90%',
        color: '#333',
        fontWeight: 'bold',
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
            gap: 60,
        }
    },

    h3: {
        color: '#ccc',
        marginBottom: 0,
        marginTop: '8%',
        '&:active': {
            borderBottom: '4px solid #3f51b5',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '.5rem',
            marginTop: '5%',
            fontWeight: 'bold',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '.25rem',
            marginTop: '8%',
            fontWeight: 'bold',
        }
    },
  }));



const Intro = ({children}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);



    const switchSignIn = () => {
        navigate('/login');
    };
  
    const switchSignUp = () => {
        navigate('/register');
    };

    const active = {
		borderBottom: "2px solid rgb(67, 67, 253)",
	};

	const inactive = {
		borderBottom: "none",
	};

    return (
        <>
            <div className={classes.intro}>
                <header className={classes.header}>
                    TODO APP
                </header>

                <Typography className={classes.text}>
                    Plan and maintain your day-to-day tasks with this amazing app that helps 
                    you stay focused on the tasks that are most important.
                </Typography>
            </div>

            {
                user ?
                <>
                <div className={classes.signIn}>
                    {children}
                </div>
                </> :
                <>
                <div className={classes.auth}>
                    <h3 style={switchSignIn ? inactive : active} className={classes.h3} onClick={switchSignIn}>Sign In</h3>
                    <h3 style={switchSignUp ? inactive : active} className={classes.h3} onClick={switchSignUp}>Sign Up</h3>
                </div>
                
                <div className={classes.signIn}>
                    {children}
                </div>
                </>
            }
        </>    
    )
}

export default Intro;
