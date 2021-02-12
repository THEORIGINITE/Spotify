import { IconButton } from '@material-ui/core';
import React from 'react'
import './SidebarOption.css';
function SidebarOption({title,Icon}) {
    return (
        <div className="sidebarOption">
            {Icon}
            {Icon ? <h4>{title}</h4>:<p>{title}</p>}
            
        </div>
    )
}

export default SidebarOption
