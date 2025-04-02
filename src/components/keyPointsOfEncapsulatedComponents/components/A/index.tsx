import React from "react";
import { useState } from "react";
import { Button } from "antd";
import B from "../B/index";

const A = () => {
  // ✅ 父组件重新渲染时，默认情况下，所有子组件也会重新渲染（除非子组件被 React.memo 保护）。
  // ✅ 子组件自己 setState 触发重新渲染时，父组件不会重新渲染（因为 setState 只影响当前组件）。
  const [dataA, setDataA] = useState("初始A");
  console.log(dataA);
  return (
    <>
      <Button
        onClick={() => {
          setDataA("修改A");
        }}
      >
        {dataA}
      </Button>
      <B />
    </>
  );
};
export default A;
