import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    id: '',
    brand: '',
    size: '',
    color: '',
    price: '',
    image: '',
    type: '',
    product: '',
    season: '',
    gender: '',
    fit: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse numeric fields to the appropriate data type
    const parsedData = {
      ...formData,
      id: parseInt(formData.id, 10),
      size: parseFloat(formData.size),
      price: parseFloat(formData.price)
    };

    try {
      const response = await axios.post('http://localhost:3000/items', parsedData);
      setMessage('Product added successfully!');
      console.log('Form data submitted:', response.data);
    } catch (error) {
      setMessage('There was an error submitting the form.');
      console.error('Error details:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <h2>Product Data Form</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type={key === 'price' || key === 'size' || key === 'id' ? 'number' : 'text'}
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Form;
