import React, { Component, Fragment } from 'react'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import ActionDone from 'material-ui/svg-icons/action/done-all'
import ActionClose from 'material-ui/svg-icons/navigation/close'
import { ListDivider } from 'rmwc/List'

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
    props.setHeaderTab(1)
  }
  render() {
    return (
      <Fragment>
        <Card style={{ marginTop: '7px' }}>
          <CardHeader
            title="Ahmed Wali"
            subtitle="2 jours"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions style={{}}>
            <RaisedButton
              label="Accepter"
              labelPosition="before"
              icon={<ActionDone />}
            />
            <RaisedButton
              label="Refuser"
              labelPosition="before"
              icon={<ActionClose />}
            />
          </CardActions>

          <ListDivider />
          <CardText expandable={true}>
            Bonjour, Je suis absent(e) du bureau du [date de départ] au [date de
            retour] compris. Je n'ai pas accès à ma messagerie pendant cette
            période. Je prendrai donc connaissance de votre message à mon
            retour. En cas d'urgence, vous pouvez contacter [prénom nom] à cette
            adresse : [adresse mail du/de la collègue]. Cordialement,
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
            <RaisedButton
              label="Accepter"
              labelPosition="before"
              icon={<ActionDone />}
            />
            <RaisedButton
              label="Refuser"
              labelPosition="before"
              icon={<ActionClose />}
            />
          </CardActions>
          <ListDivider />
          <CardText expandable={true}>
            La police m’a empêché de dormir durant toute la nuit à cause d’un
            cadavre trouvé à l’arrière de ma maison.
          </CardText>
        </Card>
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    tab: state.header.tab,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setHeaderTab: tab => dispatch(headerActionCreators.setHeaderTab(tab)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Attente)
