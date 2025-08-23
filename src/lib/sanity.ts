import { createClient } from "@sanity/client"

export const client = createClient({
  projectId: "o9tnnd4a",   // sanity.json se ya dashboard se copy karo
  dataset: "production",
  apiVersion: "2023-01-01",       // safe versioning
  useCdn: true,                   // fast response ke liye
})
