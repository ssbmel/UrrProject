export type Addr = {
  roadAddr: string;
  jibunAddr: string;
  zipNo: string;
  bdMgtSn: string;
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
