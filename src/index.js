const start = async () => {
  await __webpack_init_sharing__('default');

  const React = await import('react');
  const { createRoot } = await import('react-dom/client');
  const App = (await import('./App')).default;

  createRoot(document.getElementById('root')).render(<App />);
};

start();
