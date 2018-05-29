import React from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

export default class DropDownMenuOpenImmediateExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: 2 }
  }

  handleChange = (event, index, value) => this.setState({ value })

  render() {
    return (
      <DropDownMenu
        value={this.state.value}
        onChange={this.handleChange}
        openImmediately={false}
      >
        <MenuItem value={1} primaryText="Madame" />
        <MenuItem value={2} primaryText="Monsieur" />
      </DropDownMenu>
    )
  }
}
