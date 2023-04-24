import { useQuery } from "react-query";

import { getListings } from "../api/listings";
import ListingsList from "../components/ListingsList";

import { Spinner } from "react-bootstrap";

import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";

const Listings = (props) => {
  const { isLoading, error, data } = useQuery("listingsData", getListings);
  const auth = useContext(AuthContext);
  let items = [];

  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  if (error) return "An error has occured: " + error.message;

  if (props.user) {
    console.log("proops");
  }

  if (props.profile) {
    data.map((listing) => {
      console.log(listing.user);
      console.log(auth.userId);
      if (listing.user == auth.userId) {
        items.push(listing);
      }
    });
    return <ListingsList items={items} />;
  } else {
    return <ListingsList items={data} />;
  }
};

export default Listings;
