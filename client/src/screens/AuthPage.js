import React from 'react';

export const AuthPage = () => {
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
                                           className="violet-input"/>
                                    <label htmlFor="email">Email</label>

                                    <input placeholder="Your  password" id="pass" type="password" name="password"
                                           className="violet-input"/>
                                    <label htmlFor="pass">Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <button className="btn yellow darken-3" style ={{marginRight:10}}>
                                Sign in
                            </button>
                            <button className="btn grey lighten-1 black-text">
                                Register
                            </button>
                        </div>
                    </div>
                </h1>
            </div>
        </div>
    );
}