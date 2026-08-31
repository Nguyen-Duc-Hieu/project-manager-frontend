import { z } from "zod"

export const taskFormSchema = z.object({
    name: z
        .string()
        .min(1, "Không được bỏ trống tên task")
        .max(50, "Tên task không được vượt quá 50 ký tự"),
    description: z
        .string()
        .min(1, "Không được bỏ trống mô tả task")
        .max(200, "Mô tả task không được vượt quá 200 ký tự"),
    status: z
        .enum(["todo", "in-progress", "done"], {
            errorMap: () => ({ message: "Vui lòng chọn status hợp lệ" }),
        }),
    priority: z
        .enum(["low", "medium", "high"], {
            errorMap: () => ({ message: "Vui lòng chọn priority hợp lệ" }),
        }),
    dueDate: z
        .string().min(1, "Không được bỏ trống hạn chót task")
        .refine(
            (date) => {
                const today = new Date()
                return new Date(date) >= today
            },
            { message: "Hạn chót task phải là một ngày trong tương lai" }
        )

})