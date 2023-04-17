import { useQuery } from "react-query";

import { getListings } from "../api/listings";
import ListingsList from "../components/ListingsList";

import { Spinner } from "react-bootstrap";

const Listings = () => {
  const { isLoading, error, data } = useQuery("listingsData", getListings);

  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  if (error) return "An error has occured: " + error.message;

  return <ListingsList items={data} />;
};

export default Listings;
