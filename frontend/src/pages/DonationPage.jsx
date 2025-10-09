import React from "react";
import Donations from "../component/Donations";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function DonationPage() {
  return (
    <div>
      <Navbar />

      <section>
        <Donations />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
