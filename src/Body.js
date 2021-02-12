import React from 'react';
import './Body.css';
import { useDataLayerValue } from './DataLayer';
import Header from './Header';
function Body({spotify}) {
    const [{discover_weekly},dispatch] = useDataLayerValue();
    return (
        <div className="body">
            <Header spotify={spotify}/>
            <div className="body_info">
              <img src={discover_weekly?.images[0]?.url} alt=""/>
              <div className="body_infoText">
                  <strong>PLAYLIST</strong>
                  <h1>Discover Weekly</h1>
                  <p>{discover_weekly?.description}</p>
              </div>
            </div>
        </div>
        
    )
}

export default Body
