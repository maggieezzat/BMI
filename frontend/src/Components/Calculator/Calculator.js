import React from 'react';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ErrorSnackbar from '../SnackBar/SnackError';

  
  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
    typography: { useNextVariants: true },
  });

class Calculator extends React.Component {

    constructor(props) 
    {
        super(props);

        this.state = {
            checked: true,
            age: 0,
            weight: 0,
            height: 0,
            gender: 0
        }
       
    }

    handleAge = (event) => {
        this.setState({
            age: event.target.value
        });
    }

    handleWeight = (event) => {
        this.setState({
            weight: event.target.value
        });
    }

    handleHeight = (event) => {
        this.setState({
            height: event.target.value
        });
    }

    handleToggle = (event) => {
        let gen;
        if(event.target.checked)
            gen = 'm';
        else
            gen = 'f';
        this.setState({
            checked: event.target.checked,
            gender: gen            
        })
    }

    handleCalculate = () => {
        if (this.state.age <= 0 || this.state.weight <= 0 || this.state.height <= 0)
        {
            this.errorbar.handleClick();
        }
        else
        {
            this.props.handleCalculate(this.state.weight, this.state.height);
        }
    }
    
    render(){

        return(
            <div>
                <Card>
                    <CardContent>
                        <div className = "column">

                            <div className = "row">
                                <svg width="64" height="64" viewBox="0 0 22 22" >
                                    <path fill=	"#4169E1" d="M9,9C10.29,9 11.5,9.41 12.47,10.11L17.58,5H13V3H21V11H19V6.41L13.89,11.5C14.59,12.5 15,13.7 15,15A6,6 0 0,1 9,21A6,6 0 0,1 3,15A6,6 0 0,1 9,9M9,11A4,4 0 0,0 5,15A4,4 0 0,0 9,19A4,4 0 0,0 13,15A4,4 0 0,0 9,11Z" />
                                </svg>
                                <svg width="64" height="64" viewBox="0 0 22 22" >
                                </svg>
                                <svg width="64" height="64" viewBox="0 0 22 22" >
                                </svg>
                                <Switch
                                    onChange={this.handleToggle}
                                    checked={this.state.checked}
                                    style ={{ color: (this.state.checked)?'pink':'royalblue'}}
                                />
                                <svg width="64" height="64" viewBox="0 0 22 22" >
                                </svg>
                                <svg width="64" height="64" viewBox="0 0 22 22" >
                                </svg>
                                <svg  width="64" height="64" viewBox="0 0 22 22" >
                                    <path fill="#ffb6c1" d="M12,4A6,6 0 0,1 18,10C18,12.97 15.84,15.44 13,15.92V18H15V20H13V22H11V20H9V18H11V15.92C8.16,15.44 6,12.97 6,10A6,6 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z" />      
                                </svg>
                            </div>
                            <br/>
                            <div className = "row">
                                <MuiThemeProvider theme={theme}>
                                    <TextField
                                    label="Age"
                                    variant="outlined"
                                    id="mui-theme-provider-outlined-input"
                                    onChange = {this.handleAge}
                                    type="number" 
                                    />
                                </MuiThemeProvider>
                            </div>
                            <br/>
                            <div className = "row">
                                <MuiThemeProvider theme={theme}>
                                    <TextField
                                    label="Height"
                                    variant="outlined"
                                    id="mui-theme-provider-outlined-input"
                                    onChange = {this.handleHeight}
                                    type="number"
                                    />
                                </MuiThemeProvider>
                            </div>
                            <br/>
                            <div className = "row">
                                <MuiThemeProvider theme={theme}>
                                    <TextField
                                    label="Weight"
                                    variant="outlined"
                                    id="mui-theme-provider-outlined-input"
                                    onChange = {this.handleWeight}
                                    type="number"
                                    />
                                </MuiThemeProvider>
                            </div>
                            <br/>
                        </div>
                    </CardContent>
                    <div className="row" style = {{display: 'flex'}}>
                        <div className="column" style = {{flex: '45%'}} >
                        </div>
                        <div className="column" style = {{flex: '55%'}} >
                            <CardActions>
                                <Button variant="contained" color="primary" className="center" onClick = {this.handleCalculate} >
                                    Calculate
                                </Button>
                            </CardActions>
                            <br/>
                        </div>
                    </div>
                    
                </Card>

                <ErrorSnackbar
                    onRef={ref => this.errorbar = ref}
                    message="Please Enter Valid Data!"
                />
            </div>
    );
}
}

export default Calculator;