import React, { useRef } from "react";
import OpenModal from "./Model.tsx";

const SetStateParams = () => {
  const ref = useRef<any>(null);
  return (
    <div>
      <button onClick={() => ref.current?.setTrue()}>打开</button>
      <OpenModal ref={ref} />
    </div>
  );
};
export default SetStateParams;
