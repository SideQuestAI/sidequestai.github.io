import { motion, useInView } from "framer-motion";
import { ArrowLeft, Shield, Eye, Lock, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Privacy = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, threshold: 0.3 });
  const contentInView = useInView(contentRef, { once: true, threshold: 0.1 });

  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        "Account information (email, name, profile details)",
        "Usage data and analytics to improve our services",
        "Payment information (processed securely by third parties)",
        "Course content and progress data",
        "Device and browser information for optimization",
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Provide and improve SideQuestAI services",
        "Generate personalized AI-powered course content",
        "Process payments and manage subscriptions",
        "Send important updates and notifications",
        "Analyze usage patterns to enhance user experience",
      ],
    },
    {
      icon: Lock,
      title: "Data Protection & Security",
      content: [
        "All data is encrypted in transit and at rest",
        "We use industry-standard security measures",
        "Regular security audits and compliance checks",
        "Limited access to personal data by authorized personnel only",
        "Secure data centers with 24/7 monitoring",
      ],
    },
    {
      icon: Database,
      title: "Data Sharing & Third Parties",
      content: [
        "We never sell your personal information",
        "Limited sharing with trusted service providers",
        "Payment processors for subscription management",
        "Analytics providers for service improvement",
        "Legal compliance when required by law",
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
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${20 + i * 4} h-${20 + i * 4} bg-white/${3 - i} rounded-full blur-xl`}
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.2,
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
                to="/download"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Download App
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
              Privacy Policy
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 mb-4"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information.
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

            {/* Additional Sections */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
              className="p-8 rounded-lg transition-all duration-300 border border-gray-800/30"
            >
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <div className="text-gray-300 space-y-3">
                <p>• Access and review your personal data</p>
                <p>• Request corrections to inaccurate information</p>
                <p>• Delete your account and associated data</p>
                <p>• Export your data in a portable format</p>
                <p>• Opt-out of marketing communications</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
              className="p-8 rounded-lg transition-all duration-300 border border-gray-800/30"
            >
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="text-gray-300">
                <p className="mb-2">
                  If you have questions about this Privacy Policy, contact us:
                </p>
                <p>Email: sidequestaiofficial@gmail.com</p>
                <p>We'll respond within 48 hours.</p>
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

export default Privacy;
