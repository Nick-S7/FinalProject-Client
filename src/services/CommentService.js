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
};

export default COMMENT_SERVICE;
