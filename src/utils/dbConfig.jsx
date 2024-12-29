import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://cancer_treatment_owner:NEc7SG2kepZQ@ep-steep-term-a5bjel4w.us-east-2.aws.neon.tech/cancer_treatment?sslmode=require",
);
export const db = drizzle(sql, { schema });
