## <span style="color:rgb(255, 105, 97)">1. Khái quát về mã hóa thông tin và ứng dụng</span>

###  <span style="color:rgb(255, 179, 91)">1.1. Mã hóa thông tin là gì?</span>

>Là một ngành khoa học chuyên nghiên cứu về kĩ thuật, thuật toán, phương pháp nhằm xử lý, biến đổi thông tin từ dạng có thể hiểu về dạng không thể hiểu được

- Một hệ mã hóa gồm 2 khâu:
	- Mã hóa: chuyển bản rõ -> bản mã
	- Giải mã: chuyển bản mã -> bản rõ
- Thông tin được mã hóa -> bản mã
- Thông tin chưa được mã hóa -> bản rõ (unencrypted )

Mã hóa và giải mã sử dụng cùng một thuật toán 

Một bộ mã hóa (Cipher) là một giải thuật để mã hóa và giải mã thông tin

Khóa - Key: chuỗi sử dụng trong giải thuật mã hóa/giải mã

Không gian khóa - Key space: tổng số khóa có thể có của một hệ mã hóa

Mã hóa khóa bí mật - Secret key cryptography: (còn gọi là khóa đối xứng):
	Sử dụng cho cả giải thuật mã hóa và giải mã
	Khóa này gọi là khóa bí mật (secret key) hay khóa chia sẻ (shared key)

Mã hóa khóa công khai - Public key cryptographic:
	Thuật toán mã hóa sử dụng hai khóa khác nhau trong đó:
		khóa công cộng để mã hóa
		khóa riêng để giải mã

Hàm băm - Hash table : ánh xạ chuyển các dữ liệu có kích thước thay đổi về dữ liệu có kích thước cố định

Phá mã - Cryptanalysis: quá trình giải mã mà không cần có trước:
	Thông tin về giải thuật
	Thông tin về khóa mã

### <span style="color:rgb(255, 179, 91)">1.2. Vai trò của mã hóa </span>

Mã hóa thông tin có thể được sử dụng để đảm bảo an toán thông tin trên đường đi 
### <span style="color:rgb(255, 179, 91)">1.3. Các thành phần của một hệ mã hóa </span>

Một hệ mã hóa được cấu thành từ hai thành phần chính:
	Phương pháp mã hóa (giải thuật)
	Không gian khóa 

Nguyên lý Kerckhoff:
	 tính an toàn của hệ không nên phụ thuộc vào giải thuật mà nên phụ thuộc vào việc giữ bí mật khóa mã


### <span style="color:rgb(255, 179, 91)">1.4. Lịch sử mã hóa </span>
### <span style="color:rgb(255, 179, 91)">1.5. Mã hóa dòng và mã hóa khối</span> 

Mã hóa dòng - Stream cipher: kiểu mã hóa mà từng bit dữ liệu được kết hợp với từng bit tương ứng của khóa để tạo mã

Mã hóa khối - Block cipher: kiểu mã hóa mà dữ liệu chia ra thành từng khối có kích thước cố định để mã hóa

Các chế độ hoạt động:
	Chế độ ECB - Electronic Codeblock
	Chế độ CBC

### <span style="color:rgb(255, 179, 91)">1.6. Các tiêu chuẩn đánh giá hệ mã hóa</span> 

Độ an toàn - Level of security

Hiệu năng - Performance

Tính năng - Functionallity

Chế độ hoạt động - modes of operation

Độ dễ cài đặt - Ease of implementation
### <span style="color:rgb(255, 179, 91)">1.7. Ứng dụng của mã hóa</span>

- Các kỹ thuật mã hóa được ứng dụng rộng rãi:
	- Dịch vụ xác thực
	- Điều khiển truy cập
	- Các công cụ đánh giá và phân tích logs
	- Các sản phẩm quản lý ATTT
	- Các công cụ cho đảm bảo an toàn cho truyền thông không dây
	- Các nền tảng bảo mật ( PKI,PGP)
	- Các giao thức bảo mật (SSL/TLS, SSH, SET, IPSec)
	- Các hệ thống như VPN
- 
## <span style="color:rgb(255, 105, 97)">2. Các phương pháp mã hóa </span>

### <span style="color:rgb(255, 179, 91)">2.1 Phương pháp thay thế</span>

