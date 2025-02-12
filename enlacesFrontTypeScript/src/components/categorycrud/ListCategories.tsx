import React, {useState, useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom'

import CategoryRow from "./CategoryRow"

interface Category {
    id: number;
    nombre: string;
    descripcion: string;
    creationdate: string;
}

interface ListCategoriesProp {
    setCategoryIdFormProp: React.Dispatch<React.SetStateAction<number>>;
    listCategoriesProp: Category[];
    setShowModalProp: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditFormProp: React.Dispatch<React.SetStateAction<boolean>>;
    setShowDeleteModalProp: React.Dispatch<React.SetStateAction<boolean>>;
    setCategoryIdDeleteProp: React.Dispatch<React.SetStateAction<number>>;
    setShowListLinksModalProp: React.Dispatch<React.SetStateAction<boolean>>;
    setCategoryIdListLinksProp: React.Dispatch<React.SetStateAction<number>>;
}

function ListCategories({setCategoryIdFormProp,listCategoriesProp,setShowModalProp,setIsEditFormProp,
                         setShowDeleteModalProp,setCategoryIdDeleteProp,setShowListLinksModalProp,
                         setCategoryIdListLinksProp} : ListCategoriesProp){ 

                 
    const handleClickEditCategory = (idCategoria: number) => {
        setCategoryIdFormProp(idCategoria)
        setShowModalProp(true)
        setIsEditFormProp(true)
    }

    const handleClickDeleteCategory = (idCategoria: number) => {
        setShowDeleteModalProp(true)
        setCategoryIdDeleteProp(idCategoria) 
    }

    const handleClickListLinksCategory = (idCategoria: number) => {
        setShowListLinksModalProp(true)
        setCategoryIdListLinksProp(idCategoria) 
    }

    return(
        <div className="listLinksBlockStyle">
            {listCategoriesProp.map((category) => (
                <CategoryRow key={category.id} categoryProp={category} 
                handleClickEditCategoryProp={handleClickEditCategory} 
                handleClickDeleteCategoryProp={handleClickDeleteCategory} 
                handleClickListLinksCategoryProp={handleClickListLinksCategory}/>
            ))}
        </div>
    )
}

export default ListCategories;