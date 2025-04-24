import { useBoolean } from "ahooks";
import { Modal } from "antd";
import React from "react";

const OpenModal = (props) => {
  const { ref } = props;
  const [open, setOpen] = useBoolean(false);
  ref.current = setOpen;

  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen.setFalse();
      }}
      onClose={() => {
        setOpen.setFalse();
      }}
    ></Modal>
  );
};
export default OpenModal;
