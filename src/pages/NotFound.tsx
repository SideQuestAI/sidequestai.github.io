import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingVariants = {
    animate: {
      y: [-30, 30, -30],
      x: [-15, 15, -15],
      rotate: [0, 180, 360],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const glitchVariants = {
    animate: {
      x: [0, -5, 5, 0],
      textShadow: [
        "0 0 0 rgba(255,255,255,0)",
        "2px 2px 0 rgba(255,255,255,0.3)",
        "-2px -2px 0 rgba(255,255,255,0.3)",
        "0 0 0 rgba(255,255,255,0)",
      ],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Multiple floating elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${4 + i} h-${4 + i} bg-white/${8 - i} rounded-full blur-xl`}
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + i * 7}%`,
            }}
            variants={floatingVariants}
            animate="animate"
            transition={{
              delay: i * 0.5,
              duration: 6 + i * 0.5,
              repeat: Infinity,
            }}
          />
        ))}

        {/* Sparkle effects */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Mouse follower */}
      <motion.div
        className="fixed w-8 h-8 bg-white/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto px-4 relative z-10"
      >
        {/* 404 Number */}
        <motion.div
          variants={glitchVariants}
          animate="animate"
          className="mb-8"
        >
          <motion.h1
            className="text-8xl sm:text-9xl font-bold mb-4"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              textShadow: [
                "0 0 30px rgba(255,255,255,0.5)",
                "0 0 60px rgba(255,255,255,0.8)",
                "0 0 90px rgba(255,255,255,1)",
                "0 0 60px rgba(255,255,255,0.8)",
                "0 0 30px rgba(255,255,255,0.5)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              background:
                "linear-gradient(45deg, #fff, #888, #fff, #ccc, #fff)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Animated Icons */}
        <div className="flex justify-center space-x-8 mb-8">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center"
          >
            <Search className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1,
            }}
            className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 2,
            }}
            className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center"
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        {/* Error Message */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-4"
          animate={{
            textShadow: [
              "0 0 20px rgba(255,255,255,0.5)",
              "0 0 40px rgba(255,255,255,0.8)",
              "0 0 20px rgba(255,255,255,0.5)",
            ],
          }}
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-gray-300 mb-8"
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
        >
          The page you're looking for doesn't exist. It might have been moved,
          deleted, or you entered the wrong URL.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255,255,255,0.3)",
              rotate: [0, -1, 1, 0],
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto bg-white text-black hover:bg-gray-200"
            >
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              borderColor: "rgba(255,255,255,1)",
              boxShadow: "0 0 30px rgba(255,255,255,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, 5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto border-gray-600 hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </motion.div>
        </motion.div>

        {/* Additional Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm"
        >
          {[
            { to: "/pricing", label: "Pricing" },
            { to: "/download", label: "Download" },
            { to: "/privacy", label: "Privacy" },
            { to: "/terms", label: "Terms" },
          ].map((link, index) => (
            <motion.div
              key={link.to}
              whileHover={{
                scale: 1.1,
                textShadow: "0 0 8px rgba(255,255,255,0.8)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.to}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-10 left-10"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      >
        <div className="w-20 h-20 border border-white/20 rounded-full"></div>
      </motion.div>

      <motion.div
        className="absolute top-20 right-20"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      >
        <div className="w-16 h-16 border border-white/20 rounded-lg"></div>
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10"
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <div className="w-6 h-6 bg-white/20 rounded-full"></div>
      </motion.div>
    </div>
  );
};

export default NotFound;
