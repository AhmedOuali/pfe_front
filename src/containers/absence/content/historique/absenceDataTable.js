import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
const CustomizedTable = props => {
  const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell)
  let id = 0
  function createData(name, calories, fat, carbs, protein) {
    id += 1
    return { id, name, calories, fat, carbs, protein }
  }

  return (
    <Grid item xs={12}>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {props.selectedRole == 'admin' ? (
              <CustomTableCell>Membre</CustomTableCell>
            ) : (
              <Fragment />
            )}
            <CustomTableCell>Motif d'absence</CustomTableCell>
            <CustomTableCell numeric>Date de début</CustomTableCell>
            <CustomTableCell numeric>Témoin midi début</CustomTableCell>
            <CustomTableCell numeric>Date de fin</CustomTableCell>
            <CustomTableCell numeric>Témoin midi fin</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.historyData.map(n => {
            return (
              <TableRow key={n.id}>
                {props.selectedRole == 'admin' ? (
                  <CustomTableCell numeric>
                    {
                      props.collaborators.length >0?
                      props.collaborators.filter(
                        collaborator => collaborator.nudoss == n.nudoss
                      )[0]===undefined?n.nudoss:props.collaborators.filter(
                        collaborator => collaborator.nudoss == n.nudoss
                      )[0]['NMPRES']:n.nudoss
                    }
                  </CustomTableCell>
                ) : (
                  <Fragment />
                )}
                <CustomTableCell component="th" scope="row">
                  {n.name}
                </CustomTableCell>
                <CustomTableCell numeric>{n.calories}</CustomTableCell>
                <CustomTableCell numeric>{n.fat}</CustomTableCell>
                <CustomTableCell numeric>{n.carbs}</CustomTableCell>
                <CustomTableCell numeric>{n.protein}</CustomTableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
    </Grid>
  )
}

export default CustomizedTable
