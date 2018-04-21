export const logger = store => {
  return next => {
    return action => {
      console.log('[Middleware] Dispatching :', action)
      const result = next(action)
      console.log('[Middleware] Next State  :', store.getState())
      return result
    }
  }
}
