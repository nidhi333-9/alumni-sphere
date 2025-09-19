import React from "react";
import { Link } from "react-router-dom";
export default function HeroSection() {
  return (
<div className="bg-blue-50 py-16 mt-10">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    {/* Section Title */}
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Upcoming Events
      </h2>
    </div>

        {/* Tabs (Latest Events / All Events) */}
        <div className="mt-4 flex gap-4">
          <button className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition">
            Latest Events
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-xl shadow hover:bg-gray-300 transition">
            All Events
          </button>
        </div>

        {/* Blog Articles Row-wise */}
        <div className="mt-10 space-y-12">
          {/* Blog 1 */}
          <Link to={"/events"}>
          <article className="flex flex-col lg:flex-row items-start gap-6">
            <div className="w-full lg:w-1/4">
              <img
                src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?auto=format&fit=crop&w=800&q=80"
                alt="Boost your conversion rate"
                className="rounded-xl object-cover w-full h-40"
              />
            </div>
            <div className="w-full lg:w-2/3">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <time dateTime="2020-03-16">Mar 16, 2020</time>
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Online Meet
                </a>
              </div>
              <h3 className="mt-2 text-2xl font-semibold leading-7 text-gray-900">
                <a href="#"> Join Alumni Virtual Meet</a>
              </h3>
              <p className="mt-2 text-gray-600">
                Illo sint voluptas. Error voluptates culpa eligendi. Hic vel
                totam vitae illo. Non aliquid explicabo necessitatibus unde.
              </p>
              {/* Register Button */}

<Link
  to={`/register?event=Alumni Virtual Meet`}
  className="mt-4 inline-block px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
>
  Register
</Link>

            </div>
          </article>
          </Link>
          {/* Blog 2 */}
          <article className="flex flex-col lg:flex-row items-start gap-6">
            <div className="w-full lg:w-1/4">
              <img
                src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?auto=format&fit=crop&w=800&q=80"
                alt="How to use SEO"
                className="rounded-xl object-cover w-full h-40"
              />
            </div>
            <div className="w-full lg:w-2/3">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <time dateTime="2020-03-10">Mar 10, 2020</time>
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Reunion
                </a>
              </div>
              <h3 className="mt-2 text-2xl font-semibold leading-7 text-gray-900">
                <a href="#">Get Ready for Alumni Reunion</a>
              </h3>
              <p className="mt-2 text-gray-600">
                Optio sit exercitation et ex ullamco aliquid explicabo. Dolore
                do ut officia anim non ad eu. Magna laboris incididunt commodo
                elit ipsum.
              </p>
              {/* Register Button */}

<Link
  to={`/register?event=Alumni Virtual Meet`}
  className="mt-4 inline-block px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
>
  Register
</Link>

            </div>
          </article>

          {/* Blog 3 */}
          <article className="flex flex-col lg:flex-row items-start gap-6">
            <div className="w-full lg:w-1/4">
              <img
                src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80"
                alt="Improve customer experience"
                className="rounded-xl object-cover w-full h-40"
              />
            </div>
            <div className="w-full lg:w-2/3">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <time dateTime="2020-02-12">Feb 12, 2020</time>
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Student-Alumni Talk
                </a>
              </div>
              <h3 className="mt-2 text-2xl font-semibold leading-7 text-gray-900">
                <a href="#">Get a chance to talk to your Alumni</a>
              </h3>
              <p className="mt-2 text-gray-600">
                Dolore commodo in nulla do nulla esse consectetur. Adipisicing
                voluptate velit sint adipisicing ex duis elit deserunt sint
                ipsum.
              </p>
              {/* Register Button */}

<Link
  to={`/register?event=Alumni Virtual Meet`}
  className="mt-4 inline-block px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
>
  Register
</Link>

            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
