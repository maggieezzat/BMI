import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Calculator from '../Calculator/Calculator';
import History from '../History/History';
import Score from '../Score/Score';
import Auth from '../Auth/Auth';
import Button from '@material-ui/core/Button';
import * as actions from '../../store/actions/auth';

import { connect } from 'react-redux';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class Layout extends React.Component {

    constructor(props) 
    {
        super(props);

        this.state = {
            history: false,
            calculator: false,
            score: false,
            auth: true,
            weight: 0,
            height: 0,

            email: null,
            password: null,

            bmis: []
        }
    }

    calculatorHandler = () => {
        this.setState({
            history:false,
            calculator:true,
            score: false,
            auth: false,
            } );

    }

    historyHandler = () => {
       this.setState({
            history:true,
            calculator:false,
            score: false,
            auth: false} );
        
    }

    authHandler = () => {
        this.setState({
            history:false,
            calculator:false,
            score: false,
            auth: true} );
    }

    saveBMIInputs = (weight, height) => {
        
        this.setState({
            history: false,
            calculator: false,
            score: true,
            auth: false,
            weight: weight,
            height: height
        });
        
    }

    setEmailAndPassword = (email, password) => {
        this.state.email = email;
        this.state.password = password;
    }

    logoutUser = () => {
        this.props.onLogout(this.props.token, this.state.email, this.state.password);
        this.state.auth = true;
        this.state.calculator = false;
        this.state.history = false;
        this.state.score = false;

    }

    updateBMIs = (bmiArr) => {
        this.setState({
            bmis: bmiArr
        })
        //localStorage.setItem('history', bmiArr);

    }

    render(){
        const { classes } = this.props;

        let currentComponent = null;

        if(this.state.calculator)
        {
            currentComponent = (
                <Calculator handleCalculate={(weight, height) => this.saveBMIInputs(weight, height)}/>
            )
        }

        if(this.state.history)
        {
            currentComponent = (
                <History bmis = {this.state.bmis}/>
            )
        }

        if(this.state.score)
        {
            currentComponent = (
                <Score  back={this.calculatorHandler} weight={this.state.weight} height = {this.state.height} bmis = {this.state.bmis}
                updateBMIs = {(bmiArr) => this.updateBMIs(bmiArr)}/>
            )
        }

        if(this.state.auth && !this.props.isAuthenticated)
        {
            currentComponent = (
                <Auth setEmailAndPassword={(email, password) => this.setEmailAndPassword(email, password)}/>
            )
        }

        if(this.state.auth && this.props.isAuthenticated)
        {
            this.state.auth = false;
            this.state.calculator = true;
            this.state.history = false;
            this.state.score = false;

            currentComponent = (
                <Calculator handleCalculate={(weight, height) => this.saveBMIInputs(weight, height)}/>
            )
        }

        let button = null;

        if(this.props.isAuthenticated)
            button = (<Button onClick={this.logoutUser}>Logout</Button>)
        else
            button = (<Button onClick={this.authHandler}>Login/SignUp</Button>)


    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
                BMI Calculator
            </Typography>
            {button}
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button key='Calculator' onClick={this.calculatorHandler}>
                <ListItemText primary='Calculator' />
                </ListItem>
                <ListItem button key='History' onClick={this.historyHandler}>
                <ListItemText primary='History' />
                </ListItem>
            </List>
            <Divider />
            
        </Drawer>
        <main className={classes.content}>
        <div className={classes.toolbar} />

            {currentComponent}
            
        </main>
        </div>
    );

    }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
    token: state.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: (token, email, password) => dispatch( actions.logout(token, email, password) )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Layout));