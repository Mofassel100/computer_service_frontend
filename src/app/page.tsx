import PublicePage from "./(public)/layout";
import Homes from "./(public)/home/page";
import NavBar from "@/components/UI/Navber";

const HomePage = () => {
  return (
    <>
      <PublicePage>
        <div style={{ maxWidth: "85%", margin: "auto" }}>
          <Homes></Homes>
        </div>
      </PublicePage>
    </>
  );
};

export default HomePage;
