module.exports = {

  images: {},
  reactStrictMode: true,
  transpilePackages: ["ui"],
  async redirects() {
    return [
      {
        destination: `/chatgpthing`,
        permanent: false,
        source: "/"
      }
    ]
  }
}
