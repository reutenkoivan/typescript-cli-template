import { z } from "zod";

export const StartCommandOptionsModel = z.object({
    enableLogs: z.coerce.boolean(),
});
