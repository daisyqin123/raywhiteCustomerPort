import React from 'react'
import { RiCloseCircleFill } from "react-icons/ri";

const RequestInspectionModal = ({open, children, onClose}) => {
    if(!open) return null

  return (
    <div>
        <div  style={OVERLAY_STYLES} className="fixed top-0 left-0 right-0 "/>
        <div style={MODAL_STYLES} className="fixed">
            <button onClick={onClose}><RiCloseCircleFill className="inline-block mr-30" color="red" size={"2em"}/></button>
            {children}
            
        </div>
    </div>
  )
}

export default RequestInspectionModal

const OVERLAY_STYLES = {
  
  // top: 0,
  // left: 0,
  // right: 0,
  bottom: 0,
  backgroundColor:'rgba(0,0,0, .7)',
  zIndex: 1000
}

const MODAL_STYLES = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '10px',
  zIndex: 1000
}