import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';

function Card() {
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState('shirt');
  const [selectedSeason, setSelectedSeason] = useState('summer');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/items');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  const handleAddToCartClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <div>
      <div>
        <label>
          Type:
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="shirt">Shirt</option>
            <option value="pant">Pants</option>
          </select>
        </label>
        <label>
          Season:
          <select value={selectedSeason} onChange={handleSeasonChange}>
            <option value="summer">Summer</option>
            <option value="snow">Snow</option>
            <option value="rain">Rain</option>
          </select>
        </label>
      </div>
      <div className="new-container">
        <h2 className="section-title">New Arrivals</h2>
        <div className="card-container">
          {data
            .filter(item => item.type === selectedType && item.season === selectedSeason)
            .slice(0, 20)
            .map((item) => (
              <div className="card" key={item.id} onClick={() => handleAddToCartClick(item)}>
                <img className="card-image" src={item.image} alt={`Product ${item.id}`} />
                <div className="card-content">
                  <h3 className="card-title">{item.brand}</h3>
                  <p className="card-price">RS. {item.price}</p>
                  <p className="card-size">Size: {item.size}</p>
                  <button className="cart-button" onClick={(e) => { e.stopPropagation(); handleAddToCartClick(item); }}>Add to Cart</button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {modalVisible && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>X</span>
            <h3 className="modal-title">{selectedItem.brand}</h3>
            <img className="modal-image" src={selectedItem.image} alt={`Product ${selectedItem.id}`} />
            <p className="modal-price">RS. {selectedItem.price}</p>
            <p className="modal-size">Size: {selectedItem.size}</p>
            <p className="modal-season">Season: {selectedItem.season}</p>
            <button className="modal-button">Add to Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
