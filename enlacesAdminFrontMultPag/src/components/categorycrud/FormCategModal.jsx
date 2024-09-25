import {useState, useEffect} from 'react';
import { API_BASE_URL } from '../../config/config';


function FormCategory({objectCategoryProp,setUpdateListCategoryProp,isEditFormProp,
                       showModalProp,setShowModalProp}){

    const [idForm, setIdForm] = useState('');
    const [nombreForm, setNombreForm] = useState('');
    const [descripcionForm, setDescripcionForm] = useState('');
    const [nameButtonForm, setNameButtonForm] = useState('');
    const [error, setError] = useState('');

    
    useEffect(() => {
        setIdForm(objectCategoryProp.id);
        setNombreForm(objectCategoryProp.nombre);
        setDescripcionForm(objectCategoryProp.descripcion);
        setError('');

        if(isEditFormProp){
            setNameButtonForm("Update")
        }else{
            setNameButtonForm("Create")
        }
    }, [objectCategoryProp]);

    const handleSubmitCateg = async (event) => {

        event.preventDefault();
        if (!nombreForm || !descripcionForm) {
            setError('All fields are required.');
            return;
        }

        try {
            const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const metod = isEditFormProp ? 'PUT' : 'POST';
            const url = `${API_BASE_URL}/adminEnlaces/categoria?nombre=${nombreForm}&descripcion=${descripcionForm}&creationdate=${currentDate}`;
            const fullUrl = isEditFormProp ? `${url}&id=${idForm}` : url;

            const response = await fetch(fullUrl, {
                method: metod,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {      
                setUpdateListCategoryProp(true)
                setIdForm("")
                setNombreForm("")
                setDescripcionForm("") 
                setError('');
                closeFormModal();
            } else {
                console.error('Error in request:', response);
                setError('Error in response from server.');
            }
        } catch (error) {
            console.error('Error in request:', error);
            setError('Error in request.');
        }         
    };
    
    const closeFormModal = () => {
        setShowModalProp(false)
        setError('');
    }; 

    return(
        <div className="modal" style={{display: showModalProp ? 'block' : 'none'}}>             
            <form class="creaEditForm" onSubmit={handleSubmitCateg}>
                  
                <div style={{color: 'white', padding: '10px 20px', width: '80%'}}>
                    <input
                        id="nameCateg" class="inputform"
                        type="text"
                        placeholder="Name"
                        value={nombreForm}
                        onChange={(e) => setNombreForm(e.target.value)}
                    />
                    <br/>
                    <textarea style={{height: '90px'}}
                        id="descrCateg" class="inputform"
                        placeholder="Description"
                        value={descripcionForm}
                        onChange={(e) => setDescripcionForm(e.target.value)}
                    />           
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>

                <div style={{ padding: '10px 20px',width: '20%'}}>
                    <button type="submit" className="buttoncreaEditFormAction"> 
                        {nameButtonForm} 
                    </button> 
                    <br/><br/>
                    <button onClick={(e) => { e.preventDefault(); closeFormModal(); }} className="buttoncreaEditFormCancel"> 
                        Cancelar
                    </button> 
                </div>  
            </form >      
        </div>        
    )
}                                

export default FormCategory;