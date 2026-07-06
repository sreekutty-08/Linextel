import React from 'react'
import Homeheader from './Homeheader'
import Homeanimation from './Homeanimation'
import Homeservice from './Homeservice'
import Homewhoweare from './Homewhoweare'
import Homeourvison from './Homeourvison'
import Homewhychooseus from './Homewhychooseus'
import Homedealing from './Homedealing'

const Home = () => {
  return (
    <div>
        <Homeheader/>
        <Homewhoweare/>
        <Homeourvison/>
        <Homeanimation/>
          <Homeservice/>
        <Homewhychooseus/>
      
        <Homedealing/>
    </div>
  )
}

export default Home