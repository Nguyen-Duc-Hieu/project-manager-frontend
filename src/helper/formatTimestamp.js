export default function formatTimestamp(unixTimestamp) {
    if (typeof unixTimestamp === "number") {
        const date = new Date(unixTimestamp * 1000) // Chuyển đổi từ Unix timestamp sang milliseconds
        return date.toLocaleString('vi-VN') // Trả về chuỗi định dạng ngày giờ theo múi giờ địa phương
    } else if (typeof unixTimestamp === "string") {
        const date = new Date(unixTimestamp) // Chuyển đổi từ chuỗi ngày giờ sang đối tượng Date
        return date.toLocaleString('vi-VN') // Trả về chuỗi định dạng ngày giờ theo múi giờ địa phương
    }
    
    return "Invalid timestamp" // Trả về thông báo lỗi nếu timestamp không hợp lệ
}