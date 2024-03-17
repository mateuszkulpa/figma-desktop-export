export default defineNitroConfig({
  srcDir: "server",
  routeRules: {
    "/*": {
      cors: true
    }
  }
});
