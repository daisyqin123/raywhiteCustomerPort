import React from 'react'
import Layout from '../../components/layout'
import background from "../../images/OpenForInspection.png";

const RentOpenForInspection = () => {
  return (
    <div>
      <Layout>
       <div style={{marginTop: 20, }}>
        
          {/* open for inspection */}
            <div style={{ backgroundImage: `url(${background})`,height:500}}>
              <div style={{display: 'flex',flexDirection: 'column',alignItems:'center',justifyContent:'center',}}>
              <p style={{fontSize:24, color:'white', marginTop:120 }}>WHAT'S ON</p>
              <div style={{borderBottomWidth: 4,borderBottomColor:  'yellow' }}>_________</div>
              <p style={{fontSize:52, color:'white', fontWeight: 'bold',}}>Open For Inspection</p>
              </div>
            </div>

            {/* date */}
            <div  style={{display: 'flex',flexDirection: 'column',alignItems:'center',justifyContent:'center', marginTop: 40}}>
              <h1 style={{borderBottomWidth: 4,borderBottomColor:  'yellow',fontSize:24, fontWeight: 'bold' }}>Saturday 14 January, 2023</h1>
              
            </div>
     
       </div>
      </Layout>
    </div>
  )
}

export default RentOpenForInspection