"use client";
import { useUserData } from "@/hooks/useUserData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { createClient } from "../../../supabase/client";
import { useProductComment } from "@/hooks/useProductComment";

type NewComment = {
  content: string;
  comment_id: string;
  user_id: string;
};

export default function ProductInquiry({ id }: { id: string }) {
  const commentRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { data: userId } = useUserData();

  const { data: commentList } = useProductComment();

  const addComment = async (newComment: NewComment) => {
    const supabase = createClient();
    await supabase.from("comment").insert(newComment);
  };

  const { mutate: createComment } = useMutation({
    mutationFn: addComment
    // onSuccess: () => {
    // 안됨
    // }
  });

  const addCommentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = commentRef.current?.value;

    if (!comment) {
      alert("내용을 입력하세요!");
      return;
    }

    const newComment = { content: comment, comment_id: id, user_id: userId.id };
    createComment(newComment);

    if (commentRef.current) {
      commentRef.current.value = "";
    }
  };

  return (
    <>
      <div className="h-[700px] p-2">
        <form onSubmit={(e) => addCommentHandler(e)}>
          <input
            type="text"
            placeholder="문의 사항을 입력해주세요."
            className="border border-[#EAECEC] w-[320px] h-[48px]"
            ref={commentRef}
          />
          <button className="bg-[#1A82FF] text-white p-3">입력</button>
        </form>
        <div>
          {commentList?.map((comment, index) => (
            <div key={index} className="border-b-2 border-gray-200">
              <p className="text-sm font-semibold">{comment.users?.nickname}</p>
              <p>{comment.content}</p>
              <p>{comment.created_at.substring(0, 10)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
