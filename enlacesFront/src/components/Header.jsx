import React from 'react';

function Header({textHeaderProp}){  
    
    return (
        <div className="headerBlockStyle">
            <h1 className="headerText">{textHeaderProp}</h1>
        </div>
    )
}

export default Header;