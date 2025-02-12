import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import { API_BASE_URL } from '../../config/config';

interface ObjectLink {
    id: number; 
    nombre: string; 
    descripcion: string; 
    enlace: string;
    categoriaId: number;
}

interface FormLinkModalProps {
    objectLinkProp: ObjectLink;
    setUpdateListLinkProp: React.Dispatch<React.SetStateAction<boolean>>;
    isEditFormProp: boolean | null;
    showCreaEditModalProp: boolean | null;
    setShowCreaEditModalProp: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormLinkModal({objectLinkProp,setUpdateListLinkProp,isEditFormProp,
                        showCreaEditModalProp,setShowCreaEditModalProp} : FormLinkModalProps){

    const [idForm, setIdForm] = useState<number>(0);
    const [nombreForm, setNombreForm] = useState<string>('');
    const [descripcionForm, setDescripcionForm] = useState<string>('');
    const [linkForm, setLinkForm] = useState<string>('');
    const [idCategoryForm, setIdCategoryForm] = useState<number>(0);
    const [imageForm, setImageForm] = useState<File | null>(null);

    const [nameButtonForm, setNameButtonForm] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Create a cache-busting parameter
    const cacheBuster = new Date().getTime();

    useEffect(() => {
        setIdForm(objectLinkProp.id)
        setNombreForm(objectLinkProp.nombre)
        setDescripcionForm(objectLinkProp.descripcion)
        setLinkForm(objectLinkProp.enlace)
        setIdCategoryForm(objectLinkProp.categoriaId)
        setError('');

        if(isEditFormProp){           
            setBackgroundImage(`${API_BASE_URL}/images/logoLink_${objectLinkProp.id}.jpeg?${cacheBuster}`)
            setNameButtonForm("Update")
        }else{
            setBackgroundImage("/images/add.png")
            setNameButtonForm("Create")          
        }
    }, [objectLinkProp]);


    const handleSubmit = async (event: FormEvent) => {

        event.preventDefault();
        if (!nombreForm || !descripcionForm || !linkForm || (!isEditFormProp && !imageForm)) {
            setError('All fields are required.');
            return;
        }
        try {
            const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const metod = isEditFormProp ? 'PUT' : 'POST';
            const baseUrl = `${API_BASE_URL}/adminEnlaces/enlace?nombre=${nombreForm}&descripcion=${descripcionForm}&enlaceDir=${linkForm}&creationdate=${currentDate}&categoriaId=${idCategoryForm}`;
            const finalUrl = isEditFormProp ? `${baseUrl}&id=${idForm}` : baseUrl;

            const response = await fetch(finalUrl, {
                method: metod,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {                     
                const data = await response.json();
                if (imageForm) {
                    const formData = new FormData();
                    formData.append('file', imageForm);
                    formData.append('fileName', `logoLink_${data.id}.jpeg`);
                    const uploadResponse = await fetch(`${API_BASE_URL}/uploadLogo`, {
                        method: 'POST',
                        body: formData,
                    });
                    if (uploadResponse.ok) {
                        const imageUrl = await uploadResponse.text();
                        setError('image Uploaded: ' + imageUrl);
                    } else {
                        setError('Error uploading image.');
                    }
                }               
                setIdForm(0)
                setNombreForm("")
                setDescripcionForm("")
                setLinkForm("")
                setError('');
                setUpdateListLinkProp(true)
                closeFormModal();               
            } else {
                setError('Error in response from server.');
            }
        } catch (error) {
            console.error('Error in request:', error);
            setError('Error in request.');
        }         
    };

    const closeFormModal = () => {
        setShowCreaEditModalProp(false);
        setBackgroundImage("/images/add.png");
        setError('');
    }; 


    const [backgroundImage, setBackgroundImage] = useState<string>("/images/add.png");

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files} = e.target; 
        
        if (!files || files.length === 0) {
            setError('No file selected.');
            return;
        }else{
            const fileImage = files[0];
        
            if (!fileImage.name.endsWith('.jpeg') && !fileImage.name.endsWith('.jpg')) {
                setError('Only .jpeg files are allowed.');
                return;
            }
            if (fileImage.size > 1048576) { // 1MB in bytes
                setError('File size must be less than 1MB.');
                return;
            }
            setImageForm(fileImage);
            const reader = new FileReader();
            reader.onload = (imageLoaded) => {
                if (imageLoaded.target && imageLoaded.target.result) {
                    setBackgroundImage(imageLoaded.target.result as string);
                }
            };
            reader.readAsDataURL(fileImage);
            setError('');
        }
    };

    
    return(
        <div className="modal" style={{display: showCreaEditModalProp ? 'block' : 'none'}}>             
            <form className="creaEditForm" onSubmit={handleSubmit}>
                  
                <div className="inputImageContainer" style={{padding: '10px 20px', width: '15%', backgroundImage: `url(${backgroundImage})`}}>              
                    <input
                        type="file"
                        name="logoFile"
                        onChange={handleImage}
                        accept="image/**"
                        className="inputImage"
                    />
                </div>

                <div style={{color: 'white', padding: '10px 20px', width: '70%'}}>
                    <input
                        id="nameLink" className="inputform"
                        type="text"
                        placeholder="Name"
                        value={nombreForm}
                        onChange={(e) => setNombreForm(e.target.value)}
                    />
                    <br/>
                    <textarea style={{height: '90px'}}
                        id="descrLink" className="inputform"
                        placeholder="Description"
                        value={descripcionForm}
                        onChange={(e) => setDescripcionForm(e.target.value)}
                    />
                    <br/>
                    <input
                        id="linkLink" className="inputform"
                        type="text"
                        placeholder="Link"
                        value={linkForm}
                        onChange={(e) => setLinkForm(e.target.value)}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>

                <div style={{ padding: '10px 20px',width: '15%'}}>
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