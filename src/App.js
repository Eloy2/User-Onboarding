import React, { useState } from "react";
import './App.css';
import FormComponent from './components/Form';
import styled from 'styled-components';
import { H3, H4, P, P1 } from './components/StyleTags';

const UserCard = styled.div`
  border: 2px solid white;
  border-radius: 15px;
  margin: 3% 0 3% 0;
  padding: 0 3% 3% 3%;
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
            <H3>User:</H3>
            <H4>{user.name}</H4>
            <P1>Email:</P1>
            <P>{user.email}</P>
            <P1>Password:</P1>
            <P>{user.password}</P>
            {user.tos ? <P1>Agreed to terms</P1> : null}
          </UserCard>
        )
      })}
      <FormComponent addUser={addUserHandler}/>
    </div>
  );
}

export default App;
