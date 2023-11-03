import { Modal } from "antd";
import React from "react";

const ShopingModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  data,
}: {
  isModalOpen: boolean;
  handleOk: any;
  handleCancel: any;
  data: any;
}) => {
  return (
    <Modal
      title="Category Details"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div>
        dkfkejrtkjerkt
        {data}
        {/* <div
          style={{
            textAlign: "center",
            borderRadius: "20px",
          }}
        >
          {categoryData?.image ? (
            <Image
              style={{
                borderRadius: "20px",
              }}
              alt="res.cloudinary.com"
              src={categoryData?.image}
              width={150}
              height={120}
            />
          ) : (
            "Image not Found"
          )}
        </div>
        <div>
          <h3>Title : {categoryData?.title ? categoryData?.title : ""}</h3>
          <h3>Service Name : {categoryData?.name ? categoryData?.name : ""}</h3>
          <h3>
            Create AT:{" "}
            {categoryData?.createdAt
              ? dayjs(categoryData?.createdAt).format("MMM D, YYYY hh:mm A")
              : ""}
          </h3>
          <h3>
            Updated At:{" "}
            {categoryData?.updatedAt
              ? dayjs(categoryData?.updatedAt).format("MMM D, YYYY hh:mm A")
              : ""}
          </h3>
        </div> */}
      </div>
    </Modal>
  );
};

export default ShopingModal;
