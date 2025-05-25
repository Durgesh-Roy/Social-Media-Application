import React from 'react'
import StoryViewer from '../../Components/StoryComponents/StoryViewer'

const Story = () => {
    const story=[
        {
            image:"https://images.pexels.com/photos/32153042/pexels-photo-32153042/free-photo-of-happy-border-collie-in-poprad-landscape.png?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },{
            image:"https://images.pexels.com/photos/29676919/pexels-photo-29676919/free-photo-of-golden-retriever-on-a-tranquil-beach-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },{
            image:"https://images.pexels.com/photos/32204469/pexels-photo-32204469/free-photo-of-ferry-approaches-sydney-opera-house.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },{
            image:"https://images.pexels.com/photos/32150499/pexels-photo-32150499/free-photo-of-stylish-woman-on-motorcycle-in-urban-setting.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"

        },{
            image:"https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
    ]
  return (
    <div>
      <StoryViewer stories={story}/>
    </div> 
  )
}

export default Story
