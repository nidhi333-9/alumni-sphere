import { useParams, useLocation, Link } from "react-router-dom";

export default function EventDetails() {
  const { id } = useParams();
  const location = useLocation();
  const event = location.state; // comes from Link in EventSection

  if (!event) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold">Event Not Found</h2>
        <Link
          to="/"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ← Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-72 object-cover rounded-lg shadow-lg"
      />
      <h1 className="text-3xl font-bold mt-6">{event.title}</h1>
      <p className="text-gray-500 mt-2">{event.date}</p>

      {/* Full Article Section */}
      <div className="mt-6 text-lg text-gray-700 space-y-4 leading-relaxed">
        <p>
          {event.article ||
            "This is a detailed article about the event. More content will be added here."}
        </p>
        <p>
          The <strong>{event.title}</strong> will bring together alumni, students,
          and industry experts to share valuable experiences, participate in
          workshops, and strengthen networking opportunities. Expect interactive
          sessions, keynote talks, and fun activities.
        </p>
        <p>
          Don’t miss this chance to engage with fellow alumni, build meaningful
          connections, and celebrate our community’s achievements. We encourage
          everyone to join and make this event a memorable experience!
        </p>
      </div>

      {/* Back Button */}
      <Link
        to="/Events"
        className="mt-8 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        ← Back to Events
      </Link>
    </div>
  );
}
