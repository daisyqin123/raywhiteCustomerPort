import * as React from "react";
import LeftNavigationModal from './leftNavigationModal'
import { Link } from "gatsby";
import { useState } from 'react'

const Header = () => {
   const headerContainer = {
     
      display: 'flex', 
      flexDirection: 'row'
    }

    const RayWhiteContainer = {
        backgroundColor:'#f2da63',
        width:130,
        height:130,
        marginLeft: 40,
        padding:10,
    }

    const headerButtonContainer = {
      
        flexDirection: 'row',
       
        marginLeft:100,
      
    }

    const bookAppraisalContainer = {
        backgroundColor:'#f2da63',
        width: 200,
        height:60,
        marginLeft: 860,
        marginTop: 60,
        padding: 20
    }
//button
const button = {
    marginLeft:50,
    backgroundColor:"white"
    
}

//text
    const RayWhiteText = {
        marginTop: 60,
        marginLeft: 10,
        fontSize: 20,
        color: '#3d3d3c',
        fontWeight: "bold",
        //position: 'static',
        //position: 'fixed',
        
    }

    const bookText = {
        fontSize: 14,
    }
    const [isOpen, setIsOpen] = useState(false);

   

  return (
    <div>
     <div style={headerContainer}>
           
           
            <div style={RayWhiteContainer}>
                <h2 style={RayWhiteText}>Raywhite</h2>
                
            </div>



            

            <div style={button}>
            
               
                 <Link to="/" style={{ textDecoration: 'none' }}><h2 style={RayWhiteText} >Home</h2></Link>
                <LeftNavigationModal open={isOpen} onClose={() => setIsOpen(false)}> </LeftNavigationModal>
            
            </div>



            <div style={button}>
            
            <h2 onClick={() => setIsOpen(true)} style={RayWhiteText} >Rent</h2>
                <LeftNavigationModal open={isOpen} onClose={() => setIsOpen(false)}> </LeftNavigationModal>
           
            </div>

            <div style={button}>
           
            <h2 onClick={() => setIsOpen(true)} style={RayWhiteText} >Sell</h2>
                <LeftNavigationModal open={isOpen} onClose={() => setIsOpen(false)}> </LeftNavigationModal>
            
            
            </div>
           
        </div>
       
    </div>

    
    //style
   
    


  );
};
export default Header;

