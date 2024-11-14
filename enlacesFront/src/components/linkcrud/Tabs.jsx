import React from 'react';

export default function Tabs({categoriaProp,setIdCategorySelectedProp,
                              activeCategoryButtonProp,setActiveCategoryButtonProp,
                              hoveredCategoryButtonProp,setHoveredCategoryButtonProp}){

    const {id,nombre,descripcion} = categoriaProp

    const handleClick = (idCategoria) => {
        setIdCategorySelectedProp(idCategoria)

        setActiveCategoryButtonProp(idCategoria);
    } 

    const handleMouseEnter = (buttonIndex) => {
        setHoveredCategoryButtonProp(buttonIndex);
    };
    
    const handleMouseLeave = () => {
        setHoveredCategoryButtonProp(null);
    };

    return(
        <>
            <button className='categoryButton'
             onClick={() => handleClick(id)} 
             onMouseEnter={() => handleMouseEnter(id)}
             onMouseLeave={handleMouseLeave}
             style={{backgroundColor: 
                activeCategoryButtonProp === id || hoveredCategoryButtonProp === id ? 'rgb(57, 58, 60)' : 'rgb(36, 37, 39)'}}>
                {nombre}
            </button><br/>
        </>
    )
}
