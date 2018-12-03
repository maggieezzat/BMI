import * as actionTypes from '../actions/actionTypes';
import Axios from '../../Axios/Axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userID) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userID', userID);
    //localStorage.setItem();
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userID: userID,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = (token, email, password) => {

    localStorage.removeItem('token');
    localStorage.removeItem('userID');

    let data = {
        email: email,
        password: password,
    }

    var headers = {
        'x-auth': token,
    }

    Axios.delete('/users/logout', {headers, data}).then( (response) => {
        console.log(response)
        }).catch((error) => {
           console.log(error);
        });

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (firstName, lastName, email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        if(isSignup)
        {
            Axios.post('/users/signup', authData).then( (response) => {
                let index = response.data.tokens.length;
                dispatch(authSuccess(response.data.tokens[index-1].token, response.data._id));
                }).catch((error) => {
                    dispatch(authFail(error));
                })

        }
        else //login
        {
            Axios.post('/users/login', authData).then( (response) => {
                let index = response.data.tokens.length;
                console.log(response);
                dispatch(authSuccess(response.data.tokens[index-1].token, response.data._id));
                }).catch((error) => {
                    dispatch(authFail(error));
                })

        }

    };
};

