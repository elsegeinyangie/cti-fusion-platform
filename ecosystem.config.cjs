module.exports = {
  apps: [
    {
      name: "front",
      script: "./.output/server/index.mjs",
      cwd: "/var/www/threadVerse-frontEnd",
      interpreter: "node",
      env: {
        NODE_ENV: "production",
        API_URL: "https://cti-api.zabox.me",
        SESSION_SECRET: "G3rChW/7gquUiKS+h3iRXKWtynABnO4+hiH0bXG2GBc=",
        PORT: 3001,
        HOST: "127.0.0.1",
        NITRO_HOST: "127.0.0.1",
        NITRO_PORT: 3001,
      },
    },
  ],
};
