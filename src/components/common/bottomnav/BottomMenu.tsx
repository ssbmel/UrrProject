import HomeIcon from "../../../../public/icon/homeIcon.svg";
import MypageIcon from "../../../../public/icon/mypageIcon.svg";
import StoreIcon from "../../../../public/icon/storeIcon.svg";
import InfluencerIcon from "../../../../public/icon/influencer.svg";
import ChatIcon from "../../../../public/icon/chatIcon.svg";
import BlueHome from "../../../../public/icon/blue_home.svg";
import BlueMypage from "../../../../public/icon/blue_mypage.svg";
import BlueStore from "../../../../public/icon/blue_store.svg";
import BlueInfluencer from "../../../../public/icon/blue_influencer.svg";
import BlueChat from "../../../../public/icon/blue_chat.svg";

export const bottomMenu = [
  {
    id: 1,
    link: "/",
    label: "홈",
    icon: <HomeIcon />,
    blueIcon: <BlueHome />
  },
  {
    id: 2,
    link: "/mypage",
    label: "마이페이지",
    icon: <MypageIcon />,
    blueIcon: <BlueMypage />
  },
  {
    id: 3,
    link: "/products/list",
    label: "스토어",
    icon: <StoreIcon />,
    blueIcon: <BlueStore />
  },
  {
    id: 4,
    link: "/influencer",
    label: "인플루언서",
    icon: <InfluencerIcon />,
    blueIcon: <BlueInfluencer />
  },
  {
    id: 5,
    link: "/chatlist",
    label: "채팅",
    icon: <ChatIcon />,
    blueIcon: <BlueChat />
  }
];
