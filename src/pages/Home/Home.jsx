import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, getAllPost } from "../../API";
import "./Home.css";
import "../UserDetails/UserDetails.css";

const Home = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    let userList;

    getUserData()
      .then((res) => {
        if (res?.data?.length > 0) {
          userList = res?.data;
          getAllPost() // Calling this API to get the post count for particular user because it is not avaialble in 'user' API
          .then((res) => {
              if (res?.data?.length > 0) {
                const userpost = res.data;
                const postCountDict = userpost.reduce((acc, post) => {
                  const userId = post.userId;
                  acc[userId] = (acc[userId] || 0) + 1;
                  return acc;
                }, {});
                userList.forEach((user) => {
                  user.post = postCountDict[user.id] || 0;
                });
              } else {
                console.log("No posts found");
              }
              setUserList(userList);
            })
            .catch((err) => {
              console.warn(err);
            });
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
    <div className="user-list">
      <h1>Directory</h1>
      {userList.map((user) => (
        <div
          key={user.id}
          className="user-link"
          onClick={() => moveToUserDetail(user)}
        >
          <div className="user">
            <h2>Name: {user.name}</h2>
            <h2>Posts: {user.post}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
