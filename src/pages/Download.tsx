import { motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Download,
  Smartphone,
  Monitor,
  Tablet,
  ArrowLeft,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Globe,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useAppRedirect } from "@/utils/app-redirect";

const DownloadPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const downloadsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true });
  const downloadsInView = useInView(downloadsRef, {
    once: true,
  });
  const featuresInView = useInView(featuresRef, { once: true });

  const [userAgent, setUserAgent] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { redirectToApp } = useAppRedirect();

  useEffect(() => {
    setUserAgent(navigator.userAgent);
    setIsMobile(window.innerWidth < 768);
  }, []);

  const detectPlatform = () => {
    const ua = userAgent.toLowerCase();
    if (ua.includes("android")) return "android";
    if (ua.includes("iphone") || ua.includes("ipad")) return "ios";
    if (ua.includes("mac")) return "mac";
    if (ua.includes("windows")) return "windows";
    return "web";
  };

  const platform = detectPlatform();

  const downloads = [
    {
      platform: "Windows",
      icon: Monitor,
      description: "Desktop app for Windows 10+",
      url: "",
      size: "125 MB",
      recommended: platform === "windows",
      tag: "Most Popular",
    },
    {
      platform: "macOS",
      icon: Monitor,
      description: "Desktop app for macOS 11+",
      url: "https://github.com/SideQuestAI/web/releases/download/v1.0.0/SideQuestAI-macOS.dmg",
      size: "130 MB",
      recommended: platform === "mac",
      tag: "Optimized",
    },
    {
      platform: "Android",
      icon: Smartphone,
      description: "Mobile app for Android 8+",
      url: "https://raw.githubusercontent.com/SideQuestAI/sidequestai.github.io/main/public/SideQuestAI.android.apk",
      size: "27.3 MB",
      recommended: platform === "android",
      tag: "Mobile",
    },
    {
      platform: "iOS",
      icon: Tablet,
      description: "Mobile app for iOS 14+",
      url: "",
      size: "50 MB",
      recommended: platform === "ios",
      tag: "Mobile",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for all devices",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and protected",
    },
    {
      icon: Globe,
      title: "Cross-Platform",
      description: "Works seamlessly across all your devices",
    },
    {
      icon: Users,
      title: "Always Updated",
      description: "Automatic updates with latest features",
    },
  ];

  const handleDownload = (url: string, platformName: string) => {
    // For Android, try to redirect to app first, but with shorter timeout
    if (platformName.toLowerCase() === "android") {
      const redirected = redirectToApp("/download", {
        fallbackUrl: url,
        timeout: 1000,
        showFallbackButton: false
      });
      
      if (redirected) {
        return; // App redirect was attempted
      }
    }
    
    // Fallback to direct download
    if (url && url.trim() !== "") {
      window.open(url, "_blank");
    } else {
      console.warn("Download URL is empty for platform:", platformName);
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Subtle Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.04) 1px, transparent 0)`,
            backgroundSize: "60px 60px",
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
            <Link to="/" className="flex items-center space-x-3">
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
            <div className="flex items-center space-x-4">
              <Link
                to="/pricing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
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
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="py-16 sm:py-24 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              Download{" "}
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                SideQuestAI
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Get the AI-powered side hustle platform on all your devices. Start
              building your profitable business today with step-by-step
              guidance.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">10k+</div>
                <div className="text-sm text-gray-400">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">4.9★</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">Free</div>
                <div className="text-sm text-gray-400">To Start</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Download Options */}
      <section ref={downloadsRef} className="py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={downloadsInView ? "visible" : "hidden"}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-4"
            >
              Choose Your Platform
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              Download SideQuestAI for your device and start your side hustle
              journey today.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {downloads.map((download, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.02,
                        y: -4,
                      }
                }
                className="relative"
              >
                <Card
                  className={`bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/50 hover:border-gray-600/50 backdrop-blur-sm h-full transition-all duration-300 ${
                    download.recommended
                      ? "ring-1 ring-white/20 shadow-lg shadow-white/10"
                      : ""
                  }`}
                >
                  {download.recommended && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs px-3 py-1 rounded-full font-medium">
                      Recommended
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <download.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <CardTitle className="text-white text-xl">
                          {download.platform}
                        </CardTitle>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          {download.tag}
                        </span>
                      </div>
                      <CardDescription className="text-gray-300 text-sm">
                        {download.description}
                      </CardDescription>
                      <div className="text-xs text-gray-400">
                        Size: {download.size}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    >
                      <Button
                        className={`w-full ${
                          download.recommended
                            ? "bg-white text-black hover:bg-gray-200"
                            : "bg-gray-800 hover:bg-gray-700 text-white"
                        }`}
                        onClick={() =>
                          handleDownload(download.url, download.platform)
                        }
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section
        ref={featuresRef}
        className="py-16 border-t border-gray-800/30 relative z-10"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-4"
            >
              Why Choose SideQuestAI?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              Experience the full power of AI-driven side hustle creation with
              our native applications.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -2,
                      }
                }
                className="text-center p-6 rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* System Requirements */}
      <section className="py-16 bg-gray-900/20 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              System Requirements
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/30 p-6 rounded-lg border border-gray-800/50">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Monitor className="w-5 h-5 mr-2" />
                  Desktop Apps
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Windows 10+ or macOS 11+
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    4GB RAM (8GB recommended)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    500MB free storage
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Internet connection required
                  </li>
                </ul>
              </div>
              <div className="bg-black/30 p-6 rounded-lg border border-gray-800/50">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Mobile Apps
                </h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Android 8.0+ or iOS 14+
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    2GB RAM (3GB recommended)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    100MB free storage
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Internet connection required
                  </li>
                </ul>
              </div>
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
              Ready to Start Building?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join thousands of entrepreneurs building successful side
              businesses with SideQuestAI's AI-powered guidance.
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
                <Link to="/pricing">View Pricing Plans</Link>
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

export default DownloadPage;
