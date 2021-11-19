export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS"
});

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
});



export const LogoutStart = (userCredentials) => ({
    type: "LOGOUT_START"
});

export const LogoutSuccess = (user) => ({
    type: "LOGOUT_SUCCESS"
});

export const LogoutFailure = () => ({
    type: "LOGOUT_FAILURE"
});