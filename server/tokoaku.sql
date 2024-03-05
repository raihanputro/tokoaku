-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2024 at 07:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tokoaku`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `item_id`, `user_id`, `price`, `qty`, `createdAt`, `updatedAt`) VALUES
(93, 4, 5, 5000, 1, '2024-03-01 09:29:04', '2024-03-01 09:29:04'),
(111, 1, 2, 2700, 3, '2024-03-05 17:28:21', '2024-03-05 17:30:21');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(225) DEFAULT NULL,
  `icon` text DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `icon`, `author_id`, `createdAt`, `updatedAt`) VALUES
(5, 'Jajanan', 'http://localhost:5000/chocolate-bar.png', 1, '2024-02-28 15:00:20', '2024-02-28 15:00:20'),
(6, 'Minuman', 'http://localhost:5000/strawberry-milkshake.png', 1, '2024-02-28 15:34:46', '2024-02-28 15:34:46'),
(7, 'Mainan', 'http://localhost:5000/train.png', 1, '2024-02-28 15:35:47', '2024-02-28 15:35:47'),
(8, 'Obat', 'http://localhost:5000/pills-bottle.png', 1, '2024-02-28 15:40:51', '2024-02-28 15:40:51'),
(9, 'Atk', 'http://localhost:5000/pencil.png', 1, '2024-02-28 15:42:41', '2024-02-28 15:42:41'),
(10, 'Sembako', 'http://localhost:5000/fertilizer-bag.png', 1, '2024-02-28 15:46:56', '2024-02-28 15:46:56');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT 0,
  `discount` int(11) DEFAULT 0,
  `stock` int(11) DEFAULT 0,
  `sold` int(11) DEFAULT 0,
  `rating` int(11) DEFAULT 0,
  `img` text DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `category_id`, `name`, `desc`, `price`, `discount`, `stock`, `sold`, `rating`, `img`, `author_id`, `createdAt`, `updatedAt`) VALUES
(1, 10, 'Indomie Goreng', 'Indomie terbuat dari tepung terigu berkualitas dengan paduan rempah rempah pilihan terbaik dan diproses dengan higienis menggunakan standar internasional dan teknologi berkualitas tinggi Juga diperkaya tambahan fortifikasi mineral dan vitamin A B1 B6 B12 ', 3000, 10, 5, 0, 0, 'http://localhost:5000/2-removebg-preview1.png', 1, '2024-02-21 03:20:59', '2024-02-29 04:21:33'),
(2, 10, 'Indomie Soto Mie', 'Kali ini Indofood menghadirkan varian rasa Indomie soto. Salah satu karakteristik mie instan soto adalah kemasannya berwarna hijau cerah.', 2900, 10, 10, 5, 2, 'http://localhost:5000/3-removebg-preview_(1).png', 1, '2024-02-21 06:31:31', '2024-03-05 05:33:00'),
(3, 6, 'Ultra Milk Coklat 200 ml', 'Ultra Milk merupakan minuman susu segar yang baik untuk dikonsumsi setiap hari serta cocok untuk diminum setelah beraktivitas atau berolahraga. Ultra Milk efektif untuk memenuhi Kembali cairan tubuh dan membantu pembentukan tubuh.', 4000, 0, 0, 4, 5, 'http://localhost:5000/11-removebg-preview.png', 1, '2024-02-27 08:31:14', '2024-03-05 12:11:26'),
(4, 6, 'Ultra Milk Full Cream 200 ml', 'Ultra Milk merupakan minuman susu segar yang baik untuk dikonsumsi setiap hari serta cocok untuk diminum setelah beraktivitas atau berolahraga. Ultra Milk efektif untuk memenuhi Kembali cairan tubuh dan membantu pembentukan tubuh.', 5000, 0, -1, 1, 0, 'http://localhost:5000/12-removebg-preview.png', 1, '2024-02-27 08:43:39', '2024-03-04 03:01:47'),
(5, 10, 'Indomie Rendang', 'Indomie mempunyai varian mie goreng rasa rendang yang khas, lezat dan diolah dengan higienis sehingga aman untuk dikonsumsi siapapun. Mie ini dilengkapi dengan bumbu pelengkap yang lezat dan akan memberikan kenikmatan lebih di lidah Anda.', 3399, 0, 0, 0, 0, 'http://localhost:5000/5-removebg-preview.png', 1, '2024-02-28 13:23:43', '2024-02-29 04:23:56'),
(6, 5, 'Nutrisari Sweet Guava', 'Nutrisari Sweet Guava memiliki Rasa jambu yang manis, Memenuhi 100% kebutuhan vitamin C, Diperkaya juga dengan vitamin A, B1, B3, B6, asam folat dan E, serta mineral kalsium & fosfor, Diolah dengan teknologi tinggi (granulasi dan enkapsulasi) agar kualita', 2000, 0, 9, 0, 0, 'http://localhost:5000/Desain_tanpa_judul__4_-removebg-preview.png', 1, '2024-02-28 13:25:07', '2024-03-05 13:14:21');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `transaction_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `transaction_id`, `item_id`, `item_name`, `qty`, `price`, `createdAt`, `updatedAt`) VALUES
(61, 58, 3, 'Ultra Milk Coklat 200 ml', 1, 4000, '2024-03-05 03:41:04', '2024-03-05 03:41:04'),
(62, 59, 2, 'Indomie Soto Mie', 1, 2900, '2024-03-05 03:52:29', '2024-03-05 03:52:29'),
(63, 60, 2, 'Indomie Soto Mie', 1, 2900, '2024-03-05 05:16:40', '2024-03-05 05:16:40'),
(64, 61, 3, 'Ultra Milk Coklat 200 ml', 3, 4000, '2024-03-05 12:11:26', '2024-03-05 12:11:26'),
(65, 62, 6, 'Nutrisari Sweet Guava', 2, 2000, '2024-03-05 13:14:21', '2024-03-05 13:14:21');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `transaction_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `transaction_id`, `item_id`, `rating`, `comment`, `createdAt`, `updatedAt`) VALUES
(56, 2, 58, 3, 5, 'Pelayanan yang bgus!', '2024-03-05 03:50:15', '2024-03-05 03:51:52'),
(59, 2, 59, 2, 4, 'mantap mangf', '2024-03-05 04:30:47', '2024-03-05 05:36:10'),
(60, 2, 60, 0, 1, 'testdss', '2024-03-05 05:33:00', '2024-03-05 05:35:08'),
(61, 2, 60, 2, 1, 'testdss', '2024-03-05 05:33:00', '2024-03-05 05:35:08');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240201023108-create-user.js'),
('20240201023431-create-item.js'),
('20240201023528-create-cart.js'),
('20240202100110-create-code-otp.js'),
('20240206033011-create-item.js'),
('20240206034238-create-item.js'),
('20240220031818-create-category.js'),
('20240220073219-test.js'),
('20240221153505-create-wishlist.js'),
('20240223033933-modify_users_add_new_fields.js'),
('20240223040210-modify_users_add_new_fields.js'),
('20240225023638-create-transaction.js'),
('20240225024403-create-order.js'),
('20240226024748-addNewFieldTransactions.js'),
('20240226075323-create-review.js'),
('20240227141539-modify_items_add_new_fields.js');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `service` varchar(255) DEFAULT NULL,
  `shippingCost` int(11) DEFAULT NULL,
  `subtotal` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `orderAt` datetime DEFAULT NULL,
  `expiryAt` datetime DEFAULT NULL,
  `snap_token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `fullName`, `address`, `phone`, `province`, `city`, `service`, `shippingCost`, `subtotal`, `total`, `status`, `orderAt`, `expiryAt`, `snap_token`, `createdAt`, `updatedAt`) VALUES
