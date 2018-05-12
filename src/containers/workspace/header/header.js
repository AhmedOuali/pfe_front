import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as headerActionCreators from '../../../store/actions/header'
import * as workspaceActionCreators from '../../../store/actions/workspace'
import styles from './header.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TabBar } from 'rmwc/Tabs'
import { Menu, MenuItem, MenuAnchor } from 'rmwc/Menu';
import { Redirect } from 'react-router';
import TabBarElement  from './TabBarElement'
import HeaderBorder from './HeaderBorder'
import HeaderTop from './HeaderTop'

import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
  ToolbarIcon,
  ToolbarFixedAdjust,
} from 'rmwc/Toolbar'
var iconStyle = {
  fontSize: '36px',
  marginTop: '-35px',
}

class Header extends Component {
  componentWillMount () {
    this.setState({menuIsOpen: false})
  }
  componentDidMount() {
    let elHeight = document.getElementById('Toolbar').clientHeight
  }
  
  render() {
    
    const tabBarOnchange = (value) => {
      this.props.setHeaderTab(value)
      console.log(value)
      console.log('prop',this.state)
    }
          console.log('state',this.state)

    return (
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
            <ToolbarTitle style={{fontSize: '1rem'}}>{this.props.username}</ToolbarTitle>
          </ToolbarSection>
          <ToolbarSection alignEnd>
            <ToolbarIcon use="search" style={{ marginTop: '-20px' }} />
            <MenuAnchor onClick={evt => {this.setState({'menuIsOpen': !this.state.menuIsOpen})}}>
              <Menu
                anchorCorner = 'bottomRight'
                open={this.state.menuIsOpen}
                onClose={evt => this.setState({menuIsOpen: false})}
              >
                <MenuItem>Cookies</MenuItem>
                <MenuItem>Pizza</MenuItem>
                <MenuItem>Icecream</MenuItem>
              </Menu>
              <ToolbarIcon use="more_vert" style={{ marginTop: '-20px' }}  />
              
            </MenuAnchor>
            
          </ToolbarSection>
        </ToolbarRow>
          <Fragment>
            <ToolbarRow>
              <Switch>
                <Route path="/create" render={() => {return <HeaderTop type='CREATE'/>}}  />
                <Route path="/" render={() => {return <HeaderTop type='DEFAULT' tab = {this.props.tab}/>}}  />
              </Switch>
            </ToolbarRow>
              <Route path="/attente" render={() => {return <HeaderBorder name='Attente'/>}}  />
              <Route path="/historique" render={() => {return <HeaderBorder name='Historique'/>}}/>
              <Route path="/notifications" render={() => {return <HeaderBorder name='Notifications' {...this.props}/>}}/>
              <Route path="/create" render={() => {return <HeaderBorder name='Créer Dossier'/>}}/>
          </Fragment>
      </Toolbar>
    )
  }
}

const mapStateToProps = state => {
  return {
    height: state.header.height,
    tab: state.header.tab,
    username: state.header.username,
    notifications: state.workspace.notifications
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setHeaderHeight : height =>
      dispatch(headerActionCreators.setHeaderHeight(height)),
    setHeaderTab : tab => 
      dispatch(headerActionCreators.setHeaderTab(tab)),
    setHeaderName : username => 
      dispatch(headerActionCreators.setHeaderName(username)),
    setNotifications : notifications => 
        dispatch(workspaceActionCreators.setNotifications(notifications)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
