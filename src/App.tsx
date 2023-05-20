import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import { User } from "@auth0/auth0-react";

type AppProps = {
  userCredentials: User;
  serverIsBusy: boolean;
};

type WaitingProps = {
  serverIsBusy: boolean;
};

function App({ userCredentials, serverIsBusy }: AppProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          serverIsBusy === true ? (
            <Navigate to="/waiting" replace />
          ) : (
            <Home loginEmail={userCredentials["email"]} />
          )
        }
      />
      <Route
        path="/waiting"
        element={<Waiting serverIsBusy={serverIsBusy} />}
      ></Route>
    </Routes>
  );
}

const Waiting = ({ serverIsBusy }: WaitingProps) => {
  return serverIsBusy ? (
    <div>
      Waiting for background task to finish...
      <br />
      Try again later...
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

export default App;
