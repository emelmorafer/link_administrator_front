import {useState, useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom'
import { API_BASE_URL } from '../../config/config';

import Tabs from "./Tabs"

function ListTabs({setIdCategorySelectedProp}){

    const [listCategories, setListCategories] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_BASE_URL + '/adminEnlaces/categoria/list');
                const data = await response.json();
                setListCategories(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    const [searchWord, setSearchWord] = useState("");

    useEffect(() => {
        const baseUrl = `${API_BASE_URL}/adminEnlaces/categoria`
        const finalUrl = (searchWord !== '') ? `${baseUrl}/searchlist/${searchWord}` : `${baseUrl}/list`;

        const fetchData = async () => {
            try {
                const response = await fetch(finalUrl);
                const data = await response.json();
                setListCategories(data);              
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };      
        fetchData();
    }, [searchWord]);

    const [activeCategoryButton, setActiveCategoryButton] = useState(null);   
    const [hoveredCategoryButton, setHoveredCategoryButton] = useState(null); 
    const [searchWordInput, setSearchWordInput] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearchWord(searchWordInput);
        }
    };
     
    return(
        <div className="listCategoriesBlockStyle">
            <h2 style={{color: 'white'}}>Categories</h2>
            
            <Link to="/admincategories" className="adminCategoriesButton">Admin Categories</Link>

            <div style={{margin: '15px auto'}}>
                <img className="iconTextSearch" src="src/images/lupa.png" />
                <input className="inputTextSearch" type="text" placeholder="Search..."
                    value={searchWordInput}
                    onChange={(e) => setSearchWordInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <hr style={{border: '1px solid rgb(57, 58, 60)',margin: '10px'}}></hr>

            {listCategories.map((categoria) => (
                <Tabs key={categoria.id} categoriaProp={categoria} setIdCategorySelectedProp={setIdCategorySelectedProp}
                 activeCategoryButtonProp={activeCategoryButton} setActiveCategoryButtonProp={setActiveCategoryButton}
                 hoveredCategoryButtonProp={hoveredCategoryButton} setHoveredCategoryButtonProp={setHoveredCategoryButton}/>
            ))}           
        </div>
    )
}

export default ListTabs;