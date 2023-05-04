import ListingItem from "./ListingItem";

const ListingsList = (props) => {
  if (props.items.length === 0) {
    return <h2>No listings found!</h2>;
  }

  return (
    <ul>
      {props.items.map((listing) => (
        <ListingItem
          key={listing.id}
          id={listing.id}
          user={listing.user}
          userId={listing.user_id}
          name={listing.name}
          price={listing.price}
          image={listing.image}
          created={listing.created}
        />
      ))}
    </ul>
  );
};

export default ListingsList;
