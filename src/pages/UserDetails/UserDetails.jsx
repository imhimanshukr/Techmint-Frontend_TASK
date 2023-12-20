import React, { useEffect, useState } from "react";
import { getCountryList, getCurrentTime, getUserPost } from "../../API";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import "moment-timezone";

const UserDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const userDetail = state.userData;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeZone, setTimeZone] = useState(moment().format("HH:mm:ss"));
  const [PostList, setPostList] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    getCountryList()
      .then((res) => setCountryList(res?.data || []))
      .catch((err) => {
        console.warn(err);
        setCountryList([]);
      });
    userPostList(userDetail?.id);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setTimeZone((prevTime) => {
          const currentTime = moment(prevTime, "HH:mm:ss").add(1, "second");
          return currentTime.format("HH:mm:ss");
        });

        if (selectedCountry && elapsedTime > 0) {
          setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPaused, selectedCountry, elapsedTime]);

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    if (country) {
      getCurrentTime(country)
        .then((res) => {
          const timezone = res.data.timezone;
          const currentTime = moment.tz(res.data.utc_datetime, timezone);
          const newElapsedTime = isPaused ? elapsedTime : 0;
          setElapsedTime(newElapsedTime);
          const updatedTime = moment.tz(currentTime, timezone);

          setTimeZone(updatedTime.format("HH:mm:ss"));
        })
        .catch((err) => console.warn(err));
    }
  };

  const userPostList = (id) => {
    getUserPost(id)
      .then((res) => {
        if (res?.data?.length > 0) {
          setPostList(res?.data);
        } else {
          setPostList([]);
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const goBack = () => {
    navigate(-1);
  };

  const openPostPopup = (post) => {
    setSelectedPost(post);
  };

  const closePostPopup = () => {
    setSelectedPost(null);
  };

  const handlePopupClick = (event) => {
    if (event.target.className === "popup-modal active") {
      closePostPopup();
    }
  };

  return (
    <div>
      <div className="top">
        <button className="btn" onClick={goBack}>
          Back
        </button>
        <div className="dropdown">
          <select
            id="countryDropdown"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="dropdown-select"
          >
            <option value="" disabled>
              Select a country
            </option>
            {countryList.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="clock-container">
          <p className="clock">{timeZone}</p>
          <button className="pause-btn" onClick={() => setIsPaused(!isPaused)}>
            {isPaused ? "Start" : "Pause"}
          </button>
        </div>
      </div>

      {/* Profile */}
      <h2>Profile Page</h2>
      <div
        className="user user-detail"
        style={{ background: "transparent", cursor: "auto" }}
      >
        <div>
          <h2>{userDetail?.name}</h2>
          <h2>
            {userDetail?.username} | {userDetail?.company?.catchPhrase}
          </h2>
        </div>
        <div>
          <h2>{userDetail?.address?.city}</h2>
          <h2>
            {userDetail?.email} | {userDetail?.phone}
          </h2>
        </div>
      </div>

      {/* Post */}
      <div className="post-list">
        {PostList.map((post, index) => (
          <div className="post" key={index} onClick={() => openPostPopup(post)}>
            <p>{post?.title}</p>
            <p>{post?.body}</p>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedPost && (
        <div
          className={`popup-modal ${selectedPost ? "active" : ""}`}
          onClick={handlePopupClick}
        >
          <div className="popup-content">
            <span className="close-btn" onClick={closePostPopup}>
              &times;
            </span>
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.body}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
