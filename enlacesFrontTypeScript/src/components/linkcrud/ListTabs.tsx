import React, {useState, useEffect, KeyboardEvent, ChangeEvent} from 'react';
import {Link, NavLink} from 'react-router-dom'
import { API_BASE_URL } from '../../config/config';

import Tabs from "./Tabs"

interface Categoria {
    id: number;
    nombre: string;
    descripcion: string;
}

interface ListTabsProps {
    setIdCategorySelectedProp: React.Dispatch<React.SetStateAction<number>>;
}

//function ListTabs({setIdCategorySelectedProp}: ListTabsProps){
const ListTabs: React.FC<ListTabsProps> = ({ setIdCategorySelectedProp }) => {
    
    const [listCategories, setListCategories] = useState<Categoria[]>([]);
    
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


    const [searchWord, setSearchWord] = useState<string>("");

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

    const [activeCategoryButton, setActiveCategoryButton] = useState<number | null>(null);   
    const [hoveredCategoryButton, setHoveredCategoryButton] = useState<number | null>(null); 
    const [searchWordInput, setSearchWordInput] = useState<string>("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchWord(searchWordInput);
        }
    };
     
    return(
        <div className="listCategoriesBlockStyle">
            <h1 style={{color: 'white', marginLeft: '10px', fontSize: '28px'}}>Categories</h1>
            
            <Link to="/admincategories" className="adminCategoriesButton">Admin Categories</Link>

            <div style={{margin: '15px 10px'}}>
                <img className="iconTextSearch" src="/images/lupa.png" />
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