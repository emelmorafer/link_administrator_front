import {useState, useEffect} from 'react';
import { API_BASE_URL } from '../../config/config';

export default function CategoryRow({categoryProp,handleClickEditCategoryProp,handleClickDeleteCategoryProp,handleClickListLinksCategoryProp}){

    const {id,nombre,descripcion,creationdate} = categoryProp


    const [linksRelated, setLinksRelated] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch(API_BASE_URL + "/adminEnlaces/enlace/list/categoria/" + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
                    
            if (Array.isArray(data) && data.length > 0) {
                setLinksRelated(true);
            } else { 
                setLinksRelated(false);                  
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLinksRelated(false)
        }
    };
    fetchData();

    return(
        <>
            <div className="linkBlockStyle">

                <div style={{color: 'white', padding: '10px 20px', width: '80%'}}>
                    <a className='cartTittleText'>
                        {nombre}
                    </a>
                    <p className='descripText'>{descripcion}</p> 
                    <p className='descripText'>{creationdate}</p>
                </div>  

                <div style={{ padding: '10px 20px',width: '20%'}}>
                    <button className='editLinkButton' onClick={() => handleClickEditCategoryProp(id)}>
                        <img src="/images/edit.png" style={{width: '20px', height: '20px', marginRight: '10px'}}/>Edit
                    </button>
                    <br/>
                    <button className='editLinkButton' onClick={() => handleClickDeleteCategoryProp(id)}
                        style={{display: linksRelated ? 'none' : 'inline-block'}}>
                        <img src="/images/delete.png" style={{width: '20px', height: '20px', marginRight: '10px'}}/>Delete
                    </button>
                    <button className='editLinkButton' onClick={() => handleClickListLinksCategoryProp(id)}
                        style={{display: linksRelated ? 'inline-block' : 'none'}}>List of Links
                    </button>
                </div>    

            </div>
        </>        
    )
}
