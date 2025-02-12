import React from 'react';

interface Categoria {
    id: number;
    nombre: string;
    descripcion: string;
}

interface TabsProps {
    categoriaProp: Categoria;
    setIdCategorySelectedProp: React.Dispatch<React.SetStateAction<number>>;
    activeCategoryButtonProp: number | null;
    setActiveCategoryButtonProp: React.Dispatch<React.SetStateAction<number | null>>;
    hoveredCategoryButtonProp: number | null;
    setHoveredCategoryButtonProp: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Tabs({categoriaProp,setIdCategorySelectedProp,
                              activeCategoryButtonProp,setActiveCategoryButtonProp,
                              hoveredCategoryButtonProp,setHoveredCategoryButtonProp}: TabsProps){

    const {id,nombre,descripcion} = categoriaProp

    const handleClick = (idCategoria: number) => {
        setIdCategorySelectedProp(idCategoria)

        setActiveCategoryButtonProp(idCategoria);
    } 

    const handleMouseEnter = (buttonIndex: number) => {
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
