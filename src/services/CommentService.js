import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true,
});

const COMMENT_SERVICE = {
  createComment(commentData) {
    return service.post("/api/events/:eventId/comment", commentData);
  },
  getComments() {
    return service.get("/api/events/:eventId/comments");
  },
  deleteComment(eventId, commentId) {
    return service.post(`/api/events/${eventId}/comments/${commentId}/delete`);
  },
  // deleteBook(id) {
  //   return service.post(`/api/books/${id}/delete`, {});
  // },
  // updateBook(id, bookData) {
  //   return service.post(`/api/books/${id}/update`, bookData);
  // },
  // getBookDetails(id) {
  //   return service.get(`/api/books/${id}`);
  // }
};

export default COMMENT_SERVICE;
