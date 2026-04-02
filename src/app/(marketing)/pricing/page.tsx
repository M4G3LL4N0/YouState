import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Designed for Every Stage  
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Choose the plan that matches where you are today - and where you're going.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard 
            title="Foundation"
            price="$0"
            description="Core insights and daily awareness"
            features={[
              'Basic state tracking',
              'Daily recommendations',
              'Notifications',
              '7 days history'
            ]}
            cta="Get Started"
          />
          
          <PricingCard 
            title="Professional"
            price="$24"
            period="/month"
            description="Complete adaptive optimization"
            accent
            features={[
              'Advanced state modeling',
              'Adaptive recommendations',
              'Rich integrations',
              'Unlimited history',
              'Priority support'
            ]}
            cta="Start Trial"
          />
          
          <PricingCard 
            title="Performance"
            price="$99"
            period="/month"
            description="Elite human optimization"
            features={[
              'Everything in Pro',
              'Quarterly expert review',
              'Dedicated coach',
              'Custom integrations',
              'White-glove setup'
            ]}
            cta="Contact Sales"
          />
        </div>
      </div>
    </div>
  );
}

function PricingCard({
  title,
  price,
  period = '',
  description,
  features,
  cta,
  accent = false
}: {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  accent?: boolean;
}) {
  return (
    <Card className={`
      ${accent ? 'border-zinc-700' : 'border-zinc-800'}
      hover:border-zinc-600 transition-colors h-full
    `}>
      <div className="p-8 h-full flex flex-col">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <div className="text-4xl font-bold mb-2">
          {price}
          {period && (
            <span className="text-base font-normal text-zinc-500">
              {period}
            </span>
          )}
        </div>
        <p className="text-zinc-400 mb-6">{description}</p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature) => (
            <li key={feature} className="flex items-start">
              <span className="mr-2 mt-0.5 text-emerald-500">✓</span>
              <span className="text-sm text-zinc-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          variant={accent ? 'default' : 'secondary'}
          size="lg"
          className="mt-auto"
        >
          {cta}
        </Button>
      </div>
    </Card>
  );
}
