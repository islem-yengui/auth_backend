import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getProfile } from "../redux/actions";

const Profile = () => {
  const { user, loading, isAuth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : !isAuth ? (
        <Navigate to="/login" />
      ) : (
        <div>
          <h2> {user.fullName} </h2>
          <p> {user.email} </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
