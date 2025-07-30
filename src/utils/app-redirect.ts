// App redirect utility for Android Intent URLs
export const APP_PACKAGE_NAME = "com.example.sidequestai"; // Replace with your actual package name
export const APP_DEEP_LINK_SCHEME = "sidequestai"; // Replace with your actual deep link scheme

export interface AppRedirectOptions {
  fallbackUrl?: string;
  timeout?: number;
  showFallbackButton?: boolean;
}

export const createIntentUrl = (path: string = "", params: Record<string, string> = {}) => {
  // Build the intent URL
  let intentUrl = `intent://sidequestai.github.io${path}`;
  
  // Add query parameters
  const queryParams = new URLSearchParams(params);
  if (queryParams.toString()) {
    intentUrl += `?${queryParams.toString()}`;
  }
  
  // Add package name and fallback
  intentUrl += `#Intent;package=${APP_PACKAGE_NAME};scheme=${APP_DEEP_LINK_SCHEME};end`;
  
  return intentUrl;
};

export const redirectToApp = (path: string = "", options: AppRedirectOptions = {}) => {
  const {
    fallbackUrl = window.location.href,
    timeout = 2000,
    showFallbackButton = true
  } = options;

  // Only redirect on Android devices
  if (!navigator.userAgent.toLowerCase().includes('android')) {
    return false;
  }

  const intentUrl = createIntentUrl(path);
  
  // Create a hidden iframe to test if the app is installed
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = intentUrl;
  
  let appInstalled = false;
  let timeoutId: NodeJS.Timeout;
  
  // Listen for iframe load events
  const checkAppInstalled = () => {
    try {
      // If we can access the iframe content, the app might be installed
      if (iframe.contentWindow && iframe.contentWindow.location.href !== 'about:blank') {
        appInstalled = true;
      }
    } catch (e) {
      // Cross-origin error means the app is likely installed
      appInstalled = true;
    }
  };
  
  // Set up timeout for fallback
  timeoutId = setTimeout(() => {
    if (!appInstalled) {
      // App not installed, show fallback
      if (showFallbackButton) {
        showFallbackMessage(fallbackUrl);
      } else {
        window.location.href = fallbackUrl;
      }
    }
  }, timeout);
  
  // Try to redirect to app
  try {
    window.location.href = intentUrl;
    
    // Check after a short delay
    setTimeout(checkAppInstalled, 100);
    
    // Clear timeout if app opens
    setTimeout(() => {
      if (appInstalled) {
        clearTimeout(timeoutId);
      }
    }, timeout - 100);
    
  } catch (error) {
    console.error('Failed to redirect to app:', error);
    clearTimeout(timeoutId);
    
    if (showFallbackButton) {
      showFallbackMessage(fallbackUrl);
    } else {
      window.location.href = fallbackUrl;
    }
  }
  
  return true;
};

const showFallbackMessage = (fallbackUrl: string) => {
  // Create a modal or notification to inform user
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  
  modal.innerHTML = `
    <div style="
      background: white;
      padding: 24px;
      border-radius: 12px;
      max-width: 320px;
      text-align: center;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    ">
      <h3 style="margin: 0 0 16px 0; color: #1f2937; font-size: 18px; font-weight: 600;">
        Open SideQuestAI App
      </h3>
      <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
        Get the best experience by downloading our mobile app.
      </p>
      <div style="display: flex; gap: 12px; justify-content: center;">
        <button id="download-app" style="
          background: #3b82f6;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        ">
          Download App
        </button>
        <button id="continue-web" style="
          background: #f3f4f6;
          color: #374151;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        ">
          Continue on Web
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Handle button clicks
  modal.querySelector('#download-app')?.addEventListener('click', () => {
    window.location.href = '/download';
    modal.remove();
  });
  
  modal.querySelector('#continue-web')?.addEventListener('click', () => {
    modal.remove();
  });
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (document.body.contains(modal)) {
      modal.remove();
    }
  }, 10000);
};

// Hook for React components
export const useAppRedirect = () => {
  const redirectToAppWithPath = (path: string = "", options?: AppRedirectOptions) => {
    return redirectToApp(path, options);
  };
  
  const redirectToAppWithParams = (params: Record<string, string> = {}, options?: AppRedirectOptions) => {
    const queryString = new URLSearchParams(params).toString();
    const path = queryString ? `?${queryString}` : "";
    return redirectToApp(path, options);
  };
  
  return {
    redirectToApp: redirectToAppWithPath,
    redirectToAppWithParams,
    createIntentUrl
  };
}; 