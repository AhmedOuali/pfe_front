import * as actionTypes from 'actionTypes'
import * as Application from '../../Application'
import * as headerActionCreators from './header'
import Cookies from 'js-cookie'
import axios from 'axios'

var filterData = data => {
  var id = 0
  const createData = (nudoss, name, calories, fat, carbs, protein) => {
    id += 1
    return { nudoss, id, name, calories, fat, carbs, protein }
  }
  var nudoss
  var result = data.occurrences.occurrence
    .filter(element => element['@datasection'] == 'ZYAG')
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
          occ.item == 'TEMFIN'
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
      element.TEMFIN
    )
  })
  return dataTable
}

//Actions
//assynch calls (fetch)
export const gpitConnect = user => {
  return dispatch => {
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
      'Accept-Language': 'fr-FR',
    }

    var loginPath =
      'http://localhost:8080/hr-business-services-rest/business-services/login'

    fetch(loginPath, {
      credentials: 'include',
      headers: headers,
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(resp => resp.json())
      .then(function(res) {
        dispatch(setGpitConnectResult(res))
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
      'http://localhost:8080/hr-business-services-rest/business-services/gp/FSW0AGE0?roleModel=EMPLOYEE&startpop=' +
      getState().applicationApi.isEmployee[0]['@dossierID']

    fetch(loginPath, {
      credentials: 'include',
      headers: headers,
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(resp => resp.json())
      .then(res => {
        console.log('success of creation')
      })
      .catch(function(err) {
        console.log(err)
        console.log('creation Failed')
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
      'http://localhost:8080/hr-business-services-rest/business-services/gp/FSCSALE6/startpopulation/dossiers?roleModel=MMGRHIE'

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
            'http://localhost:8080/hr-business-services-rest/business-services/gp/JACSALE1?roleModel=MMGRHIE&startpop=' +
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
  return dispatch => {
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'fr-FR',
    }
    var isEmployee
    isEmployee = data.roles.role.filter(role => role['@category'] == 'SSEMP')
    var loginPath =
      'http://localhost:8080/hr-business-services-rest/business-services/gp/JACSALE1?roleModel=EMPLOYEE&startpop=' +
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
      'http://localhost:8080/hr-business-services-rest/business-services/gp/ASCSALE6?roleModel=EMPLOYEE&startpop=' +
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
      'http://localhost:8080/hr-business-services-rest/business-services/gp/ASCSALE6?roleModel=MMGRHIE'
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
