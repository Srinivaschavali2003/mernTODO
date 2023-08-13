import axios from "axios";
import { useEffect, useState } from "react";

const useAuthVerification = () => {
  const [auth, setAuth] = useState();

  const verifyAuth = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/is_logged_in');
      return res.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const data = await verifyAuth();
      setAuth(data);
    })
    ();
  }); // Empty dependency array ensures the effect runs only once on mount

  return { auth };
};

export default useAuthVerification;
