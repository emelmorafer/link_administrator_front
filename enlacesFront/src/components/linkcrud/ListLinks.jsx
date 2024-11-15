import {useState, useEffect} from 'react';

import Linkes from "./Linkes"


function ListLinks({listEnlacesProp,categorySelectedProp,setLinkIdFormProp,setShowCreaEditModalProp,setIsEditFormProp,
                    setShowDeleteModalProp,setLinkIdDeleteProp,setSearchWordProp,setObjectLinkProp}){   

    const {id,nombre,descripcion} = categorySelectedProp
    const [searchWordInput, setSearchWordInput] = useState("");

    const addNewLink = () => {
        setShowCreaEditModalProp(true)
        setIsEditFormProp(false)
        setObjectLinkProp({id : '', nombre : '', descripcion : '', enlace : '', categoriaId : id})
    };

    const handleClickEditLink = (idLink) => {
        setLinkIdFormProp(idLink)
        setShowCreaEditModalProp(true)
        setIsEditFormProp(true)
    }

    const handleClickDeleteLink = (idLink) => {
        setShowDeleteModalProp(true)
        setLinkIdDeleteProp(idLink) 
    }

    const handleKeyDown = (e) => {
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