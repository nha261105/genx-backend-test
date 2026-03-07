# GenX Backend Test — Backend Developer (Node.js)

Bài test vòng 2 thực tập sinh Backend Developer tại GenX. Xây dựng REST API với Node.js + TypeScript, bao gồm logic tính lịch học, tính học phí và thiết kế ERD cho hệ thống quản lý giáo dục & dịch vụ công nghệ.

---

## Tech Stack

| Hạng mục | Công nghệ |
|---|---|
| Language | Nodejs(TypeScript) |
| Framework | Express |
| Validation | Zod |
| Testing | Jest |
| Date handling | dayjs |

---

## Kiến trúc thư mục

```
src/
├── routes/         # Định nghĩa HTTP routes, gắn với controllers
├── controllers/    # Nhận request, trả response, không chứa business logic
├── services/       # Business logic (scheduleService, invoiceService)
├── validators/     # Schema validation với Zod
└── utils/          # Các hàm tiện ích (date helpers, timezone)

tests/              # Unit tests cho services
docs/               # ERD & API list, ghi chú thiết kế,file .sql
```

---

## Yêu cầu môi trường

- Node.js >= 18.x
- npm >= 9.x

---

## Hướng dẫn chạy local

```bash
# 1. Clone repo
git clone https://github.com/nha261105/genx-backend-test.git
cd genx-backend-test

# 2. Cài dependencies
npm install

# 3. Chạy development server
npm run dev

# 4. Chạy production
npm start

# 5. Chạy tests
npm test
```

Server chạy tại: `http://localhost:3000`

---

## Phần A — Thiết kế

### ERD
Xem file `/docs/genx-backend-test.sql` hoặc ảnh `/docs/genx-backend-test.png`

Các entity chính:
- **Users** — role: STUDENT / TEACHER / STAFF / MANAGER
- **Courses** — template khóa học (MONTHLY / FULL_COURSE)
- **Class** — lớp học cụ thể mở từ Course
- **ScheduleSession** — từng buổi học được generate ra
- **Enrollment** — học viên đăng ký lớp
- **Payment** — thanh toán gắn với Enrollment
- **Attendance** — điểm danh gắn với Enrollment + ScheduleSession
- **Service** — danh sách dịch vụ công nghệ
- **ServiceRequest** — yêu cầu đặt dịch vụ từ khách hàng

Xem ghi chú thiết kế chi tiết tại `/docs/Erd_&Apilist.md`

### API List
Xem đầy đủ tại `/docs/Erd_&_Apilist.md`

---

## Ví dụ curl

### POST /schedule/generate
```text
UPDATE SAU
```

Response:
```text
UPDATE SAU
```
---

## Timezone & Rules

- **Timezone:** `Asia/Ho_Chi_Minh` — áp dụng cho toàn bộ hệ thống
- **Date format:** tất cả input/output dùng `YYYY-MM-DD`
- **holidayRanges:** inclusive cả 2 đầu (start date và end date đều được tính là ngày nghỉ)
- **classWeekdays:** quy ước `0 = Thứ Hai`, `1 = Thứ Ba`, ..., `6 = Chủ Nhật`