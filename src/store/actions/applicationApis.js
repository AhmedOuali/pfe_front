import * as actionTypes from 'actionTypes'
import * as Application from 'Application'
import Cookies from 'js-cookie'
import axios from 'axios'

//Actions
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
        var x = document.cookie
        setTimeout(() => {
          console.log('cookies', res.Cookies)
        }, 1000)

        dispatch(setGpitConnectResult(res))
      })
      .catch(function(err) {
        console.log(err)
      })
  }
}

export const setGpitConnectResult = data => {
  return {
    type: actionTypes.SET_GPIT_CONNECT_RESULT,
    data: data,
  }
}
