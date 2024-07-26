'use client';

import { useUserData } from '@/hooks/useUserData';
import Link from 'next/link';

const UserCard = () => {
  const { data: user } = useUserData();

  console.log(user);

  return (
    <div className="flex h-[100px] w-full gap-3 p-2 border justify-between">
      <img
        className="object-cover w-[30%]"
        src={
          user?.profile_url ||
          'https://static.vecteezy.com/system/resources/thumbnails/010/260/479/small/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg'
        }
        alt="샘플이미지"
      />
      <div className="w-[30%]">
        <p>{user?.nickname}</p>
        <p>{user?.email}</p>
        <p>
          <span>😊</span>
          <span>1,000</span>
          포인트
        </p>
      </div>
      <div className="w-[30%] text-right self-center">
        <Link href={'/mypage/edit'}>😊</Link>
      </div>
    </div>
  );
};

export default UserCard;
