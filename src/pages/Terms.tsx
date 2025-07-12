import { motion, useInView } from "framer-motion";
import { ArrowLeft, FileText, AlertTriangle, Scale, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Terms = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, threshold: 0.3 });
  const contentInView = useInView(contentRef, { once: true, threshold: 0.1 });

  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        "By accessing SideQuestAI, you agree to these Terms of Service",
        "These terms constitute a legally binding agreement",
        "If you don't agree, please don't use our services",
        "We may update these terms; continued use means acceptance",
        "You must be 18+ or have parental consent to use our service",
      ],
    },
    {
      icon: Users,
      title: "User Responsibilities",
      content: [
        "Provide accurate and truthful information",
        "Maintain the security of your account credentials",
        "Use the service for lawful purposes only",
        "Respect intellectual property rights",
        "Don't share inappropriate or harmful content",
      ],
    },
    {
      icon: Scale,
      title: "AI-Generated Content",
      content: [
        "AI content is provided as guidance, not professional advice",
        "Results may vary; success is not guaranteed",
        "Verify important information independently",
        "We're not liable for decisions based on AI suggestions",
        "Content quality improves with more detailed inputs",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Limitations & Disclaimers",
      content: [
        "Service provided 'as is' without warranties",
        "We're not responsible for business outcomes",
        "Internet connectivity required for full functionality",
        "Features may change or be discontinued",
        "Third-party integrations subject to their terms",
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
            backgroundSize: "45px 45px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "45px 45px"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${16 + i * 3} h-${16 + i * 3} bg-white/${4 - i} rounded-full blur-xl`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${25 + i * 10}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-8, 8, -8],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 7 + i,
              repeat: Infinity,
              delay: i * 0.8,
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
                to="/privacy"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Privacy Policy
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
              Terms of Service
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 mb-4"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Please read these terms carefully before using SideQuestAI. They
              govern your use of our platform and services.
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
              <h2 className="text-2xl font-bold mb-4">
                Payment & Subscriptions
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>• Subscriptions renew automatically unless cancelled</p>
                <p>• Payment processed through secure third-party providers</p>
                <p>• Cancellation takes effect at the end of billing period</p>
                <p>• Refunds subject to our refund policy</p>
                <p>• Price changes will be communicated in advance</p>
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
              <h2 className="text-2xl font-bold mb-4">Termination</h2>
              <div className="text-gray-300 space-y-3">
                <p>• Either party may terminate this agreement</p>
                <p>• We may suspend access for violations</p>
                <p>• Your data will be deleted after account closure</p>
                <p>• Some provisions survive termination</p>
                <p>
                  • No refund for unused subscription time upon termination for
                  cause
                </p>
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
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="text-gray-300">
                <p className="mb-2">
                  Questions about these Terms of Service? Contact us:
                </p>
                <p>Email: sidequestaiofficial@gmail.com</p>
                <p>We'll respond within 48 hours to address your concerns.</p>
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

export default Terms;
