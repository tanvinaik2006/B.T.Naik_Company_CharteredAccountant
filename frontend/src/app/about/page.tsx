import { team } from '@/data/team';
import { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'About Us | B.T. Naik & Company',
  description: 'Learn about B.T. Naik & Company and our team of professional Chartered Accountants.',
};

export default function AboutPage() {
  return (
    <div className="bg-bg-secondary min-h-screen py-16 route-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Firm Overview */}
        <ScrollReveal>
          <div className="bg-white rounded-[3px] border border-border-gray overflow-hidden mb-12">
            <div className="bg-navy-primary px-8 py-10 sm:px-12 border-b border-navy-ink">
              <h1 className="text-3xl font-serif font-semibold text-neon-pastel">About the Firm</h1>
            </div>
            <div className="px-8 py-10 sm:px-12 text-text-body leading-relaxed text-sm space-y-4">
              <p className="text-base text-text-body font-light leading-relaxed">
                B.T. Naik & Company is a Chartered Accountant firm providing assurance, taxation, and advisory services.
              </p>
              <p className="text-base text-text-body font-light leading-relaxed">
                Our practice is built on professional ethics and regulatory compliance. We deliver structured solutions to organizations and individuals under the Companies Act, Income Tax Act, and GST Act.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Team Section */}
        <ScrollReveal delay={80}>
          <div className="bg-white rounded-[3px] border border-border-gray overflow-hidden">
            <div className="bg-bg-secondary px-8 py-6 border-b border-border-gray">
              <h2 className="text-xl font-serif font-semibold text-navy-ink">Our Team</h2>
            </div>
            <div className="px-8 py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {team.map((member) => (
                  <div key={member.id} className="card-ledger p-6 flex flex-col">
                    <div className="w-12 h-12 bg-navy-primary rounded-[3px] mb-4 flex items-center justify-center text-neon-pastel font-serif font-bold text-lg border border-navy-ink">
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-navy-ink mb-1">{member.name}</h3>
                    <p className="text-xs font-semibold text-navy-primary mb-4 uppercase tracking-wider">{member.qualification}</p>
                    
                    <div className="space-y-2 text-xs text-text-muted mt-auto pt-4 border-t border-border-gray">
                      <p>
                        <span className="font-semibold text-navy-ink">Experience:</span> <span className="num-ledger">{member.experienceYears} Years</span>
                      </p>
                      <p>
                        <span className="font-semibold text-navy-ink">Specialization:</span> {member.specialization}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
