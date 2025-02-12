import React, {useState, useEffect} from 'react';
import Header from "../components/Header" 
import ListTabs from "../components/linkcrud/ListTabs" 
import ListLinks from "../components/linkcrud/ListLinks"
import FormLinkModal from "../components/linkcrud/FormLinkModal"
import DeleteLinkModal from "../components/linkcrud/DeleteLinkModal"
import { API_BASE_URL } from '../config/config';

interface Category {
    id: number;
    nombre: string;
    descripcion: string;
}

interface Link {
    id: number;
    nombre: string;
    descripcion: string;
    enlace: string;
    categoriaId: number;
}

export default function IndexPage(){

    const [categorySelected, setCategorySelected] = useState<Category>({id:0, nombre:'', descripcion:''})
    const [listEnlaces, setListEnlaces] = useState<Link[]>([]);
    const [idCategorySelected, setIdCategorySelected] = useState<number>(1);
    const [updateListLink, setUpdateListLink] = useState<boolean>(true);

    useEffect(() => {
        if(updateListLink || (idCategorySelected!=0)){
            const fetchData = async () => {
                try {
                    const response2 = await fetch(API_BASE_URL + "/adminEnlaces/categoria/" + idCategorySelected);
                    const data2: Category = await response2.json();
                    setCategorySelected(data2);

                    const response = await fetch(API_BASE_URL + "/adminEnlaces/enlace/list/categoria/" + idCategorySelected);
                    const data: Link[] = await response.json();
                    setListEnlaces(data);              
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };      
            fetchData();
        }
        setUpdateListLink(false);
    }, [idCategorySelected, updateListLink]);


    const [searchWord, setSearchWord] = useState<string>("");

    useEffect(() => {
        const baseUrl = `${API_BASE_URL}/adminEnlaces/enlace`
        const finalUrl = (searchWord !== '') ? 
        `${baseUrl}/searchlist/${idCategorySelected}/${searchWord}` : 
        `${baseUrl}/list/categoria/${idCategorySelected}`;

        const fetchData = async () => {
            try {
                const response = await fetch(finalUrl);
                const data = await response.json();
                setListEnlaces(data);              
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };      
        fetchData();
    }, [searchWord]);


    const [objectLink, setObjectLink] = useState<Link>({id:0, nombre:'', descripcion:'', enlace:'', categoriaId:0});
    const [linkIdForm, setLinkIdForm] = useState<number>(0);

    useEffect(() => {
        if(linkIdForm!=0){
            const fetchData = async () => {
                try {
                    const response = await fetch(API_BASE_URL + "/adminEnlaces/enlace/" + linkIdForm, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json()
                    setObjectLink(data);   
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
        setLinkIdForm(0);
    }, [linkIdForm]);


    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [linkIdDelete, setLinkIdDelete] = useState<number>(0);
    const [deleteLinkAllowed, setDeleteLinkAllowed] = useState<boolean>(false);

    useEffect(() => {
        if(deleteLinkAllowed){
            const fetchData = async () => {
                try {
                    const response = await fetch(API_BASE_URL + "/adminEnlaces/enlace/" + linkIdDelete, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    if(data){
                        const formData = new FormData();
                        formData.append('fileName', `logoLink_${linkIdDelete}.jpeg`);
                        const deleteResponse = await fetch(`${API_BASE_URL}/uploadLogo`, {
                            method: 'DELETE',
                            body: formData,
                        });
                        if (deleteResponse) {
                            console.log('Image deleted in server');
                        } else {
                            console.log('Error deleting Image');
                        }

                        setUpdateListLink(true);
                        setShowDeleteModal(false)
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
        setDeleteLinkAllowed(false);
    }, [deleteLinkAllowed]);


        
    const [showCreaEditModal, setShowCreaEditModal] = useState<boolean>(false);   
    const [isEditForm, setIsEditForm] = useState<boolean>(false);

    return (
        <>
            <Header textHeaderProp={"Link Administrator"}/>
            <div className="container">
                <FormLinkModal 
                objectLinkProp={objectLink} 
                setUpdateListLinkProp={setUpdateListLink}                
                isEditFormProp={isEditForm} 
                showCreaEditModalProp={showCreaEditModal}
                setShowCreaEditModalProp={setShowCreaEditModal}/>

                <ListTabs setIdCategorySelectedProp={setIdCategorySelected}/>

                <ListLinks listEnlacesProp={listEnlaces} 
                categorySelectedProp={categorySelected}
                setLinkIdFormProp={setLinkIdForm}
                setShowCreaEditModalProp={setShowCreaEditModal}
                setIsEditFormProp={setIsEditForm}
                setShowDeleteModalProp={setShowDeleteModal}
                setLinkIdDeleteProp={setLinkIdDelete}
                setSearchWordProp={setSearchWord}
                setObjectLinkProp={setObjectLink} />

                <DeleteLinkModal 
                showDeleteModalProp={showDeleteModal} 
                setShowDeleteModalProp={setShowDeleteModal}
                setDeleteLinkAllowedProp={setDeleteLinkAllowed}/>
            </div>
        </>
    ) 
}
