import React from 'react';
import ContactForm from '../component/ContactForm';
import { useHistory } from 'react-router-dom';

const AddContacts = () => {
    const history = useHistory();

    const handleSave = () => {
        history.push('/contacts');
    };

    return (
        <div className="container">
            <h2>Add a New Contact</h2>
            <ContactForm onSave={handleSave} />
        </div>
    );
};

export default AddContacts;
