import { z } from 'zod'

const BaseSchema = z.object({
    username: z
        .string()
        .min(1, "Tên đăng nhập không được bỏ trống")
        .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự")
        .max(20, "Tên đăng nhập không được vượt quá 20 ký tự"),
    password: z
        .string()
        .min(1, "Mật khẩu không được bỏ trống")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .max(100, "Mật khẩu không được vượt quá 100 ký tự")
        .regex(/[a-zA-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ cái")
        .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa")
        .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 chữ số")
        .regex(/[^a-zA-Z0-9]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt"),    
    confirmPassword: z
        .string()
        .min(1, "Xác nhận mật khẩu không được bỏ trống"),
    email: z
        .string()
        .min(1, "Email không được bỏ trống")
        .email("Email không hợp lệ"),
    fullname: z
        .string()
        .min(1, "Tên đầy đủ không được bỏ trống")
        .min(3, "Tên đầy đủ phải có ít nhất 3 ký tự")
        .max(100, "Tên đầy đủ không được vượt quá 100 ký tự"),
    age: z
        .string()
        .min(1, "Không được bỏ trống tuổi")
        .refine(
            (value) => !isNaN(Number(value)),
            {
                message: "Tuổi phải là một số",
            }
        )
        .transform(Number)
        .pipe(
            z.number()
            .min(1, "Tuổi phải lớn hơn hoặc bằng 1")
            .max(100, "Tuổi phải nhỏ hơn hoặc bằng 100")
        )
});

export const LoginSchema = BaseSchema.pick({
    username: true,
    password: true
});

export const RegisterSchema = BaseSchema.refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Mật khẩu và xác nhận mật khẩu không khớp",
        path: ["confirmPassword"],
    }
);