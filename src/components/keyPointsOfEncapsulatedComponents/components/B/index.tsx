import React from "react";
import { Button } from "antd";
import { useState } from "react";

const B = () => {
  const [dataB, setDataB] = useState("初始B");
  console.log(dataB);
  return (
    <Button
      onClick={() => {
        setDataB("修改B");
      }}
    >
      {dataB}
    </Button>
  );
};
export default B;
