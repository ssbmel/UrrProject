export type Addr = {
  roadAddr: string;
  jibunAddr: string;
  zipNo: string;
  bdMgtSn: string;
};

export type PaymentData = {
  fullName: string;
  userId: string;
  orderCount: number; // 고칠것 수량
  price: number;
  orderName: string;
  address: string;
  phoneNumber: string;
};

export type PageData = {
  totalCount: string;
  countPerPage: string;
  currentPage: string;
};

export type AddressProps = {
  keyword: string;
  currentPage: number;
};
