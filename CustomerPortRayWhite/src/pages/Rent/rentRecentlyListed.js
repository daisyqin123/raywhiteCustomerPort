import React from 'react'
import background from "../../images/HomeBackground.png";
import Layout from '../../components/layout'
//import Map from '../../components/map'
import MapInRent from '../../components/mapInRent';
//import HomeClickItem from '../../components/homeClickItem'
import { Link } from 'gatsby';
import { useState, useEffect } from 'react'
//API
import { observer } from 'mobx-react';
import useStores from '../../hooks/use-stores';
import { toJS } from "mobx";

//enum
const propertySaleStatusEnum = ["unknown", "Sell", "Rent"]
const propertyTypeEnum = ["unknown", "House", "Apartment", "Offices", "Retail", "Land/Development", "Industrial/Warehouse", "Commercial Farming"]

const RentRecentlyListed = observer(({ location }) => {
  const [searchKeyword, setSearchKeyword] = useState(location.state.searchSuburbKeyword);

  //API
  const { propertyStore } = useStores();
  const [propertyList, setPropertyList] = useState([]);
  //,then is async ' method

  useEffect(() => {

    propertyStore.getPropertyList()
      .then(() => {
        setPropertyList(propertyStore.propertyList.filter(p => searchKeyword
          ? p.address.streetName === searchKeyword && propertySaleStatusEnum[parseInt(p.saleStatus)] === 'Rent'
          : propertySaleStatusEnum[parseInt(p.saleStatus)] === 'Rent'));
        //  setPropertyList(propertyStore.propertyList.filter(p => p.address.streetName === searchKeyword && propertySaleStatusEnum[parseInt(p.saleStatus)] === 'Sell'));
        //setPropertyList(filteredpropertyList);
      }).catch(() => { });
    setSearchKeyword(location.state.searchSuburbKeyword);
  }, []);


  //click
  const [recentSelected, setRecentSelected] = useState(true);
  const [priceLowSelected, setPriceLowSelected] = useState(false);
  const [priceHighSelected, setpriceHighSelected] = useState(false);

  const clickRecent = () => {
    setRecentSelected(true);
    setPriceLowSelected(false);
    setpriceHighSelected(false);

  };
  const clickPriceLow = () => {
    setRecentSelected(false);
    setPriceLowSelected(true);
    setpriceHighSelected(false);

  };
  const clickPriceHigh = () => {
    setRecentSelected(false);
    setPriceLowSelected(false);
    setpriceHighSelected(true);

  };

  const buttonStyles1 = {
    color: recentSelected ? 'black' : 'grey',
    borderBottomWidth: 4,
    borderBottomColor: recentSelected ? 'yellow' : 'white',
  }
  const buttonStyles2 = {
    marginLeft: 30,
    color: priceLowSelected ? 'black' : 'grey',
    borderBottomWidth: 4,
    borderBottomColor: priceLowSelected ? 'yellow' : 'white',
  }
  const buttonStyles3 = {
    marginLeft: 30,
    color: priceHighSelected ? 'black' : 'grey',
    borderBottomWidth: 4,
    borderBottomColor: priceHighSelected ? 'yellow' : 'white',
  }
  return (
    <div>
      <Layout>
        <div style={{ marginTop: 30 }}>
          <MapInRent />
        </div>
        {/* //after map header */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 30, }}>
          <p style={{ marginRight: 200 }}>Showing 1-29 of 29 results with </p>

          <div style={{ marginRight: 20 }}>
            <button style={buttonStyles1} onClick={() => clickRecent()}>
              <p>Recent</p>
            </button>
          </div >

          <div style={{ marginLeft: 20 }}>
            <button style={buttonStyles2} onClick={() => clickPriceLow()}>
              <p>Price: Lowest</p>
            </button>
          </div >

          <div style={{ marginLeft: 20 }}>
            <button style={buttonStyles3} onClick={() => clickPriceHigh()}>
              <p>Price: Highest</p>
            </button>
          </div >
        </div >
        {/* picture display */}
        <div style={{ marginTop: 60, marginLeft: 100 }}>
          <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '10em', alignContent: 'flex-start' }} class="grid grid-flow-col auto-cols-2">
            {/* / {propertyStore.loading ? <span>Im loading</span> : propertyList.map((property, index) => (   */}
            {propertyStore.loading ? <span>Im loading</span> : propertyList.map((property, index) => (
              <>
                {/* <img src={background} alt="pic" width='500' height='300' /> */}
                <div key={index}>
                  <Link to="/clickedProperty" state={{
                    propertyId: property.propertyId,
                    street: property.address.streetName,
                    title: property ? property.title : "",
                    description: property.description,
                    suburbName: property.address.suburb ? property.address.suburb.name : "",
                    houseNumber: property.address.unitNumber,
                    bedrooms: property.bedrooms,
                    bathrooms: property.bathrooms,
                    carSpaces: property.carSpaces,
                    floorSize: property.floorSize,
                    landSize: property.landSize,
                    description: property.description,
                    streetNumber: property.address.streetNumber,
                    postcode: property.address.suburb ? property.address.suburb.postcode : "",
                    state: property.address.suburb ? property.address.suburb.state : "",
                    priceInformation: property.priceInfo,
                    propertyNature: property.propertyNature,
                    propertyType: property.propertyType,
                    inspectionTimeDate: property.inspections ? property.inspections.map(({ date }) => date)[0] : "",
                    saleStatusRetrieve: property.saleStatus,
                  }}>

                    <div style={{ backgroundImage: `url(${background})`, height: 250, width: 400, display: 'flex', justifyContent: 'flex-end' }} >
                      <div style={{ backgroundColor: '#f2da63', width: 200, height: 60, padding: 20, }}>
                        {/* <p>{props.openDate}</p> */}
                        <p>{property.updateAt.split("T")[0]}</p>
                      </div>
                    </div>
                  </Link>
                  <div>
                    <div style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                      <div style={{ display: 'flex', flexDirection: 'row', }}>
                        <p style={{ color: 'grey', fontSize: 16 }}> {propertyTypeEnum[parseInt(property.propertyNature)]}  for {propertySaleStatusEnum[parseInt(property.propertyNature)]}</p>

                      </div>

                    </div>
                    <div style={{ marginTop: 20 }}>
                      {/* //new add */}


                      <p style={{ fontSize: 20 }}>{property.address.streetNumber} {property.address.streetName}  {property.address.suburb}</p>
                      {/* <p style={{fontSize:20}}>street name</p> */}
                      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 60 }}>
                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}>{property.bedrooms} </p>
                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}>Bedrooms </p>
                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}> | </p>
                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}> {property.bathrooms}</p>
                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}> Baths</p>
                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}> | </p>
                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}>{property.carSpaces}</p>
                        <p style={{ color: 'grey', fontSize: 16, marginTop: 5, marginRight: 5 }}> Car</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}

          </div>
        </div>


      </Layout>

    </div>
  )
})

export default RentRecentlyListed