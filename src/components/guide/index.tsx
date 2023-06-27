import React from 'react'

interface PropsI {
    children: React.ReactNode
}

const Guide = ({children}:PropsI) => {
  return (
    <div>{children}</div>
  )
}

export default Guide