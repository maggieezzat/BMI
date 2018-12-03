import React from 'react';
import Typography from '@material-ui/core/Typography';

const History = (props) => {
    return(

         <div>
             <br/>
                <Typography variant="h6" color="textPrimary">
                    Date: {props.date}
                </Typography>
                <Typography  color="textSecondary">
                    BMI: {props.bmi}
                </Typography>
                <Typography  color="textSecondary">
                    Height: {props.height}
                </Typography>
                <Typography  color="textSecondary">
                    Weight: {props.weight}
                </Typography>

        </div>

    );
    
    }

export default History;