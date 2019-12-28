import React, { useState } from 'react';

const UserSignupPage = props => {
    const [user, setUser] = useState({
        username: '',
        displayName: '',
        password: '',
        passwordRepeat: '',
        pendingApiCall: false,
    });

    const onChange = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const onClickSignup = () => {
        setUser({
            ...user,
            pendingApiCall: true,
        });
        props.actions
            .postSignup(user)
            .then(response => {
                setUser({
                    ...user,
                    pendingApiCall: false,
                });
            })
            .catch(error => {
                setUser({
                    ...user,
                    pendingApiCall: false,
                });
            });
    };

    const {
        username,
        displayName,
        password,
        passwordRepeat,
        pendingApiCall,
    } = user;

    return (
        <div className="container">
            <h1 className="text-center">Sign Up</h1>
            <div className="col-12 mb-3">
                <label>Display Name</label>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Your display name"
                    name="displayName"
                    onChange={onChange}
                    value={displayName}
                />
            </div>
            <div className="col-12 mb-3">
                <label>Username</label>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Your username"
                    name="username"
                    onChange={onChange}
                    value={username}
                />
            </div>
            <div className="col-12 mb-3">
                <label>Password</label>
                <input
                    className="form-control"
                    type="password"
                    placeholder="Your password"
                    name="password"
                    onChange={onChange}
                    value={password}
                />
            </div>
            <div className="col-12 mb-3">
                <label>Password Repeat</label>
                <input
                    className="form-control"
                    type="password"
                    placeholder="Repeat your password"
                    name="passwordRepeat"
                    onChange={onChange}
                    value={passwordRepeat}
                />
            </div>
            <div className="text-center">
                <button
                    className="btn btn-primary"
                    onClick={onClickSignup}
                    disabled={pendingApiCall}
                >
                    {pendingApiCall && (
                        <div className="spinner-border text-light spinner-border-sm mr-sm-1">
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
                    Sign Up
                </button>
            </div>
        </div>
    );
};

UserSignupPage.defaultProps = {
    actions: {
        postSignup: () =>
            new Promise((resolve, reject) => {
                resolve({});
            }),
    },
};

export default UserSignupPage;
