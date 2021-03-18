import React, { Component, Fragment } from 'react'
import { Typography } from 'rmwc/Typography'
import { connect } from 'react-redux'
import * as applicationApisActionCreators from '../../store/actions/applicationApis'

import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon,
  ToolbarFixedAdjust,
} from 'rmwc/Toolbar'
import { ButtonIcon } from 'rmwc/Button'
import { Icon } from 'rmwc/Icon'
import Button from '@material-ui/core/Button';



import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    switch (event.target.id) {
      case 'USER':
        this.setState({
          user: event.target.value,
        })
        break

      case 'PASS':
        this.setState({
          password: event.target.value,
        })
        break
    }
  }

  handleSubmit() {
    this.props.gpitConnect({
      username: this.state.user,
      password: this.state.password,
    })
  }

  render() {
    return (
      
      <Fragment>
        <Toolbar style={{ backgroundColor: 'rgb(56, 90, 161)' }}>
          <ToolbarRow>
            <ToolbarTitle style={{ fontSize: '2.25rem' }}>Login</ToolbarTitle>
          </ToolbarRow>
        </Toolbar>
        <ToolbarFixedAdjust>
        <Grid container spacing={24}>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={10}>
          <Paper ><Typography use="title">
                <center  style={{marginBottom: "20px"}}><Icon strategy="ligature" use="info_outline"  style={{marginTop: "20px"}}/><br/>
                Veuillez saisir votre login et mot de passe pour vous connecter</center>
              </Typography>
              <Grid item xs={12}>
              <center><TextField
                id="USER"
                value={this.state.user}
                onChange={this.handleChange}
                label="Identifiant"
                type="text"
                autoComplete="current-user"
                margin="normal"
              /></center>
              </Grid>
              <Grid item xs={12}>
              <center><TextField
                id="PASS"
                label="Mot de passe"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                autoComplete="current-password"
                margin="normal"
              /></center>
              </Grid>
              <Grid item xs={12}>
              <center><Button 
                        style={{backgroundColor: "#00000014", marginTop: "40px", marginBottom: "20px"}}
                        onClick={this.handleSubmit}>
                  Se connecter
                </Button></center>
              </Grid>
          </Paper>
        </Grid>
        
      
        <Grid item xs={1}>
        </Grid>
        
        
      </Grid>
          {/* <Grid>
            <GridCell span="4">
              <Typography use="title">
                <Icon strategy="ligature" use="info_outline" />
                Veuillez saisir votre login et mot de passe pour vous connecter
              </Typography>
            </GridCell>
          </Grid>
          <Grid>
            <GridCell span="1" />
            <GridCell span="2" align="middle">
              <TextField
                label="Nom d'utilisateur..."
                id="USER"
                value={this.state.user}
                onChange={this.handleChange}
              />
              <br />
              <TextField
                type="password"
                id="PASS"
                label="Mot de passe..."
                value={this.state.password}
                onChange={this.handleChange}
              />
            </GridCell>
            <GridCell span="1" />
            <GridCell span="1" />
            <GridCell span="2" align="middle">
              <Button
                onClick={this.handleSubmit}
                raised
                style={{ width: '100%', backgroundColor: '#f27308' }}
              >
                Se Connecter
              </Button>
            </GridCell>
          </Grid> */}
        </ToolbarFixedAdjust>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    connected: state.applicationApi.connected,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gpitConnect: user =>
      dispatch(applicationApisActionCreators.gpitConnect(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
