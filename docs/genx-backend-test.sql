CREATE TABLE `Users` (
  `id` integer PRIMARY KEY,
  `username` varchar(255),
  `password` varchar(255),
  `full_name` varchar(255),
  `phone` varchar(255),
  `email` varchar(255),
  `role` ENUM ('STUDENT', 'STAFF', 'MANAGER', 'TEACHER'),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `Courses` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) UNIQUE,
  `description` text,
  `types` ENUM ('MONTHLY', 'FULL_COURSE'),
  `base_price` decimal,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `Class` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `capacity` integer,
  `combo_book` varchar(255),
  `description` text,
  `start_date` timestamp,
  `end_date` timestamp,
  `link_ggmeet` text,
  `fk_course_id` integer,
  `fk_teacher_id` integer,
  `fk_staff_support_id` integer,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `ScheduleSession` (
  `id` integer PRIMARY KEY,
  `fk_class_id` integer,
  `study_date` date,
  `time_start` time,
  `time_end` time,
  `status` ENUM ('SCHEDULED', 'COMPLETED', 'CANCELED')
);

CREATE TABLE `Enrollment` (
  `id` integer PRIMARY KEY,
  `fk_user_id` integer,
  `fk_class_id` integer,
  `status` ENUM ('REGISTERED', 'CONSULTED', 'PAID', 'COMPLETED'),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `Payment` (
  `id` integer PRIMARY KEY,
  `fk_enrollment_id` integer,
  `amount` decimal,
  `months` integer,
  `promo_code` varchar(255),
  `discount` decimal,
  `refund` decimal,
  `total` decimal,
  `status` ENUM ('PENDING', 'PAID', 'OVERDUE'),
  `paid_at` timestamp,
  `due_date` date,
  `created_at` timestamp
);

CREATE TABLE `Attendance` (
  `id` integer PRIMARY KEY,
  `fk_enrollment_id` integer,
  `fk_schedule_session_id` integer,
  `status` ENUM ('PRESENT', 'ABSENT', 'LATE'),
  `created_at` timestamp
);

CREATE TABLE `Service` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) UNIQUE,
  `description` text,
  `price` decimal,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `ServiceRequest` (
  `id` integer PRIMARY KEY,
  `customer_name` varchar(255),
  `customer_email` varchar(255),
  `customer_phone` varchar(255),
  `fk_staff_id` integer,
  `fk_service_id` integer,
  `rating` integer,
  `notes` text,
  `status` ENUM ('PENDING', 'CONSULTED', 'COMPLETED', 'CANCELED'),
  `created_at` timestamp,
  `updated_at` timestamp
);

ALTER TABLE `Class` ADD FOREIGN KEY (`fk_course_id`) REFERENCES `Courses` (`id`);

ALTER TABLE `Class` ADD FOREIGN KEY (`fk_teacher_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Class` ADD FOREIGN KEY (`fk_staff_support_id`) REFERENCES `Users` (`id`);

ALTER TABLE `ScheduleSession` ADD FOREIGN KEY (`fk_class_id`) REFERENCES `Class` (`id`);

ALTER TABLE `Enrollment` ADD FOREIGN KEY (`fk_user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Enrollment` ADD FOREIGN KEY (`fk_class_id`) REFERENCES `Class` (`id`);

ALTER TABLE `Payment` ADD FOREIGN KEY (`fk_enrollment_id`) REFERENCES `Enrollment` (`id`);

ALTER TABLE `Attendance` ADD FOREIGN KEY (`fk_enrollment_id`) REFERENCES `Enrollment` (`id`);

ALTER TABLE `Attendance` ADD FOREIGN KEY (`fk_schedule_session_id`) REFERENCES `ScheduleSession` (`id`);

ALTER TABLE `ServiceRequest` ADD FOREIGN KEY (`fk_service_id`) REFERENCES `Service` (`id`);

ALTER TABLE `ServiceRequest` ADD FOREIGN KEY (`fk_staff_id`) REFERENCES `Users` (`id`);
