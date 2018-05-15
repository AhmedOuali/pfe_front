import React, { Component, Fragment } from 'react'
import Header from './workspace/header/header'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    Link
  } from 'react-router-dom'
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon,
  ToolbarFixedAdjust,
} from 'rmwc/Toolbar'
import { Menu, MenuItem, MenuAnchor } from 'rmwc/Menu'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card'
import { CardPrimaryAction } from 'rmwc/Card'

import { ListDivider } from 'rmwc/List'
import { Icon } from 'rmwc/Icon'
import { Typography } from 'rmwc/Typography'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
          user: '',
          password: '',
        }

      }
      
  render() {
    var iconStyle = {
      fontSize: '36px',
      marginTop: '-35px',
    }
    const linkStyle = {
      textDecoration: 'none',
      color: 'black',
      ':hover': {
        textDecoration: 'none',
        color: 'black',
      },
      ':visited': {
        textDecoration: 'none',
        color: 'black',
      },
    }

    return (
      <Fragment>
        <Toolbar id="Toolbar" style={{ backgroundColor: '#d1021a' }} fixed>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarMenuIcon>
                <i
                  className="material-icons"
                  style={{ fontSize: '40px', marginTop: '-13px' }}
                >
                  account_circle
                </i>
              </ToolbarMenuIcon>
              <ToolbarTitle style={{ fontSize: '1rem' }}>
                Mohamed DAI
              </ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <ToolbarIcon use="search" style={{ marginTop: '-20px' }} />
              <MenuAnchor>
                <Menu anchorCorner="bottomRight">
                  <MenuItem>Cookies</MenuItem>
                  <MenuItem>Notifications (ON)</MenuItem>
                  <MenuItem>LogOut</MenuItem>
                </Menu>
                <ToolbarIcon use="more_vert" style={{ marginTop: '-20px' }} />
              </MenuAnchor>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <ToolbarFixedAdjust>
          <div
            style={{
              backgroundColor: 'rgb(242, 115, 8)',
              zIndex: '0',
              height: '130px',
              paddingTop: '1px',
            }}
          >
            <h1
              style={{ fontSize: '27px', color: 'white', paddingLeft: '10px' }}
            >
              <i
                className="material-icons"
                style={{ fontSize: '40px', marginTop: '-13px', color: 'white' }}
              >
                home
              </i>
              Home
            </h1>

            <Card
              style={{ height: '480px', margin: '10px', marginTop: '10px' }}
            >
              <Typography
                use="subtitle1"
                tag="div"
                style={{
                  padding: '1.5rem 1rem',
                  fontSize: '25px',
                  textAlign: 'center',
                }}
                theme="text-primary-on-light"
              >
                Bienvenue, Mohamed !
              </Typography>
              <Typography
                use="headline5"
                tag="div"
                style={{ padding: '0.5rem 0.5rem', textAlign: 'center' }}
                theme="text-secondary-on-background"
              >
                Bienvenue, Mohamed !
              </Typography>

              <ListDivider />
              <Link to="/embauche" style={linkStyle}>
              <CardPrimaryAction id="EMBAUCHE" >
                <div
                  style={{
                    padding: '1rem',
                    height: '150px',
                    backgroundColor: '#e4e4e466',
                  }}
                >
                  <Typography use="headline4" style={{fontSize:"20px"}} tag="div">
                    Embaucher un salarié 
                  </Typography>
                  <Typography
                    use="body1"
                    tag="p"
                    theme="text-secondary-on-background"
                  >
                    , Copper price soars amid global market optimism and
                    increased demand.
                  </Typography>
                </div>
              </CardPrimaryAction>
              </Link>
              <ListDivider />
              <Link to="/absence" style={linkStyle}>
              <CardPrimaryAction id="ABSENCE">
                <div
                  style={{
                    padding: '1rem',
                    height: '150px',
                    backgroundColor: '#e4e4e466',
                  }}
                >
                  <Typography use="headline4" style={{fontSize:"20px"}} tag="div">
                    Gestion d'absences
                  </Typography>
                  <Typography
                    use="body1"
                    tag="p"
                    theme="text-secondary-on-background"
                  >
                    , Copper price soars amid global market optimism and
                    increased demand.
                  </Typography>
                </div>
              </CardPrimaryAction>
              </Link>

            </Card>
          </div>
        </ToolbarFixedAdjust>
      </Fragment>
    )
  }
}
export default Home
