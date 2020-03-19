import React, { useState } from "react";
import './App.css';
import FormComponent from './components/Form';
import styled from 'styled-components';

const UserCard = styled.div`
  border: 2px solid white;
  border-radius: 15px;
  margin: 3% 0 3% 0;
  padding: 0 3% 0 3%;
`

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = newUser => {
    setUsersList([...usersList, newUser]);
  };

  return (
    <div className="App-header">
      {usersList.map( user => {
        return (
          <UserCard key={user.id}>
            <h3>User:</h3>
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <p>{user.password}</p>
            <p>{user.tos}</p>
          </UserCard>
        )
      })}
      <FormComponent addUser={addUserHandler}/>
    </div>
  );
}

export default App;
