import React from "react";
import MyOrderedList from "./MyOrderedList";
import { useUserData } from "@/hooks/useUserData";
import LoadingUrr from "../common/loading/LoadingUrr";

const Shopping = () => {
  const data = useUserData();

  if (data.isPending) {
    return <LoadingUrr />;
  }

  return (
    <div className="flex flex-col gap-[20px]">
      <MyOrderedList user={data?.data} />
    </div>
  );
};

export default Shopping;
