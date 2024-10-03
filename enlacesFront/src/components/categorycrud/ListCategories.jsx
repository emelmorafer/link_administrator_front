import {useState, useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom'

import CategoryRow from "./CategoryRow"


function ListCategories({setCategoryIdFormProp,listCategoriesProp,setShowModalProp,setIsEditFormProp,
                         setShowDeleteModalProp,setCategoryIdDeleteProp,setShowListLinksModalProp,
                         setCategoryIdListLinksProp}){ 

                 
    const handleClickEditCategory = (idCategoria) => {
        setCategoryIdFormProp(idCategoria)
        setShowModalProp(true)
        setIsEditFormProp(true)
    }

    const handleClickDeleteCategory = (idCategoria) => {
        setShowDeleteModalProp(true)
        setCategoryIdDeleteProp(idCategoria) 
    }

    const handleClickListLinksCategory = (idCategoria) => {
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