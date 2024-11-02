## <span style="color:rgb(255, 105, 97)">I. Components of computer system</span>

| User             |
|:---------------- |
| Programme        |
| Operating System |
| Hardware         |

- Hardware: 
	- Provide the necessary resources for calculation and data processing
- Software:
	- specific programs
- OS:
	- <span style="color:rgb(0, 223, 225)">software Acts as an intermediary between the hardware and the user's application program</span>, making the use of the computer system convenient and efficient
## <span style="color:rgb(255, 105, 97)">II. Operating System concept</span>
### <span style="color:rgb(255, 179, 91)">1. Resource management</span>
- <span style="color:rgb(187, 154, 177)">Operating system</span>: is defined through the purpose, role, and function within a computer system
	- Resource management
	- Manage implementation of programs
- Ensure system resources are used effectively and efficiently
- <span style="color:rgb(187, 154, 177)">Resources</span>: processor (CPU), main memory, external memory, I/O devices
- <span style="color:rgb(0, 223, 225)">Allocating resources to application efficiently</span>: // phân phối tài nguyên hiệu quả
	- Resource requests are received by the OS and fulfilled by granting the program the corresponding resource // yêu cầu tài nguyên HDH nhận và đáp ứng cho các chương trình các tài nguyên cần thiết
	- The OS needs to store resource status
- Make sure <span style="color:rgb(0, 223, 225)">not to infringe on resources allocated to other</span> program // đảm bảo không xâm phạm tài nguyên của ctr khác 

### <span style="color:rgb(255, 179, 91)">2. Manage implementation of programs</span>
- The <span style="color:rgb(0, 223, 225)">most important task</span> of a computer is <span style="color:rgb(0, 223, 225)">to execute the program</span>, a running program is called a process
- The <span style="color:rgb(0, 223, 225)">program</span> need to be managed to <span style="color:rgb(0, 223, 225)">execute smootlhly</span>, <span style="color:rgb(0, 223, 225)">avoid error</span> and ensure an environtment for the constructor and implementation of the prog to be favorable // ctr cần được quản lý để thực hiện thuận lợi, tránh lỗi, đồng thời đảm bảo môi trường ổn định
- To run the prog, need to perform certain operations => the OS makes running program easier, users dont need to perform operation
- To create a favorable environtment for the program, the OS create VM(virtual machines)
	- Some of the best VM:
		- VirtualBox
		- Parallels
		- VMware
		- Boot Camp
		- QEMU (linux)
## <span style="color:rgb(255, 105, 97)">III. Services provided by the OS</span>

- 1 of the <span style="color:rgb(0, 223, 225)">main tasks of the OS is to create a favorable environment</span> for other progs to execute and make it ez for user
- <span style="color:rgb(0, 223, 225)">Service</span> may <span style="color:rgb(0, 223, 225)">vary by OS</span> // dịch vụ có thể thay đổi theo từng HDH 
## <span style="color:rgb(255, 105, 97)">IV. Programming interface of the OS</span>

- In order for programs to use services, the OS provide a programming interface
- This interface include system calls that the program uses to request a service from the OS
- System calls: special commands that Application calls when it needs to ask the Operating System to do something.
- System calls are made through function libraries called system libraries. These functions will help the programmer call the corresponding system calls of the operating system.
## <span style="color:rgb(255, 105, 97)">V. Development process  and some important concepts</span>

## <span style="color:rgb(255, 105, 97)">VI. OS structure</span>

### <span style="color:rgb(255, 179, 91)">1. OS component</span>
- An OS is a <span style="color:rgb(0, 223, 225)">complex software system made up of many components</span> that <span style="color:rgb(0, 223, 225)">perform different tasks or provide different services</span>. The components perform the following task:
	- <span style="color:rgb(172, 255, 255)">Process management</span>:
		- A program in progress is a process
		- Create and delete processes
		- Suspend and restore suspended processes // Tạm treo và khôi phục các tiền trình treo
		- Synchronization of processes // đồng bộ các tiến trình
		- Resolve deadlock // giải quyết các xung đột tài nguyên 

	- <span style="color:rgb(172, 255, 255)">Memory management</span>
		- Manage, supply and release
		- Provide and release memory as required by processes
		- Manage allocate memory space and free space // quản lý không gian nhớ đã cấp và không gian trống
		- Creates virtual memory and maps virtual memory addresses to real memory// tạo bộ nhớ ảo và ánh xạ địa chỉ bộ nhớ ảo vào bộ nhớ thực

	- <span style="color:rgb(172, 255, 255)">I/O management</span>
		- Management through control programs
		- Simplify and increase the efficiency of information exchange between processes and input and output devices
	- <span style="color:rgb(172, 255, 255)">Manage files and folders</span>
		- Create and delete files and directories
		- Read and write file
	- <span style="color:rgb(172, 255, 255)">Network and distributed processing support</span>
		- Manage network devices
		- Supports communication protocol
		- Communication management, load balancing
	- <span style="color:rgb(172, 255, 255)">User interface</span>
	- <span style="color:rgb(172, 255, 255)">Utility programs and applications</span>
### <span style="color:rgb(255, 179, 91)">2. Kernel OS (nhân của hdh)</span>

- HDH gồm rất nhiều thành phần, tuy nhiên độ quan trọng của từng thành phần là khác nhau
	-> chỉ tải những thành phần <span style="color:rgb(0, 223, 225)">quan trọng không thể thiếu</span> được vào bộ nhớ (<span style="color:rgb(0, 223, 225)">nhân</span>)

- <span style="color:rgb(0, 223, 225)">Kernel</span> (nhân) là <span style="color:rgb(0, 223, 225)">cốt lõi thực hiện các chức năng cơ bản</span> nhất của HDH và <span style="color:rgb(0, 223, 225)">thường xuyên được giữ trong bộ nhớ </span>

- Modern computer are often designed with 2 program execution mode:
	- Kernel run in privileged mode - <span style="color:rgb(0, 223, 225)">kernel mode</span>: the program executes in which it has full access and control rights to the computer hardware
	- <span style="color:rgb(0, 223, 225)">User mode</span>

- The distinction between kernel mode and user mode is intended to prevent Application from accidentally or intentionally performing operation that affect the system

### <span style="color:rgb(255, 179, 91)">3. Some OS structure</span>

#### <span style="color:rgb(255, 238, 140)">Monolithic structure:</span>
- All progs and data of the OS share the same memory space - a single block
- The OS becomes a collection of procedures (thủ tục) or subprogram

|                  Advantage                  |                            Disadvantage                             |
| :-----------------------------------------: | :-----------------------------------------------------------------: |
| Fast<br>No time wasted between memory space | Not safe<br>Notflexible <br>Difficult to modify, adding or removing |

#### <span style="color:rgb(255, 238, 140)">Layered structure</span>
- Component are divided into layers that overlap each other
- Each layer canonly:
	- Communicate with the layer above
	- Use services provided by the layer immediately below

|    Advantage     |        Disadvantage        |
| :--------------: | :------------------------: |
| Divided function |    Difficult to design     |
|    Ez to use     | Slower speed than monolith |
| Ez to fix error  | ****                           |

## <span style="color:rgb(255, 105, 97)">VII. Some specific operating system</span>

- UNIX
- MINIX
- LINUX
- MS-DOS
- WINDOW NT