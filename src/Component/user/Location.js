import React from "react";
import {Map, Marker, TileLayer} from 'react-leaflet';

const Location = () => {
    const position = [50.449566, 30.522959]
    const zoom = 14
    return (
        <Map center={position} zoom={zoom} id={"map"}>
            <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
            <Marker position={position}/>
        </Map>
    )
}
export default Location