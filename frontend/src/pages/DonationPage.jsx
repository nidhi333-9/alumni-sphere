import React from "react";
import Donations from "../components/donations/Donations";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

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
