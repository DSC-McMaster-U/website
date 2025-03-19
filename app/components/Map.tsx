'use client'
import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = () => {
    const mapRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: 'weekly'
            });

            const { Map } = await loader.importLibrary('maps');

            // Init a marker
            const { AdvancedMarkerElement } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

            const position = {
                lat: 43.652693,
                lng: -79.3871189
            }

            // Map options
            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 17,
                mapId: 'GDSC_MAP_ID'
            }

            // setup the map
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

            // display a marker
            const marker = new AdvancedMarkerElement({
                map: map,
                position: position
            })
        }

        initMap();
    }, [])
  return (
    <div className="max-w-[60%] aspect-[8/3] m-auto" ref={mapRef}/>
  )
}

export default Map
