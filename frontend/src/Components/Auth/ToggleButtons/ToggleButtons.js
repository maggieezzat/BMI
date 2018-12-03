import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


const styles = theme => ({
  toggleContainer: {
    height: 60,
    width: '50%',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'block',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: `${theme.spacing.unit}px 0`,
  },
});

class ToggleButtons extends React.Component {
  state = {
    alignment: 'left',
    formats: ['bold'],
  };

  handleFormat = (event, formats) => this.setState({ formats });

  handleAlignment = (event, alignment) => {
      this.props.handleSwitch();
      this.setState({ alignment });
  }

  render() {
    const { classes } = this.props;
    const { alignment } = this.state;

    return (

          <div className={classes.toggleContainer} style={{margin:'auto', height: '100px'}}>
            <ToggleButtonGroup value={alignment} exclusive onChange={this.handleAlignment}  style={{ height: '50px'}}>
              <ToggleButton value="left" style={{ height: '50px', width: '50%'}}>
                    <label>Sign Up</label>
              </ToggleButton>
              <ToggleButton value="right" style={{ height: '50px', width: '50%'}}>
                    <label>Login</label>
              </ToggleButton>

            </ToggleButtonGroup>
          </div>

    );
  }
}

ToggleButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToggleButtons);