"use client";

import { useUserData } from "@/hooks/useUserData";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { createClient } from "../../../../supabase/client";
import { useProductComment } from "@/hooks/useProductComment";
import { deleteComment, updateComment } from "@/services/comment/comment.service";
import Image from "next/image";
import lock from "../../../../public/icon/lock.png";
import beforeCheck from "../../../../public/icon/checkBefore.png";
import afterCheck from "../../../../public/icon/checkAfter.png";

type NewComment = {
  content: string;
  product_id: string;
  user_id: string;
  private: boolean;
};

type StateType = { id: string; restart: boolean; setRestart: Dispatch<SetStateAction<boolean>> };

type CommentType = {
  content: string;
  created_at: string;
  id: string;
  product_id: string;
  user_id: string;
  users: {
    nickname: string;
  };
  private: boolean;
};

export default function ProductInquiry({ id, restart, setRestart }: StateType) {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const editCommentRef = useRef<HTMLInputElement>(null);
  const { data: userId } = useUserData();

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [commentValue, setCommentValue] = useState(""); // Track input value

  const { data: commentList } = useProductComment(id, restart);

  // 댓글 추가
  const addComment = async (newComment: NewComment) => {
    const supabase = createClient();
    await supabase.from("comments").insert(newComment);
  };

  const { mutate: createComment } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      setRestart(!restart);
    }
  });

  const addCommentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = commentRef.current?.value;

    if (!comment) {
      alert("내용을 입력하세요!");
      return;
    }

    const newComment: NewComment = {
      content: comment,
      product_id: id,
      user_id: userId.id,
      private: isPrivate
    };
    createComment(newComment);

    if (commentRef.current) {
      commentRef.current.value = "";
    }
    setIsPrivate(false);
    setCommentValue(""); // Reset input value
  };

  // 댓글 수정
  const { mutate: updateMutation } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      setRestart(!restart);
    }
  });

  const editCommentHandler = (id: string) => {
    const editComment = editCommentRef.current?.value;

    updateMutation({ content: editComment, id: id });
  };

  // 댓글 삭제
  const { mutate: deleteMutation } = useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      setRestart(!restart);
    }
  });

  const deleteCommentHandler = (id: string) => {
    deleteMutation(id);
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${year.slice(2)}.${month}.${day}`;
  };

  return (
    <>
      <div className="">
        <div className="p-4">
          <p className="pb-3 pl-1 text-[16px] text-[#4C4F52]">문의 남기기</p>
          <form onSubmit={(e) => addCommentHandler(e)} className="flex flex-col space-y-2">
            <textarea
              placeholder="글 작성하기"
              className={`border border-[#E6E6E6]  rounded-md w-full transition-all p-2 ${
                commentValue ? "bg-white border-gray-300 text-black" : "bg-[#F2F2F2] border-[#E6E6E6] text-[#CDCFD0] "
              }`}
              ref={commentRef}
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              style={{
                minHeight: "84px",
                lineHeight: "1.5",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                resize: "none"
              }}
            />

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <div
                  className="relative w-[20px] h-[20px] "
                  onClick={() => {
                    setIsPrivate(!isPrivate);
                  }}
                >
                  <Image
                    src={isPrivate ? afterCheck : beforeCheck}
                    alt="정렬 아이콘"
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </div>

                <span className="text-[14px] text-[#4C4F52] ml-2">비밀글</span>
              </div>
              <button
                className={`border border-[#BFC4C4] text-[#CDCFD0] p-3 w-[59px] h-[32px] flex justify-center items-center rounded-md ${
                  commentValue ? "bg-[#F2F2F2] border-none text-primarynormal" : "bg-white border-[#BFC4C4]"
                }`}
              >
                등록
              </button>
            </div>
          </form>
        </div>
        <div className="border-[#F4F4F4] border-[1px] w-full mt-3" />

        <div className="px-4">
          {commentList?.map((comment: CommentType) => (
            <div key={comment.id} className="border-b-2 border-gray-200 flex justify-between">
              {editingCommentId === comment.id ? (
                <div>
                  <p className="text-sm font-semibold">{comment.users?.nickname}</p>
                  <input
                    type="text"
                    className="border rounded-md w-full h-[48px] border-red-200"
                    ref={editCommentRef}
                  />
                  <p>{formatDate(comment.created_at.substring(0, 10))}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-[12px] p-2 my-2">
                  <p className="text-[14px] text-[#1B1C1D] font-semibold">{comment.users?.nickname}</p>
                  <p className="text-[#4C4F52] text-[14px] flex justify-center items-center">
                    {comment.private && userId?.id !== comment.user_id ? (
                      <>
                        <Image
                          src={lock} // Path to the lock icon image
                          alt="Lock Icon"
                          width={25} // Adjust width as needed
                          height={20} // Adjust height as needed
                          className="mr-2 inline"
                        />
                        비밀글입니다
                      </>
                    ) : (
                      comment.content
                    )}
                  </p>
                  <p className="text-[12px] text-[#989898]">{formatDate(comment.created_at.substring(0, 10))}</p>
                </div>
              )}

              {userId?.id === comment.user_id && (
                <div className="w-28 h-6 flex gap-2 mt-4">
                  {editingCommentId !== comment.id ? (
                    <button
                      className="w-12 bg-primarynormal text-white rounded-md"
                      onClick={() => setEditingCommentId(comment.id)}
                    >
                      수정
                    </button>
                  ) : (
                    <button
                      className="w-12 bg-white text-[#0068E5] rounded-md"
                      onClick={() => {
                        editCommentHandler(comment.id);
                        setEditingCommentId(null);
                      }}
                    >
                      저장
                    </button>
                  )}
                  <button
                    className="w-12 bg-white border rounded-md border-red-500 text-red-500"
                    onClick={() => deleteCommentHandler(comment.id)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
