import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Clock,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Refund = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, threshold: 0.3 });
  const contentInView = useInView(contentRef, { once: true, threshold: 0.1 });

  const sections = [
    {
      icon: Clock,
      title: "7-Day Money-Back Guarantee",
      content: [
        "Full refund available within 7 days of subscription start",
        "No questions asked for cancellations in first week",
        "Refund processed to original payment method",
        "Processing time: 3-5 business days",
        "Must be first-time subscriber to plan",
      ],
    },
    {
      icon: CreditCard,
      title: "Refund Process",
      content: [
        "Email sidequestaiofficial@gmail.com with refund request",
        "Include account email and reason (optional)",
        "We'll confirm eligibility within 24 hours",
        "Refund initiated immediately upon approval",
        "Account access continues until current period ends",
      ],
    },
    {
      icon: AlertCircle,
      title: "Non-Refundable Situations",
      content: [
        "Subscriptions older than 7 days",
        "Accounts banned for terms violations",
        "Multiple refund requests (one per customer)",
        "Gift subscriptions (unless recipient requests)",
        "Partial month refunds for cancellations",
      ],
    },
    {
      icon: MessageCircle,
      title: "Before Requesting Refund",
      content: [
        "Contact support for technical issues first",
        "Try switching to a lower-tier plan",
        "Check if features meet your expectations",
        "Consider pausing subscription instead",
        "Review our FAQ for common questions",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${24 + i * 6} h-${24 + i * 6} bg-white/${3 - i} rounded-full blur-xl`}
            style={{
              left: `${25 + i * 20}%`,
              top: `${30 + i * 15}%`,
            }}
            animate={{
              y: [-25, 25, -25],
              x: [-12, 12, -12],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 9 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="border-b border-gray-800/30 bg-black/80 backdrop-blur-xl relative z-10"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.div>
              <motion.span
                className="text-xl font-bold text-white"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255,255,255,0.5)",
                    "0 0 40px rgba(255,255,255,0.8)",
                    "0 0 20px rgba(255,255,255,0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                SideQuestAI
              </motion.span>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/terms"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
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
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{
                background: "linear-gradient(45deg, #fff, #888, #fff)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Refund Policy
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 mb-4"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              We stand behind our product. If SideQuestAI isn't right for you,
              we offer a simple refund process.
            </motion.p>
            <motion.p variants={itemVariants} className="text-sm text-gray-400">
              Last updated: December 2024
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
                className="p-8 rounded-lg transition-all duration-300 border border-gray-800/30"
              >
                <div className="flex items-center mb-6">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4"
                  >
                    <section.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * itemIndex }}
                      whileHover={{ x: 5 }}
                      className="flex items-start text-gray-300"
                    >
                      <span className="mr-3 mt-2 w-1 h-1 bg-white rounded-full flex-shrink-0"></span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Additional Information */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
              className="p-8 rounded-lg transition-all duration-300 border border-gray-800/30"
            >
              <h2 className="text-2xl font-bold mb-4">Free Plan Alternative</h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  Before requesting a refund, consider our Free plan which
                  includes:
                </p>
                <p>• 5,000 AI tokens to test the platform</p>
                <p>• Create 1 complete course</p>
                <p>• Access to community features</p>
                <p>• Basic milestone generation</p>
                <p>• No time limit or expiration</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
              className="p-8 rounded-lg transition-all duration-300 border border-gray-800/30 bg-gradient-to-r from-white/5 to-transparent"
            >
              <h2 className="text-2xl font-bold mb-4">Request a Refund</h2>
              <div className="text-gray-300 space-y-4">
                <p>Ready to request a refund? Here's what to do:</p>
                <div className="bg-black/30 p-4 rounded-lg">
                  <p className="font-medium mb-2">Email Template:</p>
                  <p className="text-sm font-mono">
                    To: sidequestaiofficial@gmail.com
                    <br />
                    Subject: Refund Request
                    <br />
                    <br />
                    Hi,
                    <br />
                    <br />
                    I'd like to request a refund for my SideQuestAI
                    subscription.
                    <br />
                    Account email: [your-email]
                    <br />
                    Reason (optional): [your-reason]
                    <br />
                    <br />
                    Thank you
                  </p>
                </div>
                <p className="text-sm text-gray-400">
                  We typically respond within 24 hours and process approved
                  refunds immediately.
                </p>
              </div>
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
          <motion.div
            className="text-center text-gray-400"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p>&copy; 2024 SideQuestAI. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Refund;
