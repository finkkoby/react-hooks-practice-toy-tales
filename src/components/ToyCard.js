import React, { useState } from "react";

function ToyCard({ toy, toys, setToys }) {
  const [likeCount, setLikeCount] = useState(toy.likes)

  function handleDelete(item) {

    fetch(`http://localhost:3001/toys/${item.id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        const keepToys = toys.filter(toy => {
          return item.name !== toy.name
        })
        console.log(keepToys)
        setToys(keepToys)
      })
  }

  function handleLike(item) {
    setLikeCount(likeCount + 1)
    
    fetch(`http://localhost:3001/toys/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...item, likes: likeCount + 1})
    })
      .then(res => res.json())
      .then(updatedToy => {
        const updated = toys.map(toy => {
          if(updatedToy.name === toy.name) {
            return updatedToy
          } else {
            return toy
          }
        })
        setToys(updated)
      })
  }

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={() => handleLike(toy)}>Like {"<3"}</button>
      <button className="del-btn" onClick={() => handleDelete(toy)}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
