import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { profileById } from "../stores/profileSlice";
import { Link } from "react-router-dom";

function Users() {
  const currentUser = useSelector((state) => state.users.currentUser);
  const users = useSelector((state) => state.users.value);

  // Profilo privilegi CurrentUser
  const profileCurrentUser = useSelector((state) =>
    profileById(state, currentUser?.profileId)
  );

  // Profilo privilegi tutti gli utenti
  const profile = useSelector((state) =>
    profileById(state, users[5]?.profileId)
  );

  // console.log(profile);

  // console.log("QUESTO è PROFILE", profile);

  // console.log("QUESTO è USERS", users);

  return (
    <>
      <div className="flex flex-col items-center">
        {currentUser ? (
          <>
            <Navbar></Navbar>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <Card
                  user={user}
                  key={user.id}
                  userId={user.id}
                  img={user.img}
                  name={user.name}
                  description={user.description}
                  profileCurrentUser={profileCurrentUser}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-red-500 bold text-4xl">Utente non autenticato</p>
        )}
      </div>
    </>
  );
}

export default Users;
