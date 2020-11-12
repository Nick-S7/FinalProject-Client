import React from "react";

const ListEvents = (props) => {
  return (
    <section>
      <ul>
        <ul>
          {props.events.map((event) => (
            <li key={event._id}>{event.name}</li>
          ))}
        </ul>
      </ul>
    </section>
  );
};

export default ListEvents;
