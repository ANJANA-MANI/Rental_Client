import React, { createContext, useContext, useState } from 'react'
export const tokenAuthorizationContext=createContext()
function TokenAuth({children}) {
    const [isAuthorized,setIsAuthorized]=useState(false)
  return (

  <tokenAuthorizationContext.Provider value={{isAuthorized,setIsAuthorized}}>
    {children}
  </tokenAuthorizationContext.Provider>

  )
}

export default TokenAuth