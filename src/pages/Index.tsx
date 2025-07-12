import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  Target,
  Rocket,
  Download,
  Zap,
  Users,
  TrendingUp,
  Play,
  ChevronRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState, useMemo } from "react";
import { useAppRedirect } from "@/utils/app-redirect";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { redirectToApp } = useAppRedirect();

  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5], [1, 1.02]);

  const heroInView = useInView(heroRef, { once: true, threshold: 0.1 });
  const featuresInView = useInView(featuresRef, { once: true, threshold: 0.1 });
  const statsInView = useInView(statsRef, { once: true, threshold: 0.3 });
  const benefitsInView = useInView(benefitsRef, { once: true, threshold: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.3 });

  useEffect(() => {
    setIsLoaded(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stats = useMemo(
    () => [
      { label: "Active Users", value: "10,000+", icon: Users },
      { label: "Courses Created", value: "25,000+", icon: Target },
      { label: "Success Rate", value: "92%", icon: TrendingUp },
      { label: "Countries", value: "150+", icon: Brain },
    ],
    [],
  );

  const features = useMemo(
    () => [
      {
        icon: Brain,
        title: "AI-Powered Learning",
        description:
          "Get personalized course recommendations based on your interests and goals.",
      },
      {
        icon: Target,
        title: "Goal-Oriented Milestones",
        description:
          "Break down complex side hustles into achievable daily tasks.",
      },
      {
        icon: Rocket,
        title: "Launch Faster",
        description:
          "From idea to income in weeks, not months, with our proven frameworks.",
      },
      {
        icon: Zap,
        title: "Smart Automation",
        description:
          "Automate repetitive tasks and focus on what matters most.",
      },
      {
        icon: Users,
        title: "Community Support",
        description:
          "Connect with like-minded entrepreneurs on similar journeys.",
      },
      {
        icon: TrendingUp,
        title: "Track Progress",
        description:
          "Monitor your growth with detailed analytics and insights.",
      },
    ],
    [],
  );

  const benefits = useMemo(
    () => [
      "Step-by-step guided courses",
      "AI-generated milestones",
      "Progress tracking",
      "Community access",
      "24/7 support",
      "Mobile app included",
    ],
    [],
  );

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Try to redirect to app first
    const redirected = redirectToApp("/download", {
      fallbackUrl: "/download",
      timeout: 1500,
      showFallbackButton: true
    });
    
    // If not on mobile or redirect failed, go to download page
    if (!redirected) {
      window.location.href = "/download";
    }
  };

  // Optimized animation variants - keeping essential animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : isMobile ? 0.1 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : isMobile ? 20 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : isMobile ? 0.4 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : isMobile ? 30 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : isMobile ? 0.5 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: shouldReduceMotion
      ? {}
      : {
          scale: isMobile ? 1.01 : 1.02,
          y: isMobile ? -2 : -5,
          transition: {
            duration: 0.2,
            ease: "easeOut",
          },
        },
  };

  // Planter rising animation elements
  const PlanterElements = () => {
    if (shouldReduceMotion || isMobile) return null;

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Rising geometric shapes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`planter-${i}`}
            className="absolute"
            style={{
              left: `${5 + i * 8}%`,
              bottom: "-20px",
              width: `${20 + i * 2}px`,
              height: `${40 + i * 10}px`,
            }}
            initial={{ y: 100, opacity: 0, scaleY: 0 }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0, 0.6, 0.4, 0.6],
              scaleY: [0, 1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 0.5,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-full h-full bg-gradient-to-t from-white/10 to-white/5 rounded-t-full"
              style={{
                transformOrigin: "bottom",
              }}
            />
            {/* Branches */}
            {i % 3 === 0 && (
              <>
                <motion.div
                  className="absolute top-1/3 -left-2 w-4 h-1 bg-white/5 rounded-full"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scaleX: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  className="absolute top-1/2 -right-2 w-4 h-1 bg-white/5 rounded-full"
                  animate={{
                    rotate: [0, -10, 10, 0],
                    scaleX: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.2 + 1,
                    repeat: Infinity,
                  }}
                />
              </>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Optimized Background Grid */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)`,
          backgroundSize: isMobile ? "40px 40px" : "50px 50px",
          willChange: shouldReduceMotion ? "auto" : "background-position",
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                backgroundPosition: ["0px 0px", "50px 50px"],
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Planter Rising Background */}
      <AnimatePresence>{isLoaded && <PlanterElements />}</AnimatePresence>

      {/* Subtle Floating Elements */}
      {!shouldReduceMotion && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(isMobile ? 3 : 6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-${isMobile ? 12 + i * 3 : 16 + i * 4} h-${
                isMobile ? 12 + i * 3 : 16 + i * 4
              } bg-white/${Math.max(2, 5 - i)} rounded-full blur-xl`}
              style={{
                left: `${15 + i * (isMobile ? 25 : 15)}%`,
                top: `${20 + i * (isMobile ? 15 : 12)}%`,
                willChange: "transform",
              }}
              animate={{
                y: [-8, 8, -8],
                x: [-4, 4, -4],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 border-b border-gray-800/30 bg-black/80 backdrop-blur-xl"
        style={{ willChange: "transform" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        textShadow: [
                          "0 0 20px rgba(255,255,255,0.5)",
                          "0 0 30px rgba(255,255,255,0.7)",
                          "0 0 20px rgba(255,255,255,0.5)",
                        ],
                      }
                }
                transition={{ duration: 3, repeat: Infinity }}
                className="text-xl font-bold text-white"
              >
                SideQuestAI
              </motion.div>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {["Pricing", "Download"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: 1.05,
                          textShadow: "0 0 8px rgba(255,255,255,0.8)",
                        }
                  }
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hidden sm:inline-flex hover:bg-white/10"
                >
                  <Link to="/pricing">Try Free</Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(255,255,255,0.3)",
                      }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <Button
                  size="sm"
                  asChild
                  className="bg-white text-black hover:bg-gray-200"
                >
                  <Link to="/download">
                    <Download className="w-4 h-4 mr-2" />
                    Get App
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="py-12 sm:py-20 lg:py-32 relative">
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : yParallax }}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }
                }
                transition={{ duration: 8, repeat: Infinity }}
                style={{
                  background:
                    "linear-gradient(45deg, #fff, #888, #fff, #ccc, #fff)",
                  backgroundSize: "400% 400%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Turn Your Ideas Into
                <motion.span
                  className="block"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          textShadow: [
                            "0 0 20px rgba(255,255,255,0.8)",
                            "0 0 40px rgba(255,255,255,1)",
                            "0 0 20px rgba(255,255,255,0.8)",
                          ],
                        }
                  }
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Profitable Side Hustles
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              AI-powered platform that creates step-by-step courses and
              milestones to help you build successful side businesses.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(255,255,255,0.2)",
                      }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <Button
                  size="lg"
                  asChild
                  className="w-full sm:w-auto bg-white text-black hover:bg-gray-200"
                >
                  <Link to="/download">
                    <Play className="w-5 h-5 mr-2" />
                    Get Started Free
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.05,
                        borderColor: "rgba(255,255,255,0.8)",
                      }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto border-gray-600 hover:bg-white/10"
                >
                  <Link to="/pricing">
                    View Plans
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-12 border-y border-gray-800/30">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.05,
                        y: -5,
                      }
                }
                className="text-center"
              >
                <motion.div
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: 1.1,
                        }
                  }
                  className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center"
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  className="text-2xl sm:text-3xl font-bold text-white mb-2"
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          textShadow: [
                            "0 0 10px rgba(255,255,255,0.5)",
                            "0 0 20px rgba(255,255,255,0.8)",
                            "0 0 10px rgba(255,255,255,0.5)",
                          ],
                        }
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section ref={featuresRef} id="features" className="py-16 sm:py-24">
        <motion.div
          style={{ scale: shouldReduceMotion ? 1 : scaleParallax }}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Everything You Need to Succeed
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              Our AI-powered platform provides all the tools and guidance you
              need to turn your ideas into profitable businesses.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="cursor-pointer"
                style={{
                  willChange: shouldReduceMotion ? "auto" : "transform",
                }}
              >
                <Card className="bg-gradient-to-br from-white/10 to-white/5 border-gray-800/50 hover:border-gray-600/50 backdrop-blur-sm h-full">
                  <CardHeader>
                    <motion.div
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : {
                              scale: 1.1,
                            }
                      }
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4"
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <CardTitle className="text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="py-16 sm:py-24 bg-gray-900/20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={benefitsInView ? "visible" : "hidden"}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                variants={itemVariants}
                className="text-3xl sm:text-4xl font-bold mb-4"
              >
                What's Included
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-300"
              >
                Every plan comes with these essential features
              </motion.p>
            </div>
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-2 gap-6"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          scale: 1.02,
                          x: 10,
                        }
                  }
                  className="flex items-center space-x-3"
                >
                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : {
                            scale: 1.1,
                          }
                    }
                    className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <Check className="w-3 h-3 text-black" />
                  </motion.div>
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-16 sm:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold mb-6"
            >
              Ready to Start Your Side Quest?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 mb-8"
            >
              Join thousands of entrepreneurs who are building successful side
              businesses with SideQuestAI.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(255,255,255,0.3)",
                      }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={handleDownloadClick}
                  className="w-full sm:w-auto bg-white text-black hover:bg-gray-200"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download SideQuestAI
                </Button>
              </motion.div>
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.05,
                        borderColor: "rgba(255,255,255,0.8)",
                      }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto border-gray-600 hover:bg-white/10"
                >
                  <Link to="/pricing">
                    View Pricing Plans
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>
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
        className="border-t border-gray-800/30 py-12"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            <motion.div variants={itemVariants} className="md:col-span-2">
              <div className="text-xl font-bold text-white mb-4">
                SideQuestAI
              </div>
              <p className="text-gray-400 max-w-md">
                The AI-powered platform that helps you turn ideas into
                profitable side businesses with step-by-step guidance.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                {["Pricing", "Download"].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={shouldReduceMotion ? {} : { x: 5 }}
                  >
                    {item === "Download" ? (
                      <button
                        onClick={handleDownloadClick}
                        className="block text-gray-400 hover:text-white transition-colors text-left w-full"
                      >
                        {item}
                      </button>
                    ) : (
                      <Link
                        to={`/${item.toLowerCase()}`}
                        className="block text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                {["Privacy", "Terms", "Refund"].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={shouldReduceMotion ? {} : { x: 5 }}
                  >
                    <Link
                      to={`/${item.toLowerCase()}`}
                      className="block text-gray-400 hover:text-white transition-colors"
                    >
                      {item} {item === "Privacy" && "Policy"}
                      {item === "Terms" && " of Service"}
                      {item === "Refund" && " Policy"}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-gray-800/30 mt-8 pt-8 text-center text-gray-400"
          >
            <p>&copy; 2024 SideQuestAI. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