(58, 2, 'Raihan Putro Maulana Rizky', 'Jl. Cipedak Raya Rt 07 Rw 09', '085156637952', 'DKI Jakarta', 'Jakarta Selatan', 'cod', 0, 4000, 4000, 'SUCCESS', '2024-03-05 03:41:04', '2024-03-06 03:41:04', '9f3d6b7c-af47-4034-9348-87bb56e81337', '2024-03-05 03:41:04', '2024-03-05 03:41:28'),
(59, 2, 'Raihan Putro Maulana Rizky', 'Jl. Cipedak Raya Rt 07 Rw 09', '085156637952', 'DKI Jakarta', 'Jakarta Selatan', 'cod', 0, 2900, 2900, 'SUCCESS', '2024-03-05 03:52:29', '2024-03-06 03:52:29', '9ad06b05-ccf4-497c-8e7a-ccbf3d6d19ad', '2024-03-05 03:52:29', '2024-03-05 03:53:00'),
(60, 2, 'Raihan Putro Maulana Rizky', 'Jl. Cipedak Raya Rt 07 Rw 09', '085156637952', 'DKI Jakarta', 'Jakarta Selatan', 'cod', 0, 2900, 2900, 'SUCCESS', '2024-03-05 05:16:40', '2024-03-06 05:16:40', 'f37ca14a-b4f2-4016-807b-57343aa839c2', '2024-03-05 05:16:40', '2024-03-05 05:17:21'),
(61, 3, 'tets', 'test', 'ste', 'Jambi', 'Sarolangun', 'tiki', 56000, 12000, 68000, 'PENDING', '2024-03-05 12:11:26', '2024-03-06 12:11:26', '6e66ad3e-39be-4dee-878e-c4f6d9330c07', '2024-03-05 12:11:26', '2024-03-05 12:11:26'),
(62, 2, 'Raihan Putro Maulana Rizky', 'Jl. Cipedak Raya Rt 07 Rw 09', '085156637952', 'DKI Jakarta', 'Jakarta Selatan', 'jne', 14000, 4000, 18000, 'PENDING', '2024-03-05 13:14:21', '2024-03-06 13:14:21', '2ece5ae9-6449-496c-a885-1a2998e19449', '2024-03-05 13:14:21', '2024-03-05 13:14:21');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `province_id` varchar(255) DEFAULT '0',
  `city_id` varchar(255) DEFAULT '0',
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `photo` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `fullName`, `address`, `province_id`, `city_id`, `phone`, `role`, `photo`, `createdAt`, `updatedAt`) VALUES
(1, 'raihanworks461@gmail.com', '$2a$10$mgSHVS.7oThFQ8w5P1IeBOBEYk0grN2o1OMYRzJMsWxEsH6zjmBOW', 'raihanptro', NULL, NULL, NULL, NULL, NULL, 'Admin', NULL, '2024-02-19 04:27:30', '2024-02-19 04:27:30'),
(2, 'raihanputromaulana477@gmail.com', '$2a$10$Ev.AgYHvaacjV3XoCUI6xe0SblEkoD83fSd3PyfZSsv23LFPgCxo6', 'raihanptro461', 'Raihan Putro Maulana Rizky', 'Jl. Cipedak Raya Rt 07 Rw 09', '6', '153', '085156637952', 'Customer', 'http://localhost:5000/WhatsApp Image 2023-07-09 at 19.51.37.jpg', '2024-03-05 03:33:11', '2024-03-05 03:34:30'),
(3, 'raihanputramaulana477@gmail.com', '$2a$10$Elb8Vb/6rTeDyWINE7pNvuUJvpzSH7BPXP3bCB2vfliGoQnpZAXk6', 'raihanputra41', NULL, NULL, '0', '0', NULL, 'Customer', NULL, '2024-03-05 11:25:45', '2024-03-05 11:25:45');

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`id`, `user_id`, `item_id`, `createdAt`, `updatedAt`) VALUES
(102, 2, 2, '2024-02-27 14:03:34', '2024-02-27 14:03:34'),
(103, 5, 2, '2024-03-01 06:50:52', '2024-03-01 06:50:52'),
(104, 5, 3, '2024-03-01 06:50:53', '2024-03-01 06:50:53'),
(105, 2, 3, '2024-03-05 13:24:32', '2024-03-05 13:24:32'),
(106, 2, 4, '2024-03-05 13:24:33', '2024-03-05 13:24:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
