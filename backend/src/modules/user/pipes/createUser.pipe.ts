import { z } from 'zod';

export const createUserPipe = z
  .object({
    name: z.string().min(3).max(255),
    cpf: z
      .string()
      .length(11)
      .refine((str) => !isNaN(parseInt(str))),
    birthdate: z.coerce.date().refine((str) => {
      const date = new Date(str);
      const today = new Date();
      return date <= today;
    }),
    email: z.string().email(),
    phone: z
      .string()
      .min(12)
      .max(14)
      .refine((str) => !isNaN(parseInt(str))),
    address: z.object({
      street: z.string().max(128),
      complement: z.string().max(255).optional(),
      city: z.string().max(32),
      state: z.string().max(32),
      number: z.coerce.number().max(9999),
      cep: z
        .string()
        .length(8)
        .refine((str) => !isNaN(parseInt(str))),
    }),
  })
  .strict();
