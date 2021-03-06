import React from 'react'
import DatePicker from 'material-ui/DatePicker'

/**
 * The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`.
 * You can also disable the Dialog passing `true` to the `disabled` property.
 * To display the year selection first, set the `openToYearSelection` property to `true`.
 */
const DatePickerExampleSimple = () => (
  <div>
    <DatePicker hintText="Open to Year" openToYearSelection={true} />
  </div>
)

export default DatePickerExampleSimple
