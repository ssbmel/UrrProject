'use client';

import { userDataStore } from '@/zustand/store';

const UserCard = () => {
  const { userInfo } = userDataStore((state) => state);
  console.log(userInfo);

  return (
    <div className="flex h-[100px] w-full gap-3 p-2 border justify-between">
      <img
        className="object-cover w-[30%]"
        src={
          userInfo?.profile_url ||
          'https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg'
        }
        alt="샘플이미지"
      />
      <div className="w-[30%]">
        <p>{userInfo?.nickname}</p>
        <p>{userInfo?.email}</p>
        <p>
          <span>😊</span>
          <span>1,000</span>
          포인트
        </p>
      </div>
      <div className="w-[30%] text-right self-center">
        <span>😊</span>
      </div>
    </div>
  );
};

export default UserCard;
