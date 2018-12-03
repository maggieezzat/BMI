import React from 'react';
import Typography from '@material-ui/core/Typography';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import green from '@material-ui/core/colors/green';


const theme = createMuiTheme({
    palette: {
      primary: green,
    },
    typography: { useNextVariants: true },
  });


class Login extends React.Component {

    constructor(props) 
    {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    render(){
        return(
            <div>
                <Typography variant="h4" color="textPrimary">
                    Login With Email!
                </Typography>
                <br/>
                <br/>
                
                <div className = "row">
                    <MuiThemeProvider theme={theme}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            id="Email-Login"
                            onChange={this.props.handleEmail}
                            style= {{width: '48%'}}
                        />
                    </MuiThemeProvider>
                </div>
                <br/>
                <br/>
                <div className = "row">
                    <MuiThemeProvider theme={theme}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            id="Password-Login"
                            onChange={this.props.handlePassword}
                            type = "password"
                            style= {{width: '48%'}}
                        />
                    </MuiThemeProvider>
                    <br/>
                </div>
                <br/>
                <br/>
            </div>
        );
    }
}

export default Login;