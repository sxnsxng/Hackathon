// GamePlay.schemas.ts — Zod validation schemas

import { z } from "zod"

export const SaveEndingSchema = z.object({
  userId:      z.number().int().positive(),
  endingId:    z.string().min(1),
  endingName:  z.string().min(1),
  isSuccess:   z.boolean(),
  score:       z.number().int().min(0),
  roleId:      z.string().min(1),
  playedAt:    z.iso.datetime().optional(),
})

export type SaveEndingInput = z.infer<typeof SaveEndingSchema>

export const CreateSessionSchema = z.object({
  role: z.enum([
    'Camp Leader',
    'Resource Manager',
    'Food Manager',
    'Safety Manager',
    'Maintenance Manager'
  ])
});

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;