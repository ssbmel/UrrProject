'use client';
import { useUserData } from '@/hooks/useUserData';
import Link from 'next/link';
import React, { useState } from 'react';

const ButtonPreview = () => {
  
  const userdata = useUserData().data;
  console.log(userdata);
  const onPopup = () => {
    const url = 'chatlist/chat '
    window.open(
      url,
      '_blank',
      "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=450, height=600, top=30, left=30"
    )
  }
  return (
    <div>
      {/* <button type="button" className="btn-circle" onClick={onPopup}>미리보기</button> */}
    </div>);

};
export default ButtonPreview;
