import React, { useEffect } from 'react'
import icon from "../components/icon.js"
import {useMap,Popup} from 'react-leaflet'
const Marker = (position) => {
    const map=useMap()
    useEffect(()=>{
        map.flyTo(position,13,{
            animate:true,
        })
    },[map,position])
  return (
    <>
        <Marker icon={icon} position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
        </Marker>
    </>
  )
}

export default Marker