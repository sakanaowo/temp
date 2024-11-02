## <span style="color:rgb(255, 105, 97)">1. Basic concept</span>
### <span style="color:rgb(255, 179, 91)">1.1 The internet</span>

Internet: "network of network":
	Interconnected ISPs

Infreastructure that provides services to applications:
	Web, VoIP, email,...
Provides programming interface to application:
	Allow sending and receiving application program to connect to Internet
	Provides service options for sending and receiving of messages 
### <span style="color:rgb(255, 179, 91)">1.2 Protocol</span>

Define:
	Format, order of messages sent and received among network entities, and actions taken on message transmission, receipt 
### <span style="color:rgb(255, 179, 91)">1.3 The network edge: access networks, physical media</span>
#### <span style="color:rgb(172, 255, 255)">Network structure</span>
Network edge:
	Host: client and servers
	Servers often in data centers

Access network, physical media:
	Wired, wireless communication links

Network core:
	Interconnected routers
	Network of network
#### <span style="color:rgb(172, 255, 255)">Access network and physical media</span>

- <span style="color:rgb(39, 170, 102)">Digital subcriber line - DSL: (thuê bao số)</span>
	- Use existing telephone line to central office DSLAM
		- Data over DSL phone line goes to Internet
		- Voice over DSL phone line goes to telephone network
- <span style="color:rgb(39, 170, 102)">Cable-based access</span>:
	- Frequency division multiplexing - FDM (phân chia kênh theo tần số)
	- Hybrid fiber coax - HFC (lai ghép cáp quang-đồng trục)
- <span style="color:rgb(39, 170, 102)">Home network:</span>
	![[Pasted image 20241019161145.png]]
- <span style="color:rgb(39, 170, 102)">Ethernet</span>:
	 ![[Pasted image 20241019161206.png]]
	 - Typically used in companies, university
- <span style="color:rgb(39, 170, 102)">Hosts: send packets of data</span>
	- Host sending function:
		- Take application message
		- Break into smaller chunk, known as <span style="color:rgb(0, 223, 255)">packet</span> of length <span style="color:rgb(0, 223, 255)">L</span> bits
		- Transmit packet into access network at <span style="color:rgb(0, 223, 255)">transmission rate R</span>
			- Link transmisison rate ~ link banwidth L/R
#### <span style="color:rgb(172, 255, 255)">Physical media</span>

### <span style="color:rgb(255, 179, 91)">1.4 The network core: packet switching, curcuit switching</span> 
#### <span style="color:rgb(172, 255, 255)">The network core</span>
![[Pasted image 20241019162128.png]]
##### Packet switching: 
- Host break application-layer message into packet-> forward packet from router to the next 
- <span style="color:rgb(0, 223, 255)">Store and forward</span>:
	- take $T = L/R$ sec to transmit L-bits packet into link at R bps
	- Entire packet must arrive at router before it can be transmitted on next link
- <span style="color:rgb(0, 223, 255)">Queueing delay, loss</span>:
	- Queueing: Occur when data arrive faster than it canbe service
	- If arrival rate to link exceeds transmission rate of link for a period of time:
		 ![[Pasted image 20241019164811.png]]
		- Packet will queue, wait to be transmited on link
		- Packet can be droped (lost) if memory buffer fill up
##### <span style="color:rgb(172, 255, 255)">Circuit switching</span>:
- FDM  and TDM: 
	- FDM - frequency division multiplexing:
		- Optical, electronmagnetic frequencies divided into frequency band (tần số quang,điện từ được chia thànhc các dải hẹp)
		- Each call allocate (phân bổ) its own band, can transmit at max rate of that narrow band 
	- TDM - time division multiplexing 
		- Time divided into slots
		- Each call allocated periodic slot -> transmit at max rate of frequency band during its time (phân bổ slot theo thời gian, có thể truyền ở tốc độ tối đa trên băng tần trong mỗi time slot)
