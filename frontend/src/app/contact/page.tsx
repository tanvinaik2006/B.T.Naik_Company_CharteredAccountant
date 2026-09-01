import { Metadata } from 'next';
import ContactForm from './ContactForm';
import ScrollReveal from '@/components/ScrollReveal';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Contact Us | B.T. Naik & Company',
  description: 'Get in touch with B.T. Naik & Company for professional accountancy services.',
};

export default function ContactPage() {
  return (
    <div className="bg-bg-secondary min-h-screen py-16 route-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <ScrollReveal>
            <h1 className="text-4xl font-serif font-semibold text-navy-ink">Contact Us</h1>
            <p className="mt-4 max-w-2xl text-base text-text-muted mx-auto">
              Reach out to us for professional inquiries or to schedule a consultation.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form Section */}
          <ScrollReveal>
            <div className="bg-white rounded-[3px] border border-border-gray p-8">
              <h2 className="text-xl font-serif font-semibold text-navy-ink mb-6">Send an Inquiry</h2>
              <ContactForm />
            </div>
          </ScrollReveal>

          {/* Office Details Section */}
          <div className="flex flex-col space-y-8">
            <ScrollReveal delay={80}>
              <div className="bg-white rounded-[3px] border border-border-gray p-8">
                <h2 className="text-xl font-serif font-semibold text-navy-ink mb-6">Office Details</h2>
                <ul className="space-y-6 text-text-body">
                  <li className="flex items-start">
                    <FaMapMarkerAlt className="flex-shrink-0 w-4 h-4 text-text-muted mt-0.5" />
                    <div className="ml-4">
                      <p className="text-xs font-semibold text-navy-ink">Main Office</p>
                      <p className="mt-1 text-xs text-text-body leading-relaxed">123 Commerce Avenue, Business District<br/>Mumbai, Maharashtra <span className="num-ledger">400001</span>, India</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaPhone className="flex-shrink-0 w-4 h-4 text-text-muted mt-0.5" />
                    <div className="ml-4">
                      <p className="text-xs font-semibold text-navy-ink">Phone</p>
                      <p className="mt-1 text-xs text-text-body num-ledger">+91 (123) 456-7890</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaEnvelope className="flex-shrink-0 w-4 h-4 text-text-muted mt-0.5" />
                    <div className="ml-4">
                      <p className="text-xs font-semibold text-navy-ink">Email</p>
                      <p className="mt-1 text-xs text-text-body">contact@btnaik.com</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaClock className="flex-shrink-0 w-4 h-4 text-text-muted mt-0.5" />
                    <div className="ml-4">
                      <p className="text-xs font-semibold text-navy-ink">Working Hours</p>
                      <p className="mt-1 text-xs text-text-body leading-relaxed">Monday - Friday: <span className="num-ledger">10:00 AM - 6:00 PM</span><br/>Saturday: <span className="num-ledger">10:00 AM - 2:00 PM</span></p>
                    </div>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Embedded Map */}
            <ScrollReveal delay={160}>
              <div className="bg-bg-secondary rounded-[3px] overflow-hidden h-64 border border-border-gray relative">
                <iframe
                  title="Office Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12000!2d72.82!3d18.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU3JzM2LjAiTiA3MsKwNDknMTIuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </div>
  );
}
