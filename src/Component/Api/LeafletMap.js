import React, {Component} from 'react';
import {Map, Marker, TileLayer} from 'react-leaflet';

class LeafletMap extends Component {
    state = {
        lat: 50.4505,
        lang: 30.5230,
        zoom: 14
    };

    render() {
        const position = [this.state.lat, this.state.lang];
        return (

            <Map center={position} zoom={this.state.zoom}>
                <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
                <Marker position={position}/>
            </Map>
        );
    }
}

export default LeafletMap;