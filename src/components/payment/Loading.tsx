"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LoadingComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code === "FAILURE_TYPE_PG") {
      alert("결제 취소되었습니다.");
      router.push("/payment");
      return;
    } else if (!code) {
      router.push("/payment/complete");
    } else if (code === "PORTONE_ERROR") {
      router.push("/payment/fail");
    }
  }, []);

  return <div>This is Loading Component</div>;
};

export default LoadingComponent;
