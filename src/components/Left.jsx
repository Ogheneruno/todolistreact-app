import { Avatar, makeStyles } from '@material-ui/core';
import React, { useState, useContext } from 'react';
import Todo from './Todo';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import { Cancel } from '@material-ui/icons';
import { ExitToAppOutlined } from '@material-ui/icons';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useNavigate as navigate } from 'react-router-dom';
import {logoutCall} from '../apiCalls';



const useStyles = makeStyles((theme) => ({
    left: {
        margin: '16%',
        padding: '40px',
        [theme.breakpoints.down("md")]: {
          width: '16vw',
          padding: 0,
          margin: '35% auto 0'
        }
    },

    avatar: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },

    /* Arrow */
    select: {
        marginTop: '40%',
        overflow: 'hidden',
        fontFamily: "'Poppins', sans-serif",
    },

    filterTodo: {
        left: '8%',
        padding: '0.6rem',
        cursor: 'pointer',
        borderRadius: 7,
        width: '100%',

    },

    imageUpload: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    },

    signOut: {
        position: 'absolute',
        bottom: '4%',
        left: '8.5%',
        fontFamily: "'Poppins', sans-serif",
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            left: '3.5%'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 7,
            left: '1%'
        }
    }

  }));



const Left = () => {
    const classes = useStyles();
    const [image, setImage] = useState(null);
    const { user } = useContext(AuthContext);
    const { isFetching, dispatch } = useContext(AuthContext);


    const addImage = async (e) => {
        setImage(e.target.files[0]);
    };

    const submitProfilePic = async () => {
        if (image) {
            const data = new FormData();
            data.append("profilePic", image);
            data.append("mediaType", "image");

            try {
                let avatarRes = await axios.post('https://todolistsreactappapi.herokuapp.com/api/v1/user/update-avatar', 
                data,
                {
                    headers: {
                        'content-type': 'application/json',
                        'access-token': user.token
                    }
                });
                if (avatarRes.data.success) return toast.success(avatarRes.data.msg); 
            } catch (err) {
                if (!err.response.data.success) return toast.error(err.response.data.msg);   
            }
        }
    }

    const handleSignOut = async () => {
        localStorage.removeItem("user");
		window.location.href = "/login";

        // logoutCall(user, dispatch, navigate);
        
    };

    // const [status, setStatus] = useState('all');
    // const [filteredTodos, setFilteredTodos] = useState([]);
    // const [todos, setTodos] = useState([]);


    // useEffect(() => {
    //     filterHandler();
    // }, [todos, status]);
    
    // const filterHandler = () => {
    //     switch (status) {
    //         case 'completed':
    //             setFilteredTodos(
    //                 todos.filter((item) => item.completed === true)
    //             );
    //             break;
    //         case 'uncompleted':
    //             setFilteredTodos(
    //                 todos.filter((item) => item.completed === false)
    //             );
    //             break;
    //         default:
    //             setFilteredTodos(todos);
    //             break;
    //     }
    // };

    // const statusHandler = (ev) => {
    //     setStatus(ev.target.value);
    // };

    return (
        <div className={classes.left}>

            {
                image && (
                    <div style={{width: '100%', height: '100%'}}>
                        <img style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '100%'}} src={URL.createObjectURL(image)} alt=""/>
                        <div style={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
                        <CloudUploadIcon style={{cursor: 'pointer', color: '#ccc'}} type='submit' onClick={submitProfilePic} />
                        <Cancel style={{cursor: 'pointer', color: '#ccc'}} type='submit' onClick={() => setImage(null)} />
                        </div>
                    </div>
                )
            }

            <Avatar src={user ? user.user.avatar : ''} className={classes.avatar} />

            <h2 style={{fontFamily: "'Poppins', sans-serif", color: '#ccc', fontSize: '0.9rem'}}>{user ? user.user.fullname : ''}</h2>

            <form>
                <div className={classes.select}>
                    {/* <select
                        // onChange={statusHandler}
                        name="todos"
                        className={classes.filterTodo}
                    >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select> */}
                    <div style={{marginTop: '1rem'}}>
                        <label htmlFor="media" syle={{cursor: 'pointer'}}>
                            <PermMediaIcon htmlColor="#ccc" />
                            <span className={classes.imageUpload} style={{color: "#ccc", fontSize: '10.3px', marginLeft: '.5rem'}}>Upload Image</span>
                            <input type="file" id="media" accept="image/*" style={{display:"none"}}
                            onChange={addImage}
                            />
                        </label>
                    </div>
                </div>
            </form>

            <label style={{cursor: 'pointer', color: '#ccc'}} onClick={handleSignOut} className={classes.signOut}>
                <ExitToAppOutlined />
                <span style={{marginLeft: '.11rem', fontSize: '0.62rem'}}>Sign Out</span>
            </label>
            
        </div>
    )
}

export default Left;
