import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import {types} from '../types/types';


export const authStartLogin =  (email, password) => {
    return async(dispatch) => {
        const data = {
            email,
            password
        }
        const resp  = await fetchWithoutToken('auth', data, 'POST');
        const body  = await resp.json();

        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({uid: body.uid, name: body.name}));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const authStartRegister = (name, email, password) => {
    return async (dispatch) => {
        const data = {
            name,
            email, 
            password
        }
        
        const resp = await fetchWithoutToken('auth/new', data, 'POST');
        const body = await resp.json();
        
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({uid: body.uid, name: body.name}));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        
        const resp = await fetchWithToken('auth/renew');
        const body = await resp.json();
        
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({uid: body.uid, name: body.name}));
        } else {
            dispatch(checkingFinished());
        }
    }
}

export const authLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
    }
}

const checkingFinished = () => ({
    type: types.authCheckingFinished
})

const login = (user) => ({
    type: types.authLogin,
    payload: user
});

const logout = () => ({
    type: types.authLogout
})