import "./App.css";

import { useEffect, useState } from "react";
import { getComments } from "./api/comments";

import CommentForm from "./components/CommentForm/CommentForm";
import CommentList from "./components/CommentList/CommentList";
import Pagination from "./components/Pagination/Pagination";
import SortControls from "./components/SortControls/SortControls";

import type { Comment } from "./types/comment";

function App() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const loadComments = async () => {
    try {
      const response = await getComments(page, 25, sortBy, order);

      setComments(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [page, sortBy, order]);

  return (
    <div className="app">
      <h1 className="title">Comments App</h1>

      <CommentForm onCommentCreated={loadComments} />
      <div className="controls">
        <SortControls
          sortBy={sortBy}
          order={order}
          onSortByChange={setSortBy}
          onOrderChange={setOrder}
        />
      </div>
      <CommentList comments={comments} onCommentCreated={loadComments} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default App;
