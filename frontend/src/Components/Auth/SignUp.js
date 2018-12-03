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


class SignUp extends React.Component {

    constructor(props) 
    {
        super(props);
    }

    render(){
        return(
            <div>
                <Typography variant="h4" color="textPrimary">
                    Sign Up For Free!
                </Typography>
                <br/>
                <br/>
                <div className = "row">
                    <MuiThemeProvider theme={theme}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            id="First-Name-SignUp"
                            onChange={this.props.handleFirstName}
                            style= {{width: '23%'}}
                       />
                    </MuiThemeProvider>
                    <svg width="20" height="32">
                    </svg>
                    <MuiThemeProvider theme={theme}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            id="last-Name-SignUp"
                            onChange={this.props.handleLastName}
                            style= {{width: '23%'}}
                        />
                    </MuiThemeProvider>
                </div>
                <br/>
                <div className = "row">
                    <MuiThemeProvider theme={theme}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            id="Email-SignUp"
                            onChange={this.props.handleEmail}
                            style= {{width: '48%'}}
                        />
                    </MuiThemeProvider>
                </div>
                <br/>
                <div className = "row">
                    <MuiThemeProvider theme={theme}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            id="Password-SignUp"
                            onChange={this.props.handlePassword}
                            style= {{width: '48%'}}
                            type= "password"
                        />
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}

export default SignUp;