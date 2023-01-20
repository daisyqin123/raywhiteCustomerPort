import React from 'react'
import background from "../images/HomeBackground.png";
import { Link } from 'gatsby';
import {useState,  useEffect} from 'react'
//API
import { observer } from 'mobx-react';
import useStores from "../hooks/use-stores";
import { toJS } from "mobx";

//enum
const propertySaleStatusEnum = ["unknown", "Sell", "Rent"]
const propertyTypeEnum = ["unknown", "House", "Apartment", "Offices", "Retail", "Land/Development", "Industrial/Warehouse", "Commercial Farming"]


const HomeClickItem = observer( () => {
 
    //API
    const { propertyStore } = useStores();
    const [propertyList, setPropertyList] = useState([]);
//,then is async ' method
      useEffect(() => {
    propertyStore.getPropertyList()
    .then(() => {
        setPropertyList(propertyStore.propertyList);
        //setPropertyList(filteredpropertyList);
    }).catch(() => {});
  }, []);

  



  return (
    
    <div style={{width: '100%',display: 'flex', flexWrap: 'wrap', gap: '10em',alignContent:'flex-start'}} class="grid grid-flow-col auto-cols-2">
         {/* / {propertyStore.loading ? <span>Im loading</span> : propertyList.map((property, index) => (   */}
            {propertyStore.loading ? <span>Im loading</span> : propertyList.map((property, index) => (  
            <>
                {/* <img src={background} alt="pic" width='500' height='300' /> */}
                <div  key={index}>
                    <Link to="/clickedProperty" state={{
                               propertyId: property.propertyId, 
                                street: property.address.streetName,
                                title: property ? property.title : "",
                                description:  property.description ,
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
                                inspectionTimeDate: property.inspections ? property.inspections.map(({date}) =>date)[0] : "" ,
                                saleStatusRetrieve: property.saleStatus,
                    }}>
                        
                    <div style={{ backgroundImage: `url(${background})`, height:250, width:400, display: 'flex', justifyContent: 'flex-end'}} >
                        <div style={{ backgroundColor:'#f2da63',width: 200,height:60,padding: 20, }}>
                                {/* <p>{props.openDate}</p> */}
                                <p>{property.updateAt.split("T")[0]}</p>
                        </div>
                    </div>
                    </Link>
                    <div>
                        <div style={{flexDirection: 'row', justifyContent:'space-around', marginTop:20}}>
                            <div style={{display: 'flex',flexDirection: 'row',}}>
                                <p style={{color:'grey',fontSize:16}}> {propertyTypeEnum[parseInt(property.propertyNature)]}  for {propertySaleStatusEnum[parseInt(property.propertyNature)]}</p>
                                
                            </div>
                            
                        </div>
                        <div style={{marginTop:20}}>
            {/* //new add */}
                        
                        
                            <p style={{fontSize:20}}>{property.address.streetNumber} {property.address.streetName}  {property.address.suburb}</p>
                            {/* <p style={{fontSize:20}}>street name</p> */}
                            <div style={{display: 'flex',flexDirection: 'row',marginBottom: 60}}>
                                <p style={{color:'grey',fontSize:16,marginTop:5, marginRight:5}}>{property.bedrooms} </p>
                                <p style={{color:'grey',fontSize:16,marginTop:5, marginRight:5}}>Bedrooms </p>
                                <p style={{color:'grey',fontSize:16,marginTop:5, marginRight:5}}> | </p>
                                <p style={{color:'grey',fontSize:16,marginTop:5, marginRight:5}}> {property.bathrooms}</p>
                                <p style={{color:'grey',fontSize:16,marginTop:5, marginRight:5}}> Baths</p>
                                <p style={{color:'grey',fontSize:16,marginTop:5, marginRight:5}}> | </p>
                                <p style={{color:'grey',fontSize:16,marginTop:5, marginRight:5}}>{property.carSpaces}</p>
                                <p style={{color:'grey',fontSize:16,marginTop:5, marginRight:5}}> Car</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            ))}
        
    </div>
  )
})

export default HomeClickItem