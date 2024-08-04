import dynamic from "next/dynamic";

const Complete = dynamic(() => import("@/components/payment/Complete"), { ssr: false });

const page = () => {
  return (
    <div>
      <Complete />
    </div>
  );
};

export default page;
