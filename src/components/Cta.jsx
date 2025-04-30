import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Cta = () => {
  const form = useRef();
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  const [formData, setFormData] = useState({
    from_name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, error: false, message: 'Sending...' });

    // Add to_name parameter programmatically
    const templateParams = {
      to_name: "Runit Technologies",  // Set your company name here
      from_name: formData.from_name,
      message: formData.message,
      email: formData.email  // Include email even though it's not in template
    };

    emailjs.send(
      'service_pxhqcbr',
      'template_nrigepr',
      templateParams,
      '0XZAePKRCGd5H4oZ6'
    )
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setFormStatus({
          submitted: true,
          error: false,
          message: 'Thank you! We\'ll get back to you within 24 hours.'
        });
        // Reset form fields
        setFormData({ from_name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text);
        setFormStatus({
          submitted: false,
          error: true,
          message: 'Failed to send your request. Please try again later.'
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#E5F0FE] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Main CTA Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 lg:p-16">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Custom Software Solutions for Your Business</h1>
              <p className="text-lg text-gray-600 mb-8">We build tailored software that solves your unique business challenges and drives measurable growth.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-500 font-bold text-xl">✓</div>
                  <p className="ml-3 text-gray-600">Agile development methodology</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-500 font-bold text-xl">✓</div>
                  <p className="ml-3 text-gray-600">Dedicated project manager</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-blue-500 font-bold text-xl">✓</div>
                  <p className="ml-3 text-gray-600">Post-launch support & maintenance</p>
                </div>
              </div>
              
              <button className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 shadow-md hover:shadow-lg">
                Schedule a Consultation
              </button>
            </div>
            
            <div className="md:w-1/2 bg-blue-600 p-8 md:p-12 lg:p-16 text-white">
              <h2 className="text-2xl font-bold mb-6">Request a Free Project Estimate</h2>
              
              {formStatus.submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                  <p>{formStatus.message}</p>
                </div>
              ) : (
                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  {formStatus.message && (
                    <div className={`${formStatus.error ? 'bg-blue-100 text-blue-700 border-blue-400' : 'bg-blue-100 text-blue-700 border-blue-400'} border px-4 py-3 rounded relative mb-4`}>
                      <p>{formStatus.message}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="from_name"
                      value={formData.from_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="project">Project Description</label>
                    <textarea
                      id="project"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="Tell us about your project"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300"
                    disabled={formStatus.submitted}
                  >
                    {formStatus.submitted ? 'Sending...' : 'Get Your Free Estimate'}
                  </button>
                </form>
              )}
              <p className="mt-4 text-sm text-purple-200">We'll get back to you within 24 hours with a detailed proposal.</p>
            </div>
          </div>
        </div>
        
        {/* Testimonials Section */}
        {/* <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Clients' Success Stories</h2>
          <p className="text-gray-600">Hear from businesses we've helped transform with custom software</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-blue-500 text-xl mb-4">★★★★★</div>
            <p className="text-gray-600 mb-6">"Their team developed a custom inventory management system that eliminated our manual processes and reduced errors by 95%. The ROI has been remarkable."</p>
            <div className="font-medium">Sarah Johnson</div>
            <div className="text-sm text-gray-500">COO, LogisticsPro</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-blue-500 text-xl mb-4">★★★★★</div>
            <p className="text-gray-600 mb-6">"The mobile app they built for our field technicians has streamlined our service delivery and improved customer satisfaction scores by 40%."</p>
            <div className="font-medium">Michael Chen</div>
            <div className="text-sm text-gray-500">CTO, ServiceTech</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-blue-500 text-xl mb-4">★★★★★</div>
            <p className="text-gray-600 mb-6">"They helped us migrate our legacy systems to a modern cloud architecture. The new platform is scalable, secure, and has cut our operational costs significantly."</p>
            <div className="font-medium">Lisa Rodriguez</div>
            <div className="text-sm text-gray-500">IT Director, EnterpriseX</div>
          </div>
        </div> */}
        
        {/* Our Services Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Our Software Development Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Web Applications</h3>
              <p className="text-gray-600">Tailor-made solutions that align perfectly with your business processes and goals.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile App Development</h3>
              <p className="text-gray-600">Native and cross-platform apps for iOS and Android that deliver exceptional user experiences.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise Software</h3>
              <p className="text-gray-600">Robust, scalable solutions for complex business needs and large-scale operations.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cloud Migration</h3>
              <p className="text-gray-600">Secure and efficient transition of your existing systems to modern cloud architecture.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">API Development</h3>
              <p className="text-gray-600">Connect your software ecosystem with reliable, well-documented APIs.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Maintenance & Support</h3>
              <p className="text-gray-600">Ongoing care for your software to ensure optimal performance and security.</p>
            </div>
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to transform your business with custom software?</h2>
          <p className="text-gray-600 mb-8">Let's discuss how we can help you achieve your goals</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href='#contact' className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300 shadow-md hover:shadow-lg">
              Get Started
            </a>
            <a href='#portfolio' className="px-8 py-3 bg-white border border-blue-600 text-blue-600 font-medium rounded-lg transition duration-300 hover:bg-purple-50">
              View Our Portfolio
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Cta;