import React from 'react';
import ContactForm from '../component/ContactForm';
import { useNavigate } from 'react-router-dom';

const AddContacts = () => {
    const navigate = useNavigate();

    const handleSave = () => {
        navigate('/contacts');
    };

    return (
        <div className="container">
            <h2>Add a New Contact</h2>
            <ContactForm onSave={handleSave} />
        </div>
    );
};

export default AddContacts;
