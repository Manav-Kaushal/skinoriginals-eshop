module.exports = ({ env }) => ({
  url: env("APP_URL"),
  proxy: true,
  app: {
    keys: env.array("APP_KEYS", [
      "EwLzLH4LmgBRWnaER6/cYw==",
      "VvTuHsCZDfR/Rih7T6voAA==",
      "CzXydiuTFXC9AJukiobDwg==",
      "FrcEQaMoeJuyw7a/F0qEuw==",
    ]),
  },
});