Thay thế giá trị này bằng một giá trị khác:
	Thay một ký tự bằng một ký tự khác
	Thay một bit bằng một bit khác
	CEASAR CIPHER: dịch 3 ký tự sang bên phải (A->D,...)

Một bộ chữ có thể là 1 hoặc nhiều:
	1 gốc -> 1 mã
	1 gốc -> 1 trong n mã
### <span style="color:rgb(255, 179, 91)">2.2 Phương pháp hoán vị</span>

Thực hiện sắp xếp các giá trị trong một khối để tạo bản mã:
	Có thể thực hiện với từng bit hoặc từng byte 
![[Pasted image 20241015104044.png]]

### <span style="color:rgb(255, 179, 91)">2.3 Phương pháp XOR</span>

Sử dụng phép toán logic XOR để tạo từng bản mã:
	Từng bit của bản rõ được XOR với bit tương ứng của khóa
Ví dụ: Mã hóa từ `CAT` sử dụng khóa `V` ()
### <span style="color:rgb(255, 179, 91)">2.4 Phương pháp VERNAM</span>

Sử dụng một tập ký tự để nối vào các ký tự của bản rõ để tạo bản mã
	Mội ký tự trong tập chỉ dùng 1 lần trong một tiến trình (one-time pad)
Ví dụ: bộ chữ tiếng Anh có 26 ký tự 
	Các ký tự bản rõ được chuyển thành số 1->26
	Cộng các giá trị của ký tự với giá trị tương ứng trong tập nối thêm
	Nếu giá trị > 26 => đem -26
	Lấy module 
### <span style="color:rgb(255, 179, 91)">2.5 Phương pháp sách hoặc khóa chạy</span>

Thường dùng trong các bộ phim trinh thám, trong đó việc giả mã sử dụng các khóa chứa trong các cuốn sách

Ví dụ: với bản mã là 259,19,8;22,3,8;375,7,4;394,17,2 và cuốn sách được dùng là "A Fire Up on the Deep": 
	Trang 259, dòng 19, từ thứ 8 -> sack 
	Trang 22, dòng 3, từ thứ 8 -> island  
	Trang 375, dòng 7, từ thứ 4 -> sharp  
	Trang 394, dòng 17, từ thứ 2 -> path  
=> Bản rõ tương ứng của bản mã "259,19,8;22,3,8;375,7,4;394,17,2 " là "sack island sharp path".
### <span style="color:rgb(255, 179, 91)">2.6 Phương pháp hàm băm</span>

Hash Functions: thuật toán để tạo các bản tóm tắt của thông điệp được sử dụng để nhận dạng và bảo toàn tính toàn vẹn
	Các hàm băm là hàm công khai được dùng để tạo ra các giá trị băm
	Chiều dài của thông điệp là bất kì nhưng đầu ra cố định

Một số hàm băm thông dụng: 
	MD2, MD4, <span style="color:rgb(0, 223, 225)">MD5</span> (128 bit)  
	MD6 (0-512 bit) 
	SHA0, <span style="color:rgb(0, 223, 225)">SHA1</span> (160 bit)  
	SHA2 (SHA256, SHA384, SHA512), SHA3  
	CRC32 (32 bit)

## <span style="color:rgb(255, 105, 97)">3. Các giải thuật mã hóa </span>

### <span style="color:rgb(255, 179, 91)">3.1 Giải thuật mã hóa khóa đối xứng</span>

Các giải thuật mã hóa khóa đối xứng (symetric key encryption) 
	Còn gọi là mã hóa khóa riêng hay bí mật (secret/private key encryption)
	Sử dụng một khóa (key) duy nhất cho cả quá trình mã hóa và giải mã.

Đặc điểm:  
	Kích thước khóa tương đối ngắn (64, 128, 192, 256 bít)  
	Tốc độ nhanh  
	Độ an toàn cao 
	Khó khăn trong quản lý và phân phối khóa.(vi chi dung 1 khoa duy nhat -> can kenh private)
#### <span style="color:rgb(255, 238, 140)">DES (Data Encryption Standard):</span>
- Được phát triển tại IBM (1970)
- Được thừa nhận là chuẩn mã hóa tại Mỹ (NSA) những năm 1976
- Hiện nay không được coi là an toàn do:
	- Không gian khóa nhỏ 
	- Tốc độ tính toán của các máy tính ngày càng nhanh 
