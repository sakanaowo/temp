## 1. Khái quát về mối đe dọa
- mối đe dọa: bất kì một hành động nào có thể hư hại đến các tài nguyên hệ thống

- Điểm yếu: 
	- Lỗi hoặc khuyết điểm tồn tại trong hệ thống
	- các hệ thống luôn tồn tại khuyết điểm

- lỗ hổng (vulnerability):
	- là bất kì điểm yếu nào cho phép mối đe dọa có thể gây hại

- Quan hệ giữa mối đe dọa và lỗ hổng:
	- Các mối đe dọa thường khai thác lỗ hổng đã biết để phá hoại
	- Không thể triệt tiêu nhưng có thể giảm thiểu
	- nếu tồn tại lỗ hổng -> khả năng mối đe dọa trở thành hiện thực

- Các mối đe dọa thường gặp:
	- blah blah blah  

- Các lỗ hổng tồn tại trong hdh và các phần mềm:
	- tràn bộ đệm - buffer overflow
	- không kiểm tra đầu vào - unvalidated input
	- vấn đề điều khiển truy cập - access-control problems
	- điểm yếu trong xác thực, trao quyền
	- điểm yếu trong các hệ mật mã

- Tấn công độc hại/phá hoại 

- có 4 loại tấn công chính:
	- giả mạo
	- chặn bắt: nghe lén
	- gây ngắt quãng: ngắt truyền dữ liệu
	- sửa đổi
- Hai kiểu tấn công:
	- chủ động:
		- sửa đổi dữ liệu
		- giành quyền truy cập
	- thụ động:
		- nghe trộm
		- giám sát lưu lượng đường truyền 

- 1 số dạng tấn công điển hình:
	- mật khẩu
	- ddos
	- mã độc
	- giả mạo địa chỉ
	- phát lại và người đứng giữa
	- bom thư, thư rác
	- backdoor
	- social engineering
	- phising, pharming


## 2. Các công cụ tấn công
- 1 số công cụ:
	- nghe lén - sniffer
	- quét lỗ hổng - vulnerability scanner
	- quét cổng dịch vụ - port scanner
	- key logger

- Công cụ quét cổng dịch vụ
	- Các cổng TCP/IP, UDP nằm trong khoảng từ 0 - 65535
		- Các cổng 0-1024 là các cổng chuẩn
		- Các cổng >1024 là các cổng tùy gán
	- Công cụ quét cổng kết nối tới máy tính để xác định cổng nào đợc mở và có thể truy cập vào máy -> xác định được dịch vụ nào đang chạy trên hệ thống:
		- Cổng 80/443 mở -> dịch vụ web
		- cổng 25 -> dịch vụ email 

- Nguyên tắc tổi thiểu các cổng được mở:
	- Đóng tất cả các cổng không sử dụng
	- CHỉ mở những cổng có dịch vụ cần thiết
- Một số công cụ quét cổng:
	- NMAP
	- Portsweep
	- Advanced Port scanner
	- angry IP scanner

- Công cụ nghe lén:
	- Công cụ cho phép bắt các gói tin khi được truyền trên mạng
	- Có thể là module phần cứng, mềm,...
	- Một số công cụ:
		- TCPDUMP
		- PCAP/Wincap
		- IP tools
		- wireshark

- Công cụ keylogger
	- Dạng công cụ giám sát có thể là phần cứng/mềm
	- file đã ghi có thể gửi cho kẻ tấn công
	- Người quản lý có thể cài đặt keylogger vào máy nhân viên để theo dõi


## 3. Các dạng tấn công thường gặp

1. Tấn công mật khẩu 
	- Có 2 dạng:
		- từ điển: thử các từ có tần suất sử dụng cao
		- vét cạn: sử dụng tổ hợp ký tự  sau đó mã hóa với cùng thuật toán hệ thống sử dụng
	1. Phòng chống
	- Chọn mật khẩu mạnh
	- thay mk định kì
	1. Một số công cụ khôi phục mật khẩu
	- Passwork cracker
	- Ophcrack
	- PC Login now
	- L0phtCrack
	- John the ripper
2. Tấn công bằng mã độc
	- Có thể gồm một số dạng:
		- Lợi dụng lỗi không kiểm tra đầu vào: SQL Injection:
			- chèn mã độc là một kỹ thuật cho phép kẻ tấn công chèn mã sql vào dữ liệu gửi đến máy chủ và thực hiện trên máy chủ 
			- Tùy vào mức độ tinh vi, SQL cho phép kẻ tấn công:
				- vượt qua khâu xác thực người dùng
				- chèn, xóa dữ liệu
				- đánh cắp thông tin
				- chiếm quyền điều khiển hệ thống
			- Phòng chống:
3. Tấn công từ chối dịch vụ (Denial of Service attack):
	- dạng tấn công cản trở người dùng hợp pháp truy cập tài nguyên hệ thống
	- Phân loại DoS: 
		- Tấn công LOGIC: dựa vào các lỗi phần mềm làm dịch vụ ngừng hoạt động
		- Tấn công gây ngập lụt (Flooding attack): gửi một lượng lớn yêu cầu gây cạn kiệt tài nguyên hoặc băng thông
	- Các kỹ thuật tấn công:
		- SYN flood
		- Smurf
		- UDP flood
		- HTTP flood
		- Teardrop
		- LandAttack
		- Ping of death
	- SYN flood:
		- kỹ thuật gây ngập các gói tin mở kết nối TCP	
		![[Pasted image 20241001095552.png]]
5. tấn công DDoS:
6. Tấn công giả mạo địa chỉ 