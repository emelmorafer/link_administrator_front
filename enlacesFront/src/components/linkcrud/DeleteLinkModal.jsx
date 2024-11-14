import {useState, useEffect} from 'react';


function DeleteLinkModal({showDeleteModalProp,setShowDeleteModalProp,setDeleteLinkAllowedProp}){

    const closeDeleteModal = () => {
        setShowDeleteModalProp(false) 
    }; 

    const deleteCategory = () => {
        setDeleteLinkAllowedProp(true)  
    };

    return(
        <div className="modal" style={{display: showDeleteModalProp ? 'block' : 'none'}}>
            <div className="DeleteModalContent"> 

                <div style={{margin: 'auto', width: '90%', color: 'white'}}>
                    <h3 className="deleteModalText">Are you sure you want to remove this link?</h3>  
                </div> 
                <br/>

                <div style={{margin: 'auto', width: '90%', display: 'flex', justifyContent: 'space-between'}}>
                    <button onClick={() => deleteCategory()} className="buttonDeleteAction"> 
                        Delete
                    </button> 
                    <button onClick={() => closeDeleteModal()} className="buttonDeleteCancel"> 
                        Cancel
                    </button>
                </div>    

            </div>       
        </div>
    )
}

export default DeleteLinkModal;