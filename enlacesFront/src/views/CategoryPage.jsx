import {useState, useEffect} from 'react';
import Header from "../components/Header" 
import ListCategories from "../components/categorycrud/ListCategories"
import FormCategModal from "../components/categorycrud/FormCategModal"
import DeleteCategModal from "../components/categorycrud/DeleteCategModal"
import ListLinksCategModal from "../components/categorycrud/ListLinksCategModal"
import LeftBlock from "../components/categorycrud/LeftBlock"
import { API_BASE_URL } from '../config/config';

export default function CategoryPage(){
    
    const [listCategories, setListCategories] = useState([]);
    const [updateListCategory, setUpdateListCategory] = useState(true);

    useEffect(() => {
        if(updateListCategory){
            const fetchData = async () => {
                try {
                    const response = await fetch(API_BASE_URL + "/adminEnlaces/categoria/list");
                    const data = await response.json();
                    setListCategories(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }           
            };
            fetchData();
        }
        setUpdateListCategory(false)
    }, [updateListCategory]);


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

 
    const [categoryIdForm, setCategoryIdForm] = useState(0);
    const [objectCategory, setObjectCategory] = useState({id:'', nombre:'', descripcion:''});

    useEffect(() => {
        if(categoryIdForm!=0){
            const fetchData = async () => {
                try {
                    const response = await fetch(API_BASE_URL + "/adminEnlaces/categoria/" + categoryIdForm, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json()
                    setObjectCategory(data);   
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }      
        setCategoryIdForm(0);
    }, [categoryIdForm]);


    const [categoryIdDelete, setCategoryIdDelete] = useState(0);
    const [deleteCategAllowed, setDeleteCategAllowed] = useState(false);

    useEffect(() => {
        if(deleteCategAllowed){
            const fetchData = async () => {
                try {
                    const response = await fetch(API_BASE_URL + "/adminEnlaces/categoria/" + categoryIdDelete, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    if(data){
                        setUpdateListCategory(true)
                        setShowDeleteModal(false)
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
        setDeleteCategAllowed(false)
    }, [deleteCategAllowed]);


    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);   
    const [isEditForm, setIsEditForm] = useState(false);

    const [categoryIdListLinks, setCategoryIdListLinks] = useState(0);
    const [showListLinksModal, setShowListLinksModal] = useState(false);

    return (
        <>
            <Header textHeaderProp={"Category Administrator"}/>
            <div class="container">               
                <FormCategModal 
                objectCategoryProp={objectCategory} 
                setUpdateListCategoryProp={setUpdateListCategory}                
                isEditFormProp={isEditForm} 
                showModalProp={showModal}
                setShowModalProp={setShowModal}/>

                <LeftBlock 
                setShowModalProp={setShowModal} 
                setIsEditFormProp={setIsEditForm}
                setSearchWordProp={setSearchWord}
                setObjectCategoryProp={setObjectCategory}/>

                <ListCategories 
                setCategoryIdFormProp={setCategoryIdForm} 
                listCategoriesProp={listCategories} 
                setShowModalProp={setShowModal} 
                setIsEditFormProp={setIsEditForm} 
                setShowDeleteModalProp={setShowDeleteModal} 
                setCategoryIdDeleteProp={setCategoryIdDelete}
                setShowListLinksModalProp={setShowListLinksModal}
                setCategoryIdListLinksProp={setCategoryIdListLinks}/>

                <DeleteCategModal 
                showDeleteModalProp={showDeleteModal} 
                setShowDeleteModalProp={setShowDeleteModal}
                setDeleteCategAllowedProp={setDeleteCategAllowed}/>

                <ListLinksCategModal 
                categoryIdListLinksProp={categoryIdListLinks} 
                setCategoryIdListLinksProp={setCategoryIdListLinks}
                showListLinksModalProp={showListLinksModal}
                setShowListLinksModalProp={setShowListLinksModal}/>
            </div>
        </>
    ) 
}