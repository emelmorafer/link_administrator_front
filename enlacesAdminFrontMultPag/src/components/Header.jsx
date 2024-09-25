function Header({textHeaderProp}){  
    
    return (
        <div className="headerBlockStyle">
            <h1 style={{color: 'white'}}>{textHeaderProp}</h1>
        </div>
    )
}

export default Header;