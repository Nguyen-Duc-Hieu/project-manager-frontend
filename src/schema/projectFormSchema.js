import { z } from "zod"

export const projectFormSchema = z.object({
    name: z
        .string()
        .min(1, "Không được bỏ trống tên dự án")
        .max(50, "Tên dự án không được vượt quá 50 ký tự"),
    description: z
        .string()
        .min(1, "Không được bỏ trống mô tả dự án")
        .max(200, "Mô tả dự án không được vượt quá 200 ký tự"),
    difficulty: z
        .number()
        .min(1, "Độ khó phải lớn hơn hoặc bằng 1")
        .max(5, "Độ khó phải nhỏ hơn hoặc bằng 5"),
    isAccepted: z
        .boolean(),

})