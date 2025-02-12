import React, {useState, useEffect, KeyboardEvent} from 'react';
import {Link, NavLink} from 'react-router-dom'

interface Category {
    id: number;
    nombre: string;
    descripcion: string;
    creationdate: string;
}

interface LeftBlockProps {
    setShowModalProp: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditFormProp: React.Dispatch<React.SetStateAction<boolean>>;
    setSearchWordProp: React.Dispatch<React.SetStateAction<string>>;
    setObjectCategoryProp: React.Dispatch<React.SetStateAction<Category>>;
}

function LeftBlock({setShowModalProp,setIsEditFormProp,setSearchWordProp,setObjectCategoryProp} : LeftBlockProps){   

    const addNewCategory = () => {
        setShowModalProp(true)
        setIsEditFormProp(false)
        setObjectCategoryProp({id:0, nombre:'', descripcion:'', creationdate:''})
    };

    const [searchWordInput, setSearchWordInput] = useState<string>("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchWordProp(searchWordInput);
        }
    };
     
    return(
        <div className="listCategoriesBlockStyle">
            <br/>
            <button className="createCategoriesButton" onClick={() => addNewCategory()}> 
                Create Category
            </button>

            <div style={{margin: '15px 10px'}}>
                <img className="iconTextSearch" src="/images/lupa.png" />
                <input className="inputTextSearch" type="text" placeholder="Search..."
                    value={searchWordInput}
                    onChange={(e) => setSearchWordInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <hr style={{border: '1px solid rgb(57, 58, 60)',margin: '10px'}}></hr>

            <Link to="/" className="adminCategoriesButton">Return</Link>         
        </div>
    )
}

export default LeftBlock;