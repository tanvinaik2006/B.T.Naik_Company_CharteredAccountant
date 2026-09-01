import { services } from '@/data/services';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };
  
  return {
    title: `${service.title} | B.T. Naik & Company`,
    description: service.shortDescription,
  };
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-bg-secondary min-h-screen py-16 route-transition">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="bg-white rounded-[3px] border border-border-gray overflow-hidden">
            {/* Header */}
            <div className="bg-navy-primary px-8 py-10 sm:px-12 border-b border-navy-ink">
              <h1 className="text-3xl font-serif font-semibold text-neon-pastel">{service.title}</h1>
            </div>
            
            {/* Content */}
            <div className="px-8 py-10 sm:px-12">
              <div className="prose prose-slate max-w-none text-text-body">
                <p className="text-lg leading-relaxed text-text-body font-light mb-10">
                  {service.shortDescription}
                </p>

                <h2 className="text-xl font-serif text-navy-ink mb-4 border-b border-border-gray pb-2">Scope of Services</h2>
                <ul className="list-disc pl-5 mb-10 space-y-3 text-text-body text-sm">
                  {service.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h2 className="text-xl font-serif text-navy-ink mb-4 border-b border-border-gray pb-2">Regulatory References</h2>
                <ul className="list-disc pl-5 mb-12 space-y-3 text-text-body text-sm">
                  {service.regulatoryReferences.map((ref) => (
                    <li key={ref}>{ref}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-bg-secondary p-8 rounded-[3px] border border-border-gray flex flex-col sm:flex-row items-center justify-between mt-10 gap-4">
                <p className="text-text-body font-medium text-sm text-center sm:text-left">
                  Require professional assistance with {service.title}?
                </p>
                <Link 
                  href="/contact" 
                  className="bg-navy-primary text-white px-6 py-2.5 rounded-[3px] text-xs font-semibold hover:bg-navy-ink transition-colors btn-press whitespace-nowrap border border-navy-primary"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
