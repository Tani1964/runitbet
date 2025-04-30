import React from 'react';

const Features = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications tailored to your business needs. We specialize in responsive design, e-commerce solutions, and content management systems."
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android. We create intuitive, high-performance apps that engage your users and drive business growth."
    },
    {
      title: "Enterprise Custom Software",
      description: "Scalable, secure enterprise solutions designed for your specific workflow. Our enterprise software streamlines operations, improves efficiency, and provides valuable business insights."
    }
  ];

  return (
    <section className="py-12 bg-[#E5F0FE]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What We Do at Runit Technologies</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We build innovative digital solutions that help businesses transform and grow in today's competitive landscape.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;