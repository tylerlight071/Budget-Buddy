interface Window {
    electronAPI: {
      getCurrentPosition: () => Promise<GeolocationPosition>;
    };
  }
  