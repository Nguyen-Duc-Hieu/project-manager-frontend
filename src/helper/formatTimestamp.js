export default function formatTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000) // Chuyển đổi từ Unix timestamp sang milliseconds
    return date.toLocaleString('vi-VN') // Trả về chuỗi định dạng ngày giờ theo múi giờ địa phương
}