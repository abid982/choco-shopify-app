// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

// All endpoints after this point wll be require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

// Retrieves a single collection
// /api//collections/444214018326
// /admin/api/2023-07/collections/444214018326.json
// /admin/api/2023-07/collections/{collection_id}.json
app.get('/api/collections/428406210838', async (_req, res) => {
  try {
    // The first thing we need is to initialize a session so we have to pass in the credentials. We have legit access to to the store.
    // Once we have access to our session we have to pass the id of the collection that we want to access. This can be done dynamically from our frontend but we're not going to work frontend in this course.
   const response = await shopify.api.rest.Collection.find({
      session: res.locals.shopify.session,
      id: 428406210838,
   });

    console.log('response:');
    console.log(res);

    // Send response as json
    res.status(200).send(response);

  } catch (err) {
    res.status(500).send(err);
    }
});

// We have to add permission in Shopify because we're trying to read orders. It's a special configuration that we have to do an extra configuration.
// Go to access scopes
// shopify.app.toml
// https://shopify.dev/docs/api/usage/access-scopes
// read_all_orders
// read_orders
// Restart the app
// https://shopify.dev/docs/api/admin-rest/2023-07/resources/order
// ---------------------------------
app.get('/api/orders', async (_req, res) => {
  /*
    // Session is built by the OAuth process
    await shopify.rest.Order.all({
      session: session,
      status: "any",
    });
  */
  try {
    // Retrieve a list of orders
    // Session is built by the OAuth process
    const response = await shopify.api.rest.Order.all({
      session: res.locals.shopify.session,
      status: "any",
    });

    res.status(200).send(response);

  } catch (err) {
    res.status(500).send(err);
  }
});

// ---------------------------------

// Retrieves a list of customers
app.get('/api/customers', async (_req, res) => {
  try {
    // Session is built by the OAuth process

    const response = await shopify.api.rest.Customer.all({
      session: res.locals.shopify.session,
      ids: "6876461236502,6868545831190",
    });

    res.status(200).send(response);

  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
