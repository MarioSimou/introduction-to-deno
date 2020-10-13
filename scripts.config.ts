
import { DenonConfig } from "https://deno.land/x/denon@2.4.4/mod.ts";

const config = {
  scripts: {
    start: {
      cmd: "deno run --allow-net --allow-env --allow-read --allow-write src/server.ts",
      desc: "runs deno",
    },
  },
  watcher: {
    "interval": 350,
    "exts": ["js", "ts", "json"],
    "match": ["./**/*.*"],
    "skip": ["*/.git/*"],
  }
};

export default config;