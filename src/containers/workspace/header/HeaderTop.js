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
            <StepLabel> Donnée Personnelles </StepLabel>
          </Step>
          <Step style={stepStyle}>
            <StepLabel>Nationalité & Adresse</StepLabel>
          </Step>
          <Step style={stepStyle}>
            <StepLabel>Affectation</StepLabel>
          </Step>
        </Stepper>
      </div>
    )
  }
  return (
    <TabBar activeTabIndex={props.tab} style={{ width: '100%' }}>
      <TabBarElement
        path="/embauche/attente"
        name="En attente"
        icon="hourglass_empty"
      />
      <TabBarElement
        path="/embauche/historique"
        name="historique"
        icon="history"
      />
      <TabBarElement
        path="/embauche/notifications"
        name="Notifications"
        icon="language"
      />
    </TabBar>
  )
}
export default HeaderTop
