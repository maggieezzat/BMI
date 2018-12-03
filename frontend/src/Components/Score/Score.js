import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import API from '../../API/API';
import Axios from '../../Axios/Axios';

import { connect } from 'react-redux';


class Score extends React.Component {

    constructor(props) 
    {
        super(props);
        this.API = new API();
        this.state = {
            bmi: 0.00,
            color: "white",
            weight: 0.00,
            height: 0.00
        }
       
    }

    componentDidMount() {

        this.state.height = this.props.height / 100;
        this.state.weight = this.props.weight;

        this.API.getBMI(this.state.weight, this.state.height).then((response) => {

            let c = "white";
            if (response.data.result < 18.5)
            c = "royalblue"; 
            else if(response.data.result <= 25)
                c = "mediumseagreen";
            else if(response.data.result <= 30)
                c = "gold";
            else if(response.data.result <= 35)
                c = "orange";
            else if(response.data.result <= 40)
                c = "red";
            else 
                c = "darkred";
            this.setState({
                bmi: (response.data.result).toFixed(2),
                color: c
            });
            
        });
    }

    backHandler = () => {
        this.props.back();
    }

    saveHandler = () => {

        let body = {
            bmi: this.state.bmi, 
            weight: this.state.weight, 
            height: this.state.height

        }

        var headers = {
            'x-auth': this.props.token,
        }

        Axios.patch(`/users/save/${this.props.id}`, {body}, {headers: headers}).then((response) => {
            console.log(response)
            this.props.updateBMIs(response.data.updatedUser.bmis);
        }).catch((error) => {
            console.log(error);
        })

    }

    render() {

        let save;
        if(this.props.isAuthenticated)
        {
            save = (
            <Button variant="contained" color="primary" onClick={this.saveHandler}>
                Save
            </Button>    
            )
        }

        return(

            <Card>
                <CardContent>
                    <div className = "column">
                        <Typography variant="h6" color="primary">
                            Your BMI Score:
                        </Typography>
                        <br/>
                        <Card style= {{backgroundColor: this.state.color }}>
                            <CardContent>
                                <Typography variant="h4" color="textPrimary" style = {{color: 'white', fontWeight: 'bold'}}>
                                    {this.state.bmi}
                                </Typography>
                            </CardContent>
                        </Card>
                        <br/>
                        <Card>
                            <CardContent>
                                <div className="row" style = {{display: 'flex'}}>
                                    <div className="column" style = {{flex: '50%'}}>
                                        <label style = {{color: 'royalblue'}}> Underweight </label>
                                    </div>
                                    <div className="column" style = {{flex: '50%'}}>
                                        <label style = {{color: 'royalblue'}}> less than 18.5 </label>
                                    </div>
                                </div>
                                <div className="row" style = {{display: 'flex'}}>
                                    <div className="column" style = {{flex: '50%'}}>
                                        <label style = {{color: 'mediumseagreen'}}> Normal </label>
                                    </div>
                                    <div className="column" style = {{flex: '50%'}}>
                                        <label style = {{color: 'mediumseagreen'}}> 18.5 - 25 </label>
                                    </div>
                                </div>
                                <div className="row" style = {{display: 'flex'}}>
                                    <div className="column" style = {{flex: '50%'}}>
                                        <label style = {{color: 'gold'}}> Overweight </label>
                                    </div>
                                    <div className="column" style = {{flex: '50%'}}>
                                        <label style = {{color: 'gold'}}> 25 - 30 </label>
                                    </div>
                                </div>
                                <div className="row" style = {{display: 'flex'}}>
                                    <div className="column" style = {{flex: '50%'}}>
                                        <label style = {{color: 'orange'}}> Obese </label>
                                    </div>
                                    <div className="column" style = {{flex: '50%'}}>
                                        <label style = {{color: 'orange'}}> 30 - 35 </label>
                                    </div>
                                </div>
                                <div className="row" style = {{display: 'flex'}}>
                                    <div className="column" style = {{flex: '50%'}}>
                                        <label style = {{color: 'red'}}> Severly Obese </label>
                                    </div>
                                    <div className="column" style = {{flex: '50%'}}>
                                        <label style = {{color: 'red'}}> 35 - 40 </label>
                                    </div>
                                </div>
                                <div className="row" style = {{display: 'flex'}}>
                                    <div className="column" style = {{flex: '50%'}}>
                                        <label style = {{color: 'firebrick'}}> Very Severly Obese  </label>
                                    </div>
                                    <div className="column" style = {{flex: '50%'}}>
                                        <label style = {{color: 'firebrick'}}> greater than 40  </label>
                                    </div>
                                </div>
                                
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
                <div className="row" style = {{display: 'flex'}}>
                    <div className="column" style = {{flex: '95%'}}>
                        <CardActions>
                            <Button variant="contained" color="secondary" onClick={this.backHandler}>
                                Back
                            </Button>
                        </CardActions>
                    </div>
                    <div className="column" style = {{flex: '5%'}} >
                        <CardActions>
                            
                            {save}   
                        </CardActions>
                    </div>
                </div>
            </Card>

        );
    }


}


const mapStateToProps = state => {
    return {
        error: state.error,
        isAuthenticated: state.token !== null,
        id: state.userID,
        token: state.token
    };
};

export default connect( mapStateToProps, null )( Score );
