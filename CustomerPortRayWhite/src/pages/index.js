import React from 'react'
import Layout from '../components/layout'
import background from "../images/HomeBackground.png";
//import HomeClickItem from '../components/homeClickItem';
import { useState, useEffect } from "react";
import { Link } from 'gatsby';
import moment from 'moment';
//API
import { observer } from 'mobx-react';
import useStores from "../hooks/use-stores";
//import { toJS } from "mobx";
//enum
const propertySaleStatusEnum = ["unknown", "Sell", "Rent"]
const propertyTypeEnum = ["unknown", "House", "Apartment", "Offices", "Retail", "Land/Development", "Industrial/Warehouse", "Commercial Farming"]


const Index = observer(() => {
  //,then is async ' method
  useEffect(() => {
    propertyStore.getPropertyList()
      .then(() => {
        setPropertyList(propertyStore.propertyList);


      }).catch(() => { });
  }, []);

  //time


  const d1 = new Date();//current date
  const currentDate = d1.getTime();// converting to number





  //click
  const [newSelected, setNewSelected] = useState(true);
  const [openSoonSelected, setOpenSoonSelected] = useState(false);
  const [clickUpcomingSelected, setUpcomingSelected] = useState(false);

  const clickNew = () => {
    setNewSelected(true);
    setOpenSoonSelected(false);
    setUpcomingSelected(false);


  };
  const clickOpenSoon = () => {
    setNewSelected(false);
    setOpenSoonSelected(true);
    setUpcomingSelected(false);


  };
  const clickUpcoming = () => {
    setNewSelected(false);
    setOpenSoonSelected(false);
    setUpcomingSelected(true);


  };

  const buttonStyles1 = {
    color: newSelected ? 'black' : 'grey',
    borderBottomWidth: 4,
    borderBottomColor: newSelected ? 'yellow' : 'white',
  }
  const buttonStyles2 = {
    marginLeft: 30,
    color: openSoonSelected ? 'black' : 'grey',
    borderBottomWidth: 4,
    borderBottomColor: openSoonSelected ? 'yellow' : 'white',
  }
  const buttonStyles3 = {
    marginLeft: 30,
    color: clickUpcomingSelected ? 'black' : 'grey',
    borderBottomWidth: 4,
    borderBottomColor: clickUpcomingSelected ? 'yellow' : 'white',
  }

  //query
  const [queryRent, setQueryRent] = useState(true);
  const [querySale, setQuerySale] = useState(true);
  //API

  const { propertyStore } = useStores();
  const [propertyList, setPropertyList] = useState([]);



  return (

    <div>
      <Layout>
        <div style={{ marginTop: 20, }}>
          {/* background picture */}
          <div style={{ backgroundImage: `url(${background})`, height: 800 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
              <div><h4 style={{ color: 'white', fontSize: 20, marginTop: 80, }}>WOOLLAHRA | PADDINGTON</h4></div>
              <div style={{ borderBottomWidth: 4, borderBottomColor: 'yellow' }}>_________</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

                <h1 style={{ color: 'white', fontSize: 48, fontWeight: "bold", }}>Exceptional Results with </h1>


                <h1 style={{ color: 'white', fontSize: 48, fontWeight: "bold", }}>Unparalleled Service</h1>
                {/* search bar */}
                <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#FFF', width: '50%', height: '80px', marginTop: '80px' }}>
                  {/* status */}
                  <div style={{ display: 'flex', flexDirection: 'column', width: '25%', padding: 10 }}>
                    <label style={{ color: 'grey' }}>Status</label>
                    <select defaultValue='Rent' variant='unstyled' onChange={((event) => { event.target.value === 'Rent' ? setQueryRent(true) && setQuerySale(false) : setQueryRent(false) && setQuerySale(true) })}>
                      <option value='Rent'>Rent</option>
                      <option value='Sale'>Sale</option>
                    </select>
                  </div>
                  {/* search property */}
                  <div style={{ width: '50%', padding: 10, marginTop: 10 }}>
                    <input placeholder='Search for properties, suburbs or keywords' style={{ width: '100%', marginTop: 8 }} />

                  </div>
                  {/* find property */}
                  <div style={{ width: '25%', padding: 10, backgroundColor: 'yellow' }}>
                    {/* <button onClick={setPropertyList(propertyList.filter(p => propertySaleStatusEnum[parseInt(p.saleStatus)] === queryRent))}>FIND PROPERTIES</button> */}
                    {queryRent && <Link to="/Rent/rentRecentlyListed">
                      <button >FIND PROPERTIES </button>
                    </Link>}
                    {!queryRent && <Link to="/Sell/sellRecentSale">
                      <button >FIND PROPERTIES </button>
                    </Link>}
                  </div>
                </div>
                {/* text */}
                <div>
                  <h4 style={{ color: 'white', fontSize: 20, marginTop: 40, marginLeft: 100 }}>Dedication, commitment and trust are three qualities that we</h4><br />
                  <h4 style={{ color: 'white', fontSize: 20, marginTop: 5, marginLeft: 120 }}>will not compromise on. These key elements make up the</h4><br />
                  <h4 style={{ color: 'white', fontSize: 20, marginTop: 5, marginLeft: 120 }}>bedrock of the Ray White Woollahra | Paddington team.</h4><br />
                </div>

              </div>
            </div>
          </div>
          {/* filter display */}
          <div>
            {/* filter button */}
            <div style={{ marginTop: 30, display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>

              <button style={buttonStyles1} onClick={() => clickNew()} >NEW</button>
              <button style={buttonStyles2} onClick={() => clickOpenSoon()}>OPEN SOON</button>
              <button style={buttonStyles3} onClick={() => clickUpcoming()}>UPCOMING AUCTIONS</button>

            </div>
            {/* filter picture */}
            {/* <div style={{marginTop: 60, flexDirection: 'row', flexWrap: 'wrap',justifyContent:'center', gap: '10em', flex: 1}} class="grid grid-flow-col auto-cols-2"> */}
            <div style={{ marginTop: 60, marginLeft: 100 }}>
              <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '10em', alignContent: 'flex-start' }} class="grid grid-flow-col auto-cols-2">
                {/* / {propertyStore.loading ? <span>Im loading</span> : propertyList.map((property, index) => (   */}
                {propertyStore.loading ? <span>Im loading</span> : propertyList.filter(p =>

                  newSelected
                    ? p.propertyId > 0
                    : p.propertyId > 0
                      && openSoonSelected
                      //69.44444 days
                      ? new Date().getTime() - new Date(p.updateAt).getTime() > 6000000000
                      : p.propertyId > 0
                        //70.60185185185 days
                        && clickUpcomingSelected
                        ? new Date().getTime() - new Date(p.updateAt).getTime() > 6100000000
                        : p.propertyId > 0

                ).map((property, index) => (
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
          </div>
        </div>
      </Layout>
    </div>
  )
})

export default Index