
import { useState } from "react";

export default function NewsSection() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const news = [
    {
      title: "Alumni Reunion 2025 Announced",
      description:
        "We are excited to welcome back alumni from across the globe for our annual reunion. This year’s event will feature keynote speakers, networking opportunities, and campus tours.",
      details:
        "The Alumni Reunion 2025 is scheduled for July 15–17, 2025, at the main campus. The event will open with a keynote address by a distinguished alumnus. Attendees will participate in skill-building workshops, panel discussions, and guided tours. Cultural performances, networking dinners, and a gala night are also included.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Scholarship Fund Reaches New Milestone",
      description:
        "Thanks to the generous contributions of our alumni, the scholarship fund has crossed the $2 million mark. This achievement highlights a shared commitment to supporting future generations.",
      details:
        "Established in 2010, the scholarship fund has now supported over 500 students. With alumni contributions worldwide, the fund crossed $2 million in 2025. Plans are underway to expand scholarships and mentorship programs, ensuring talented students can pursue education regardless of financial barriers.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Alumni Startup Spotlight: GreenTech Solutions",
      description:
        "GreenTech Solutions, founded by alumni, has been recognized among the top 50 sustainable businesses of 2025. Their innovations in renewable energy are making a global impact.",
      details:
        "Founded in 2018 by engineering and business alumni, GreenTech introduced solar panel technology that cut costs by 20%. Recently, the company secured $10 million in funding, expanding into Asia and Africa. Their success inspires sustainability-focused entrepreneurs worldwide.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Global Alumni Conference 2025",
      description:
        "The Global Alumni Conference will bring together alumni leaders, innovators, and entrepreneurs. Scheduled for October in London, the event emphasizes global collaboration.",
      details:
        "The theme, ‘Building Bridges Across Borders,’ highlights global cooperation in education, research, and business. The event will include panel discussions, networking sessions, and an Alumni Awards ceremony honoring outstanding global contributions.",
      image:
        "https://images.unsplash.com/photo-1515165562835-c3b8c8df3a87?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "New Mentorship Program Launched",
      description:
        "A mentorship initiative pairs experienced alumni with students for career guidance, internships, and networking. Over 300 alumni have already joined as mentors.",
      details:
        "The program includes one-on-one guidance, career workshops, and virtual meetups. Mentors come from industries including tech, finance, healthcare, and the arts. Students benefit from resume reviews, interview prep, and insider career advice.",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Campus Innovation Hub Opens",
      description:
        "A new Innovation Hub offers co-working spaces, labs, and funding for alumni and student entrepreneurs. It will host hackathons, pitch competitions, and accelerator programs.",
      details:
        "The hub includes advanced labs for AI, robotics, and clean energy. Alumni entrepreneurs provide mentorship and resources, ensuring students gain real-world startup experience.",
      image:
        "https://images.unsplash.com/photo-1581090700227-4c4f50b1d83f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Distinguished Alumni Honored",
      description:
        "At the annual awards ceremony, five distinguished alumni were honored for achievements in medicine, technology, and social impact. Their stories inspire students worldwide.",
      details:
        "This year’s honorees include a cancer researcher, a Forbes 30 Under 30 entrepreneur, and a humanitarian recognized for refugee relief. Their journeys highlight alumni excellence and leadership across industries.",
      image:
        "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Section header */}
      <div className="text-center mb-16">
  <h2 className="mt-10 text-4xl font-bold text-gray-900">Alumni News</h2>
  <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
    Stay connected with the latest updates, success stories, and milestones
    from our alumni community.
  </p>
</div>

      {/* News items */}
      <div className="space-y-16">
        {news.map((item, index) => (
          <div
            key={index}
            className="bg-white border-2 border-[#BBDCE5] shadow-lg shadow-[#BBDCE5]/50 rounded-xl overflow-hidden p-6 md:p-10"
          >
            <div
              className={`flex flex-col md:flex-row items-center gap-10 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="md:w-1/3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-lg border-2 border-[#BBDCE5] shadow-md shadow-[#BBDCE5]/50 w-full h-56 object-cover"
                />
              </div>

              {/* Text */}
              <div className="md:w-2/3">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-4 text-gray-600">{item.description}</p>

                {expandedIndex === index && (
                  <p className="mt-4 text-gray-700">{item.details}</p>
                )}

                <button
                  onClick={() => toggleExpand(index)}
                  className="mt-6 inline-block px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  {expandedIndex === index ? "Show Less" : "Read More"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
