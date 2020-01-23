import React, { Component } from 'react';
import './Login.css'
import Header from '../../common/header/Header'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            usernameRequired: "dispNone",
            username: "",
            passwordRequired: "dispNone",
            password: "",
            loginError: "dispNone",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
        }
    }
    inputUsernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value,
        })
    }
    inputPasswordChangeHandler = (e) => {
        this.setState({
            password: e.target.value,
        })
    }
    loginClickHandler = () => {
        this.setState({ loginError: "dispNone" })
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

        if( this.state.username !== "" && this.state.password !== "" ) {
            if(this.state.username === "admin" && this.state.password === "password" ) {
                sessionStorage.setItem("access-token", '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784');
                this.props.history.push('/home');
            } else {
                this.setState({ loginError: "dispBlock" });
            }
        }
        
    }
    render() {
        return (
            <div>
                <Header {...this.props} showSearchBarAndProfileIcon={false} />
                <div className="login-page-content">
                    <Card className="login-card">
                        <CardContent className="login-card-content">
                            <Typography className="login-card-heading" component="div">
                                LOGIN
                            </Typography>
                            <FormControl className="login-card-form-username" required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl className="login-card-form-password" required>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} />
                                <FormHelperText className={this.state.passwordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormHelperText className={this.state.loginError}>
                                    <span className="red">Incorrect username and/or password</span>
                            </FormHelperText>
                            <br />
                            <Button className="login-card-button" variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Login;