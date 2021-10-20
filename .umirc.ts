import { defineConfig } from "umi";

export default defineConfig({
  exportStatic: {},
  routes: [
    { path: "/image_browse", component: "@/pages/image_browse" },
    { path: "/video_browse", component: "@/pages/video_browse" },
  ],
});
