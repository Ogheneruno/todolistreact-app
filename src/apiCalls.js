import axios from "axios";
import toast from 'react-hot-toast';
import {useNavigate as navigate} from 'react-router-dom';


export const loginCall = async (userCredentials, dispatch, navigate) => {
    dispatch({type: "LOGIN_START"});

    try {
            let res = await axios.post('https://todolistsreactappapi.herokuapp.com/api/v1/auth/login', userCredentials);
            if (res.data.success) toast.success(res.data.msg);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
            navigate('/todo');

        } catch (err) {

            if (!err.response.data.success) return toast.error(err.response.data.msg);
            dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
}

export const logoutCall = async (userCredentials, dispatch, navigate) => {
    dispatch({type: "LOGOUT_START"});

    try {
            let logOutRes = await axios.get('https://todolistsreactappapi.herokuapp.com/api/v1/auth/logout', userCredentials);
            if (logOutRes.data.success) toast.success(logOutRes.data.msg);
            dispatch({ type: "LOGOUT_SUCCESS", payload: logOutRes.data.data });
            navigate('/login');
        } catch (err) {
            console.log(err);
            // if (!err.response.data.success) return toast.error(err.response.data.msg);
            dispatch({ type: "LOGOUT_FAILURE", payload: err });

    }
}

// try {
//     let signOutRes = 
//     {
//         headers: {
//             'content-type': 'application/json',
//             'access-token': user.token
//         }
//     });
//     if (signOutRes.data.success) return toast.success(signOutRes.data.msg); 
//     navigate('/login');
// } catch (err) {
//     if (!err.response.data.success) return toast.error(err.response.data.msg);   
// }