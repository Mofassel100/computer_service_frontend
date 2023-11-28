import PublicePage from "./(public)/service-detail/layout";
import Homes from "./(public)/home/page";

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
