import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Custom hook to manage scroll position on route changes
const usePreserveScroll = (data) => {
  const router = useRouter();

  useEffect(() => {
    // Function to handle the start of route changes
    const handleRouteChangeStart = () => {
      // Save the current scroll position to sessionStorage
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };

    // Subscribe to route change start events
    router.events.on('routeChangeStart', handleRouteChangeStart);

    // Cleanup function to unsubscribe from the event
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router]);

  useEffect(() => {
    // Retrieve the saved scroll position from sessionStorage
    const scrollPosition = sessionStorage.getItem('scrollPosition');

    // If a scroll position was saved, scroll to that position
    if (scrollPosition) {
      window.scrollTo(0, Number(scrollPosition));
      sessionStorage.removeItem('scrollPosition');
    }
  }, [data]);
};

export default usePreserveScroll;
