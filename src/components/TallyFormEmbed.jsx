import React, { useEffect } from 'react';

const TallyFormEmbed = () => {
  useEffect(() => {
    const scriptId = 'tally-embed-script';
    const scriptSrc = 'https://tally.so/widgets/embed.js';

    const loadTally = () => {
      if (window.Tally && typeof window.Tally.loadEmbeds === 'function') {
        window.Tally.loadEmbeds();
      }
    };

    // If script is already loaded, just call load
    if (document.getElementById(scriptId)) {
      loadTally();
    } else {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = scriptSrc;
      script.async = true;
      script.onload = loadTally;
      script.onerror = () => {
        console.warn('Failed to load Tally embed script.');
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <iframe
      data-tally-src="https://tally.so/embed/wogNMN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
      loading="lazy"
      width="100%"
      height="214"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
      title="Freelance quote form"
    />
  );
};

export default TallyFormEmbed;
