import React, { useState } from 'react';

const Pricing = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isEligible, setIsEligible] = useState(true);
  const [location, setLocation] = useState('');
  const [showLocationInput, setShowLocationInput] = useState(false);
  
  const pricingPlans = [
    {
      name: "Starter",
      priceText: "Request Pricing",
      duration: "one-time",
      features: [
        "Basic website development",
        "Mobile responsive design",
        "Content management system",
        "3 pages included",
        "1 month of support"
      ],
      recommended: false
    },
    {
      name: "Business",
      priceText: "Request Pricing",
      duration: "one-time",
      features: [
        "Advanced website development",
        "Custom design system",
        "E-commerce integration",
        "10 pages included",
        "3 months of support",
        "SEO optimization"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      priceText: "Custom Quote",
      duration: "quote",
      features: [
        "Full-scale solutions",
        "Custom software development",
        "Dedicated project manager",
        "Unlimited revisions",
        "12 months of support",
        "24/7 priority assistance",
        "Performance monitoring"
      ],
      recommended: false
    }
  ];
  
  const eligibilityQuestions = [
    {
      question: "Do you have a budget for professional software development?",
      key: "budget"
    },
    {
      question: "Is your project timeline at least 3 weeks from start to finish?",
      key: "timeline"
    },
    {
      question: "Are you ready to start your project within the next 30 days?",
      key: "readiness"
    }
  ];
  
  const handleAnswer = (answer) => {
    if (!answer) {
      setIsEligible(false);
    }
    
    if (currentQuestion < eligibilityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const resetEligibilityCheck = () => {
    setCurrentQuestion(0);
    setShowResults(false);
    setIsEligible(true);
  };
  
  const handleLocationSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to get location-based pricing
    // For this example, we'll just acknowledge the location was submitted
    setShowLocationInput(false);
  };
  
  return (
    <section className="py-16 bg-[#E5F0FE]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Investment Plans</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your business needs. We offer tailored solutions based on your location and requirements.
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-md overflow-hidden ${plan.recommended ? 'ring-2 ring-blue-500 transform -translate-y-2' : ''}`}>
              {plan.recommended && (
                <div className="bg-blue-500 text-white py-1 text-center font-medium">
                  Recommended
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <button 
                    onClick={() => setShowLocationInput(true)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {plan.priceText}
                  </button>
                </div>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="#contact" 
                  className={`block w-full py-3 px-4 text-center rounded font-medium ${
                    plan.recommended 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {plan.duration === "quote" ? "Get a Quote" : "Get Started"}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Location Modal */}
        {showLocationInput && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Get Location-Based Pricing</h3>
              <p className="text-gray-600 mb-4">
                Please share your location so we can provide accurate pricing for your region.
              </p>
              <form onSubmit={handleLocationSubmit}>
                <div className="mb-4">
                  <label htmlFor="country" className="block text-gray-700 mb-2">Country</label>
                  <select 
                    id="country" 
                    className="w-full p-2 border border-gray-300 rounded"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  >
                    <option value="">Select a country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="EU">European Union</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={() => setShowLocationInput(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Get Pricing
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* CTA Section */}
        <div className="bg-blue-600 rounded-xl p-8 text-center text-white mb-16">
          <h3 className="text-2xl font-bold mb-4">Ready to transform your business?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your business goals with our custom technology solutions tailored to your region.
          </p>
          <a 
            href="#contact" 
            className="inline-block py-3 px-8 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Schedule a Free Consultation
          </a>
        </div>
        
        {/* Eligibility Checker */}
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Check Your Eligibility</h3>
          <p className="text-gray-600 mb-6 text-center">
            Answer a few questions to see if we're a good fit for your project.
          </p>
          
          {!showResults ? (
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-gray-800">
                {eligibilityQuestions[currentQuestion].question}
              </h4>
              <div className="flex space-x-4 justify-center">
                <button 
                  onClick={() => handleAnswer(true)}
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Yes
                </button>
                <button 
                  onClick={() => handleAnswer(false)}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  No
                </button>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {eligibilityQuestions.length}
                </span>
                {currentQuestion > 0 && (
                  <button 
                    onClick={resetEligibilityCheck}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Start Over
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              {isEligible ? (
                <>
                  <div className="text-green-600 flex justify-center mb-4">
                    <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    Great News! You're eligible to work with us.
                  </h4>
                  <p className="text-gray-600">
                    Your project seems like a good fit for our services.
                  </p>
                  <div className="pt-4">
                    <a 
                      href="#contact" 
                      className="inline-block py-3 px-8 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Let's Get Started
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-red-600 flex justify-center mb-4">
                    <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    Unfortunately, you're not eligible at this time.
                  </h4>
                  <p className="text-gray-600">
                    Based on your answers, your project requirements don't align with our current service offerings.
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={resetEligibilityCheck}
                      className="inline-block py-3 px-8 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;