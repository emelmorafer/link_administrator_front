import React, {useState, useEffect} from 'react';
import LinkesModal from "./LinkesModal"
import { API_BASE_URL } from '../../config/config';

interface Link {
    id: number;
    nombre: string;
    descripcion: string;
    enlace: string;
    categoriaId: number;
}

interface ListLinksCategModalProps {
    showListLinksModalProp: boolean;
    setShowListLinksModalProp: React.Dispatch<React.SetStateAction<boolean>>;
    categoryIdListLinksProp: number;
    setCategoryIdListLinksProp: React.Dispatch<React.SetStateAction<number>>;
}

function ListLinksCategModal({showListLinksModalProp,setShowListLinksModalProp,categoryIdListLinksProp,setCategoryIdListLinksProp}: ListLinksCategModalProps){


    const [listEnlaces, setListEnlaces] = useState<Link[]>([]);

    useEffect(() => {
        if(categoryIdListLinksProp!=0){
            const fetchData = async () => {
                try {
                    const response = await fetch(API_BASE_URL + "/adminEnlaces/enlace/list/categoria/" + categoryIdListLinksProp);
                    const data: Link[] = await response.json();
                    setListEnlaces(data);              
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };      
            fetchData();
        }
        setCategoryIdListLinksProp(0);
    }, [categoryIdListLinksProp]);


    const closeDeleteModal = () => {
        setShowListLinksModalProp(false) 
    };

    return(
        <div className="modal" style={{display: showListLinksModalProp ? 'block' : 'none'}}>
            <div className="ListLinksModalContent"> 
                <img src={"/images/close.png"} alt="Close" onClick={() => closeDeleteModal()} className="imageCloseModal" />

                {listEnlaces.map((enlace) => (
                    <LinkesModal key={enlace.id} enlaceProp={enlace} />
                ))}  
            </div>       
        </div>        
    )
}

export default ListLinksCategModal;