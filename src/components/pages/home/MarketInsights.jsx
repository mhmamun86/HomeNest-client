import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import { FaHouseChimney } from 'react-icons/fa6';

const MarketInsights = () => {
  const stats = [
    {
      label: 'Median Price Growth',
      value: '+8.5%',
      color: 'text-success',
      desc: 'Year-over-year increase in property values in key metro areas.',
    },
    {
      label: 'Rental Occupancy',
      value: '98%',
      color: 'text-primary',
      desc: 'Record high occupancy rate indicates strong demand for rentals.',
    },
    {
      label: 'New Listings',
      value: '1,200+',
      color: 'text-secondary',
      desc: 'New properties added to the HomeNest platform this week.',
    },
  ];

  return (
    <section className="py-16 bg-base-100" data-aos="fade-up">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="lg:flex lg:items-center lg:space-x-12">
          <div className="lg:w-5/12 mb-8 lg:mb-0">
            <div className="flex items-center text-primary mb-3">
              <FaChartLine className="w-6 h-6 mr-2" />
              <span className="text-lg font-semibold uppercase">
                Data & Trends
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
              Current <span className="text-primary">Market Insights</span>
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Stay ahead of the curve with our live market data. Whether you're
              buying or investing, understanding the latest trends is key to
              making a successful move.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <FaHouseChimney className="w-5 h-5 mr-2 text-primary" /> Expert
                analysis updated daily.
              </li>
              <li className="flex items-center">
                <FaHouseChimney className="w-5 h-5 mr-2 text-primary" /> Future
                forecasting reports available.
              </li>
            </ul>
          </div>
          <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-base-200 p-6 rounded-lg shadow-xl border-t-4 border-primary/50"
              >
                <p className="text-sm font-medium text-gray-500 uppercase mb-1">
                  {stat.label}
                </p>
                <p className={`text-4xl font-extrabold ${stat.color} mb-3`}>
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;
