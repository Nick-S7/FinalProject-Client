import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true,
});

const EVENT_SERVICE = {
  createEvent(eventData) {
    return service.post("/api/events", eventData);
  },
  getEvents() {
    return service.get("/api/events");
  },
  updateEvent(eventData) {
    return service.post("/api/events/:id/update", eventData);
  },
  deleteEvent(eventData) {
    return service.post("/api/events/:eventId/delete", eventData);
  },
};

export default EVENT_SERVICE;
