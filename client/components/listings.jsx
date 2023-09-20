import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("/listings", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("listing dataaaaaaaa", data);
        setListings(data);
      })
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <>
      <Navigation />
      <br />
      <div>Your listings</div>
      <div id="listing-container">
        {listings &&
          listings.map((item) => {
            return (
              <div className="listingpage">
                <img src={`${item.picture}`} alt="loading pic"></img>
                <div>Price: {item.price}</div>
                <div>Date posted: {item.date}</div>
                <button id="delete button" type="button">
                  Delete
                </button>
              </div>
            );
          })}
      </div>

      <br />
    </>
  );
};

export default Listings;
