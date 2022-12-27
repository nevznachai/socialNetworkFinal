import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, Input } from "../Common/FormsControls/FormsControls";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import styles from './../Common/FormsControls/FormsControls.module.css';

const LoginForm = ({ handleSubmit, error }) => {                                                      // убираем props вставлем свойства
    return (
        <form onSubmit={handleSubmit} >
            {createField("email", "email", Input, [required])}
            {createField("password", "password", Input, [required], { type: "password" })}
            {createField(null, "rememberMe", Input, [], { type: "checkbox" }, "remember me")}
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return (
            <Navigate to={'/profile'} />
        )
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})





export default connect(mapStateToProps, { login })(Login);