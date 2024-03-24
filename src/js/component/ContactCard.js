import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{contact.full_name}</h5>
                <p className="card-text">{contact.email}</p>
                <p className="card-text">{contact.phone}</p>
                <p className="card-text">{contact.address}</p>
                <button onClick={() => actions.deleteContact(contact.id)} className="btn btn-danger">Delete</button>
            </div>
        </div>
    );
};

export default ContactCard;