import React from 'react';

interface HeaderProp {
    textHeaderProp: string;
}

function Header({textHeaderProp}: HeaderProp){  
    
    return (
        <div className="headerBlockStyle">
            <h1 className="headerText">{textHeaderProp}</h1>
        </div>
    )
}

export default Header;