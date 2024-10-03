import {useState, useEffect} from 'react';


function DeleteCategModal({showDeleteModalProp,setShowDeleteModalProp,setDeleteCategAllowedProp}){


    const closeDeleteModal = () => {
        setShowDeleteModalProp(false) 
    }; 

    const deleteCategory = () => {
        setDeleteCategAllowedProp(true)  
    };

    return(
        <div className="modal" style={{display: showDeleteModalProp ? 'block' : 'none'}}>
            <div className="DeleteModalContent"> 

                <div style={{margin: 'auto', width: '90%', color: 'white'}}>
                    <h3 style={{textAlign: 'center'}}>Are you sure you want to remove this category?</h3>  
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

export default DeleteCategModal;