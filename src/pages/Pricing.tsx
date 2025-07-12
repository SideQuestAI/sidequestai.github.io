import { motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Rocket, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const Pricing = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, threshold: 0.3 });
  const plansInView = useInView(plansRef, { once: true, threshold: 0.1 });
  const faqInView = useInView(faqRef, { once: true, threshold: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out SideQuestAI",
      features: [
        "5,000 AI tokens (one-time only)",
        "Create 1 complete course",
        "Basic milestone tracking",
        "Community access",
        "Email support",
      ],
      limitations: ["Limited to 1 course creation"],
      popular: false,
      cta: "Get Started Free",
      icon: Star,
      gradient: "from-white/10 to-white/5",
    },
    {
      name: "Essential",
      price: "$14.99",
      period: "/month",
      description: "Great for individual entrepreneurs",
      features: [
        "50,000 AI tokens per month",
        "Create up to 5 courses",
        "Advanced milestone tracking",
        "Course regeneration",
      ],
      limitations: [],
      popular: false,
      cta: "Start Essential",
      icon: Rocket,
      gradient: "from-white/15 to-white/5",
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "/month",
      description: "Perfect for growing businesses",
      features: [
        "100,000 AI tokens per month",
        "Unlimited course creation",
        "Advanced analytics",
        "Live chat support",
        "Export to PDF/Word",
        "Priority email support",
        "Progress analytics",
      ],
      limitations: [],
      popular: true,
      cta: "Upgrade to Pro",
      icon: Crown,
      gradient: "from-white/20 to-white/5",
    },
    {
      name: "Ultimate",
      price: "$24.99",
      period: "/month",
      description: "For serious entrepreneurs and teams",
      features: [
        "Unlimited tokens per month",
        "Everything in Pro",
        "Priority feature requests",
        "Premium support",
        "Early access to new features",
        "Custom Mentor options",
        "Advanced reporting tools",
      ],
      limitations: [],
      popular: false,
      cta: "Go Ultimate",
      icon: Crown,
      gradient: "from-white/25 to-white/5",
    },
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and you'll be charged prorated amounts.",
    },
    {
      question: "What are AI tokens?",
      answer:
        "AI tokens are used to generate course content, milestones, and get AI assistance. One token typically generates 1-2 paragraphs of content or completes one AI action.",
    },
    {
      question: "Do I need technical skills?",
      answer:
        "Not at all! SideQuestAI is designed for everyone. Our AI guides you through each step, making it easy to start your side hustle regardless of your technical background.",
    },
    {
      question: "What happens when I run out of tokens?",
      answer:
        "When you reach your token limit, you can either upgrade your plan for more tokens or wait until your next billing cycle for token renewal (except Free plan).",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period. Please note that we do not offer refunds for partial periods.",
    },
  ];

  const handlePlanSelect = (planName: string) => {
    if (planName === "Free") {
      window.location.href = "/download";
    } else {
      alert(`Selected ${planName} plan. This would redirect to payment.`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: shouldReduceMotion
      ? {}
      : {
          scale: 1.02,
          y: -5,
          transition: {
            duration: 0.2,
            ease: "easeOut",
          },
        },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Subtle Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-gray-800/30 bg-black/80 backdrop-blur-xl relative z-10"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-xl font-bold text-white">
                  SideQuestAI
                </span>
              </motion.div>
            </Link>
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-gray-600 hover:bg-white/10"
              >
                <Link to="/download">Get Started</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Header */}
      <section ref={headerRef} className="py-12 sm:py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              Choose Your{" "}
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 mb-8"
            >
              Start your side hustle journey today. Upgrade or downgrade at any
              time.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Pricing Plans */}
      <section ref={plansRef} className="pb-16 sm:pb-24 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={plansInView ? "visible" : "hidden"}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div
            className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
            id="free"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="relative"
              >
                <Card
                  className={`relative bg-gradient-to-br ${plan.gradient} border-gray-800/50 ${
                    plan.popular
                      ? "ring-2 ring-white/30 scale-105"
                      : "hover:border-gray-600/50"
                  } transition-all duration-300 h-full overflow-hidden backdrop-blur-sm`}
                >
                  {plan.popular && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-black">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </motion.div>
                  )}

                  <CardHeader className="text-center pb-6 relative z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <plan.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl">
                      {plan.name}
                    </CardTitle>
                    <div className="text-3xl font-bold text-white">
                      {plan.price}
                      <span className="text-lg text-gray-400 font-normal">
                        {plan.period}
                      </span>
                    </div>
                    <CardDescription className="text-gray-300">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 relative z-10">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * featureIndex }}
                          whileHover={shouldReduceMotion ? {} : { x: 5 }}
                          className="flex items-center space-x-3"
                        >
                          <Check className="w-5 h-5 text-white flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {plan.limitations.length > 0 && (
                      <div className="border-t border-gray-700/50 pt-4">
                        <p className="text-gray-400 text-xs mb-2">
                          Limitations:
                        </p>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <li
                              key={limitIndex}
                              className="text-gray-400 text-xs flex items-center space-x-2"
                            >
                              <span className="w-1 h-1 bg-gray-400 rounded-full" />
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    >
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-white text-black hover:bg-gray-200"
                            : "bg-gray-800 hover:bg-gray-700 text-white"
                        }`}
                        onClick={() => handlePlanSelect(plan.name)}
                      >
                        {plan.cta}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section
        ref={faqRef}
        className="py-16 border-t border-gray-800/30 relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={faqInView ? "visible" : "hidden"}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl mx-auto">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-center mb-12"
            >
              Frequently Asked Questions
            </motion.h2>
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          backgroundColor: "rgba(255,255,255,0.05)",
                        }
                  }
                  className="p-6 rounded-lg transition-all duration-300 border border-gray-800/30"
                >
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Side Quest?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of entrepreneurs building successful side
              businesses.
            </p>
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <Button
                size="lg"
                asChild
                className="bg-white text-black hover:bg-gray-200"
              >
                <Link to="/download">Get Started Free</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="border-t border-gray-800/30 py-8 relative z-10"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 SideQuestAI. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Pricing;