## <span style="color:rgb(255, 105, 97)">2. Delay, Packet loss and throughput</span> 

### <span style="color:rgb(255, 179, 91)">How do packet delay and loss occur</span>

![[Pasted image 20241019212800.png]]
- Packet queue in router buffer, waiting for transmission
	- Queue length grow when arrival rate to link (temporalily) exceed output link capacity
- Packet loss occur when memory to hold queued packet fill up

### <span style="color:rgb(172, 255, 255)">4 source of packet delay</span>:
$$d_{nodal}=d_{proc}+ d_{queue} +d_{trans}+d_{prop}$$
- $d_{proc}$: nodal processing:
	- Check bit error
	- Determine output link
	- Typically < msec
- $d_{queue}$: queueing delay:
	- Time waiting at output link for transmission
	- Depend on congestion (tắc nghẽn) level of router
- $d_{trans}$: transmisison delay:
	- L: packet length
	- R: link banwidth
	-> $$d_{trans}=\frac{L}{R}$$
- $d_{prop}$: propagation delay:
	-  d: length of physical link
	- S: propagation speed in medium
	=> $$d_{prop}=\frac{d}{s}$$
### <span style="color:rgb(172, 255, 255)">Thoughput</span>
<span style="color:rgb(0, 223, 255)">Throughput</span> (thông lượng): rate (bits/time unit) at which bits transferred between sender/receiver
	<span style="color:rgb(0, 223, 255)">Instaneous</span> (tức thời): rate at given point in time
	<span style="color:rgb(0, 223, 255)">Average</span> (trung bình): rate over longer period of time

![[Pasted image 20241019220511.png]]
Internet scenario:
	Per-connection end-to-end throughput: min ($R_{c},R_{s},R/10$)
	In practice: $R_{c}$ or $R_{s}$ is often bottleneck
## <span style="color:rgb(255, 105, 97)">3. Protocol layers and Service models</span>

### <span style="color:rgb(255, 179, 91)">3.1. Layered architecture</span>
Protocol "Layers"
Network are complex with many piece:
	Hosts
	Routers
	Link/various media
	Application
	Protocol
	Hardware, software

=> why layering?
	Approad to dealing with complex system:
		Explixit structure (cấu trúc rõ ràng) allow identification, relationship of complex system's pieces
		Modulazation eases maintenance, update of system:
			Change of implemetation of layer's service transparent to rest of system

<span style="color:rgb(172, 255, 255)">Layered internet protocol stack</span> (các tầng giao thức của internet)
![[Pasted image 20241019225412.png]]
	<span style="color:rgb(0, 223, 255)">Application</span> (tầng ứng dụng): 
		supporting network application: FTP, SMTP(Simple Mail Transfer Protocol), HTTP
	<span style="color:rgb(0, 223, 255)">Transport</span> (tầng giao vận): 
		process-to-process data transfer (truyền dữ liệu giữa các tiến trình): TCP, UDP 
	<span style="color:rgb(0, 223, 255)">Network</span> (tầng mạng): 
		routing of datagram from source to destination: IP, routing protocol
	<span style="color:rgb(0, 223, 255)">Link</span> (tầng liên kết): 
		data transfer between neighboring network element
	<span style="color:rgb(0, 223, 255)">Physical</span> (tầng vật lý): 
		bits on the wire

<span style="color:rgb(172, 255, 255)">ISO/OSI reference model:</span>
	(ISO -> OSI (open system interconnection))
	![[Pasted image 20241019225424.png]]
	<span style="color:rgb(0, 223, 255)">Presentation</span>(tầng biểu diễn): allow application to interpret meaning of data
	<span style="color:rgb(0, 223, 255)">Session</span>(tầng phiên): synchronization, checkpointing, recovery of data exchange
	


## <span style="color:rgb(255, 105, 97)">4. Network security</span>


## <span style="color:rgb(255, 105, 97)">5. History</span> 