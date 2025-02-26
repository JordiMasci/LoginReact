import axios from "axios";
import { useEffect, useState } from "react";

function ChiamataServerProva() {
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);

  //   CHIAMATA USERS
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        const users = res.data;
        setUsers(users);
      })
      .catch((err) => {
        console.error("Errore chiamata", err);
      });
  }, []);

  //   CHIAMATA PROFILES
  useEffect(() => {
    axios
      .get("http://localhost:5000/profiles")
      .then((res) => {
        const profiles = res.data;
        setProfiles(profiles);
      })
      .catch((err) => {
        console.error("Errore chiamata", err);
      });
  }, []);

  users.map((item) => {
    console.log(item);
  });

  profiles.map((profile) => {
    console.log(profile);
  });
}

export default ChiamataServerProva;
