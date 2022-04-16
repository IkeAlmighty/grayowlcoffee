module.exports = {
  async redirects() {
    return [
      { source: "/login", destination: "/api/auth/signin", permanent: false },
    ];
  },
};
