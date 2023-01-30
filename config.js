const { default: config } = await import("./config.json", {
  assert: { type: "json" }
});

export const server = config.server;
export const DB = config.DB;
