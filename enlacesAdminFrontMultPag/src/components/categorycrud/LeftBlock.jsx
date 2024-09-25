import {useState, useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom'


function LeftBlock({setShowModalProp,setIsEditFormProp,setSearchWordProp,setObjectCategoryProp}){   

    const addNewCategory = () => {
        setShowModalProp(true)
        setIsEditFormProp(false)
        setObjectCategoryProp({id : '', nombre : '', descripcion : ''})
    };

    const [searchWordInput, setSearchWordInput] = useState("");

    const handleKeyDown = (e) => {
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

            <div style={{margin: '15px auto'}}>
                <img className="iconTextSearch" src="src/images/lupa.png" />
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