# GenX Backend Test — Backend Developer (Node.js)

Bài test vòng 2 thực tập sinh Backend Developer tại GenX. Xây dựng REST API với Node.js + TypeScript, bao gồm logic tính lịch học, tính học phí và thiết kế ERD cho hệ thống quản lý giáo dục & dịch vụ công nghệ.

---

## Tech Stack

| Hạng mục      | Công nghệ          |
| ------------- | ------------------ |
| Runtime       | Nodejs             |
| Language      | TypeScript         |
| Framework     | Express            |
| Validation    | Zod                |
| Testing       | Jest               |
| Date handling | dayjs              |

---

## Kiến trúc thư mục

```
src/
├── routes/         # Định nghĩa HTTP routes, gắn với controllers
├── controllers/    # Nhận request, trả response, không chứa business logic
├── services/       # Business logic (scheduleService, invoiceService)
├── validations/     # Schema validation với Zod
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

### 1. POST /schedule/generator

Tạo lịch học tự động, bỏ qua ngày lễ và khoảng nghỉ.

**Request:**

```bash
curl -X POST http://localhost:3000/schedule/generator \
  -H "Content-Type: application/json" \
  -d '{
    "startDate": "2026-01-26",
    "totalClasses": 10,
    "classWeekdays": [0, 1, 2, 3, 4],
    "holidays": ["2026-01-01"],
    "holidayRanges": [["2026-01-29", "2026-02-01"]]
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "endDate": "2026-02-10",
    "fullSchedule": [
      "2026-01-26",
      "2026-01-27",
      "2026-01-28",
      "2026-02-02",
      "2026-02-03",
      "2026-02-04",
      "2026-02-05",
      "2026-02-06",
      "2026-02-09",
      "2026-02-10"
    ]
  }
}
```

---

### 2. POST /invoice/calc

Tính học phí với promo code và refund.

**Request:**

```bash
curl -X POST http://localhost:3000/invoice/calc \
  -H "Content-Type: application/json" \
  -d '{
    "courseType": "MONTHLY",
    "basePrice": 1000000,
    "months": 3,
    "promoCode": "SAVE10",
    "canceledClasses": 2,
    "refundPerClass": 50000
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "subtotal": 3000000,
    "discount": 300000,
    "refund": 100000,
    "total": 2600000
  }
}
```

**Giải thích:**

- `subtotal = basePrice × months = 1,000,000 × 3 = 3,000,000`
- `discount = floor(subtotal × 10%) = 300,000` (SAVE10)
- `refund = canceledClasses × refundPerClass = 2 × 50,000 = 100,000`
- `total = subtotal - discount - refund = 2,600,000`

---

## Timezone & Rules

### Timezone

- **Timezone:** `Asia/Ho_Chi_Minh (UTC+7)`
- Tất cả logic xử lý ngày tháng đều theo timezone này

### Date Format

- **Format:** `YYYY-MM-DD` (ISO 8601)
- Ví dụ: `2026-01-29`, `2026-12-31`
- Tất cả input/output API đều dùng format này

### Holiday Ranges Rule

- **Inclusive:** Cả `startDate` và `endDate` đều được tính là ngày nghỉ
- Ví dụ: `["2026-01-29", "2026-02-01"]` nghĩa là nghỉ 4 ngày: 29/1, 30/1, 31/1, 01/2
- Các ngày nằm trong khoảng này sẽ bị bỏ qua khi tạo lịch học

### Class Weekdays

- **Quy ước:** `0 = Thứ Hai`, `1 = Thứ Ba`, `2 = Thứ Tư`, `3 = Thứ Năm`, `4 = Thứ Sáu`, `5 = Thứ Bảy`, `6 = Chủ Nhật`
- Ví dụ: `[0, 2, 4]` = học các ngày Thứ Hai, Thứ Tư, Thứ Sáu

---

## Testing

Chạy unit tests cho tất cả services:

```bash
npm test
```

**Test Coverage:**

- Bài 2 (calcInvoice): 8 test cases
- Bài 3 (generateSchedule): 6 test cases
- Edge cases: clamp, invalid input, holiday ranges
