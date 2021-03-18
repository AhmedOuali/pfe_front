import * as actionTypes from 'actionTypes'
import * as Application from '../../Application'
import * as headerActionCreators from './header'
import Cookies from 'js-cookie'
import axios from 'axios'
import * as constants from '../../constants'

var filterData = data => {
  var id = 0
  const createData = (nudoss, name, calories, fat, carbs, protein, NULIGN) => {
    id += 1
    return { nudoss, id, name, calories, fat, carbs, protein, NULIGN }
  }
  var nudoss
  var result = data.occurrences.occurrence
    .filter(element => element['@datasection'] == 'ZYAG' )
    .map(element => {
      nudoss = element['@dossier']
      return element.data
    })
    .map(element => {
      return element.filter(
        occ =>
          occ.item == 'DATFIN' ||
          occ.item == 'DATDEB' ||
          occ.item == 'MOTIFA_EXT' ||
          occ.item == 'TEMDEB' ||
          occ.item == 'TEMFIN' ||
          occ.item == 'NULIGN'
      )
    })

  var interm = []
  var abs = {}
  result.map(iteration => {
    abs = {}
    iteration.map(it => (abs[it.item] = it.value))
    interm.push(abs)
  })
  var dataTable = []
  dataTable = interm.map(element => {
    return createData(
      nudoss,
      element.MOTIFA_EXT,
      element.DATDEB,
      element.TEMDEB,
      element.DATFIN,
      element.TEMFIN,
      element.NULIGN
    )
  })
  return dataTable
}

//Actions
//assynch calls (fetch)

const getPushManagerSubscription = () => {
  
 
} 

const subscribeToNotificationServer = (data) => {
  var sub = null
  return navigator.serviceWorker.ready
  .then((registration) => { 
    return registration.pushManager.getSubscription();
  }).then((subscription) => {
    console.log('test it', subscription)
    fetch(constants.PUSH_SERVER_ADRR+'subscribe', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ 
        subscription: subscription, 
        name: data.username, 
        fetchServerData: data.fetchServerData }),
    }).then(resp => resp.json())
      .then(res => {
        if (res.status == "OK") {
          console.log('inscrit au serveur de notification')
        }
      })
  });
  

}

export const gpitConnect = user => {
  return (dispatch, getState) => {
    var parser = new DOMParser()
    var data = {
      username: user.username, //'IELFELLF'
      password: user.password, //'HR'
      language: 'F',
      newPassword: '',
      registrationId: '',
      deviceToken: '',
    }
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'fr-FR'
    }


    var loginPath =
    constants.BASE_ADRESS+'login'

    fetch(loginPath, {
      mode :'cors',
      credentials: 'include',
      headers: headers,
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(resp => resp.json())
      .then((res) => {
        dispatch(setGpitConnectResult(res))
        subscribeToNotificationServer ({
          username: data.username,
          fetchServerData: {
            userName: data.username,
            password: data.password,
            isManager: String(getState().applicationApi.isAdmin.length>0),
            isEmployee: String(getState().applicationApi.isEmployee.length>0)
          }
        })
        dispatch(searchForUserName(res))
      })
      .catch(function(err) {
        console.log(err)
      })
  }
}

export const creerAbsence = data => {
  return (dispatch, getState) => {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'fr-FR',
    }
    var loginPath =
      constants.BASE_ADRESS+'gp/FSW0AGE0?roleModel=EMPLOYEE&startpop=' +
      getState().applicationApi.isEmployee[0]['@dossierID']

    return fetch(loginPath, {
      credentials: 'include',
      headers: headers,
      method: 'POST',
      body: JSON.stringify(data),
    })
      
  }
}

