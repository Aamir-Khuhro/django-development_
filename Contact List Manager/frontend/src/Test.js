import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Test = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Welcome to Our Contact Manager</h1>
              <p className="card-text">
                Welcome to our Contact Manager app! This application allows you to easily store and manage your contacts.
                You can add new contacts, view them anytime, and keep your contact information organized and accessible.
              </p>
              <p className="card-text">
                <strong>Key Features:</strong>
              </p>
              <ul className="list-group mb-4">
                <li className="list-group-item">Add new contacts with names, phone numbers, and email addresses.</li>
                <li className="list-group-item">View all your stored contacts in one place.</li>
                <li className="list-group-item">Edit and update your contact information as needed.</li>
                <li className="list-group-item">Delete contacts you no longer need.</li>
              </ul>
              <p className="card-text">
                Our app is designed with ease of use in mind. Start by adding your first contact and explore the features.
                If you have any questions or need assistance, feel free to reach out to our support team.
              </p>
              <div className="text-center">
                <Link to="/contact-manager" className="btn btn-primary">Get Started</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
