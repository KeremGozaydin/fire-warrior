//@ts-nocheck
import { Wrapper } from '@googlemaps/react-wrapper';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import csv from 'csvtojson';
import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {Icon} from '@iconify/react'

const mapKey = 'AIzaSyBFQTJWw62mxKk8hqHYh6qZh7L5kAqSgs4'

const getFires = async () => {
    let data = await fetch('https://firms.modaps.eosdis.nasa.gov/api/country/csv/3407bc83a7304ea462191a718f8cf6fa/VIIRS_SNPP_NRT/TUR/3/')
    .then((resp) => resp.text())
    .then(async (res) => await csv().fromString(res))
    return data.map(fire => {
        return {...fire, lat: parseFloat(fire.latitude), lng: parseFloat(fire.longitude)}
    })
}
let getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

function deg2rad(deg: number) {
    return deg * (Math.PI/180)
}

let mapOptions = {
    mapId: '252ccf18716ea075',
    zoom: 12,
    center: { lat: 41.015137, lng: 28.979530 }
}


const MyMap = ({fires}) => {
    const [myMap, setMyMap] = useState<any>()
    const ref = useRef(null);

    useEffect(() => {
        setMyMap(new window.google.maps.Map(ref.current, mapOptions))
    }, [])

    return (
        <>
            <div ref={ref} style={{height: '80vh', width: '100%'}}  />
            {myMap && <Fires map={myMap} fires={fires}/>}
        </>
    )
}

const Fires = ({map, fires} : any) => {
    return (
        <>
            {fires.map((fire, i) => (
                <Marker key={i} map={map} position={{lat: fire.lat, lng: fire.lng}}>
                    <div>
                        <Icon style={{width: '100%', height: '100%'}} color="#f30" icon="mdi:map-marker-alert" />
                    </div>
                </Marker>
            ))}
        </>
    )
}

const Marker = ({map, children, position}) => {
    const markerRef = useRef(null);
    const rootRef = useRef(null);
    
    useEffect(() => {
        if (!rootRef.current) {
            const container = document.createElement('div')
            rootRef.current = createRoot(container);
            markerRef.current = new google.maps.marker.AdvancedMarkerView({
                position,
                content: container,
              });
        }
    },[])
    useEffect(() => {
        rootRef.current.render(children);
        markerRef.current.position = position;
        markerRef.current.map = map;
    }, [map, position, children])

    useEffect(() => {
        return () => {
            markerRef.current.setMap(null);
        }
    },[])
}

export default function Harita() {
    let [radius, setRadius] = useState(100);
    let [center, setCenter] = useState({ lat: 41.015137, lng: 28.979530 });
    let [user, setUser] = useState();
    let [allResults, setAllResults] = useState([] as any[]);
    let [filtered, setFiltered] = useState([] as any[]);


    useEffect(() => {
        getFires().then((res: any) => {
            setAllResults(res)
        })
    },[])

    useEffect(() => {
        setFiltered(allResults.filter((val) => {
            let distance = getDistanceFromLatLonInKm(val.latitude, val.longitude, center.lat, center.lng)
            return distance <= radius
        }))
    },[allResults, radius, center])

    useEffect(() => {
        console.log(filtered)
    },[filtered])

    return (
        <Box sx={{ height: '100%',display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', justifyContent: 'center', gap: '1em',}}>
            <Box sx={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', gap: '2em'}}>
                <FormControl sx={{color: 'main'}}>
                    <InputLabel id="radius-select-label">Mesafe</InputLabel>
                    <Select
                        value={radius}
                        onChange={(e) => {
                            let value = e.target.value as number
                            setRadius(value)
                        }}
                        labelId="radius-select-label"
                        id="radius-select"
                        label="Mesafe"
                        color={'success'}
                    >
                        <MenuItem value={10}>10km</MenuItem>
                        <MenuItem value={100}>200km</MenuItem>
                        <MenuItem value={250}>300km</MenuItem>
                        <MenuItem value={2500}>Full</MenuItem>
                    </Select>
                </FormControl>
                <Typography>{filtered.length == 0 ? 'Yangın bulunamadı. Filtreleri değiştirmeyi dene!' : `${filtered.length} tane yangın bulundu!`}</Typography>
            </Box>
            <Wrapper
                apiKey={mapKey}
                version='beta'
                libraries={['marker']}
            >
                <MyMap fires={filtered}/>
            </Wrapper>
        </Box>
    )
}