export const searchForCollaborators = () => {
  return (dispatch, getState) => {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'fr-FR',
    }
    var loginPath =
      constants.BASE_ADRESS+'gp/FSCSALE6/startpopulation/dossiers?roleModel=MMGRHIE'

    fetch(loginPath, {
      credentials: 'include',
      headers: headers,
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(res => {
        res.directories.directory.map(element => {
          //let interm = getState().applicationApi.collaborators
          var headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': 'fr-FR',
          }
          let personnalPath =
            constants.BASE_ADRESS+'gp/JACSALE1?roleModel=MMGRHIE&startpop=' +
            element['@nudoss']
          fetch(personnalPath, {
            credentials: 'include',
            headers: headers,
            method: 'GET',
          })
            .then(resp => resp.json())
            .then(res => {
              var nom = res.occurrences.occurrence
                .filter(ele => ele['@datasection'] == 'ZY3Y')[0]
                .data.filter(ele => ele['item'] == 'NMPRES')[0].value
              var collaborateur = { NMPRES: nom, nudoss: element['@nudoss'] }
              if (!Array.isArray(getState().applicationApi.collaborators)) {
                getState().applicationApi.collaborators
                dispatch(setCollaborators([collaborateur]))
              } else {
                var collaborators = []
                collaborators = getState().applicationApi.collaborators
                if (!ifCollaboratorExists(collaborateur, collaborators)) {
                  if (collaborateur !== null) {
                    collaborators.push(collaborateur)
                    dispatch(setCollaborators(collaborators))
                  }
                }
              }
            })
            .catch(function(err) {
              console.log(err)
            })
        })
      })
      .catch(function(err) {
        console.log(err)
      })

    const ifCollaboratorExists = (collaborateur, collaborators) => {
      var result = false
      collaborators.map(coll => {
        if (JSON.stringify(collaborateur) == JSON.stringify(coll)) {
          result = true
        }
      })
      return result
    }
  }
}

export const searchForUserName = data => {
  return (dispatch,getState) => {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'fr-FR',
    }
    console.log("here", getState().applicationApi)
    if(getState().applicationApi.isEmployee.length>0) {
      var loginPath =
      constants.BASE_ADRESS+'gp/JACSALE1?roleModel=EMPLOYEE&startpop=' +
      getState().applicationApi.isEmployee[0]['@dossierID']
    }
    var isEmployee
    isEmployee = data.roles.role.filter(role => role['@category'] == 'SSEMP')
    var loginPath =
      constants.BASE_ADRESS+'gp/JACSALE1?roleModel=EMPLOYEE&startpop=' +
      isEmployee[0]['@dossierID']

    fetch(loginPath, {
      credentials: 'include',
      headers: headers,
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(res => {
        var result = res.occurrences.occurrence.filter(
          occurence => occurence['@datasection'] == 'ZY3Y'
        )
        var username = result[0].data.filter(
          occurence => occurence['item'] == 'NMPRES'
        )
        dispatch(headerActionCreators.setHeaderName(username[0].value))
      })
      .catch(function(err) {
        console.log(err)
      })
  }
}

export const searchForPersonnalHistory = data => {
  return (dispatch, getState) => {
    setPersonnalHistory([])
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'fr-FR',
    }

    var HistoryPath =
      constants.BASE_ADRESS+'gp/ASCSALE6?roleModel=EMPLOYEE&startpop=' +
      getState().applicationApi.isEmployee[0]['@dossierID']

    fetch(HistoryPath, {
      credentials: 'include',
      headers: headers,
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(res => {
        var dataTable = filterData(res)
        dispatch(setPersonnalHistory(dataTable))
      })

      .catch(function(err) {
        console.log('Erreur', err)
      })
  }
}

export const searchForCollaboratorsHistory = data => {
  return (dispatch, getState) => {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'fr-FR',
    }
    var collaboratorsHistory = []
    var collPath =
    constants.BASE_ADRESS+'gp/ASCSALE6?roleModel=MMGRHIE'
    fetch(collPath, {
      credentials: 'include',
      headers: headers,
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(res => {
        dispatch(setCollaboratorsHistory(filterData(res)))
      })
      .catch(function(err) {
        console.log(err)
      })
  }
}

export const searchForManagerTasks = data => {
  return dispatch => {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'fr-FR',
    }
    var collaboratorsHistory = []
    var requestsPath =
      constants.BASE_ADRESS+'tasks?roleModel=MMGRHIE'
    fetch(requestsPath, {
      credentials: 'include',
      headers: headers,
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(res => {
        console.log(res)
        dispatch(setManagerTasks(res.task.filter(task => task["@gpId"] == "FSW0AGE0" || task["@gpId"] == "FSW0AGE1")))
      })
      .catch(function(err) {
        console.log(err)
      })
  }
}

export const searchForRequests = data => {
  return dispatch => {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'fr-FR',
    }
    var collaboratorsHistory = []
    var requestsPath =
      constants.BASE_ADRESS+'requests?roleModel=EMPLOYEE'
    fetch(requestsPath, {
      credentials: 'include',
      headers: headers,
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(res => {
        console.log(res)
        dispatch(setRequests(res.request.filter(request => (request["@gpID"] == "FSW0AGE0" || request["@gpID"] == "FSW0AGE1") && request["@status"]=="En cours")))
      })
      .catch(function(err) {
        console.log(err)
      })
  }
}

export const searchForRequestsToCancel = data => {
    return (dispatch, getState) => {
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': 'fr-FR',
      }
      var collaboratorsHistory = []
      var requestsToCancel = 
      constants.BASE_ADRESS+'gp/FSW0AGE1?roleModel=EMPLOYEE&startpop='+getState().applicationApi.isEmployee[0]['@dossierID']
      fetch(requestsToCancel, {
        credentials: 'include',
        headers: headers,
        method: 'GET',
      })
        .then(resp => resp.json())
        .then(res => {
          dispatch(setRequestsToCancel(filterData(res)))
        })
        .catch(function(err) {
          console.log(err)
        })
    }
  }

export const cancelRequest = data => {
  return (dispatch, getState) => {
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
                  "@action": "D",
                  "@datasection": "ZYAG",
                  "@domain": "DOML0SAL-Final",
                  "@dossier": getState().applicationApi.isEmployee[0]['@dossierID'],
                  "@population": "POPL0SAL-Final",
                  "data": [
                    {
                      "item": "NULIGN",
                      "value": data
                    }
                  ]

                }
              ]
          }
      }
    var collaboratorsHistory = []
    var requestsToCancel = 
    constants.BASE_ADRESS+'gp/FSW0AGE1?roleModel=EMPLOYEE&startpop='+getState().applicationApi.isEmployee[0]['@dossierID']
    fetch(requestsToCancel, {
      credentials: 'include',
      headers: headers,
      method: 'POST',
      body: JSON.stringify(body)
    })
      .then(resp => resp.json())
      .then(res => {
        if(res.status == "OK"){
          dispatch(setRequestsToCancel(getState().applicationApi.requestsToCancel.filter(request => request.NULIGN != data)))
          alert("Demande annulée avec succés")
        }
        if(res.status == "FAILURE"){
          console.log("Demande annulation echoué")
        }
      })
      .catch(function(err) {
        console.log(err)
      })
  }
}

