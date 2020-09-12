import React, {useState} from 'react';
import {useHttp} from "../hooks/http_hook";

export const AuthPage = () => {
    const {loading, req} = useHttp()
    const [form ,set_form] = useState({
        email: '', pass: ''
    });

    const change_handler = event => {
        set_form({ ...form, [event.target.name]: event.target.value})
    }

    const register_handler = async () => {
        try {
            const data = await req('/api/auth/register', 'POST', {...form})
            console.log('DATA: ', data)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Auth Page</span>
                            <div>
                                <div className="input-field">
                                    <input placeholder="Your  email address" id="email" type="text" name="email"
                                           className="violet-input" onChange={change_handler}/>
                                    <label htmlFor="email">Email</label>

                                    <input placeholder="Your  password" id="pass" type="password" name="password"
                                           className="violet-input" onChange={change_handler}/>
                                    <label htmlFor="email">Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <button className="btn yellow darken-3" style ={{marginRight:10}} disabled={loading}>
                                Sign in
                            </button>
                            <button className="btn grey lighten-1 black-text" onClick={register_handler} disabled={loading}>
                                Register
                            </button>
                        </div>
                    </div>
                </h1>
            </div>
        </div>
    );
}