import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';

const ContactForm = ({ existingContact, onSave }) => {
    const [contact, setContact] = useState(existingContact || { full_name: '', email: '', phone: '', address: '' });
    const { actions } = useContext(Context);

    const handleChange = e => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (contact.id) {
            actions.updateContact(contact.id, contact);
        } else {
            actions.addContact(contact);
        }
        onSave();
    };

    return (
        <div className="container mt-3">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={contact.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={contact.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={contact.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" id="address" name="address" value={contact.address} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Save Contact</button>
            </form>
        </div>
    );
};

export default ContactForm;
