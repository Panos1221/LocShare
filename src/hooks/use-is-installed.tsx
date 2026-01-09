import * as React from "react";

/**
 * Hook to detect if the app is installed as a PWA on mobile devices
 * @returns true if the app is running in standalone/fullscreen mode (installed as PWA)
 */
export function useIsInstalled() {
  const [isInstalled, setIsInstalled] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Check if app is running in standalone mode (PWA installed)
    const checkInstalled = () => {
      // Standard PWA detection - checks display-mode media query
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      
      // iOS Safari specific check
      const isIOSStandalone = (window.navigator as any).standalone === true;
      
      // Some Android browsers use fullscreen mode
      const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
      
      return isStandalone || isIOSStandalone || isFullscreen;
    };

    setIsInstalled(checkInstalled());

    // Listen for changes (in case user installs/uninstalls)
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = () => {
      setIsInstalled(checkInstalled());
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isInstalled;
}

