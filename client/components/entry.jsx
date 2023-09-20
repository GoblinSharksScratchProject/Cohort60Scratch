import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useNavigate } from "react-router";
import HomePage from "./landingpage";
import Login from "./Login";
import { useState, useEffect } from "react";

const Entry = () => {
  const [isLoggedIn, setIsLoggedin] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("data", data);

        setIsLoggedin(data);
      })
      .catch((err) => console.log("fetch errorrrr", err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading initial request</h1>
      ) : (
        <>
          {isLoggedIn && <HomePage />}
          {!isLoggedIn && <Login />}
        </>
      )}
    </>
  );
};

export default Entry;
