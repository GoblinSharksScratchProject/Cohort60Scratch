import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navigation = () => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    const selectedPage = event.target.value;
    navigate(selectedPage); // navigate ('./search')
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <label id="navBar">
        <select onChange={handleClick}>
          <option value="navigation">Navigation</option>
          <option value="/searchBar">Search</option>
          <option value="/sellitem">Sell</option>
          <option value="/listings">Listings</option>
          {/* <option value="/favorites">Favorites</option>
                <option value="/listings" >Listing</option> */}
        </select>
      </label>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await fetch("/logout", { method: "POST" });
          navigate("/");
        }}
      >
        LOG OUT
      </button>
    </div>
  );
};

export default Navigation;
