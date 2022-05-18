module.exports = {
  images: {
    domains: ["grayowlcoffee.s3.us-east-2.amazonaws.com"],
  },
  async redirects() {
    return [
      { source: "/login", destination: "/api/auth/signin", permanent: false },
    ];
  },
};
