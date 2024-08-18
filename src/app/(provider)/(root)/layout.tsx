import React, { PropsWithChildren } from "react";

const Mainlayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="container">{children}</div>
    </>
  );
};

export default Mainlayout;
