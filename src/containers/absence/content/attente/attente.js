import React, { Component, Fragment } from 'react'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import ActionDone from 'material-ui/svg-icons/action/done-all'
import ActionClose from 'material-ui/svg-icons/navigation/close'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ListDivider } from 'rmwc/List'
import Snackbar from '@material-ui/core/Snackbar';
import Avatar from '@material-ui/core/Avatar';
import Delete from '@material-ui/icons/Delete'
import * as constants from '../../../../constants'



import {
  CardTitle,
  CardText,
} from 'material-ui/Card'
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';

import FlatButton from 'material-ui/FlatButton'
import MySnackbarContentWrapper from './Snackbar'
import * as headerActionCreators from '../../../../store/actions/header'
import * as applicationApisActionCreators from '../../../../store/actions/applicationApis'

import { connect } from 'react-redux'
class Attente extends Component {
  state = {
    open: false,
    openSnackbar: false,
    snackbarVariant: "info",
    snackbarMessage: "",
    Comment: "",
    selectedTask: null
  };
  constructor(props) {
    super(props)
    props.setHeaderTab(1)
  }

  handleClickOpen = (data) => {
    console.log(data)
    this.setState({selectedTask: {id: data["@id"], url: data["@detail"]}})
    this.setState({ open: true });
  };

  handleOnChange (event) {
    console.log(this.state)
    var target = event.target;
    console.log(event.target.value)
    this.setState({
      "comment": event.target.value
    })
    
  }

  validateRequest = (data) => {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'fr-FR',
    }
    
