import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from '@svgr/rollup';
// import configData from "../config.json";
import configData from "./src/config.json";

// Proxy target selection:
// - During development, default to local backend at 127.0.0.1:2010 so Vite dev server proxies to local API.
// - In other environments, fall back to values from `src/config.json`.
// - You can override targets with environment variables (VITE_SERVER_URL, VITE_STRON_URL, VITE_TAMPER_URL, VITE_BEEMS_URL).
const DEV_LOCAL_SERVER = 'http://127.0.0.1:2010';
const serverTarget = process.env.VITE_SERVER_URL || (process.env.NODE_ENV === 'development' ? DEV_LOCAL_SERVER : configData.SERVER_URL);
const stronTarget = process.env.VITE_STRON_URL || configData.STRON_URL;
const tamperTarget = process.env.VITE_TAMPER_URL || configData.TAMPER_URL;
const beemsTarget = process.env.VITE_BEEMS_URL || configData.BEEMS_URL;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },

  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
              loader: 'jsx',
              contents: await fs.readFile(args.path, 'utf8'),
            }));
          },
        },
      ],
    },
  },

  // plugins: [react(),svgr({
  //   exportAsDefault: true
  // })],

  plugins: [svgr(), react()],

  server: {
    proxy: {
      '/users/create': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/create/, '/users/create')
      },

      '/users/allusers': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/allusers/, '/users/allusers')
      },

      '/users/updateuser': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/updateuser/, '/users/updateuser')
      },


      '/users/allrole': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/allrole/, '/users/allrole')
      },

      '/users/allrolegroup': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/allrolegroup/, '/users/allrolegroup')
      },


      '/users/allmeters': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/allmeters/, '/users/allmeters')
      },

      '/users/createMeter': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/createMeter/, '/users/createMeter')
      },

      '/users/import': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/import/, '/users/import')
      },

      '/api/NewMeter': {
        target: stronTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/NewMeter/, '/api/NewMeter')
      },

      '/users/updatemeter': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/updatemeter/, '/users/updatemeter')
      },

      '/api/UpdateMeter': {
        target: stronTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/UpdateMeter/, '/api/UpdateMeter')
      },

      '/users/createCustomer': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/createCustomer/, '/users/createCustomer')
      },

      '/api/NewCustomer': {
        target: stronTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/NewCustomer/, '/api/NewCustomer')
      },

      '/users/allcustomers': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/allcustomers/, '/users/allcustomers')
      },

      '/users/customername': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/customername/, '/users/customername')
      },

      '/users/allprices': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/allprices/, '/users/allprices')
      },

      '/users/allpricebymeter': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/allpricebymeter/, '/users/allpricebymeter')
      },

      '/users/checkauth': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/checkauth/, '/users/checkauth')
      },

      '/users/lastcusid': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/lastcusid/, '/users/lastcusid')
      },

      '/users/updatecustomer': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/updatecustomer/, '/users/updatecustomer')
      },

      '/api/UpdateCustomer': {
        target: stronTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/UpdateCustomer/, '/api/UpdateCustomer')
      },

      '/users/getallreceipt': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/getallreceipt/, '/users/getallreceipt')
      },

      '/v1/send': {
        target: beemsTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1\/send/, '/v1/send')
      },

      '/api/VendingMeter': {
        target: stronTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/VendingMeter/, '/api/VendingMeter')
      },

      '/api/VendingMeterSendToken': {
        target: stronTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/VendingMeterSendToken/, '/api/VendingMeterSendToken')
      },

      '/users/createtransact': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/createtransact/, '/users/createtransact')
      },

      '/users/logins': {
        target: serverTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/logins/, '/users/logins')
      },

      '/users/allmetersfrmcustomer': {
        target: configData.SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/allmetersfrmcustomer/, '/users/allmetersfrmcustomer')
      },

      '/users/singlemetersfrmcustomer': {
        target: configData.SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/singlemetersfrmcustomer/, '/users/singlemetersfrmcustomer')
      },

      '/users/clearedtampertoken': {
        target: configData.SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/clearedtampertoken/, '/users/clearedtampertoken')
      },

      '/users/allclearedtampertoken': {
        target: configData.SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/allclearedtampertoken/, '/users/allclearedtampertoken')
      },

      '/users/recentclearedtampertoken': {
        target: configData.SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/recentclearedtampertoken/, '/users/recentclearedtampertoken')
      },


      '/users/bindMeter2Customer': {
        target: configData.SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/bindMeter2Customer/, '/users/bindMeter2Customer')
      },

      '/users/lastaccid': {
        target: configData.SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/lastaccid/, '/users/lastaccid')
      },

      '/api/NewAccount': {
        target: configData.STRON_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/NewAccount/, '/api/NewAccount')
      },

      '/users/totalcount': {
        target: configData.SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/totalcount/, '/users/totalcount')
      },

      '/users/getalltransreceipt': {
        target: configData.SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/getalltransreceipt/, '/users/getalltransreceipt')
      },

      '/users/5recenttransreceipt': {
        target: configData.SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/5recenttransreceipt/, '/users/5recenttransreceipt')
      },

      '/users/lastpriceid': {
        target: configData.SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/lastpriceid/, '/users/lastpriceid')
      },

      '/users/createPrice': {
        target: configData.SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/createPrice/, '/users/createPrice')
      },

      '/api/NewPrice': {
        target: configData.STRON_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/NewPrice/, '/api/NewPrice')
      },

      '/users/updateprice': {
        target: configData.SERVER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users\/updateprice/, '/users/updateprice')
      },

      '/api/UpdatePrice': {
        target: configData.STRON_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/UpdatePrice/, '/api/UpdatePrice')
      },

      '/api/ClearCredit': {
        target: configData.TAMPER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ClearCredit/, '/api/ClearCredit')
      },

      '/api/ClearTamper': {
        target: configData.TAMPER_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/ClearTamper/, '/api/ClearTamper')
      },

      // 

    }
  }

});
