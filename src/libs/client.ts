import { createClient } from "contentful";

const client = createClient({
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN || "",
  space: process.env.CONTENTFUL_SPACE_ID || "",
});

export default client;
