// import React, {useContext, useEffect, useState } from 'react'

// const UserContext = React.createContext()
// const UserSuccessContext = React.createContext()

// export function useUserLoggedIn() {
//   return useContext(UserContext)
// }

// export function useUserSuccessLogged() {
//   return useContext(UserSuccessContext)
// }

// export function UserProvider( { children }:any) {
//   const [isLogged, setIsLogged] = useState<Boolean>(false)

//   const successLogin = () => {
//     setIsLogged(true)
//   }

//   useEffect(() => {
//     console.log(isLogged)
//   }, [isLogged])

//   return (
//     <UserContext.Provider value={isLogged}>
//       <UserSuccessContext.Provider value={successLogin}>
//         {children}
//       </UserSuccessContext.Provider>
//     </UserContext.Provider>
//   )
// }