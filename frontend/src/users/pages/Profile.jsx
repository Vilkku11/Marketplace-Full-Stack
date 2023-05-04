import Listings from "../../listings/pages/Listings";

const Profile = () => {
  return (
    <div>
      <h2>Your listings</h2>
      <Listings profile={true} />
    </div>
  );
};

export default Profile;
