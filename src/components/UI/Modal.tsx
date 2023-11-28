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
      </div>
    </Modal>
  );
};

export default ShopingModal;
