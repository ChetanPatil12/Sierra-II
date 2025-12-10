import React, { useState } from 'react';
import { QuizModal } from './components/QuizModal';
import { CheckIcon, XIcon, BarChart } from './components/Icons';

type ViewState = 'landing' | 'booking';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const openQuiz = () => setIsQuizOpen(true);
  const closeQuiz = () => setIsQuizOpen(false);
  
  const navigateToBooking = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('booking');
  };

  const navigateToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('landing');
  };

  if (view === 'booking') {
    return <BookingPage onBack={navigateToHome} />;
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Quiz Modal */}
      <QuizModal isOpen={isQuizOpen} onClose={closeQuiz} />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 py-20 text-center max-w-6xl mx-auto">
        {/* Geometric Accents */}
        <div className="absolute top-20 right-[10%] w-24 h-24 border border-[#F2C94C] rounded-full opacity-20 hidden md:block" />
        <div className="absolute bottom-20 left-[5%] w-16 h-16 border border-[#EB5757] rotate-45 opacity-20 hidden md:block" />

        <div className="z-10 fade-in-up">
          <h1 className="text-4xl md:text-[64px] font-bold leading-tight mb-8">
            We Build the <span className="text-[#F2C94C]">Complete Revenue System</span> Your B2B SaaS Needs to Grow <span className="text-[#F2C94C]">Predictably</span>
          </h1>
          
          <p className="text-[#D2D2D2] text-lg md:text-[21px] max-w-3xl mx-auto leading-relaxed mb-10">
            Built Specifically for Teams at $5K-$50K MRR Who Want Predictable Pipelines, Not Wasted Marketing Budgets
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <button onClick={navigateToBooking} className="bg-[#F2C94C] text-[#0E0E0E] text-lg font-bold py-4 px-12 rounded hover:-translate-y-1 hover:shadow-lg hover:shadow-[#F2C94C]/20 transition-all">
              Book a 30 Minute Discovery Call
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: PAIN */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Does this sound familiar?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <PainCard 
            title="You wake up and immediately check Stripe, hoping someone signed up while you slept"
            points={[
              "Another day checking if the business is still alive",
              "You refresh your dashboard three times before breakfast",
              "Most days there's nothing",
              "You have no idea what next month looks like",
              "The anxiety is eating you alive"
            ]}
          />
          <PainCard 
            title="You've been stuck at roughly the same MRR for six months despite trying everything"
            subsections={[
              { label: "You tried outbound:", points: ["Cold email got your domain blacklisted", "LinkedIn automation got banned", "Facebook ads: clicks but 0 conversions"] },
              { label: "You tried agencies:", points: ["Spent $15K on an agency that sent pretty reports but brought no customers"] }
            ]}
            emphasis="Nothing stuck. You're starting to wonder if this business is actually going to work."
          />
          <PainCard 
            title="Every customer came from someone you knew personally and you have no idea how to get the next ten"
            subsections={[
               { label: "Your current customers:", points: ["People from your old company", "Co-founder's network", "That one guy from Twitter"] },
               { label: "Your outbound results:", points: ["Sent 500 cold emails", "Two people replied", "Zero booked calls"] }
            ]}
            emphasis="Your network is tapped out. Growth has stopped completely."
          />
          <PainCard 
             title="You're burning through cash on tools and experiments while your co-founder is getting nervous"
             subsections={[
                { label: "Monthly burn on failed tactics:", points: ["Another $300 on cold email tool", "Another $500 on ads", "Software budget is $2K, getting nothing"] },
                { label: "Internal tension:", points: ["Co-founder asks what the plan is", "You don't have an answer", "Meetings are getting tense"] }
             ]}
          />
        </div>

        <div className="flex justify-center mb-20">
             <button onClick={navigateToBooking} className="bg-[#1A1A1A] border border-[#F2C94C] text-[#F2C94C] py-3 px-8 rounded hover:bg-[#F2C94C] hover:text-[#0E0E0E] transition-all font-semibold">
                Book a Strategy Call
             </button>
        </div>
      </section>

      {/* SECTION 3: BELIEF DECONSTRUCTION */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-[#1A1A1A] border-2 border-[#F2C94C] p-8 md:p-16 rounded-lg text-center relative">
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#F2C94C] rotate-45" />
          <h2 className="text-3xl md:text-4xl font-bold mb-8">"The tactics aren't broken. Your approach is."</h2>
          <ul className="text-lg text-[#D2D2D2] space-y-4 mb-8">
            <li>Cold email used to work three years ago but deliverability dropped 35% since then.</li>
            <li>You're buying disconnected tactics instead of building systems that connect.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 4: LEAD QUALITY (NEW) */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            The problem isn’t that you’re not getting leads.
        </h2>
        <p className="text-xl md:text-2xl text-[#D2D2D2] mb-12">
            The problem is the <span className="text-white font-bold">kind of leads you’re getting.</span>
        </p>
        
        <ul className="space-y-6 text-lg md:text-xl text-[#D2D2D2] mb-12 inline-block text-left">
            <li className="flex gap-3">
                <span className="text-[#EB5757]">•</span>
                They book demos just to “learn about the product.”
            </li>
            <li className="flex gap-3">
                <span className="text-[#EB5757]">•</span>
                They ask, “So… what does your tool actually do?”
            </li>
            <li className="flex gap-3">
                <span className="text-[#EB5757]">•</span>
                They say, “Let me think about it,” and then disappear.
            </li>
        </ul>

        <p className="text-xl md:text-2xl font-bold text-white max-w-3xl mx-auto leading-relaxed">
            We rebuild your acquisition system so the right people show up pre-sold, your demos convert at 20%+
        </p>
      </section>

      {/* SECTION 5: TRANSITION HEADLINE */}
      <section className="pt-24 pb-8 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white">Here's how we can help</h2>
      </section>

      {/* SECTION 6: THE SOLUTION */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
          Revenue Machine Builder: The Complete System for $5K–$50K MRR SaaS Teams
        </h2>

        <div className="space-y-12 relative">
           <div className="absolute left-[39px] top-8 bottom-8 w-[2px] border-l-2 border-dotted border-[#E5E5E5]/20 hidden md:block"></div>

           <SolutionStep 
             number="1"
             title="We find exactly who will pay for your product"
             transformation="You get 50-100 qualified leads in your pipeline by day 60"
             phases={[
                { label: "Week 1-2: Deep customer research", items: ["Analyze sales calls", "Interview customers", "Define exact ICP"] },
                { label: "Week 3-4: Build outreach that gets responses", items: ["Write sequences using customer language", "Design LinkedIn campaigns", "Warm up domains"] }
             ]}
           />
           <SolutionStep 
             number="2"
             title="We build your complete conversion system"
             transformation="Your demo booking rate goes from 5% to 20-30%"
             phases={[
                { label: "Offer design & packaging", items: ["Structure $3K-$10K offer", "Create pricing tiers", "Design qualifying questions"] },
                { label: "Landing pages & sequences", items: ["High converting LPs", "21-day nurture sequences", "Reminder sequences"] }
             ]}
           />
           <SolutionStep 
             number="3"
             title="We set up tracking so you double down on what works"
             transformation="You know within 48 hours when something stops working"
             phases={[
                { label: "Full attribution setup", items: ["CRM tracking", "GA4 conversion tracking", "Campaign tagging"] },
                { label: "Dashboard & reporting", items: ["Custom dashboards (CAC, LTV, Close rate)", "Bottleneck analysis"] }
             ]}
           />
        </div>

        <div className="text-center mt-16">
          <button onClick={navigateToBooking} className="border border-[#D2D2D2] text-[#D2D2D2] py-3 px-8 rounded hover:border-white hover:text-white transition-all">
            See how we'd approach your situation →
          </button>
        </div>
      </section>

      {/* SECTION 7: COMPARISON */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full border border-[#E5E5E5]/15 text-left collapse">
            <thead>
              <tr className="bg-[#1A1A1A]">
                <th className="p-6 text-white border-b border-[#E5E5E5]/15 w-1/2">Random Tactics</th>
                <th className="p-6 text-white border-b border-[#E5E5E5]/15 w-1/2">Complete System</th>
              </tr>
            </thead>
            <tbody className="text-[#D2D2D2]">
              <ComparisonRow 
                bad="Try one channel for 30 days, switch if it doesn't work"
                good="Build 5 systems that work together and compound"
              />
              <ComparisonRow 
                bad="No idea which activity actually drives revenue"
                good="Complete attribution showing exactly what works"
              />
              <ComparisonRow 
                bad="Generic outreach that gets ignored or blacklisted"
                good="Custom messaging based on actual customer research"
              />
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section id="booking" className="py-32 px-6 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1A1A1A] rounded-full blur-3xl -z-10 opacity-50" />
        
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Stop hoping. Start building.</h2>
          <p className="text-xl text-[#D2D2D2] mb-12">
            Most SaaS teams stay stuck at $5K-$50K for years. Break through by building the system that scales.
          </p>
          
          <div className="flex flex-col items-center gap-6">
             <button onClick={navigateToBooking} className="bg-[#F2C94C] text-[#0E0E0E] text-xl font-bold py-6 px-16 rounded shadow-lg hover:-translate-y-1 transition-transform">
               Book a 30 Minute Discovery Call
             </button>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">FAQ</h2>
        <div className="space-y-4">
          <FAQItem 
            q="I've been burned by agencies before. How is this actually different?"
            a={`Most agencies sell you generic templates that worked for someone else's market. They deliver reports, run campaigns for 3 months, then disappear when nothing works.

We don't do that.

We start with deep customer research specific to YOUR market:
• Analyze your existing sales calls to extract buying patterns
• Interview your current customers to understand why they actually bought
• Study your competitors' positioning and customers
• Define your exact ICP (not "small businesses" but "Series A SaaS CTOs with 15-50 employees")

Everything we build—outreach messaging, landing pages, sales scripts, tracking—is custom to your customers and your market. No templates. No copy-paste.

If you've worked with agencies that sent monthly reports while your MRR stayed flat, this is completely different. We build the machine. You own it. And we don't stop until it's producing qualified leads.`}
          />
          <FAQItem 
            q="This sounds expensive. I'm bootstrapped and can't afford another $15K gamble."
            a={`You've already spent $15K-$40K on tactics that didn't work:
• Cold email tools that got you blacklisted
• LinkedIn automation that got banned
• Agencies that sent pretty reports
• Ad campaigns that got clicks but zero customers

This costs roughly the same as what you've already spent, but instead of random tactics, you get five complete systems that actually connect and compound.

Plus you stop wasting $2K/month on disconnected tools that don't deliver.

The real cost isn't the investment—it's staying stuck at $5K-$50K MRR for another year while burning runway.

We work in 90-day sprints. You see first leads in your pipeline by day 60, not month 10 of a year-long engagement.`}
          />
          <FAQItem 
            q="How long does this actually take? I need customers in the next 60-90 days, not 6 months from now."
            a={`First qualified leads in pipeline: Day 60
System improvements visible: Week 3
Full system operational: 90 days

We work in rapid 90-day sprints because you need results fast. This isn't a year-long engagement where nothing happens for months.

Here's the timeline:
Week 1-2: Customer research and ICP definition
Week 3-4: Build outreach campaigns and launch
Week 5-8: Landing pages, offer design, conversion infrastructure
Week 9-12: Full tracking setup, optimization cycles

You don't wait until "everything is perfect" to see results. We launch and iterate. First leads start flowing by month 2 while we're still building the complete system.`}
          />
          <FAQItem 
            q="I'm a technical founder who doesn't know sales or marketing. Will I have to learn all this?"
            a={`No. That's exactly who this is built for.

You don't need to become a marketer. You don't need to learn copywriting or ad strategy or funnel psychology.

We handle:
• Customer research and interviews
• Writing all outreach sequences
• Building landing pages and offers
• Setting up tracking and dashboards
• Creating sales scripts and enablement materials

You handle:
• Approving the strategy we recommend
• Showing up for demos (we'll give you the script)
• Providing product expertise when needed

We're not teaching you "how to do marketing." We're building your revenue machine so you can focus on product while predictable customer acquisition runs in the background.`}
          />
          <FAQItem 
            q="What if I don't have product-market fit yet? Will this even work?"
            a={`If you have 5+ paying customers who came from anywhere (even just your network), that's enough signal to work with.

Here's why: Those 5 customers tell us everything we need:
• Why did they buy from you specifically?
• What pain were they trying to solve?
• What almost stopped them from buying?
• What language do they use to describe their problem?

We analyze those customers, find more people exactly like them, and build systematic outreach to reach them.

If you have zero customers or only 1-2, you need customer development first—not a growth system. We're not the right fit yet. Come back when you have 5+ paying customers.`}
          />
          <FAQItem 
            q="How do I know this will work for MY specific market? Every SaaS is different."
            a={`You're right—every market is different. That's exactly why we don't use templates.

We spend the first 2 weeks doing deep research into YOUR specific customers:
• What pain points do THEY care about (not generic "efficiency")
• What language do THEY use (exact phrases from sales calls)
• What alternatives have THEY already tried and why did those fail
• What objections do THEY have before buying

Then we build outreach, messaging, and offers using that research.

Example: We don't write "Save time with automation." We write "Stop spending 3 hours every Monday manually updating forecasts in 5 different spreadsheets."

That level of specificity only comes from researching YOUR market. It's why our messaging works while generic agency copy gets ignored.`}
          />
          <FAQItem 
            q="We're already doing outbound and getting some demos. Why do we need this?"
            a={`If outbound is working, that's great. But you've probably noticed:
• You can't scale beyond your team's manual capacity
• Response rates are inconsistent (some weeks are great, others are dead)
• You have no idea which messages or angles actually work
• There's no tracking to show which activities drive closed revenue

This system doesn't replace outbound—it systematizes and scales what's already working:
• We figure out exactly why your outbound works (through customer research)
• We test 3-5 different angles to find the best one
• We set up tracking so you know which campaigns drive actual customers
• We build the full conversion infrastructure (landing pages, nurture sequences, sales enablement)

Now instead of manually sending 50 emails a day, you have a machine that generates 50-100 qualified leads per month while you sleep. Outbound becomes predictable instead of random.`}
          />
          <FAQItem 
            q="What happens if we build all this and it doesn't work? Do I just lose my money?"
            a={`We don't disappear if results don't hit immediately.

If we move forward together and you're following the process (showing up for demos, implementing what we build), we stay involved until the system is producing qualified leads.

Here's what that means practically:
• If messaging isn't resonating, we rewrite it based on new customer research
• If landing pages aren't converting, we redesign them
• If one channel isn't working, we test others
• If tracking shows bottlenecks, we fix them

We're building a system, not running a 3-month campaign and hoping. Systems need iteration. We don't charge extra to make those iterations.

The goal isn't to bill you for 90 days and disappear. It's to build something that actually produces customers.`}
          />
          <FAQItem 
            q="Can't I just hire a marketer or agency to do this cheaper?"
            a={`You can try. Here's what usually happens:

Hire a marketer ($80K-$120K/year):
• They're good at 1-2 things (maybe ads, maybe content)
• They don't have experience building complete systems
• It takes 3-6 months to realize they can't do what you need
• You're now 6 months behind and $40K-$60K poorer

Hire a typical agency ($5K-$10K/month):
• They run ads to your existing landing page (which doesn't convert)
• They send monthly reports showing "impressions" and "clicks"
• They blame your product when no customers come in
• After 3 months you cancel and have nothing to show for it

Revenue Machine Builder:
• Complete system: research, outreach, conversion, sales, tracking
• Built by someone who's done this for 20+ SaaS companies
• 90-day timeline with clear milestones
• You own everything at the end (scripts, pages, tracking, SOPs)

The real question isn't cost. It's: What's the cost of staying stuck for another 6-12 months?`}
          />
          <FAQItem 
            q="Do you guarantee specific results like '10 new customers in 90 days'?"
            a={`No, we don't guarantee specific customer numbers. Here's why that's actually a red flag when others do:

Anyone promising "X customers in Y days" is either:
• Lying to get you to sign
• Working with much larger companies where they control the outcome
• About to deliver garbage leads just to hit a number

What we do guarantee:
• 50-100 qualified leads in your pipeline by day 60 (qualified = matches your ICP, has the problem you solve, can afford your solution)
• Complete tracking system showing exactly where leads come from and which activities drive revenue
• Full conversion infrastructure (landing pages converting at 20-30%, email sequences, sales scripts)
• We stay involved until the system is producing consistent qualified leads

Whether those leads close depends on your product, pricing, and sales execution. We can't control that. But we make sure high-quality people are entering your pipeline every week instead of hoping someone stumbles across you.`}
          />
          <FAQItem 
            q="I tried cold email and got blacklisted. I tried LinkedIn and got banned. Will this just get us in trouble again?"
            a={`You got blacklisted and banned because you were using automation tools incorrectly—probably:
• Sending mass emails without proper warmup
• Using spammy templates
• Not segmenting your lists
• Running aggressive automation that platforms flag

We do this completely differently:

Cold email:
• Proper domain warmup (4-6 weeks before sending volume)
• Personalized messaging based on research
• Small batches, not mass blasts
• Compliance with CAN-SPAM and deliverability best practices

LinkedIn:
• No automation tools that get accounts banned
• Manual outreach at scale (we set up the system, your team executes)
• Messages that don't sound like spam
• Connection requests with actual personalization

Paid ads (if needed):
• No risk of getting blacklisted
• Platform-compliant campaigns
• Retargeting for warm audiences

The difference is we're not using "growth hacks" that platforms punish. We're doing real outreach that respects platform rules and actually gets responses.`}
          />
          <FAQItem 
            q="What if we need to change our pricing or pivot the product later? Do we start over?"
            a={`No. The system is modular by design.

Once we build your foundation (customer research, positioning, conversion infrastructure, tracking), you can adapt it:

If pricing changes:
• We update offer framing and landing pages
• Sales scripts get adjusted
• Messaging shifts to reflect new positioning

If the product pivots:
• We run new customer research
• We rewrite positioning based on the new value prop
• We adjust targeting and outreach angles

If your ICP shifts:
• We recalibrate targeting
• We update messaging to speak to the new audience
• We test new outreach channels

You don't rebuild from scratch. You evolve a proven foundation. That's why this compounds over time instead of breaking when variables shift.`}
          />
          <FAQItem 
            q="How much of my time does this require? I'm already stretched thin running the company."
            a={`First 2 weeks (Research phase): 3-4 hours total
• 1-2 customer interview calls (we run them, you listen)
• 1 strategy session to review findings
• Email responses for clarifications

Weeks 3-12 (Build phase): 2-3 hours per week
• Weekly check-in calls (30-45 min)
• Review and approve messaging/offers we create
• Provide feedback on landing pages

After month 3 (Optimization): 1-2 hours per week
• Review weekly reports
• Approve new campaign tests
• Show up for demos (this increases as leads come in)

You're not building this yourself. We're building it. You're providing input and approval. The most time-intensive part for you is actually showing up for the demos we book—which is exactly what you want.`}
          />
          <FAQItem 
            q="Do we own everything you build, or do you take it with you if we stop working together?"
            a={`You own 100% of everything:
• All outreach sequences and messaging
• Landing pages and conversion assets
• Sales scripts and enablement materials
• VSL scripts (if we create video)
• Tracking dashboards and attribution setup
• CRM workflows and automation
• Complete SOPs for running the system

If you decide to take it in-house after 90 days, your team has everything they need to continue. Nothing is locked behind proprietary tools or platforms we control.

This isn't a rental. It's yours. We build your revenue machine. You own it. You can run it yourself, hire someone to run it, or keep us involved—your choice.`}
          />
          <FAQItem 
            q="We sell to enterprise clients with 6-12 month sales cycles. Will this work for long sales cycles?"
            a={`Yes, but the approach is different than for SMB/mid-market deals.

For enterprise SaaS with long cycles, the system focuses on:

Early-stage pipeline filling:
• Multi-threading outreach (targeting multiple stakeholders)
• Content that builds credibility over time
• Nurture sequences designed for 6-12 month cycles
• Thought leadership positioning

Qualification before demos:
• Pre-qualifying questions to filter serious buyers
• Educational content that self-selects right-fit prospects
• Sales enablement to handle complex buying committees

Attribution over the full cycle:
• Tracking first touch through closed deal (6-12 months later)
• Pipeline value metrics, not just lead count
• Content consumption analysis to see what moves deals forward

The tactics change for longer cycles, but the core system (research → outreach → conversion → tracking) still applies. We just adapt the timeline and touchpoints.`}
          />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 text-center text-[#666] border-t border-[#333]">
        <p>© 2024 Revenue Machine Builder. All rights reserved.</p>
      </footer>
    </div>
  );
}

function BookingPage({ onBack }: { onBack: () => void }) {
  const openCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: 'https://calendly.com/beetlejuice3925/one-on-on-w-ayan'
      });
    } else {
      console.warn("Calendly not loaded yet");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center max-w-3xl mx-auto relative animate-in">
        {/* Same background effect */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <button onClick={onBack} className="absolute top-8 left-8 text-[#666] hover:text-white flex items-center gap-2 transition-colors">
            ← Back
        </button>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Let's do this….</h1>
        <p className="text-xl md:text-2xl text-[#F2C94C] font-semibold mb-12 italic">but full transparency first</p>

        <div className="space-y-6 text-lg md:text-xl text-[#D2D2D2] leading-relaxed text-left max-w-2xl mx-auto">
            <p>
                We're <span className="underline decoration-[#F2C94C]/60 underline-offset-4">still building the product</span>. Which means this call is different.
            </p>
            
            <p>
                <span className="underline decoration-[#F2C94C]/60 underline-offset-4 text-white">I'll share the complete revenue system framework we're building: the exact structure for predictable SaaS growth.</span>
            </p>

            <p className="text-[#F2C94C] italic">
                You can take it and run with it yourself. For free.
            </p>
            
            <p className="italic">
                I'll help you figure out what's actually broken in your setup right now — your positioning, your outbound, your conversion, whatever the real bottleneck is.
            </p>
            
            <p className="font-bold text-white text-2xl">
                You get a clear strategy session + the framework.
            </p>

            <p className="underline decoration-[#F2C94C]/60 underline-offset-4 text-white font-semibold">
                Fair trade?
            </p>
        </div>

        <div className="mt-12">
            <button 
                onClick={openCalendly}
                className="bg-[#F2C94C] text-[#0E0E0E] text-xl font-bold py-6 px-12 rounded shadow-[0_0_20px_rgba(242,201,76,0.3)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(242,201,76,0.5)] transition-all"
            >
                Schedule time with me
            </button>
        </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function PainCard({ title, points, subsections, emphasis }: { title: string, points?: string[], subsections?: {label:string, points:string[]}[], emphasis?: string }) {
  return (
    <div className="bg-[#1A1A1A] border border-[#E5E5E5]/10 p-8 rounded-lg hover:-translate-y-2 transition-transform duration-300 hover:border-[#E5E5E5]/25">
      <h3 className="text-xl font-bold mb-6 text-white">{title}</h3>
      {points && (
        <ul className="space-y-3 mb-6">
          {points.map((p, i) => <li key={i} className="text-[#D2D2D2] text-sm md:text-base flex gap-2"><span className="text-[#666]">•</span> {p}</li>)}
        </ul>
      )}
      {subsections && subsections.map((sub, i) => (
        <div key={i} className="mb-6">
          <p className="text-[#F2C94C] text-xs font-bold uppercase tracking-wider mb-2">{sub.label}</p>
          <ul className="space-y-2">
            {sub.points.map((p, j) => <li key={j} className="text-[#D2D2D2] text-sm md:text-base flex gap-2"><span className="text-[#666]">•</span> {p}</li>)}
          </ul>
        </div>
      ))}
      {emphasis && <p className="text-[#EB5757] italic font-medium mt-4">{emphasis}</p>}
    </div>
  )
}

function SolutionStep({ number, title, transformation, phases }: { number: string, title: string, transformation: string, phases: any[] }) {
  return (
    <div className="flex flex-col md:flex-row gap-8 relative z-10">
      <div className="flex-shrink-0">
        <div className="w-20 h-20 rounded-full bg-[#F2C94C] text-[#0E0E0E] text-4xl font-bold flex items-center justify-center border-4 border-[#0E0E0E]">
          {number}
        </div>
      </div>
      <div className="bg-[#1A1A1A] border border-[#E5E5E5]/10 p-8 rounded-lg flex-grow">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-[#EB5757] italic mb-8">{transformation}</p>
        
        <div className="grid md:grid-cols-2 gap-8">
           {phases.map((phase, i) => (
             <div key={i}>
                <p className="text-[#F2C94C] text-xs font-bold uppercase tracking-wider mb-3">{phase.label}</p>
                <ul className="space-y-2">
                   {phase.items.map((item: string, j: number) => (
                     <li key={j} className="text-[#D2D2D2] text-sm flex gap-2"><span className="text-[#444]">•</span> {item}</li>
                   ))}
                </ul>
             </div>
           ))}
        </div>
      </div>
    </div>
  )
}

function ComparisonRow({ bad, good }: { bad: string, good: string }) {
  return (
    <tr className="border-b border-[#E5E5E5]/10 hover:bg-[#1A1A1A]/50 transition-colors">
      <td className="p-6 align-top">
        <div className="flex gap-4">
          <span className="text-red-500 font-bold shrink-0"><XIcon /></span>
          <span className="text-[#D2D2D2]">{bad}</span>
        </div>
      </td>
      <td className="p-6 align-top bg-[#1A1A1A]/30">
        <div className="flex gap-4">
          <span className="text-green-500 font-bold shrink-0"><CheckIcon /></span>
          <span className="text-white">{good}</span>
        </div>
      </td>
    </tr>
  )
}

function FAQItem({ q, a }: { q: string, a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#333]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-6 flex justify-between items-center hover:text-[#F2C94C] transition-colors"
      >
        <span className="text-lg font-semibold pr-4">{q}</span>
        <span className="text-2xl flex-shrink-0">{isOpen ? '-' : '+'}</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="text-[#D2D2D2] leading-relaxed whitespace-pre-wrap">{a}</div>
      </div>
    </div>
  )
}

export default App;