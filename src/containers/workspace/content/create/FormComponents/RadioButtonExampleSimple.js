import React from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
}

const RadioButtonExampleSimple = () => (
  <div>
    <RadioButtonGroup
      name="shipSpeed"
      defaultSelected="not_light"
      style={{ display: 'flex' }}
    >
      <RadioButton value="light" label="Madame" style={styles.radioButton} />
      <RadioButton
        value="not_light"
        label="Monsieur"
        style={styles.radioButton}
      />
    </RadioButtonGroup>
  </div>
)

export default RadioButtonExampleSimple
