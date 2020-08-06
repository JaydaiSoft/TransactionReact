import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import { Grid } from "@material-ui/core";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  button: {
    margin: 5,
    width: 90,
  },
};

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Grid justify="space-between" container spacing={24}>
            <Grid item>
              <Typography
                usenextvariants="true"
                variant="h6"
                color="inherit"
                className={classes.title}
              >
              </Typography>
              <Tabs>
                <NavLink style={{ color: "white" }} to="/Home">
                  <Tab label="Home" color="inherit" />
                </NavLink>
                <NavLink style={{ color: "white" }} to="/TransactionUpload">
                  <Tab label="Transaction Upload" color="inherit" />
                </NavLink>
              </Tabs>
            </Grid>
          </Grid>
        </AppBar>
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Nav)
