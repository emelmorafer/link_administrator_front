import { API_BASE_URL } from '../../config/config';

export default function Linkes({enlaceProp,handleClickEditLinkProp,handleClickDeleteLinkProp}){

    const {id,nombre,descripcion,enlace} = enlaceProp

    return(
        <>
            <div className="linkBlockStyle">

                <a href={enlace} target="_blank" style={{padding: '10px 20px', width: '15%'}}>
                    <img src={API_BASE_URL + "/images/logoLink_" + id + ".jpeg"} alt="Logo" style={{ cursor: 'pointer' }}/>
                </a>

                <div style={{color: 'white', padding: '10px 20px', width: '70%'}}>
                    <a href={enlace} target="_blank" className='textoLink' >
                        {nombre}
                    </a>
                    <p>{descripcion}</p> 
                </div>  

                <div style={{padding: '10px 20px', width: '15%'}}>
                    <button className='editLinkButton' onClick={() => handleClickEditLinkProp(id)}>
                        <img src="/images/edit.png" style={{width: '20px', height: '20px', marginRight: '10px'}}/>Edit
                    </button>
                    <br/>
                    <button className='editLinkButton' onClick={() => handleClickDeleteLinkProp(id)}>
                        <img src="/images/delete.png" style={{width: '20px', height: '20px', marginRight: '10px'}}/>Delete
                    </button>
                </div>    

            </div>
        </>
    )
}