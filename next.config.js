/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  experimental: {
    // appDir: true,
    /* modularizeImports: {
       // do modularize imports for material-ui, material-ui-icons, and @material-ui/core
       // this will reduce the bundle size by 50% or more
       '@mui/material': {
         transform: '@mui/material/{{ matches.[1] }}/{{member}}',
       },
       /!* '@mui/x-date-pickers': {
         transform: '@mui/x-date-pickers/{{member}}',
       },*!/
       '@mui/lab': {
         transform: '@mui/lab/{{member}}',
       },
       /!* '@mui/icons-material/?(((\\w*)?/?)*)': {
          transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
        },*!/
     },*/
  },
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;
