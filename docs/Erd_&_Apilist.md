# ERD & API List

## Ghi chú thiết kế ERD

1. **Table Users** là single table với role là kiểu enum(STUDENT,TEACHER,STAFF,MANAGER) thay vì phải tách riêng ra các bảng permission,role riêng vì các role có chung các kiểu thông tin cơ bản(email,phone,password) => đơn giản hóa việc query/authentication.

2.Các table **Course -> Class -> ScheduleSession** là kiến trúc 3 tầng với logic là: Course là template khóa học và trong 1 Course sẽ có nhiều Class và với mỗi 1 Class thì sẽ có những lịch học tương ứng.
Ex:
Course(Tiếng Anh Giao Tiếp) 
=> Class(Lớp TA cơ bản-T1/2026, Lớp TA nâng cao-T3/2026) 
=> ScheduleSession(06/01/2026 - 20:00->22:00, ...)

3. Table **Enrollment** là bảng trung gian giữa **Users(Student)** & **Class**, lưu trạng thái đăng ký và mọi **Payment** & **Attendance** đều gắn qua **Enrollment** thay vì gắn trực tiếp vào **Users(Student)** => bảo toàn dữ liệu.

4.Table **Payment** gắn với **Enrollment** để hỗ trợ nhiều đợt thanh toán(nếu **Course** là **MONTHLY**)

5.Table **Attendance** gắn với **Enrollment** & **ScheduleSession** để đảm bảo chỉ học sinh đăng kí khóa đó,lớp đó để đảm bảo chỉ học sinh mới có thể điểm danh những buổi học của lớp đó.

6.Table **Service** tách riêng khỏi bảng **ServiceRequest** vì nghiệp vụ yêu cầu nhân viên quản lí danh sách dịch vụ và **ServiceRequest** là yêu cầu khách hàng => không cần tạo tài khoản để tạo request.

7.TimeZone thống nhất theo nghiệp vụ **Asia/Ho_Chi_Minh**, tất cả date input/output dùng theo format **YYYY-MM-DD**

---

## API LIST

### AUTH
- POST `/auth/login` : Đăng nhập (role: ALL)

### COURSES
- GET `/courses` : danh sách khóa học (role: ALL)
- POST `/courses` : tạo khóa học (role: MANAGER)
- GET `/courses/:id`: xem chi tiết 1 khóa học(role: ALL)

### CLASSES
- GET `/classes`: danh sách lớp học (role: STAFF,MANAGER)
- POST `/classes`: tạo lớp học (role: MANAGER)

### ENROLLMENTS
- GET `/enrollments/me`: xem danh sách khóa đã mua (role: STUDENT)
- POST `/enrollments`: học sinh đăng kí khóa (role: STUDENT)
- PATCH `/enrollments/:id/status`: cập nhật trạng thái đăng kí (STAFF,MANAGER)

### PAYMENTS
- POST `/invoice/calc`: Tính học phí(role: ALL)
- POST `/payments`: Tạo thanh toán(role: STAFF,MANAGER)

### SCHEDULE
- POST `/schedule/generate`: Tạo lịch học(role: MANAGER)
- GET `/classes/:id/schedule`: Xem lịch buổi học của lớp (role: ALL)

### SERVICE
- GET `/services`: xem danh sách dịch vụ(role: STAFF,MANAGER)

### SERVICE REQUEST
- POST `/service-requests`: khách đặt dịch vụ
- GET `/service-requests`: danh sách dịch vụ khách đặt(role: STAFF,MANAGER)
- PATCH `/service-requests/:id/status`: cập nhật trạng thái(role: STAFF,MANAGER)