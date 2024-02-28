import React, { useState } from "react";

function ToyForm({ toys, setToys}) {
  const [newToy, setNewToy] = useState({
    name: '',
    image: '',
    likes: 0,
  })

  function handleInputChange(e) {
    setNewToy({...newToy, [e.target.name]: e.target.value})
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    fetch('http://localhost:3001/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    })
      .then(res => res.json())
      .then(toy => setToys([...toys, toy]))
    setNewToy({
      name: '',
      image: '',
      likes: 0,
    })
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleFormSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={newToy.name}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={newToy.image}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
