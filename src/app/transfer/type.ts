import { z } from "zod";

export const transferSchema = z.object({
  pk: z.string(),
  wallet: z.string(),
  loading: z.boolean(),
  success: z.boolean(),
  fail: z.boolean(),
  ether: z.string(),
  toWallet: z.string(),
  amount: z.string(),
  tx: z.string(),
  txFail: z.boolean(),
  txSuccess: z.boolean(),
});

export type TransferSchema = z.infer<typeof transferSchema>;
