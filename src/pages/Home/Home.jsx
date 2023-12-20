import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../API';
import './Home.css';
import "../UserDetails/UserDetails.css";


const Home = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    getUserData()
      .then((res) => {
        if (res?.data?.length > 0) {
          setUserList(res?.data);
        } else {
          setUserList([]);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const moveToUserDetail = (user) => {
    navigate(`/user/${user.id}`, { state: { userData: user } });
  };

  return (
    <div className='user-list'>
      <h1>Directory</h1>
      {userList.map((user) => (
        <div
          key={user.id}
          className='user-link'
          onClick={() => moveToUserDetail(user)}
        >
          <div className='user'>
            <h2>Name: {user.name}</h2>
            <h2>Posts: N/A</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
