import React from 'react'
import useStores from '../../hooks/use-stores';
import { useState } from 'react';
import Layout from '../../components/layout'
//API
import { observer } from 'mobx-react';



const SalePropertyAppraisal = observer(() => {

  const { appraisalStore } = useStores();



  // create address in back-end
  const handleCreate = () => {
    console.log('create');
    appraisalStore.CreateAppraisal({


      "name": "string",
      "phone": "string",
      "email": "string",
      "additionalMessage": "string",
      "streetAddress": "h",
      "suburb": "string",
      "postcode": "string",
      "bedrooms": 0,
      "bathrooms": 0,
      "carSpaces": 0,
      "additionalDetail": "string"

    })

  }


  const [streetName, setStreetName] = useState();
  return (
    <div>
      <Layout>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', }}>
            <div style={{ width: '100%', }}>
              <h1 style={{ fontSize: 24, marginTop: 100, color: 'grey', textAlign: 'center' }}>SELL</h1>
              <h4 style={{ fontSize: 52, textAlign: 'center', marginTop: 40, fontWeight: 'bold', }}>Property Appraisal</h4>
              <h6 style={{ color: 'grey', marginTop: 100, textAlign: 'center' }}>Want to know how much your property could sell for?</h6><br />
              <h6 style={{ color: 'grey', textAlign: 'center' }}>At Ray White Woollahra | Paddington we design marketing packages which are completely tailored to your specific needs and goals.</h6><br />
              <h6 style={{ color: 'grey', textAlign: 'center' }}>Enter your details below and we will contact you to arrange a detailed property appraisal.</h6><br />
            </div>

            {/* renter detail */}
            <div style={{ marginTop: 80, width: '50%', alignItems: 'center' }}>
              <h4 style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', }}>Your Contact Details</h4>
              <div style={{ marginTop: 20, alignItems: 'center' }}>
                <h6 style={{ fontSize: 20, alignItems: 'center' }}>Your Full Name </h6>
                <input placeholder=" e.g.Joe Bloggs" style={{ marginTop: 10, height: 60, borderColor: '#919190', borderWidth: 2, padding: 10, width: '100%' }} />
              </div>

              <div style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <div>
                  <h6 style={{ fontSize: 20, }}>Your Phone Number</h6>
                  <input placeholder=" e.g.04xx xxx xxx" style={{ marginTop: 10, height: 60, borderWidth: 2, padding: 10, borderColor: '#919190', width: '100%' }} />
                </div>
                <div>
                  <h6 style={{ fontSize: 20, }}>Your Email</h6>
                  <input placeholder=" e.g.j.bloggs@gmail.com" style={{ marginTop: 10, height: 60, borderWidth: 2, padding: 10, borderColor: '#919190', width: '100%' }} />
                </div>

              </div>
              <div>
                <h6 style={{ fontSize: 20, }}>Additional Message</h6>
                <input style={{ marginTop: 10, height: 120, borderWidth: 2, padding: 10, borderColor: '#919190', width: '100%' }} type="textarea" />
              </div>
            </div>
            {/* prperty detail */}
            <div style={{ marginTop: 80, width: '50%', }}>

              <h4 style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', }}>Property Details</h4>
              <div style={{ marginTop: 20, }}>
                <h6 style={{ fontSize: 20, }}>Street Address </h6>
                <input onChange={(event) => setStreetName(event.target.value)} placeholder=" e.g. 123 Example" style={{ marginTop: 10, height: 60, borderColor: '#919190', borderWidth: 2, padding: 10, width: '100%' }} />
              </div>
              <div style={{ marginTop: 20, }}>
                <h6 style={{ fontSize: 20, }}>Suburb and Postcode </h6>
                <input placeholder=" City, Suburb, Postcode" style={{ marginTop: 10, height: 60, borderColor: '#919190', borderWidth: 2, padding: 10, width: '100%' }} />
              </div>

              <div style={{ display: 'flex', marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <div style={{ marginTop: 20, flexDirection: 'column', justifyContent: 'space-between', width: '30%' }}>
                  <h6 style={{ fontSize: 20, }}>Bedrooms</h6>
                  <select style={{ marginTop: 10, height: 60, borderWidth: 2, padding: 10, borderColor: '#919190', width: '100%' }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
                <div style={{ marginTop: 20, flexDirection: 'column', justifyContent: 'space-between', width: '30%' }}>
                  <h6 style={{ fontSize: 20, }}>Bathrooms</h6>
                  <select style={{ marginTop: 10, height: 60, borderWidth: 2, padding: 10, borderColor: '#919190', width: '100%' }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
                <div style={{ marginTop: 20, flexDirection: 'column', justifyContent: 'space-between', width: '30%' }}>
                  <h6 style={{ fontSize: 20, }}>Car Spaces</h6>
                  <select style={{ marginTop: 10, height: 60, borderWidth: 2, padding: 10, borderColor: '#919190', width: '100%' }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
              </div>
              <div>
                <h6 style={{ fontSize: 20, }}>Additional Details</h6>
                <input style={{ marginTop: 10, height: 120, borderWidth: 2, padding: 10, borderColor: '#919190', width: '100%' }} />
              </div>

            </div>



            <div style={{ height: 600, marginTop: 100 }}>
              <button style={{ backgroundColor: '#363533', width: 300, height: 60, padding: 20 }} onClick={handleCreate}>
                <h4 style={{ color: 'white', fontSize: 18, textAlign: 'center', }}>REQUEST AN APPRAISAL</h4>
              </button>
            </div>

          </div>
        </div>
      </Layout>

    </div>
  )
})

export default SalePropertyAppraisal