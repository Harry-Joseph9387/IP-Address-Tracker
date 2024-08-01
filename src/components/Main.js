import React,{useEffect,useState} from 'react'
import bg from "../images/pattern-bg-mobile.png"
import dbg from "../images/pattern-bg-desktop.png"
import arrow from "../images/icon-arrow.svg"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer,useMap,Popup,Marker} from 'react-leaflet'
import Markerr from '../components/Markerr.js'
import icon from "../components/icon.js"

const Main = () => {
    const[ipAddress,setIpAddress]=useState("8.8.8.8")
    const[data,setData]=useState("")
    // const position=[51.505, -0.09]
    const fetcher=async ()=>{
        let ipv4 = /(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])/;
        let ipv6 = /((([0-9a-fA-F]){1,4})\:){7}([0-9a-fA-F]){1,4}/;
        if(ipAddress.match(ipv4) || ipAddress.match(ipv6)){
            const res=await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&ipAddress=${ipAddress}`)
            const x=await res.json()
            setData(x)
        }
        else{
            setIpAddress("8.8.8.8")
        }
    }
    useEffect(()=>{
        fetcher()
    },[])
  return (
    <>
       {data &&
            <div className="relative ipmain">
                
                 <picture>
                     <source srcSet={dbg} media="(min-width:700px)"/>
                     <img src={bg} alt="" className="w-full h-64 lg:h-56" />

                 </picture>
                 <div className="absolute top-0 text-white flex flex-col items-center w-full">
                     <h2 className="pt-5 text-2xl font-semibold">IP Address Tracker</h2>
                     <form action="" className="flex justify-center  py-5 ">
                         <input type="text" placeholder='Search for any IP address or domain' onChange={(e)=>{setIpAddress(e.target.value)}} className="rounded-l-md w-full text-black lg:w-1/3 px-5" />
                         <button className="bg-black rounded-r-md p-5" onClick={(e)=>{e.preventDefault();fetcher()}}><img src={arrow} alt="" /></button>
                     </form>
                     <div className="w-screen box lg:w-auto lg:will-change-auto ip-text border lg:pr-10 lg:mt-5 text-center lg:text-start rounded-xl flex flex-col lg:flex-row lg:items-center lg:justify-center pl-3  bg-white text-black font-semibold py-4 lg:py-7 max-h-screen " style={{zIndex:1}}>
                         <div className="pl-5 border-r-2 pr-10">
                             <h4 className="text-slate-600 text-xs lg:mb-2">IP ADDRESS</h4>
                             <h2 className="mb-5 lg:mb-0 font-bold text-l text-lgglg: lg:text-xl">{data.ip}</h2>
                         </div>
                         
                         <div className="pl-5 border-r-2 pr-10">
                             <h4 className="text-slate-600 text-xs lg:mb-2">LOCATION</h4>
                             <h2 className="mb-5 lg:mb-0 font-bold text-lg lg:text-xl">{data.location.city},{data.location.country}</h2>
                         </div>
                         <div className="pl-5 border-r-2 pr-10">
                             <h4 className="text-slate-600 text-xs lg:mb-2">TIMEZONE</h4>
                             <h2 className="mb-5 lg:mb-0 font-bold text-lg lg:text-xl">UTC{data.location.timezone}</h2>
                         </div>
                         <div className="pl-5 pr-10">
                             <h4 className="text-slate-600 text-xs lg:mb-2">ISP</h4>
                             <h2 className="mb-0 lg:mb-0 font-bold text-lg lg:text-xl">{data.isp}</h2>
                         </div>
                     </div>

                 </div>
                 <div className="ipmap">
                    <MapContainer center={[data.location.lat,data.location.lng]} zoom={13} scrollWheelZoom={true} style={{height:100+"%",zIndex:0,width:100+"%"}}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Markerr data={data}/>
                    </MapContainer>
                 </div>

            </div>
            
    }
    
    </>
    
  )
}

export default Main
