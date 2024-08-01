"use client";

import { useUserData } from "@/hooks/useUserData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { createClient } from "../../../supabase/client";
import { useProductComment } from "@/hooks/useProductComment";
import { deleteComment, updateComment } from "@/services/comment/comment.service";

type NewComment = {
  content: string;
  product_id: string;
  user_id: string;
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
};

export default function ProductInquiry({ id, restart, setRestart }: StateType) {
  const commentRef = useRef<HTMLInputElement>(null);
  const editCommentRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient(); // 필요없으면 지우기
  const { data: userId } = useUserData();

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

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

    const newComment = { content: comment, product_id: id, user_id: userId.id };
    createComment(newComment);

    if (commentRef.current) {
      commentRef.current.value = "";
    }
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

  // const saveClickBtn = (commentList: CommentType) => {
  //   editCommentHandler(commentList.id);
  //   setEditingCommentId(null);
  // }; // 이거 함수로 만들어서 하고싶은데 type오류 남 ㅠㅠ

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
          {commentList?.map((comment: CommentType) => (
            <div key={comment.id} className="border-b-2 border-gray-200 flex justify-between">
              {editingCommentId === comment.id ? (
                <div>
                  <p className="text-sm font-semibold">{comment.users?.nickname}</p>
                  <input type="text" className="border border-red-200" ref={editCommentRef} />
                  <p>{comment.created_at.substring(0, 10)}</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold">{comment.users?.nickname}</p>
                  <p>{comment.content}</p>
                  <p>{comment.created_at.substring(0, 10)}</p>
                </div>
              )}

              {userId?.id === comment.user_id && (
                <div>
                  {editingCommentId !== comment.id ? (
                    <button onClick={() => setEditingCommentId(comment.id)}>수정</button>
                  ) : (
                    <button
                      onClick={() => {
                        editCommentHandler(comment.id);
                        setEditingCommentId(null);
                      }}
                    >
                      저장
                    </button>
                  )}
                  <button onClick={() => deleteCommentHandler(comment.id)}>삭제</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
