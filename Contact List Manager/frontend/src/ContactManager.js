import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', address: '' });
  const [editContact, setEditContact] = useState(null); // State to handle editing
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/contacts/');
      setContacts(response.data);
    } catch (err) {
      setError('Failed to fetch contacts');
    }
  };

  const handleInputChange = (e) => {
    setNewContact({
      ...newContact,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editContact) {
        // Update existing contact
        const response = await axios.put(`http://127.0.0.1:8000/api/contacts/${editContact.id}/`, newContact);
        setContacts(contacts.map(contact => (contact.id === response.data.id ? response.data : contact)));
        setEditContact(null); // Clear the edit state
      } else {
        // Create new contact
        const response = await axios.post('http://127.0.0.1:8000/api/contacts/', newContact);
        setContacts([...contacts, response.data]);
      }
      setNewContact({ name: '', email: '', phone: '', address: '' });  // Clear the form
    } catch (err) {
      setError(`Failed to save contact: ${err.message}`);
    }
  };

  const handleEdit = (contact) => {
    setNewContact(contact);
    setEditContact(contact);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/contacts/${id}/`);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact List</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Display the contact list */}
      <div className="table-responsive mb-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map(contact => (
                <tr key={contact.id}>
                    <td>{contact.id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.address || 'N/A'}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(contact)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No contacts available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form to add or update a contact */}
      <div className="card mb-4">
        <div className="card-body">
          <h2>{editContact ? 'Update Contact' : 'Add New Contact'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                value={newContact.name}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={newContact.email}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                name="phone"
                value={newContact.phone}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                name="address"
                value={newContact.address}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              {editContact ? 'Update Contact' : 'Add Contact'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
