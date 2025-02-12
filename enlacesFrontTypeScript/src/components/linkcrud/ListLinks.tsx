import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';

import Linkes from "./Linkes"

interface Link {
    id: number;
    nombre: string;
    descripcion: string;
    enlace: string;
    categoriaId: number;
}

interface Category {
    id: number;
    nombre: string;
    descripcion: string;
}

interface ListLinksProps {
    listEnlacesProp: Link[];
    categorySelectedProp: Category;
    setLinkIdFormProp: React.Dispatch<React.SetStateAction<number>>;
    setShowCreaEditModalProp: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditFormProp: React.Dispatch<React.SetStateAction<boolean>>;
    setShowDeleteModalProp: React.Dispatch<React.SetStateAction<boolean>>;
    setLinkIdDeleteProp: React.Dispatch<React.SetStateAction<number>>;
    setSearchWordProp: React.Dispatch<React.SetStateAction<string>>;
    setObjectLinkProp: React.Dispatch<React.SetStateAction<Link>>;
}


function ListLinks({listEnlacesProp,categorySelectedProp,setLinkIdFormProp,setShowCreaEditModalProp,setIsEditFormProp,
                    setShowDeleteModalProp,setLinkIdDeleteProp,setSearchWordProp,setObjectLinkProp}: ListLinksProps){   

    const {id,nombre,descripcion} = categorySelectedProp
    const [searchWordInput, setSearchWordInput] = useState("");

    const addNewLink = () => {
        setShowCreaEditModalProp(true)
        setIsEditFormProp(false)
        setObjectLinkProp({id : 0, nombre : '', descripcion : '', enlace : '', categoriaId : id})
    };

    const handleClickEditLink = (idLink: number) => {
        setLinkIdFormProp(idLink)
        setShowCreaEditModalProp(true)
        setIsEditFormProp(true)
    }

    const handleClickDeleteLink = (idLink: number) => {
        setShowDeleteModalProp(true)
        setLinkIdDeleteProp(idLink) 
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchWordProp(searchWordInput);
        }
    };

    return(
        
        <div className="listLinksBlockStyle">
            <div className="categoryInfoBlockStyle">
                <div style={{width: '100%', color: 'white'}}>
                    <h1 style={{textAlign: 'center', fontSize: '28px'}}>{nombre}</h1>
                    <p style={{margin: '30px auto'}} className="descripText">{descripcion}</p> 
                </div>  
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{width: '30%'}} >
                        <img className="iconTextSearch" src="/images/lupa.png" />
                        <input className="inputTextSearch" type="text" placeholder="Search..."
                            value={searchWordInput}
                            onChange={(e) => setSearchWordInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <button className="createLinkButton" style={{width: '15%'}} onClick={() => addNewLink()}>Create link</button> 
                </div> 
            </div>

            {listEnlacesProp.map((enlace) => (
                <Linkes key={enlace.id} enlaceProp={enlace} handleClickEditLinkProp={handleClickEditLink} handleClickDeleteLinkProp={handleClickDeleteLink}/>
            ))}
        </div>
    )
}

export default ListLinks;