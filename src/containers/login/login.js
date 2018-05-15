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
import { Button, ButtonIcon } from 'rmwc/Button'
import { Icon } from 'rmwc/Icon'
import { Grid, GridCell } from 'rmwc/Grid'

import { TextField } from 'rmwc/TextField'

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
        <Toolbar style={{ backgroundColor: '#d1021a' }}>
          <ToolbarRow>
            <ToolbarTitle style={{ fontSize: '2.25rem' }}>Login</ToolbarTitle>
          </ToolbarRow>
        </Toolbar>
        <ToolbarFixedAdjust>
          <Grid>
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
          </Grid>
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
