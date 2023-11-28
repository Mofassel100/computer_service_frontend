import Image from "next/image";
import "./../UI/style/style.css";
const SearchProducts = ({ service }: { service: any }) => {
  return (
    <div
      className="seachCardHover textHover categoryItems"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        borderRadius: "15pxpx",

        color: "black",
        height: "110px",
      }}
    >
      <Image
        style={{
          textAlign: "center",
          borderRadius: "5px 5px 5px 10px",
          padding: "0px 3px",
        }}
        width={55}
        height={60}
        src={service?.image}
        alt="productImage"
      />
      <div style={{ textAlign: "start", padding: "0 6px" }}>
        <p style={{ marginBottom: "2px" }}>
          {`${service?.name}`.slice(0, 15)}..
        </p>
        <h3>{`${service?.title}`.slice(0, 15)}..</h3>
        <p>{service.description.substring(0, 25)}..</p>
        <p style={{ display: "flex", textAlign: "start", gap: "1" }}>
          price:${service?.price}.00&#2547;
          <p style={{ textDecoration: "line-through", textIndent: "6px" }}>
            ${service?.oldPrice}.00&#2547;
          </p>
        </p>
      </div>
      <div
        className="animitionTop"
        style={{
          animation: " height infinite",
          padding: "0px 10px",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            height: "60px",
            transition: "height linear",
            textAlign: "center",
            animation: " height infinite",
          }}
        >
          Save <br />${service?.oldPrice - service?.price}.00&#2547;
        </p>
      </div>
    </div>
  );
};

export default SearchProducts;
