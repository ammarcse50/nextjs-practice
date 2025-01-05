import React from 'react'

const categoriesDetails = ({params}) => {
   if(params.features.length == 3)
    return <div>{params.features[2]}</div>
   if(params.features.length == 2)
    return <div>{params.features[1]}</div>
   if(params.features.length == 1)
    return <div>{params.features[0]}</div>
  return (
    <div className='h-screen'>categoriesDetails</div>
  )
}

export default categoriesDetails