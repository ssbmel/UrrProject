import BottomNav from '@/components/common/bottomnav/BottomNav';
import Footer from '@/components/common/footer/Footer';
import Header from '@/components/common/header/Header';
import React, { PropsWithChildren } from 'react';

const Mainlayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
        <BottomNav />
      </div>
    </>
  );
};

export default Mainlayout;
