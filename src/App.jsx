import React, { useState } from 'react';
import Login from './components/Login';
import TicketForm from './components/TicketForm';
import InfoPage from './components/InfoPage';
import AdminPage from './components/AdminPage';

function App() {
  const [page, setPage] = useState('login'); // Tracks the current page
  const [currentUserData, setCurrentUserData] = useState(null); // Store the logged-in user data
  const [users, setUsers] = useState([]); // Store all user data

  const handleFormSubmit = (data) => {
    setUsers([...users, data]); // Add the new user to the list
    setCurrentUserData(data); // Set the current user as the newly created one
    setPage('infoPage'); // Redirect to the InfoPage
  };

  const handleLogin = (ticketNumber) => {
    if (ticketNumber === 'admin' && page === 'login') {
      setPage('adminPage'); // Redirect to AdminPage for admin login
    } else {
      const user = users.find((u) => u.ticketNumber === ticketNumber);
      if (user) {
        setCurrentUserData(user); // Set the logged-in user
        setPage('infoPage'); // Redirect to InfoPage
      } else {
        alert('Invalid Ticket Number');
      }
    }
  };

  const handleLogout = () => {
    setCurrentUserData(null); // Clear the current user
    setPage('login'); // Redirect back to login
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">
      {page === 'login' && (
        <Login
          onLogin={handleLogin}
          onRaiseTicket={() => setPage('ticketForm')}
        />
      )}
      {page === 'ticketForm' && <TicketForm onSubmit={handleFormSubmit} />}
      {page === 'infoPage' && (
        <InfoPage userData={currentUserData} onLogout={handleLogout} />
      )}
      {page === 'adminPage' && (
        <AdminPage users={users} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
