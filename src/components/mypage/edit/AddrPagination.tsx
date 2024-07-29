import { Addr, PageData } from "../../../../types/addr.type";
import { getAddress } from "@/services/users/account/account.service";

interface Props {
  keyword: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageData: PageData | null;
  setPageData: React.Dispatch<React.SetStateAction<PageData | null>>;
  setData: React.Dispatch<React.SetStateAction<Addr[] | null>>;
}

const AddrPagination = ({ keyword, currentPage, setCurrentPage, pageData, setPageData, setData }: Props) => {
  const pageHandler = async (e: React.FormEvent, keyword: string, currentPage: number) => {
    e.preventDefault();
    if (!keyword) {
      alert("입력된 검색어가 없습니다.");
      return;
    }
    setCurrentPage(currentPage);
    const { results } = await getAddress({ keyword, currentPage });
    const { common, juso: data } = results;
    if (common?.errorCode !== "0") {
      alert(common?.errorMessage);
    }
    setPageData(common);
    setData(data);
  };

  return (
    <>
      {keyword ? (
        <div className="flex justify-center items-center gap-5">
          <button
            onClick={(e) => pageHandler(e, keyword, currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1"
          >
            ◀
          </button>
          <span>{currentPage}</span>
          <button
            onClick={(e) => pageHandler(e, keyword, currentPage + 1)}
            disabled={currentPage === Math.ceil(Number(pageData?.totalCount) / Number(pageData?.countPerPage))}
            className="p-1"
          >
            ▶
          </button>
        </div>
      ) : null}
    </>
  );
};

export default AddrPagination;
