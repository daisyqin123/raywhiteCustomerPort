import React from 'react'
import { Link } from 'gatsby';

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

import { formatRelative } from "date-fns";
import { useState, useEffect } from 'react'
import background from "../images/HomeBackground.png";
//import "@reach/combobox/styles.css";

//API
import { observer } from 'mobx-react';
import useStores from "../hooks/use-stores";

//enum
const propertySaleStatusEnum = ["unknown", "Sell", "Rent"]


const libraries = ["places"];
const mapContainerStyle = {
    height: "70vh",
    width: "100vw",
};
const center = {
    lat: -33.868820,
    lng: 151.209290,
};
const options = {

    disableDefaultUI: true,
    zoomControl: true,
};

//
const MapInRent = observer(() => {
    //API
    const { propertyStore } = useStores();
    const [propertyList, setPropertyList] = useState([]);
    //,then is async ' method
    useEffect(() => {
        propertyStore.getPropertyList()
            .then(() => {
                setPropertyList(propertyStore.propertyList.filter(p => propertySaleStatusEnum[parseInt(p.saleStatus)] === 'Rent'));
            }).catch(() => { });
    }, []);

    //const varieble
    const [selectedPark, setSelectedPark] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (

        <div>


            <GoogleMap

                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >


                {/* mark from json */}
                {propertyStore.loading ? <span>Im loading</span> : propertyList.map((property, index) => (
                    <Marker
                        key={index}
                        position={{
                            lat: property.address.latitude,
                            lng: property.address.longitude
                        }}
                        onClick={() => {
                            setSelectedPark(property);
                        }}
                        icon={{
                            //url: `/skateboarding.svg`,
                            scaledSize: new window.google.maps.Size(25, 25)
                        }}
                    />
                ))}

                {selectedPark && (
                    <InfoWindow
                        onCloseClick={() => {
                            setSelectedPark(null);
                        }}
                        position={{
                            lat: selectedPark.address.latitude,
                            lng: selectedPark.address.longitude
                        }}
                    >
                        <div>
                            <Link to="/clickedProperty" state={{
                                propertyId: selectedPark.propertyId,
                                street: selectedPark.address.streetName,
                                title: selectedPark ? selectedPark.title : "",
                                suburbName: selectedPark.address.suburb ? selectedPark.address.suburb.name : "",
                                houseNumber: selectedPark.address.unitNumber,
                                bedrooms: selectedPark.bedrooms,
                                bathrooms: selectedPark.bathrooms,
                                carSpaces: selectedPark.carSpaces,
                                floorSize: selectedPark.floorSize,
                                landSize: selectedPark.landSize,
                                description: selectedPark.description,
                                streetNumber: selectedPark.address.streetNumber,
                                postcode: selectedPark.address.suburb ? selectedPark.address.suburb.postcode : "",
                                state: selectedPark.address.suburb ? selectedPark.address.suburb.state : "",
                                priceInformation: selectedPark.priceInfo,
                                propertyNature: selectedPark.propertyNature,
                                propertyType: selectedPark.propertyType,
                                inspectionTimeDate: selectedPark.inspections ? selectedPark.inspections.map(({ date }) => date)[0] : "",
                                saleStatusRetrieve: selectedPark.saleStatus,

                            }}>
                                <div>
                                    <img src={background} alt="pic" width='500' height='300' />
                                    <p style={{ fontSize: 20 }}>{selectedPark.address.streetNumber} {selectedPark.address.streetName}  {selectedPark.address.suburb}</p>
                                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 60 }}>
                                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}>{selectedPark.bedrooms} </p>
                                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}>Bedrooms </p>
                                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}> | </p>
                                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}> {selectedPark.bathrooms}</p>
                                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}> Baths</p>
                                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}> | </p>
                                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}>{selectedPark.carSpaces}</p>
                                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}> Car</p>
                                    </div>

                                </div>
                            </Link>
                        </div>
                    </InfoWindow>
                )}

                {/* click show new icon */}


            </GoogleMap>

            {/* <GoogleMap 
              
              mapContainerStyle={mapContainerStyle}
              zoom={8}
              center={center}
              options={options}
              onClick={onMapClick}
              onLoad={onMapLoad}
              >
             

      
                  {parkData.features.map(park => (
                          <Marker
                          key={park.properties.PARK_ID}
                          position={{
                              lat: park.geometry.coordinates[1],
                              lng: park.geometry.coordinates[0]
                          }}
                          onClick={() => {
                              setSelectedPark(park);
                          }}
                          icon={{
                             
                              scaledSize: new window.google.maps.Size(25, 25)
                          }}
                          />
                      ))}

      {selectedPark && (
              <InfoWindow
                onCloseClick={() => {
                  setSelectedPark(null);
                }}
                position={{
                  lat: selectedPark.geometry.coordinates[1],
                  lng: selectedPark.geometry.coordinates[0]
                }}
              >
                <div>
                  <div>
                      <img src={background} alt="pic" width='500' height='300' />
                      <h1>9 Norton Street</h1>
                      <div style={{display: 'flex',flexDirection: 'row',}}>
                          <p style={{color:'grey',fontSize:16,marginTop:5, marginRight:5}}>3 Beds </p>
                          <p style={{color:'grey',fontSize:16,marginTop:5, marginRight:5}}> | </p>
                          <p style={{color:'grey',fontSize:16,marginTop:5, marginRight:5}}> 2 Baths</p>
                          <p style={{color:'grey',fontSize:16,marginTop:5, marginRight:5}}> | </p>
                          <p style={{color:'grey',fontSize:16,marginTop:5, marginRight:5}}> 1 Car</p>
                      </div>

                  </div>
                </div>
              </InfoWindow>
            )}

     

 
            </GoogleMap> */}

        </div>
    )
})

export default MapInRent

