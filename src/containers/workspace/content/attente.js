import React, {Component, Fragment} from 'react'
import IconButton from 'material-ui/IconButton';
import PlusButton from './plusButton'


import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText,
  } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import * as headerActionCreators from '../../../store/actions/header'

import { connect } from 'react-redux'
class Attente extends Component {
    constructor(props) {
        super(props)
        props.setHeaderTab(0);
    }
    render () {
        return (
            <Fragment>
            <Card style={{ marginTop: '7px' }}>
          <CardHeader
            title="Khaled Garsi"
            subtitle="2 jours"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions style={{}}>$
          <FlatButton label="Brouillant" style={{color: 'red'}}/>
          </CardActions>
          <IconButton>
          <i className="material-icons">create</i>            
          </IconButton>
          <IconButton>
          <i className="material-icons">delete</i>            
          </IconButton>
            
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec
            vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
            pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque
            lobortis odio.
          </CardText>
        </Card>
        <Card style={{ marginTop: '7px' }}>
          <CardHeader
            title="Morsi Jallouli"
            subtitle="3 jours"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions>
          <FlatButton label="Envoyée" style={{color: 'red'}}/>
        
          <IconButton>
          <i className="material-icons">visibility</i>            
          </IconButton>
          
          </CardActions>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec
            vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
            pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque
            lobortis odio.
          </CardText>
        </Card>
        <PlusButton/>
        </Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
      tab: state.header.tab
    }
  }
const mapDispatchToProps = dispatch => {
    return {
      setHeaderTab : tab => 
        dispatch(headerActionCreators.setHeaderTab(tab))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Attente)
