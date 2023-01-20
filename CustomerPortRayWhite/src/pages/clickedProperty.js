import React from 'react'
import background from "../images/HomeBackground.png";
import agentPhoto from "../images/agent.jpeg"
import Layout from '../components/layout';
import RequestInspectionModal from '../components/requestInspectionModal';
import {useState,  useEffect} from 'react'
import moment from 'moment';
//icon
import { MdBedroomParent } from "react-icons/md";
import { MdBathroom } from "react-icons/md";
import { AiFillCar } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { MdPhoneIphone } from "react-icons/md";
import { AiTwotoneMail } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";


//API
import { observer } from 'mobx-react';
import useStores from "../hooks/use-stores";
import { toJS } from "mobx";

//enum
const propertySaleStatusEnum = ["unknown", "Sell", "Rent"]
const propertyTypeEnum = ["unknown", "House", "Apartment", "Offices", "Retail", "Land/Development", "Industrial/Warehouse", "Commercial Farming"]
const australianStates = [
  "Australian Capital Territory", "New South Wales", "Victoria", "Queensland",
  "South Australia", "Western Australia", "Tasmania", "Northern Territory"
];
const australianStateCodes = ["ACT", "NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT"];

//

const ClickedProperty = observer(({location}) => {

     // create form variables -- Property
  const [propertyId, setPropertyId] = useState(0);
  const [title, setTitle] = useState("");
  const [saleStatus, setSaleStatus] = useState(0);
  const [propertyNature, setPropertyNature] = useState(0);
  const [propertyType, setpropertyType] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [carSpace, setCarSpace] = useState(0);
  const [floorSize, setFloorSize] = useState(0);
  const [landSize, setLandSize] = useState(0);
  const [priceInfo, setPriceInfo] = useState("");
  const [description, setDescription] = useState("");
  // create form variables -- Address
  const [unitNumber, setUnitNumber] = useState(0);
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [suburbName, setSuburbName] = useState("");
  const [postcode, setPostcode] = useState("");
  const [stateName, setStateName] = useState("");
  const [stateCode, setStateCode] = useState("");
  //const [inspectionTimeForDate, setInspectionTimeForDate] = useState<string[]>([]);
  const [inspectionTimeForDate, setInspectionTimeForDate] = useState(null);
  // const index to control two variables at the same time
  const [stateIndex, setStateIndex] = useState("0");
  
  const [agencyName0, setAgencyName0]=useState("");
   const [agencyName1, setAgencyName1]=useState("");
   const [agencyEmail1, setAgencyEmail1]=useState("");
   const [agencyPhone1, setAgencyPhone1]=useState("");

 // pass data from stock
    const { propertyStore } = useStores();
    //data from property detail
     const [propertyDetail, setPropertyDetail] = useState([]);
    
  useEffect(() => {
    //property store-property detail
     propertyStore.getPropertyDetail(location.state.propertyId,location.state.saleStatusRetrieve)
       .then(() => {
        setPropertyDetail(propertyStore.propertyDetail);
         //get from propertyDetail
    setAgencyName0(propertyStore.propertyDetail.propertyAgents[0].agent.name  );
    setAgencyName1(propertyStore.propertyDetail.propertyAgents[1].agent.name );
    setAgencyEmail1(propertyStore.propertyDetail.propertyAgents[1].agent.email );
    setAgencyPhone1(propertyStore.propertyDetail.propertyAgents[1].agent.phone );

    }).catch(() => {});
 
      //agent
  
    //pass data from last page
    console.log(location);
    setTitle(location.state.title);
    setDescription(location.state.description)
    setStreetName(location.state.street);
    setPropertyId(location.state.propertyId);
    setUnitNumber(location.state.houseNumber);
    setSuburbName(location.state.suburbName);
    setBedrooms(location.state.bedrooms);
    setBathrooms(location.state.bathrooms);
    setCarSpace(location.state.carSpaces);
    setFloorSize(location.state.floorSize);
    setLandSize(location.state.landSize);
    setDescription(location.state.description);
    setStreetNumber(location.state.streetNumber);
    setPostcode(location.state.postcode);
    setStateCode(location.state.state);
    setPriceInfo(location.state.priceInformation);
    setPropertyNature(location.state.propertyNature);
    setpropertyType(location.state.propertyType);
    setInspectionTimeForDate(location.state.inspectionTimeDate ? location.state.inspectionTimeDate.split("T")[0] : "" );
    setSaleStatus(location.state.saleStatusRetrieve);
   
    
  },[]);


//
  const [isOpen, setIsOpen] =useState(false);

  return (
    
    <div>
      <Layout>
        {/* picture background */}
        <div style={{ backgroundImage: `url(${background})`, height:800, marginTop:30, display: 'flex',flexDirection: 'row', justifyContent:'flex-end'}}>
           <div style={{backgroundColor:'#323333',width:'40%', height:800}}>
              
              <p style={{textAlign: 'center', fontSize: 18, color:'grey', marginTop: 80}}> {propertyTypeEnum[propertyType]} for {propertySaleStatusEnum[saleStatus]}</p>
              <p style={{textAlign: 'center', fontSize: 52,fontWeight: 'bold',marginTop: 140,color:'white'}}> {streetNumber} {streetName}</p>
              <p style={{textAlign: 'center', fontSize: 28,fontWeight: 'bold',color:'white',marginTop: 40,}}> {suburbName}, {stateName} {postcode}</p>
              <p style={{textAlign: 'center', fontSize: 46,fontWeight: 'bold',color:'yellow',marginTop: 20,}}> _____</p>
              <p style={{textAlign: 'center', fontSize: 30,fontWeight: 'bold',color:'white',marginTop: 40,}}> Auction {inspectionTimeForDate}</p>
              

              <div  style={{display: 'flex',flexDirection: 'row',justifyContent:'space-around', marginTop: 70,marginLeft:120, width:'60%'}}>
              <MdBedroomParent size="25px" color="grey" />
              <p style={{textAlign: 'center', fontSize: 18,color:'grey',marginRight:10}}>{bedrooms} Beds</p>
              <MdBathroom size="25px" color="grey" />
              <p style={{textAlign: 'center', fontSize: 18,color:'grey',marginRight:10}}>{bathrooms} Baths</p>
              <AiFillCar size="25px" color="grey" />
              <p style={{textAlign: 'center', fontSize: 18,color:'grey',marginRight:10}}>{carSpace} Cars</p>
              </div >

            </div>
        </div>
        {/* inspection detail */}
        <div>
              <p style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold',marginTop:30, marginBottom: 30}}>Inspection details</p>
              <div style={{display: 'flex',flexDirection: 'row', justifyContent:'center',}}>
                    <div style={{borderColor:'black',borderWidth: 1, padding:10, }}>
                    <p style={{fontSize: 14,textAlign: 'center'}}>{moment({inspectionTimeForDate}).format('dddd')} </p>
                    <p style={{fontSize: 24,fontWeight: 'bold',marginTop:30,textAlign: 'center'}}>{moment({inspectionTimeForDate}).format('Do')}</p>
                    <p style={{fontSize: 14, color:'grey',textAlign: 'center'}}>{moment({inspectionTimeForDate}).format('MMM')}</p>
                    <p style={{fontSize: 14,marginTop:30,textAlign: 'center'}}>10:00am-5:30pm</p> 
                   </div>
              </div>
              <div style={{display: 'flex',flexDirection: 'row', justifyContent:'center', marginTop:30 }}>
                  <div style={{backgroundColor:'#323333',width:240, height:30, display: 'flex',flexDirection: 'row',justifyContent:'center', }}>
                    <button  style={{color:'white' }} onClick={()=> setIsOpen(true)}>REQUEST AN INSPECTION </button><AiOutlineArrowRight size="25px" color="white" style={{marginLeft:5,marginTop:5}}/>
                    
                    <RequestInspectionModal open={isOpen} onClose={() => setIsOpen(false)}>
                      <div style={{padding:30}}>
                      <p style={{color: 'grey',textAlign: 'center'}}>{streetNumber} {streetName}</p>
                      <p style={{fontSize: 24,fontWeight: 'bold',marginTop:30,textAlign: 'center'}}>Request Inspection</p>
                      <p style={{color: 'grey',marginTop:30,textAlign: 'center'}}>_________________________________________________________</p>
                      <p >Your Full Name</p>
                      <input placeholder=" e.g. Joe Bloggs" style={{ marginTop: 10,  borderColor:'#919190', borderWidth:2, padding: 10, width:'100%'}}/>
                        <div style={{display: 'flex',flexDirection: 'row'}}>
                          <div style={{display: 'flex',flexDirection: 'column',  width:'50%'}}>
                            <p>Your Phone Number</p>
                            <input placeholder=" e.g. 04** *** ***" style={{ marginTop: 10,  borderColor:'#919190', borderWidth:2, padding: 10}}/>
                          </div>
                          <div style={{display: 'flex',flexDirection: 'column',  width:'50%', marginLeft: 10}}>
                            <p>Your Email </p>
                            <input placeholder=" e.g. Joe Bloggs@gmail.com" style={{ marginTop: 10,  borderColor:'#919190', borderWidth:2, padding: 10}}/>
                          </div>
                        </div>
                      <p>Additional Message</p>
                      <textarea className="w-full" rows={4} placeholder="Describe the property in detail .." style={{ marginTop: 10,  borderColor:'#919190', borderWidth:2, padding: 10, width:'100%'}}/>
                      </div>
                    </RequestInspectionModal>
                      
                    
                  </div>
              </div>
        </div>
        {/* picture display */}
        <div>
        <div style={{display: 'flex',flexDirection: 'row', justifyContent:'center', marginTop:30}}>
          <p >PHOTOS</p>
          <p style={{marginLeft:10}}>/</p>
          <p style={{marginLeft:10}}>FLOORPLAN</p>
          <p style={{marginLeft:10}}>/</p>
          <p style={{marginLeft:10}}>DESCRIPTION</p>
          <p style={{marginLeft:10}}>/</p>
          <p style={{marginLeft:10}}>ASK A QUESTION</p>
          <p style={{marginLeft:10}}>/</p>
          <p style={{marginLeft:10}}>LOCATION</p>
          <p style={{marginLeft:10}}>/</p>
          <p style={{marginLeft:10}}>NEXT STEPS</p>
          
        </div>
        <div style={{marginTop: 60,display: 'flex',flexDirection: 'column', alignContent:'center',}}>
            <div style={{marginLeft:200}}>
            <img src={require('../images/OpenForInspection.png').default} alt="image uploading" height='150' width='70%'></img>
            </div>
        </div>
        </div>
        {/* display */}
        <div>
        <div style={{display:'flex',marginTop: 20, flexDirection: 'row',padding:100,width:'100%'}}>
      {/* //left */}
        <div style={{display:'flex',marginTop: 20, flexDirection: 'column',padding:100,width:'50%'}}>
          <div>
          <p style={{fontSize: 18, color:'grey', }}>{propertyTypeEnum[propertyType]} for {propertySaleStatusEnum[saleStatus]} in {suburbName}</p>
          <p style={{fontSize: 18,fontSize: 42,fontWeight: 'bold',marginTop: 40,color:'black'}}>{title}</p>
       
          </div>
          
          <div style={{display:'flex',flexDirection: 'row', marginTop: 40,}}>
          <MdBedroomParent size="25px" color="grey" />
          <p style={{fontSize: 18,color:'grey',marginRight:40}}>{bedrooms} Beds</p>
          <MdBathroom size="25px" color="grey" />
          <p style={{fontSize: 18,color:'grey',marginRight:40}}>{bathrooms} Baths</p>
          <AiFillCar size="25px" color="grey" />
          <p style={{fontSize: 18,color:'grey',marginRight:40}}>{carSpace} Cars</p>
          </div>

          <p style={{marginTop:50,color:'#91918e'}}>_______________________________________________________</p>

          <div style={{marginTop:60}}>
            <div >
            <p style={{fontSize: 18,fontWeight: 'bold', marginBottom: 20 }}>NEXT STEPS:</p>
            </div>
            <div style={{flexDirection: 'row'}}>
            
            <p style={{fontSize: 18,marginBottom: 20 , marginLeft:10 }}>REQUEST CONTACT</p>
            </div>
            <div style={{flexDirection: 'row'}}>
           
            <p style={{fontSize: 18,marginBottom: 20 , marginLeft:10}}>ASK A QUESTION</p>
            </div >
            <div style={{flexDirection: 'row'}}>
           
            <p style={{fontSize: 18,marginBottom: 20 , marginLeft:10 }}>TALK TO A MORTGAGE ADVISER</p>
            </div>
            <div style={{flexDirection: 'row'}}>
           
            <p style={{fontSize: 18,marginBottom: 20, marginLeft:10 }}>REQUEST AN INSPECTION REPORT</p>
            </div>
          </div>
          
        </div >
        {/* //right */}
        <div style={{width:'50%'}}>

        

        <div style={{paddingLeft:30, marginTop:20}}>
          <p style={{fontSize: 18}}>{description}</p>
        
        </div>

        <div style={{paddingLeft:30,marginTop:30}}>
        <p style={{color:'#91918e'}}>____________________________________________________________________________</p>
        <div style={{ flexDirection: 'row',marginTop: 20}}>
        <p style={{color:'#91918e',fontSize: 18, marginRight:20,}}>Land area: {landSize} m²</p>
       
        </div>
        <p style={{color:'#91918e'}}>____________________________________________________________________________</p>
        <div style={{ flexDirection: 'row',marginTop: 20}}>
        <p style={{color:'#91918e',fontSize: 18, marginRight:20,}}>Parking: {carSpace}</p>
       
        </div>
        <p style={{color:'#91918e'}}>____________________________________________________________________________</p>
        <div style={{ flexDirection: 'row',marginTop: 20}}>
        <p style={{color:'#91918e',fontSize: 18, marginRight:20,}}>Bedrooms: {bedrooms}</p>
        
        </div>
        <p style={{color:'#91918e'}}>____________________________________________________________________________</p>
        <div style={{ flexDirection: 'row',marginTop: 20}}>
        <p style={{color:'#91918e',fontSize: 18, marginRight:20,}}>Bathrooms: {bathrooms}</p>
        
        </div>
        <p style={{color:'#91918e'}}>____________________________________________________________________________</p>
        <div style={{display:'flex', flexDirection: 'row',marginTop: 60,alignItems: 'flex-end', padding:10}}>
          <p style={{fontSize: 18, marginRight:20,}}> SHERE:</p>
          <AiFillTwitterSquare  size="25px" color="grey"/>
          <AiFillFacebook  size="25px" color="grey"/>
        </div>

        </div >

        </div>

      </div>
      {/* contact agent */}
      <div style={{backgroundColor:'#e8e9eb',display:'flex',flexDirection: 'column', alignContent:'center',justifyContent:'center'}}>
        <div style={{textAlign: 'center' ,marginTop:80}}><p style={{color:'#91918e'}}>contact</p></div>
        <div style={{textAlign: 'center'}}><p style={{fontSize: 28,fontWeight: 'bold'}}>Agent</p></div>
        {/* agent photo */}
        <div style={{display:'flex',flexDirection: 'row'}}>
           {/* single agent photo */}
           <div style={{display: 'flex',flexDirection: 'row', justifyContent:'center', width:'30%', backgroundColor:'white', margin:120}}>
            <div style={{display: 'flex',flexDirection: 'column',flex:0.6, padding:40,}}>
              <p style={{fontSize: 24, fontWeight: 'bold'}}>{agencyName0}</p>
              <div style={{display: 'flex',flexDirection: 'row',marginTop:8}}><MdPhoneIphone  size="25px" color="grey"/><p >{propertyDetail.propertyAgents ? propertyDetail.propertyAgents[0].agent.phone :""}</p></div>
              <div style={{display: 'flex',flexDirection: 'row',marginTop:8}}><AiTwotoneMail size="25px" color="grey"/><p >{propertyDetail.propertyAgents ? propertyDetail.propertyAgents[0].agent.email :""}</p></div>
            </div>
            <div style={{flex:0.4, }}>
              <img src={agentPhoto} alt="pic" height='100%'  />
 
            </div>
          </div>
          {/* single agent photo */}
          { agencyName1&&
          <div style={{display: 'flex',flexDirection: 'row', justifyContent:'center', width:'30%', backgroundColor:'white', margin:120}}>
            <div style={{display: 'flex',flexDirection: 'column',flex:0.6, padding:40,}}>
              <p style={{fontSize: 24, fontWeight: 'bold'}}>{agencyName1}</p>
              <div><MdPhoneIphone  size="25px" color="grey"/><p >{agencyEmail1}</p></div>
              <div><AiTwotoneMail size="25px" color="grey"/><p >{agencyPhone1}</p></div>
            </div>
            <div style={{flex:0.4, }}>
              <img src={agentPhoto} alt="pic" height='100%'  />
 
            </div>
          </div>}
        </div>
        {/* button */}
         <div style={{display: 'flex',flexDirection: 'row', justifyContent:'center', marginBottom: 100}}>
                  <div style={{backgroundColor:'#323333',width:200, height:30, display: 'flex',flexDirection: 'row',justifyContent:'center', }}>
                    <button  style={{color:'white' }} onClick={()=> setIsOpen(true)}>ASK A QUESTION</button><AiOutlineArrowRight size="25px" color="white" style={{marginLeft:5,marginTop:5}}/>
                     <RequestInspectionModal open={isOpen} onClose={() => setIsOpen(false)}>
                      <div style={{padding:30}}>
                      <p style={{color: 'grey',textAlign: 'center'}}>{streetNumber} {streetName}</p>
                      <p style={{fontSize: 24,fontWeight: 'bold',marginTop:30,textAlign: 'center'}}>Get in Touch</p>
                      <p style={{color: 'grey',marginTop:30,textAlign: 'center'}}>_________________________________________________________</p>
                      <p >Your Full Name</p>
                      <input placeholder=" e.g. Joe Bloggs" style={{ marginTop: 10,  borderColor:'#919190', borderWidth:2, padding: 10, width:'100%'}}/>
                        <div style={{display: 'flex',flexDirection: 'row'}}>
                          <div style={{display: 'flex',flexDirection: 'column',  width:'50%'}}>
                            <p>Your Phone Number</p>
                            <input placeholder=" e.g. 04** *** ***" style={{ marginTop: 10,  borderColor:'#919190', borderWidth:2, padding: 10}}/>
                          </div>
                          <div style={{display: 'flex',flexDirection: 'column',  width:'50%', marginLeft: 10}}>
                            <p>Your Email </p>
                            <input placeholder=" e.g. Joe Bloggs@gmail.com" style={{ marginTop: 10,  borderColor:'#919190', borderWidth:2, padding: 10}}/>
                          </div>
                        </div>
                      <p>Additional Message</p>
                      <textarea className="w-full" rows={4} placeholder="Describe the property in detail .." style={{ marginTop: 10,  borderColor:'#919190', borderWidth:2, padding: 10, width:'100%'}}/>
                      </div>
                    </RequestInspectionModal>
                  </div>
          </div>
      </div>
      {/* map */}
      <div>
        
      </div>
        </div>
      </Layout>
    </div>
  )
})

export default ClickedProperty