    var body =
      {
        "occurrences":
          {
            "occurrence":
              [
                {
                  "@action": "C",
                  "@datasection": "Z5T1",
                  "@domain": "STEP",
                  "@dossier": this.state.selectedTask.id,
                  "@population": "WORKFLOW",
                  "data": [
                    {"item":"STATUX","value":data.value},
                    { "item": "TXCOMM", "value": data.comment}
                  ]

                }
              ]
          }
      }
    var loginPath = constants.BASE_ADRESS+this.state.selectedTask.url
    return fetch(loginPath, {
      credentials: 'include',
      headers: headers,
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then(resp => resp.json())
  }

  handleCloseAndSubmit = () => {
    console.log(name)
    if(this.state.selectedTask != null){
      this.validateRequest({value:"RF", comment:this.state.comment})
      .then((res) => {
        console.log(res)
        if(res.status == 'OK') {
          this.setState({
            snackbarVariant: "success",
          },()=> this.setState({openSnackbar: true}))
            this.setState({
              snackbarMessage: "Opereation terminée avec succés",
            })
          this.deleteTaskFromManagerTasks(this.state.selectedTask.id)
        }
        if(res.status == 'FAILURE') {
          this.setState({
            snackbarVariant: "error",
          },()=> this.setState({openSnackbar: true}))
            this.setState({
              snackbarMessage: res.errors.error.label,
            })
        }
      })
      .catch((err) => {
        this.setState({
          snackbarVariant: "error",
          snackbarMessage: "Erreur non identifié"
        },()=> this.setState({openSnackbar: true}))
      console.log(err)
      })
    }
  }

  handleClose = (name) => {
    
    this.setState({ open: false });
  };

  componentWillMount () {
    this.props.searchForRequests()
    this.props.searchForManagerTasks()
  }

  handleOnClick (event) {
    const data ={
      id: event["@id"],
      url: event["@detail"]
    }
    
    this.setState({
      selectedTask: data
    }, () => {
      console.log(this.state)
    switch (event.value){
      case "AP": 
        this.validateRequest({value:"AP", comment:""})
        .then((res) => {
          console.log(res)
          if(res.status == 'OK') {
            this.setState({
              snackbarVariant: "success",
            },()=> this.setState({openSnackbar: true}))
              this.setState({
                snackbarMessage: "Opereation terminée avec succés",
              })
              this.deleteTaskFromManagerTasks(this.state.selectedTask.id)
          }
          if(res.status == 'FAILURE') {
            this.setState({
              snackbarVariant: "error",
            },()=> this.setState({openSnackbar: true}))
              this.setState({
                snackbarMessage: res.errors.error.label,
              })
          }
        })
        .catch((err) => {
          this.setState({
            snackbarVariant: "error",
            snackbarMessage: "Erreur non identifié",
          },()=> this.setState({openSnackbar: true}))
        console.log(err)
        })
        
      break
      case "RF":
        this.handleClickOpen(event)
      break
    }
    })

    
  }

  deleteTaskFromManagerTasks = (id) => {
    var pos;
    const nvTab = this.props.managerTasks.filter(element => element["@id"]!=id)
    this.props.setManagerTasks(nvTab)
  }

  handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnackbar: false });
  };
  
  render() {
    const ManagerPart = props => {
      return (
        <Fragment>
        {Array.isArray(props.managerTasks)?props.managerTasks.map(task => {
          return <TasksFactory {...props} task={task} key={task["@id"]}/>
        }): <Fragment><center><h3>Chargement...</h3></center></Fragment>}
        <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Validation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name = "Comment"
              label="Commentaire"
              type="text"
              fullWidth
              onChange = {this.handleOnChange.bind(this)}
              value = {this.state.comment}
            />
          </DialogContent>
          <DialogActions>
            <RaisedButton onClick={this.handleClose} color="primary">
              Cancel
            </RaisedButton>
            <RaisedButton onClick={this.handleCloseAndSubmit} color="primary">
              Rejeté
            </RaisedButton>
          </DialogActions>
        </Dialog>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnackbar}
          autoHideDuration={6000}
          onClose={this.handleCloseSnack}
        >
          <MySnackbarContentWrapper
            onClose={this.handleCloseSnack}
            variant={this.state.snackbarVariant}
            message={this.state.snackbarMessage}
          />
        </Snackbar>
        </Fragment>
        
      )
    }

    
    const EmployeePart = props => {
      return (
        <Fragment>
        {Array.isArray(this.props.requests)?this.props.requests.map(request => {
          return <RequestsFactory {...this.props} request={request} key={request["@id"]}/>
        }): <Fragment>Chargement...</Fragment>}</Fragment>
      )
    }

    const RequestsFactory = props => {
      return (
        <Card style={{ marginTop: '7px' }}>
            <CardHeader
            avatar={
              <Avatar aria-label="Recipe" style={props.request["@gpID"] == "FSW0AGE1"?{backgroundColor: '#ff0000c2'}:{backgroundColor: '#008000a8'}}>
                {props.request["@gpID"] == "FSW0AGE1"?"A":"D"}
              </Avatar>
            }
            action={
              <IconButton onClick={this.props.deleteRequest.bind(this,props.request)}>
                <Delete />
              </IconButton>
            }
              title={props.request["@subject"]}
              subheader={props.request["@label"]}
            />
            <ListDivider />
          </Card>
        )
    }

    const TasksFactory = props => {
      return (
      <Card style={{ marginTop: '7px' }}>
          <CardHeader
            title={props.task["@requester"]}
            subtitle={props.task["@label"]}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardActions style={{}}>
            <RaisedButton
              id = "AP"
              onClick = {this.handleOnClick.bind(this,{...props.task ,value:"AP"})}
              label="Accepter"
              labelPosition="before"
              icon={<ActionDone />}
            />
            <RaisedButton
              id = "RF"
              onClick = {this.handleOnClick.bind(this,{...props.task ,value:"RF"})}
              label="Refuser"
              labelPosition="before"
              icon={<ActionClose />}
            />
          </CardActions>

          <ListDivider />
          <CardText expandable={true}>
          <h3>{props.task["@subject"]}</h3>
          {props.task["@label"]} <br/>
          </CardText>
        </Card>
      )
    }

    
    return (
      <Fragment>
        {this.props.selectedRole == "admin"?<ManagerPart {...this.props}/>:<EmployeePart {...this.props}/>} 
        
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    tab: state.header.tab,
    managerTasks: state.applicationApi.managerTasks,
    selectedRole: state.applicationApi.selectedRole,
    requests: state.applicationApi.requests
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setHeaderTab: tab => dispatch(headerActionCreators.setHeaderTab(tab)),
    searchForManagerTasks: () => dispatch(applicationApisActionCreators.searchForManagerTasks()),
    searchForRequests: () => dispatch(applicationApisActionCreators.searchForRequests()),
    deleteRequest: request => dispatch(applicationApisActionCreators.deleteRequest(request)),
    setManagerTasks: tasks => dispatch(applicationApisActionCreators.setManagerTasks(tasks))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Attente)
