import React from 'react'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


const Footer = (props) => {
    return (
        <Toolbar style={{backgroundColor: "#e4e4e4" ,position: "fixed", bottom: "0px", width: "100%", padding: "0px 8px", zIndex: "2"}}>
        
        <ToolbarGroup style={{width: "100%"}}>
          <ToolbarTitle text="Enregistrée" />
          <div style={{width: "215px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <RaisedButton label="Precedant" labelColor="#f27308" backgroundColor="#e4e4e4" style={{margin: "10px 0px", backgroundColor: "#e4e4e4"}}/>
          <ToolbarSeparator  style={{marginLeft: "-36px", marginRight: "-35px"}}/>          
          <RaisedButton  label="Suivant" labelColor="#f27308" backgroundColor="#e4e4e4" style={{margin: "10px 0px"}}/>
          </div>
        </ToolbarGroup>
      </Toolbar>
    )
}
export default Footer;