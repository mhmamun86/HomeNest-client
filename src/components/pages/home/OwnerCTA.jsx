import React from 'react';
import { FaUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OwnerCTA = () => {
  return (
    <section className="py-20 bg-primary/90" data-aos="zoom-in">
      <div className="container mx-auto max-w-5xl text-center relative overflow-hidden rounded-xl">
        <img
          src="https://www.outboundengine.com/wp-content/uploads/american-banking-buy-210617.jpg"
          alt="Property"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />

        <div className="p-8 md:p-12 rounded-xl shadow-2xl backdrop-blur-sm bg-secondary/40">
          <div className="flex justify-center mb-4">
            <FaUpload className="w-12 h-12 text-white bg-white/10 p-2 rounded-full" />
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Own a Property? List it on HomeNest.
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Reach thousands of verified buyers and renters instantly. Our
            dedicated platform ensures maximum visibility and the best returns
            on your investment.
          </p>

          <Link className="btn btn-primary btn-lg font-semibold transition duration-300 transform hover:scale-[1.03] shadow-lg">
            List Your Property Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OwnerCTA;
