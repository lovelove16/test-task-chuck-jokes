import React, { useState }from 'react';
import './index.css';
import arrow from '../../assets/images/path.png';
import ModalModule from '../modal';

const Footer = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const submit = () => {
        setModalIsOpen(true)
    }
    

    return (
        <>
            <div className="footer">
                <div className="footer-content">
                    <span>GOT JOKES? GET PAID</span><br/>
                    <span>FOR SUBMITTING!</span><br/>
                    <button onClick={submit} >SUBMIT JOKE</button> <img src={arrow} />
                </div>
            </div>
            <ModalModule 
                modalIsOpenInitialValue={modalIsOpen} 
            />
        </>
         
    )

}

export default Footer;