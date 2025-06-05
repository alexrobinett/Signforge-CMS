import { useEffect, useRef, useState } from "react";
import usePersist from "../../hooks/usePersist";
import { Outlet, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../app/api/axiosInstance";
import { useAuth } from "../../app/context/AuthContext";

const PersistLogin = () => {

    const [persist] = usePersist()
    const { auth, setAuth } = useAuth();
    const token = auth.token;
    const effectRan = useRef(false)
    const navigate = useNavigate()
    const [trueSuccess, setTrueSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      try {
        const response = await axiosInstance.get("/auth/refresh");
        const accessToken = response.data?.accessToken;
        if (accessToken) {
          setAuth((prev) => ({ ...prev, token: accessToken }));
          setTrueSuccess(true);
        } else {
          throw new Error("No access token returned");
        }
      } catch (err) {
        setIsError(true);
        setError(err);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    if (!token && persist) {
      const storedAccessToken = localStorage.getItem("access_token");
      if (storedAccessToken) {
        setAuth((prev) => ({ ...prev, token: storedAccessToken }));
        setTrueSuccess(true);
      } else {
        verifyRefreshToken();
      }
    }

    return () => (effectRan.current = true);
    // eslint-disable-next-line
  }, [persist, token, setAuth, navigate]);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = (
      <p className="errmsg">
        {error?.response?.data?.message || error?.message || "Error"}
        <Link to="/">Please login again</Link>.
      </p>
    );
  } else if ((token && trueSuccess) || (token && !isLoading && !isError)) {
    content = <Outlet />;
  }

  return content;
}

export default PersistLogin