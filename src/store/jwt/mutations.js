export function sessionJwt (state, sessionJwt) {
  if (sessionJwt) {
    state.toggleDrawer = true
    state.sessionToken = true
  } else {
    state.toggleDrawer = false
    state.sessionToken = false
  }
}

export function toggleLogin (state, value) {
  state.toggleDrawer = value
}

export function showNotification (state, value) {
  state.showNotification = value
}

export function setJavascriptValidation (state, value) {
  state.javascriptValidation = value
}
