import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function SupportPage() {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "How do I find a professional on Pro Pool?",
      answer: "Use our search feature to browse professionals by category, location, and rating. You can filter results to find the perfect match for your needs."
    },
    {
      question: "How do I book a professional?",
      answer: "Once you've found a professional you like, click on their profile and use the 'Call Now' or 'WhatsApp' button to get in touch with them directly."
    },
    {
      question: "Are professionals on Pro Pool verified?",
      answer: "Yes! All professionals on our platform go through a verification process to ensure quality and trustworthiness. We check credentials and reviews carefully."
    },
    {
      question: "How do I become a professional on Pro Pool?",
      answer: "Click 'Join as Professional' on the signup page and follow our registration process. You'll need to provide your details, qualifications, and undergo verification."
    },
    {
      question: "Can I leave reviews for professionals?",
      answer: "Absolutely! After using a professional's services, you can leave a detailed review and rating to help other clients make informed decisions."
    },
    {
      question: "How is my personal information protected?",
      answer: "We use industry-standard security measures to protect your data. Read our Privacy Policy for more details about how we handle your information."
    },
    {
      question: "What if I have an issue with a professional?",
      answer: "Contact our support team immediately with details of the issue. We'll investigate and help resolve the problem to ensure you have a great experience."
    },
    {
      question: "Can I save professionals to my favorites?",
      answer: "Yes! Click the heart icon on any professional's profile to save them to your favorites for quick access later."
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-electric-blue to-blue-600 text-white py-16 px-4">
        <div className="container-max">
          <button 
            onClick={() => navigate(-1)}
            className="mb-4 text-white/80 hover:text-white transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-white/90 text-lg">We're here to help. Find answers to your questions.</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-max py-16 px-4">
        {/* Contact Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-charcoal mb-12 text-center">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-8 bg-gray-50 rounded-xl text-center">
              <div className="w-16 h-16 bg-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.608.786c.58 2.05 2.304 4.27 4.353 5.353l.788-1.607a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Call Us</h3>
              <p className="text-text-secondary mb-4">Monday - Friday, 9 AM - 6 PM</p>
              <a href="tel:+2340000000000" className="text-electric-blue font-semibold hover:text-blue-700">
                +234 (0) 000 000 0000
              </a>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl text-center">
              <div className="w-16 h-16 bg-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Email Us</h3>
              <p className="text-text-secondary mb-4">We reply within 24 hours</p>
              <a href="mailto:support@propools.ng" className="text-electric-blue font-semibold hover:text-blue-700">
                support@propools.ng
              </a>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl text-center">
              <div className="w-16 h-16 bg-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-2">Live Chat</h3>
              <p className="text-text-secondary mb-4">Available during business hours</p>
              <button 
                onClick={() => alert('Live chat would open here')}
                className="text-electric-blue font-semibold hover:text-blue-700"
              >
                Start Chatting
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-charcoal mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 flex justify-between items-center hover:bg-gray-50 transition-colors group"
                >
                  <h3 className="text-lg font-semibold text-charcoal text-left">{faq.question}</h3>
                  <svg 
                    className={`w-6 h-6 text-electric-blue transition-transform duration-300 flex-shrink-0 ml-4 ${openFAQ === index ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {openFAQ === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Additional Help */}
        <section className="bg-blue-50 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-charcoal mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Our support team is ready to help. Reach out to us and we'll get back to you as quickly as possible.
          </p>
          <Button 
            size="md"
            onClick={() => window.location.href = 'mailto:support@propools.ng'}
          >
            Contact Support
          </Button>
        </section>
      </div>
    </div>
  );
}
