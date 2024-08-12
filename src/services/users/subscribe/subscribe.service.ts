import { InfSubscribe } from "../../../../types/common";

export const getSubscribeData = async (
  userId: string,
  subscribeIdSetter: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    const response = await fetch(`/api/subscribe?user_id=${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP ERROR status: ${response.status}`);
    }
    const data: InfSubscribe[] = await response.json();
    subscribeIdSetter(data.map((subscribe) => subscribe.infuser_id));
  } catch (error) {
    console.log("Failed to fetch subscription data:", error);
  }
};

/* const subscribedInfUser = async (
  data: InfSubscribe,
  userId: string,
  subscribeIdSetter: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  await getSubscribeData(userId, subscribeIdSetter);
  return response.json();
};  */
/* '구독' 상태로 데이터 업데이트 */

/* const cancelSubscribedInfUser = async (
  data: InfSubscribe,
  userId: string,
  subscribeIdSetter: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (!data.user_id || !data.infuser_id) return;
  const response = await fetch("/api/subscribe", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  await getSubscribeData(userId, subscribeIdSetter);
  return response.json();
};  */
/* '구독취소' 상태로 데이터 업데이트 */
