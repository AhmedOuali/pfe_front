import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add'

const style = {
  marginRight: 20,
}

/**
 * Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.
 */
const FloatingActionButtonAdd = () => (
  <div>
    <FloatingActionButton style={style}>
      <ActionNoteAdd />
    </FloatingActionButton>
  </div>
)

export default FloatingActionButtonAdd
