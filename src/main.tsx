import "./index.css";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

const Main = () => {
  const { user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  const [isTaskRunning, setIsTaskRunning] = useState<boolean | null>(null);


  const getStatus = () => {
    fetch("http://localhost:8000/status", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setIsTaskRunning(data.is_task_running);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated && user == undefined)
      loginWithRedirect();
    else if (!isLoading && isAuthenticated) getStatus();
  }, [user, isLoading, isAuthenticated, loginWithRedirect]);

  useEffect(() => {
    const intervalId = setInterval(() => {
        getStatus();
    }, 5000);
    return () => clearInterval(intervalId);
  });

  if (isLoading || user == undefined) {
    return <div>Loading...</div>;
  }

  return (
    <React.StrictMode>
      <BrowserRouter>
        <App userCredentials={user} serverIsBusy={isTaskRunning} />
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH_DOMAIN}
    clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Main />
  </Auth0Provider>
);
