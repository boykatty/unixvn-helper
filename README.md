# unixvn-helper
Dựa trên jquery phát triển thư viện hỗ trợ các tiện ích như định dạng tiền tệ, validate trường dữ liệu..và phát triển thêm theo thời gian

A. Cách dùng
+ Định dạng tiền tệ
- embed
<input class="price" value="0" />
- run
$('.price').unixvnPriceFormat({ separator: "," });
//option price format
option = {
  separator: ","//string phân tách giữa các số hàng nghìn
}
