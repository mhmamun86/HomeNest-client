import React from 'react';
import { FaStar, FaLock } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import Heading from '../../common/Heading';

const serviceData = [
  {
    icon: FaStar,
    title: 'Curated Listings',
    description:
      'We verify every property, ensuring you only see the highest quality homes and investments available.',
  },
  {
    icon: FaLock,
    title: 'Secure & Transparent',
    description:
      'Our platform uses cutting-edge security and provides transparent data to ensure peace of mind during your search.',
  },
  {
    icon: FaMessage,
    title: 'Expert Local Support',
    description:
      'Access our network of local real estate experts ready to guide you through every step of the buying or renting process.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-base-200" data-aos="fade-up">
      <div className="container mx-auto px-4 max-w-7xl">
        <Heading
          title={'Why Choose'}
          highlight={'HomeNest?'}
          subtitle={
            'We combine advanced technology with human expertise to make finding or selling your property simpler, faster, and more reliable.'
          }
        ></Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {serviceData.map((service, index) => (
            <div
              key={index}
              className="text-center p-6 bg-[#FAF9F6] rounded-xl shadow-lg border border-primary/20 transition-all duration-300 hover:shadow-2xl"
              data-aos="zoom-in"
              data-aos-delay={index * 150 + 100}
            >
              <div className="flex justify-center mb-4">
                <service.icon className="w-12 h-12 text-primary p-2 bg-accent/50 rounded-full" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-3">
                {service.title}
              </h3>
              <p className="text-gray-700 text-base">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
