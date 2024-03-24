const getState = ({ setStore, getStore, getActions }) => {
	const fakeAPIUrl = "https://playground.4geeks.com/apis/fake/contact/";
	const agendaSlug = "my_unique_agenda";

	return {
		store: {
			contact: {
				// Object to hold a single contact's data for add/update form
				full_name: "",
				email: "",
				agenda_slug: agendaSlug,
				address: "",
				phone: "",
			},
			// Array to hold the list of contacts
			contacts: []
		},
		actions: {
			// Fetch all contacts for a given agenda
			loadContacts: () => {
				fetch(`${fakeAPIUrl}agenda/${agendaSlug}`, {
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						if (!response.ok) {
							throw new Error('Problem fetching contacts');
						}
						return response.json();
					})
					.then(data => setStore({ contacts: data }))
					.catch(error => console.error("Error loading contacts:", error));
			},
			// Update the store.contact object when form inputs change
			handleChange: (event) => {
				const { contact } = getStore();
				setStore({
					contact: {
						...contact,
						[event.target.name]: event.target.value
					}
				});
			},
			// Handle form submission for both adding and updating contacts
			handleSubmit: () => {
				const { contact } = getStore();
				const method = contact.id ? "PUT" : "POST"; // Determine if we are updating or adding
				const url = contact.id ? `${fakeAPIUrl}${contact.id}` : fakeAPIUrl;

				// Return the promise so that the component can chain with .then() or .catch()
				return fetch(url, {
					method: method,
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(contact)
				})
					.then(response => {
						if (!response.ok) {
							throw new Error('Problem submitting contact');
						}
						return response.json();
					})
					.then(() => {
						// Reload contacts after adding/updating and reset the contact form
						getActions().loadContacts();
						setStore({
							contact: {
								full_name: "",
								email: "",
								agenda_slug: agendaSlug,
								address: "",
								phone: "",
							}
						});
					});
			},
			// Delete a contact by ID
			deleteContact: (contactId) => {
				return fetch(`${fakeAPIUrl}${contactId}`, {
					method: "DELETE"
				})
					.then(response => {
						if (!response.ok) {
							throw new Error('Problem deleting contact');
						}
						return response.json();
					})
					.then(() => {
						// Reload contacts after deleting
						getActions().loadContacts();
					});
			}
		}
	};
};

export default getState;
