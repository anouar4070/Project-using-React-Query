import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { fetchEvents } from "../../util/http.js";

export default function NewEventsSection() {
  //****/

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    //staleTime: 0, // how much time react query waits before sending behind the scene request
    //gcTime: 30000 // the cached data will only be kept around for 30sec 
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events."}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}

//****/
// export default function NewEventsSection() {
// const [data, setData] = useState();
// const [error, setError] = useState();
// const [isLoading, setIsLoading] = useState(false);

// async function fetchEvents() {
//   setIsLoading(true);
//   const response = await fetch('http://localhost:3000/events');

//   if (!response.ok) {
//     const error = new Error('An error occurred while fetching the events');
//     error.code = response.status;
//     error.info = await response.json();
//     throw error;
//   }

//   const { events } = await response.json();

//   return events;
// }

// useEffect(() => {

//   fetchEvents()
//     .then((events) => {
//       setData(events);
//     })
//     .catch((error) => {
//       setError(error);
//     })
//     .finally(() => {
//       setIsLoading(false);
//     });
// }, []);

// let content;

// if (isLoading) {
//   content = <LoadingIndicator />;
// }

// if (error) {
//   content = (
//     <ErrorBlock title="An error occurred" message="Failed to fetch events" />
//   );
// }

// if (data) {
//   content = (
//     <ul className="events-list">
//       {data.map((event) => (
//         <li key={event.id}>
//           <EventItem event={event} />
//         </li>
//       ))}
//     </ul>
//   );
// }

// return (
//   <section className="content-section" id="new-events-section">
//     <header>
//       <h2>Recently added events</h2>
//     </header>
//     {content}
//   </section>
// );
// }
