import { API_BASE_URL } from '../../config/config';

export default function LinkesModal({enlaceProp}){

    const {id,nombre,descripcion,enlace} = enlaceProp

    return(
        <>
            <div className="linkBlockModal" style={{backgroundColor: 'rgb(57, 58, 60)'}}>

                <a href={enlace} target="_blank" style={{padding: '10px 20px', width: '20%'}}>
                    <img src={API_BASE_URL + "/images/logoLink_" + id + ".jpeg"} alt="Logo" className='imageBanner'/>
                </a>

                <div style={{color: 'white', padding: '10px 20px', width: '80%'}}>
                    <a href={enlace} target="_blank" className='textoLink' >
                        {nombre}
                    </a>
                    <p>{descripcion}</p> 
                </div>    

            </div>
        </>
    )
}