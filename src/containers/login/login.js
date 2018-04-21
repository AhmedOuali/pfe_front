import React, { Component, Fragment } from 'react'
import { Typography } from 'rmwc/Typography'
import { connect } from 'react-redux'


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
              <TextField label="Nom d'utilisateur..." />
              <br />
              <TextField type="password" label="Mot de passe..." />
            </GridCell>
            <GridCell span="1" />
            <GridCell span="1" />
            <GridCell span="2" align="middle">
              <Button
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

export default Login
