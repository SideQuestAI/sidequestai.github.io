import { useState, useEffect } from "react";
import { X, Smartphone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppRedirect } from "@/utils/app-redirect";

interface AppRedirectBannerProps {
  showOnMobile?: boolean;
  autoRedirect?: boolean;
  delay?: number;
}

export const AppRedirectBanner = ({ 
  showOnMobile = true, 
  autoRedirect = false, 
  delay = 3000 
}: AppRedirectBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { redirectToApp } = useAppRedirect();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (showOnMobile && mobile) {
        // Show banner after delay
        setTimeout(() => {
          setIsVisible(true);
        }, delay);
        
        // Auto redirect if enabled
        if (autoRedirect) {
          setTimeout(() => {
            redirectToApp("", {
              fallbackUrl: window.location.href,
              timeout: 2000,
              showFallbackButton: false
            });
          }, delay + 1000);
        }
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [showOnMobile, autoRedirect, delay, redirectToApp]);

  const handleOpenApp = () => {
    redirectToApp("", {
      fallbackUrl: window.location.href,
      timeout: 1500,
      showFallbackButton: true
    });
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Store in localStorage to remember user's choice
    localStorage.setItem("app-banner-dismissed", "true");
  };

  // Don't show if user dismissed it
  if (localStorage.getItem("app-banner-dismissed") === "true") {
    return null;
  }

  if (!isVisible || !isMobile) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 shadow-lg">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          <Smartphone className="w-5 h-5" />
          <div className="flex-1">
            <p className="text-sm font-medium">Get the best experience</p>
            <p className="text-xs opacity-90">Open in SideQuestAI app</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            onClick={handleOpenApp}
            className="bg-white text-blue-600 hover:bg-gray-100 text-xs px-3 py-1"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Open App
          </Button>
          <button
            onClick={handleDismiss}
            className="text-white/70 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}; 