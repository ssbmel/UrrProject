import InfoOnEdit from '@/components/mypage/edit-profile-info/InfoOnEdit';
import InfoOnEditTitle from '@/components/mypage/edit-profile-info/InfoOnEditTitle';
import Link from 'next/link';
import React from 'react';

const EditProfileInfoPage = () => {
  return (
    <>
      <div>
        <InfoOnEditTitle />
        <InfoOnEdit />
      </div>
    </>
  );
};

export default EditProfileInfoPage;
