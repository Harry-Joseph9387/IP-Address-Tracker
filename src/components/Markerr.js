import React, { useEffect } from 'react'
import {useMap,Popup,Marker} from 'react-leaflet'
import icon from "./icon.js"


export default function Markerr({data}) {
    const position=[data.location.lat,data.location.lng]
    const map=useMap()
    useEffect(()=>{
        map.flyTo(position,13,{
            animate:true,
        })
    },[map,position])
  return (
    <>
        <Marker position={[data.location.lat,data.location.lng]} icon={icon}>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
        </Marker>
    </>
  )
}
