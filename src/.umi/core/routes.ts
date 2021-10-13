// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/jiumian/projects/myweb/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/image_browse",
    "component": require('@/pages/image_browse').default,
    "exact": true
  },
  {
    "path": "/",
    "component": require('@/pages/index').default,
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
