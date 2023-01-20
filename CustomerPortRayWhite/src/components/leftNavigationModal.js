import React from 'react';
import { Link } from "gatsby";
import { useState } from "react";
import whiteTriangle from "../images/whiteTriangle.png";



//icon
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RxTriangleDown } from "react-icons/rx";

const LeftNavigationModal = ({open, children, onClose}) => {
  const [extraTab, setExtraTab] = useState(true);//rent
  const [extraTab1, setExtraTab1] = useState(true);//rent
  
  const [rotateAngle, setRotateAngle] = useState(0);//
  const rotateIcon = () => {
    rotateAngle === 0 ? setRotateAngle(90) : setRotateAngle(0);
    //console.log('rotate');
  };
  const MODAL_STYLES ={

    //transform: 'translate(-50%, -50%)',
    backgroundColor: '#363535',
    padding: '20px',
    position: 'fixed',
    top: 0,
    left:0,
    bottom:0,
    width: "25%",
    height:"100%",
    zIndex: 1000,
    


  }

  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0, .7)',
     zIndex: 1000
  }



  if (!open) return null

 
  return (
    <>
    <div style={OVERLAY_STYLES}/> 
      <div style={MODAL_STYLES}>
        {/* upper area */}
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div>
              <AiOutlineCloseCircle onClick={onClose} size="35px" color="#FFF"/>
              {children}
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
            {/* title */}
              <div style={{width:150, height:150, backgroundColor: "#f2da63", marginLeft:15}}>
              <h2 style={{color:"grey" ,fontSize: 26, marginLeft: 20, marginTop: 100}}>RayWhite</h2>
              </div>
            <h4 style={{color:'#6f7070', marginTop: 30}}>Woollahra | Paddington</h4>
            <h4 style={{color:'#6f7070', marginTop: 10}}>___________________________</h4>
            </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
        

        {/* rent */}
        <div style={{marginTop: 40, marginLeft:20}}>
          <article style={{display: 'flex', flexDirection: 'row'}}>
            <Link style={{color:'white', textDecoration: 'none'}}>Rent</Link>
            <RxTriangleDown size="20px" color="#6f7070" style={{marginRight: 20}} onClick={() => {
            rotateIcon();
            setExtraTab(!extraTab);
          }}/>
          </article>
          {extraTab && (<div style={{marginLeft: 40}}>
           <Link to="/Rent/rentRecentlyListed" style={{color:'white', textDecoration: 'none', marginTop: '10'}} activeStyle={{color: "grey",fontWeight: 700}}>Rencently Listed</Link><br/>
          <Link to="/Rent/rentOpenForInspection" style={{color:'white', textDecoration: 'none', marginTop: '10'}} activeStyle={{color: "grey",fontWeight: 700}}>Open For Inspection</Link>
          </div>)}
        </div>

        {/* sell */}
        <div style={{marginTop: 30, marginLeft:20}}>
          <article style={{display: 'flex', flexDirection: 'row'}}>
            <Link style={{color:'white', textDecoration: 'none'}}>Sell</Link>
            <RxTriangleDown size="20px" color="#6f7070" style={{marginRight: 20}} onClick={() => {
            
            setExtraTab1(!extraTab1);
          }}/>
          </article>
          {extraTab1 && (<div style={{marginLeft: 40}}>
           <Link to="/Sell/sellRecentSale" style={{color:'white', textDecoration: 'none', marginTop: '10'}} activeStyle={{color: "grey",fontWeight: 700}}>Recent Sales</Link><br/>
          <Link to="/Sell/salePropertyAppraisal" style={{color:'white', textDecoration: 'none', marginTop: '10'}} activeStyle={{color: "grey",fontWeight: 700}}>Property Appraisal</Link>
          </div>)}
        </div>


        </div>
        
      </div>
    
    </>
  )
}

export default LeftNavigationModal