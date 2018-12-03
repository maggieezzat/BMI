import React from 'react';
import HistoryItem from './HistoryItem/HistoryItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import { connect } from 'react-redux';

class History extends React.Component {

    constructor(props) 
    {
        super(props);

        this.state = {
            history: this.props.bmis
        }
    }

    componentDidMount () {
        this.setState({
            history: this.props.bmis
           //history: localStorage.getItem('history')
        })

        
    }

    render() {

        let historyItems;

        if(this.props.isAuthenticated)
        {
            historyItems = this.state.history.map((historyItem) => {
                var d = historyItem.date;
                d = d.split('T')[0];
                historyItem.date = d;
                return (
                    <div>
                        <HistoryItem key = {Date.now()} date={historyItem.date} bmi={historyItem.bmi} height={historyItem.height} weight ={historyItem.weight}/>
                        <br/>
                        <Divider/>
                    </div>
                );
            });

        }
        else
        {
            historyItems = (
                <label>Login now to check your history!</label>
            )
        }


        return(
            <Card>
                <CardContent>
                    {historyItems}
               </CardContent>
            </Card>
        );

    }
       
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.token !== null,
    };
}

export default connect(mapStateToProps, null)(History);