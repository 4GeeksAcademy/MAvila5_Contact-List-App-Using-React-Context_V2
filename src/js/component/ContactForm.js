import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';

const ContactForm = ({ onSave }) => {
    const { store, actions } = useContext(Context);

    const handleSubmit = e => {
        e.preventDefault();
        actions.handleSubmit().then(onSave);
    };

    return (
        <div className="container mt-3">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="full_name">Name</label>
                    <input type="text" className="form-control" id="full_name" name="full_name" value={store.contact.full_name} onChange={actions.handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={store.contact.email} onChange={actions.handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={store.contact.phone} onChange={actions.handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" id="address" name="address" value={store.contact.address} onChange={actions.handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Save Contact</button>
            </form>
        </div>
    );
};

export default ContactForm;
