import React from 'react'
import TabBarElement from './TabBarElement'
import { ToolbarRow } from 'rmwc/Toolbar'
import { TabBar } from 'rmwc/Tabs'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

const HeaderTop = props => {
  const { finished, stepIndex } = { finished: false, stepIndex: 0 }
  const contentStyle = { margin: '0 16px' }
  const stepStyle = { width: '33%', height: '54px' }
  if (props.type == 'CREATE') {
    return (
      <div style={{ width: '100%', margin: 'auto' }}>
        <Stepper activeStep={props.step}>
          <Step style={stepStyle}>
            <StepLabel>Information de base</StepLabel>
          </Step>
          <Step style={stepStyle}>
            <StepLabel>Etape suivante</StepLabel>
          </Step>
          <Step style={stepStyle}>
            <StepLabel>Etape finale</StepLabel>
          </Step>
        </Stepper>
      </div>
    )
  }
  return (
    <TabBar activeTabIndex={props.tab} style={{ width: '100%', height:"54px" }}>
      <TabBarElement path="/absence/accueil" name="Accueil" icon="home" />
      <TabBarElement
        path="/absence/attente"
        name="En attente"
        icon="hourglass_empty"
      />
      <TabBarElement
        path="/absence/historique"
        name="historique"
        icon="history"
      />
      <TabBarElement
        path="/absence/notifications"
        name="Notifications"
        icon="language"
      />
    </TabBar>
  )
}
export default HeaderTop
