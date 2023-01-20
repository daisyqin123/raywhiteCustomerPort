import React from 'react'
import { Link } from 'gatsby';

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    MarkerClusterer,
} from "@react-google-maps/api";


import { formatRelative } from "date-fns";
import { useState, useEffect } from 'react'
import background from "../images/HomeBackground.png";
//import "@reach/combobox/styles.css";

//API
import { observer } from 'mobx-react';
import useStores from "../hooks/use-stores";
import { toJS } from "mobx";


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
const MapInSell = observer(() => {
    //API
    const { propertyStore } = useStores();
    const [propertyList, setPropertyList] = useState([]);
    //,then is async ' method
    useEffect(() => {
        propertyStore.getPropertyList()
            .then(() => {
                setPropertyList(propertyStore.propertyList.filter(p => propertySaleStatusEnum[parseInt(p.saleStatus)] === 'Sell'));
            }).catch(() => { });
    }, []);

    //const varieble
    const [selectedPark, setSelectedPark] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const [markers, setMarkers] = React.useState([]);


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

        <div >
            <div style={{ position: 'relative', }}>

                <GoogleMap

                    mapContainerStyle={mapContainerStyle}
                    zoom={12}
                    center={center}
                    options={options}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                >
                    {/* filter */}

                    {/* <div style={{ position: 'absolute', backgroundColor: 'white', width: '60%', height: '12%', padding: '30', top: '560px', right: '250px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }} class="place-content-center">

                        <label className="py-1.5 [&>label]:ml-1 [&>label]:mr-10">Bedrooms:</label>
                        <div className="py-1.5 [&>label]:ml-1 [&>label]:mr-3">

                            <input type='radio' name="type" /><label>2</label>
                            <input type='radio' name="type" /><label>3</label>
                        </div>
                        <p>Price:</p>

                    </div> */}
                    {/* mark from json */}

                    <MarkerClusterer>
                        {(clusterer) =>
                            propertyStore.loading ? <span>Im loading</span> : propertyList.map((property, index) => (
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
                                    clusterer={clusterer}
                                />


                            ))
                        }
                    </MarkerClusterer>

                    {
                        selectedPark && (
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
                        )
                    }




                </GoogleMap >


            </div>

        </div >
    )
})

export default MapInSell

