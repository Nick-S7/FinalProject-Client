import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true,
});

const EVENT_SERVICE = {
  createEvent(eventData) {
    return service.post("/api/events/create", eventData);
  },
  getEvents() {
    return service.get("/api/events");
  },
  updateEvent(eventData) {
    return service.post("/api/events/:id/update", eventData);
  },
  deleteEvent(eventId) {
    return service.post(`/api/events/${eventId}/delete`, eventId);
  },
  getEventDetails(id) {
    return service.get(`/api/events/${id}`);
  },
};

export default EVENT_SERVICE;