export const deleteRequest = data => {
  return (dispatch, getState) => {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'fr-FR',
    }
    var collaboratorsHistory = []
    var requestsToCancel = 
      constants.BASE_ADRESS+data["@detail"]+'&delete=true'
    fetch(requestsToCancel, {
      credentials: 'include',
      headers: headers,
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(res => {
        if(res.status == "OK") {
          dispatch(setRequests(getState().applicationApi.requests.filter(request => request["@id"] != data["@id"])))
          console.log("supprimé avec succès")
        }
        if(res.status == "FAILURE") {
          console.log("FAILURE")
        }
      })
      .catch(function(err) {
        console.log(err)
      })
  }
}

//synch calls
export const setPersonnalHistory = data => {
  return {
    type: actionTypes.SET_PERSONNAL_HISTORY,
    data: data,
  }
}

export const setGpitConnectResult = data => {
  return {
    type: actionTypes.SET_GPIT_CONNECT_RESULT,
    data: data,
  }
}

export const setCollaborators = data => {
  return {
    type: actionTypes.SET_COLLABORATORS_NUDOSS,
    data: data,
  }
}

export const setNudossNumber = data => {
  return {
    type: actionTypes.SET_NUDOSS_NUMBER,
    data: data,
  }
}

export const setUserRole = data => {
  return {
    type: actionTypes.SET_USER_ROLE,
    data: data,
  }
}

export const setCollaboratorsHistory = data => {
  return {
    type: actionTypes.SET_COLLABORATORS_HISTORY,
    data: data,
  }
}

export const setManagerTasks = data => {
  return {
    type: actionTypes.SET_MANAGER_TASKS,
    data: data,
  }
}

export const setRequests = data => {
  return {
    type: actionTypes.SET_REQUESTS,
    data: data,
  }
}

export const setRequestsToCancel = data => {
  return {
    type: actionTypes.SET_REQUESTS_TO_CANCEL,
    data: data
  }
}