- Đặc điểm:
	- Dạng mã hóa khối 64bit
	- Sử dụng thực 56 bit, 8bit kiểm tra chẵn lẻ
	- Sử dụng chung giải thuật cho cả hai khâu giải mã, mã hóa
- Các bước thực hiện mã hóa của DES với mỗi khối 64bit:
	- Bước hoán vị khởi tạo (IP - Initial Permutation)
	- 16 vòng lặp chính thực hiện xáo trộn dữ liệu theo hàm Feistel (F)
	- Bước hoán vị kết thúc (FP - Final Permutation)
- Đánh giá:
	- Ưu
		- Tốc độ giải/mã hóa nhanh
		- Được ứng dụng rộng rãi
	- Nhược:
		- Không gian khóa nhỏ
		- Không có khả năng mở rộng
		- Khó khăn trong quản lý và phân phối
#### <span style="color:rgb(255, 238, 140)">Triple-DES</span> 

Nhược điểm:
	Không xác thực
	Khó khăn trong quản lý 

#### <span style="color:rgb(11, 162, 77)">AES</span>
- Là chuẩn mã hóa dữ liệu được NIST công nhận vào 2001
- được xây dựng dựa trên Rijindael cipher, phát triển bởi 2 nhà mật mã người Bỉ 
- Đặc điểm:
	- Kích thước khối dữ liệu là 128bit
	- Kích thước khóa cụ thể là 128,192, 256 bit 
	- được thiết kế dựa trên mạng hoán vị-thay thế (substitution-permutation network)
	- Có thể đạt tốc độ cao trên cả cài đặt phần mềm hoặc phần cứng 
- Vận hành:
	- Dựa theo ma trận 4 x 4 được gọi là `state`
	- Kích thước của khóa quyết định số vòng lặp chuyển đổi cần thực hiện để chuyển bản rõ thành bản mã:
		- 10 vòng -> khóa 128bit
		- 12 vòng -> khóa 192bit
		- 14 vòng -> khóa 256bit
- Mô tả giải thuật:
- ![[Pasted image 20241022105947.png]]
	- Gồm 4 bước:
		- B 1: mở rộng khóa: các khóa phụ được sinh theo thủ tục
		- B 2: Vòng khởi tạo: mỗi byte trong `state` được kết hợp với khóa sử dụng XOR
		- B 3: các vòng lặp chính: 
			- 1/ SubByte: bước thay thế phi tuyến tính
			- 2/ ShiftRow
			- 3/ MixColumn
			- 4/ AddRoundKey
		- B 4: Vòng cuối: 
			- 1/ SubKey
			- 2/ ShiftRow
			- 3/ AddRoundKey
- Nhận xét:
	- Ưu:
		- Tốc độ giải/mã hóa nhanh
		- Ứng dụng rộng trong tất cả các lĩnh vực
		- Độ an toàn cao và có khả năng mở rộng khóa 
	- Nhược:
		- Khó khăn trong quản lý và phân phối
		- Đơn giản, dễ bị tấn công 
### <span style="color:rgb(255, 179, 91)">3.2 Giải thuật mã hóa khóa bất đối xứng</span>

Còn gọi là mã hóa khóa công khai (public key encryption)

Sử dụng cặp khóa:
	Public key: mã hóa
	Private key: giải mã
	(phụ thuộc vào nhau)
Đặc điểm:
	Kích thước khóa lớn (1024-3072 bit)
	Tốc độ chậm: do khóa lớn
	Độ an toàn cao
	Thuận lợi trong quản lý và phân phối khóa: do khóa công khai -> có thể trao đổi dễ

Các giải thuật mã hóa khóa bất đối xứng điển hình:

#### <span style="color:rgb(11, 162, 77)">RSA </span>
Phát minh năm 1977
Độ an toàn của RSA dựa trên độ khó của việc phân tích số nguyên lớn (hàng trăm chữ số)

Sử dụng cặp khóa public - private:
	Khóa public để mã hóa
	Khóa private để giải mã
	Chỉ khóa private cần bảo mật

