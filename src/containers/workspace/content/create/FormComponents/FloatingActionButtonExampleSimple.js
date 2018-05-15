import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageAddAPhoto from 'material-ui/svg-icons/image/add-a-photo'

const style = {
  marginRight: 20,
}

/**
 * Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.
 */
const FloatingActionButtonExampleSimple = () => (
  <div>
    <FloatingActionButton style={style}>
      <ImageAddAPhoto />
    </FloatingActionButton>
  </div>
)

export default FloatingActionButtonExampleSimple
