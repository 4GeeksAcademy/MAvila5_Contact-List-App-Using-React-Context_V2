import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import ContactCard from '../component/ContactCard';

const Contacts = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.loadContacts();
	}, [actions]);

	return (
		<div className="container">
			<h2>Contacts List</h2>
			{store.contacts.map(contact => (
				<ContactCard key={contact.id} contact={contact} />
			))}
		</div>
	);
};

export default Contacts;