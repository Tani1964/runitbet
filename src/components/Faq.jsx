import { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-peach-200 py-4">
      <button 
        className="flex w-full justify-between items-center text-left font-medium text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className="text-peach-700 text-xl font-bold">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  const faqData = [
    {
      question: "How do I place an order?",
      answer: "You can place an order by selecting your desired products, adding them to your cart, and proceeding to checkout. Follow the prompts to enter your shipping information and payment details to complete your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are secure and encrypted to protect your information."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) is available for an additional fee. International shipping times vary by location, generally taking 7-14 business days."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be in original condition with tags attached. To initiate a return, please contact our customer service team or visit the 'Returns' section in your account."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary based on location. Import duties and taxes may apply and are the responsibility of the customer."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also log into your account on our website to view your order status and tracking details."
    }
  ];

  return (
    <div className="min-h-screen bg-peach-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-peach-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600">Find answers to our most commonly asked questions. If you can't find what you're looking for, please contact our support team.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {faqData.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
        
        <div className="text-center">
          <p className="mb-4">Still have questions?</p>
          <button className="bg-peach-700 hover:bg-peach-800 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faq;