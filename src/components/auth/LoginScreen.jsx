import React from 'react';
import './login.css';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { authStartLogin, authStartRegister } from '../../actions/auth';
import Swal from 'sweetalert2';

export const LoginScreen = () => {
    
    const dispatch = useDispatch();
    const [loginValues, handleLoginInputChange, loginReset] = useForm({
        lEmail: '',
        lPassword: ''
    });
    const {lEmail, lPassword}  = loginValues;

    const [registerValues, handleRegisterInputChange, registerReset] = useForm({
        rName: '',
        rEmail: '',
        rPassword: '',
        rPassword2: ''
    });
    const {rName, rEmail, rPassword, rPassword2}  = registerValues;


    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(authStartLogin(lEmail, lPassword));
    }
    const handleRegister = (e) => {
        e.preventDefault();
        if(rPassword !== rPassword2){
            return Swal.fire('Error', 'Passwords must match!', 'error');
        }
        else{
            dispatch(authStartRegister(rName, rEmail, rPassword));
        }
    }
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                                />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange}
                                />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                                />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                                name="rPassword"
                                value={rPassword}
                                onChange={handleRegisterInputChange}
                                />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat Password" 
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                                />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}