const getState = ({ getStore, getActions, setStore }) => {
	const baseUrl = "https://playground.4geeks.com/apis/fake/contact/";
	const agendaSlug = "my_unique_agenda";

	return {
		store: {
			contacts: []
		},
		actions: {
			loadContacts: () => {
				// Fetch all contacts
				fetch(`${baseUrl}agenda/${agendaSlug}`)
					.then(response => response.json())
					.then(data => setStore({ contacts: data }))
					.catch(error => console.error("Error loading contacts:", error));
			},
			addContact: (contact) => {
				// Add a contact
				fetch(`${baseUrl}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						...contact,
						agenda_slug: agendaSlug
					})
				})
					.then(response => response.json())
					.then(() => getActions().loadContacts()) // Reload contacts after adding
					.catch(error => console.error("Error adding contact:", error));
			},
			updateContact: (contactId, updatedContact) => {
				// Update a contact
				fetch(`${baseUrl}${contactId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(updatedContact)
				})
					.then(response => response.json())
					.then(() => getActions().loadContacts()) // Reload contacts after updating
					.catch(error => console.error("Error updating contact:", error));
			},
			deleteContact: (contactId) => {
				// Delete a contact
				fetch(`${baseUrl}${contactId}`, {
					method: "DELETE"
				})
					.then(() => getActions().loadContacts()) // Reload contacts after deleting
					.catch(error => console.error("Error deleting contact:", error));
			}
		}
	};
};

export default getState;

// 	return {
// 		store: {
// 			demo: [
// 				{
// 					title: "FIRST",
// 					background: "white",
// 					initial: "white"
// 				},
// 				{
// 					title: "SECOND",
// 					background: "white",
// 					initial: "white"
// 				}
// 			],
// 			contacts: []
// 		},
// 		actions: {
// 			// Use getActions to call a function within a fuction
// 			exampleFunction: () => {
// 				getActions().changeColor(0, "green");
// 			},
// 			loadSomeData: () => {
// 				fetch('https://api.example.com/contacts')
// 					.then(response => response.json())
// 					.then(data => setStore({ contacts: data }))
// 					.catch(error => console.error("Error loading contacts:", error));
// 			},
// 			changeColor: (index, color) => {
// 				//get the store
// 				const store = getStore();

// 				//we have to loop the entire demo array to look for the respective index
// 				//and change its color
// 				const demo = store.demo.map((elm, i) => {
// 					if (i === index) elm.background = color;
// 					return elm;
// 				});

// 				//reset the global store
// 				setStore({ demo: demo });
// 			},
// 			addContact: (contact) => {
// 				const store = getStore();
// 				const updatedContacts = [...store.contacts, contact];
// 				setStore({ contacts: updatedContacts });
// 			},
// 			updateContact: (updatedContact) => {
// 				const store = getStore();
// 				const updatedContacts = store.contacts.map(contact =>
// 					contact.id === updatedContact.id ? updatedContact : contact
// 				);
// 				setStore({ contacts: updatedContacts });
// 			},
// 			deleteContact: (contactId) => {
// 				const store = getStore();
// 				const updatedContacts = store.contacts.filter(contact => contact.id !== contactId);
// 				setStore({ contacts: updatedContacts });
// 			}
// 		}
// 	};
// };