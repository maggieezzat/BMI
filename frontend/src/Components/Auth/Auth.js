import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ErrorSnackbar from '../SnackBar/SnackError';
import ToggleButtons from './ToggleButtons/ToggleButtons';
import SignUp from './SignUp';
import Login from './Login';

import * as actions from '../../store/actions/auth';

import { connect } from 'react-redux';


class Auth extends React.Component {

    constructor(props) 
    {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            signUp: true,
        }
    }

    handleFirstName = (event) => {
        this.setState({
            firstName: event.target.value
        });
    }

    handleLastName = (event) => {
        this.setState({
            lastName: event.target.value
        });
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleSwitch = () => {
        let signUp;
        if (this.state.signUp === true)
            signUp = false;
        else
            signUp = true;
        this.setState({
            signUp,
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        })
    }

    handleSignup = () => {
        if ( (this.state.signUp && (this.state.firstName === "" || this.state.lastName === "") ) 
            || this.state.email === "" || this.state.password.length < 6 )
        {
            this.errorbar.handleClick();
        }
        else
        {
            this.props.setEmailAndPassword(this.state.email, this.state.password);
            this.props.onAuth(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.signUp);  
        }
    }

    render(){

        if(this.props.error)
        {
            this.errorbar.handleClick();
        }

        let component;
        let buttonText;
        if(this.state.signUp)
        {
            component = (
                <SignUp 
                    handleFirstName={this.handleFirstName}
                    handleLastName={this.handleLastName}
                    handleEmail={this.handleEmail}
                    handlePassword={this.handlePassword}
                    />
            );
            buttonText = "Sign Up";
        }
        else
        {
            component = (
                <Login
                    handleEmail={this.handleEmail}
                    handlePassword={this.handlePassword}
                />
            );
            buttonText = "Login";
        }

        return(
            <div>
                <Card>
                    <CardContent>
                        <br/>
                        <br/>
                        <ToggleButtons handleSwitch={this.handleSwitch}/>
                        {component}
                        <br/>
                        <br/>
                        <div className="row" style = {{display: 'flex'}}>
                            <div className="column" style = {{flex: '45%'}} >
                            </div>
                            <div className="column" style = {{flex: '55%'}} >
                                <CardActions>
                                    <Button variant="contained" color="primary" className="center" onClick = {this.handleSignup} >
                                        {buttonText}
                                    </Button>
                                </CardActions>
                                <br/>
                            </div>
                        </div>
                        
                        <br/>
                        <br/>
                </CardContent>
            </Card>
            <ErrorSnackbar
                onRef={ref => this.errorbar = ref}
                message="Please Enter Valid Data!"
            />
        </div>

        );
    }

}


const mapStateToProps = state => {
    return {
        error: state.error,
        isAuthenticated: state.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (firstName, lastName, email, password, isSignup ) => dispatch( actions.auth(firstName, lastName, email, password, isSignup ) ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );
