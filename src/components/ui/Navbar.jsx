import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../../actions/auth';
import { eventLogout } from '../../actions/event';

export const Navbar = () => {

    const dispatch = useDispatch();
    const {name} = useSelector( state => state.auth );    
    const handleLogout = () => {
        dispatch(authLogout());
        dispatch(eventLogout());
    }
    return (
        <div className='navbar navbar-dark bg-dark mb-4'>
            <span className='navbar-brand'>
                {name}
            </span>
            <button onClick={handleLogout} className='btn btn-outline-danger'>
                <i className='fas fa-sign-out-alt'></i>
                <span> Logout</span>
            </button>
        </div>
    )
}