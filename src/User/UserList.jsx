import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./UserList.scss"

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users?limit=10');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteClick = (user, event) => {
    setUserToDelete(user);
    setShowModal(true);
    positionModal(event);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  const handleDeleteConfirm = () => {
    setUsers(users.filter((user) => user.id !== userToDelete.id));
    handleModalClose();
  };

  const positionModal = (event) => {
    const modal = modalRef.current;
    const rect = event.target.getBoundingClientRect();
    const modalTop = rect.top - 40;
    const modalLeft = rect.left + 25;
    modal.style.top = `${modalTop}px`;
    modal.style.left = `${modalLeft}px`;
  };

  return (
    <div className="container">
      {users.map((user) => (
        <div className="user-card" key={user.id}>
          <button className="delete-btn" onClick={(event) => handleDeleteClick(user, event)}>
            &times;
          </button>
          <span>ID: {user.id}</span>
          <br />
          <span>First Name: {user.firstName}</span>
          <br />
          <span>Last Name: {user.lastName}</span>
          <br />
          <span>Email: {user.email}</span>
          <br />
          <img src={user.image} alt="User" />
        </div>
      ))}

      {showModal && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <button className="success" onClick={handleDeleteConfirm}>
              <i className="fa-solid fa-square-check"></i>
            </button>
            <button className="close" onClick={handleModalClose}>
              <i className="fa-solid fa-rectangle-xmark"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}