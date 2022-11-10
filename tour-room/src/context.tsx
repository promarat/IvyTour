import React from 'react'

type Context = {
  isHost: boolean
}

export const AppContext = React.createContext<Context>({
  isHost: false,
})

export const AppProvider = ({
  isHost,
  children,
}: {
  isHost: boolean,
  children: React.ReactChild
}) => {
  return (
    <AppContext.Provider
      value={{
        isHost,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}