Kích thước khóa của RSA:
	Khóa < 1024 bit không an toàn
	Khuyến nghị dùng khóa >= 2048 bit và ứng dụng mật mã dân sự
	Tương lai nên dùng khóa >= 3072bit

Thủ tục sinh khóa RSA:
	Tạo 2 số nguyên tố `p` và `q`
	Tính $n = p*q$ 
	Tính $\phi (n)=(p-1)*(q-1)$
	Chọn số nguyên tố e sao cho 0<e<phi (n) và gcd (e,phi (n)) =1
	Chọn số `d` sao cho $$d*e^{-1}\mod\phi(n)=1$$ (d là modulo nghịch đảo của e)
	   => ta có (n, e) là khóa công khai, (n, d) là khóa riêng
Thủ tục mã hóa và giải mã:
	Mã hóa:
		Thông điệp `m` đã được chuyển thành số $m<n$
		Bản mã $c=m^{e} \mod n$
	Giải mã:
		Bản mã c, $c<n$
		Bản rõ $m=c^{d}\mod n$

Yêu cầu về quá trình sinh khóa:
	`p` >1024 bit 
	`p` và `q` cùng độ lớn
	Số nguyên tố `p` và `q` kh
	Sử dụng số mũ mã hóa `e` nhỏ:
		Không được quá lớn/quá nhỏ
		Nếu chọn `e` không tốt -> bản rõ có thể không được mã hóa
	Sử dụng số mũ giải mã `d` nhỏ:
		Không được quá lớn/quá nhỏ
		Nếu `d` nhỏ và gcd(p-1, q-1) (gcd: ước số chung lớn nhất) cũng nhỏ thì d có thể tính được tương đối dễ dàng từ khóa công khai (n, e);

Đánh giá về RSA:
	Dễ quản lý và phân phối khóa
	Độ an toàn cao
	Được ứng dụng rộng rãi 
	Tốc độ mã hóa, giải mã chậm
	Độ an toàn chưa được chứng minh 

#### ElGamal

#### Knapsack
### <span style="color:rgb(255, 179, 91)">3.3 Các hàm băm</span>

Hàm băm (hash function) là một hàm toán học `h` có tối thiểu 2 thuộc tính:
	Nén
	Dễ tính toán

Phân loại theo khóa sử dụng:
	Hàm băm không khóa (unkeyed): đầu và chỉ là thông điệp
	Hàm băm có khóa (keyed): đầu vào gồm thông điệp và khóa

Phân loại theo tính năng:
	Mã phát hiện sửa đổi (MDC - modification detection codes)
	Mã xác thực thông điệp (MAC - Message authentication codes)

Một số hàm băm điển hình
	MD5 *
	SHA1 *

#### <span style="color:rgb(146, 208, 80)">MD5</span>
Hàm băm không khóa
Chuỗi đầu ra là 128bit
Được sử dụng rộng rãi trong nhiều ứng dụng:
	Chuỗi bảo toàn tính toàn vẹn
	Tạo chuỗi kiểm tra lỗi
	Mã hóa mật khẩu

Quá trình xử lý của MD5:
	Chia thông điệp -> khối 512bit (không phải bội 512 thì nối thêm bit thiếu)
	Phần xử lý chính làm việc trên state 128 bit, chia thành 4 từ 32 bit
	Quá trình xử lý gồm 4 vòng, mỗi vòng 16 thao tác, mỗi thao tác gồm (F, modulo, quay trái)


#### SHA1

Đầu ra là 160 bit (40 số HEX)

Quá trình xử lý thông điệp:
	Thủ tục tương tự MD5
	Làm việc trên state 160 bit, chia thành 5 từ 32 bit (A, B,C,D,E):
		A,B,C,D,E được khởi tạo bằng một hằng cố định
		Từng phần của 32 bit của khối đầu vào 512 bit được đưa dần vào để thay đổi state
	Quá trình xử lý gồm 80 vòng, mỗi vòng gồm:
		Add 
		And 
		or
		XOR
		rotate
		modulo
		


## <span style="color:rgb(255, 105, 97)">4. Chữ ký số, chứng chỉ số và PKI </span>
#### Chữ ký số
#### Chứng chỉ số
#### PKI

## <span style="color:rgb(255, 105, 97)">5. Các giao thức đảm bảo an toàn thông tin dựa trên mã hóa.</span> 