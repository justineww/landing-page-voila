-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2026 at 10:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `voila_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `catalog_requests`
--

CREATE TABLE `catalog_requests` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `catalog_requests`
--

INSERT INTO `catalog_requests` (`id`, `name`, `email`, `message`, `created_at`) VALUES
(1, 'Justine', 'cjustinew22@gmail.com', 'saya ingin mendownload ktaalognya', '2026-05-10 08:19:12');

-- --------------------------------------------------------

--
-- Table structure for table `home_contents`
--

CREATE TABLE `home_contents` (
  `id` int(11) NOT NULL,
  `content_type` varchar(100) NOT NULL,
  `text_value` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_contents`
--

INSERT INTO `home_contents` (`id`, `content_type`, `text_value`, `image_url`, `updated_at`) VALUES
(1, 'hero_title', 'Selamat Datang di Voila', NULL, '2026-05-07 17:37:57'),
(2, 'hero_description', 'Deskripsi website Anda', NULL, '2026-05-07 17:37:57'),
(3, 'about_us', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, '2026-05-07 18:40:21'),
(4, 'welcome_heading', '', NULL, '2026-05-07 17:47:01'),
(5, 'welcome_paragraph', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ', NULL, '2026-05-09 15:57:49'),
(6, 'project_paragraph', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', NULL, '2026-05-07 18:54:05'),
(7, 'project_stat_country', '23', NULL, '2026-05-07 18:53:44'),
(8, 'project_stat_type', '23', NULL, '2026-05-07 18:53:50'),
(9, 'project_stat_total', '250', NULL, '2026-05-07 18:53:32'),
(10, 'contact_phone', '-', NULL, '2026-05-08 15:59:42'),
(11, 'contact_email', 'example@com', NULL, '2026-05-08 15:59:42'),
(12, 'contact_ig', '-', NULL, '2026-05-08 15:59:42'),
(13, 'contact_web', '-', NULL, '2026-05-08 15:59:42'),
(14, 'contact_office', '-', NULL, '2026-05-08 15:59:42'),
(15, 'contact_factory', '-', NULL, '2026-05-08 15:59:42');

-- --------------------------------------------------------

--
-- Table structure for table `home_sliders`
--

CREATE TABLE `home_sliders` (
  `id` int(11) NOT NULL,
  `slider_type` varchar(100) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_sliders`
--

INSERT INTO `home_sliders` (`id`, `slider_type`, `image_url`, `sort_order`, `created_at`) VALUES
(1, 'hero_banner', '1778175525926-ulun-danu-bali-2026-03-16-06-29-15-utc.jpg', 0, '2026-05-07 17:38:46'),
(2, 'hero_banner', '1778175526018-ancient-temple-illumination-of-pura-ulun-danu-brat-2026-01-09-08-05-21-utc.jpg', 1, '2026-05-07 17:38:46'),
(3, 'hero_banner', '1778175526045-ulun-danu-temple-2026-03-16-06-08-05-utc.jpg', 2, '2026-05-07 17:38:46'),
(4, 'hero_banner', '1778175526051-pura-ulun-danu-bratan-at-sunrise-famous-temple-on-2026-03-09-23-13-17-utc.jpg', 3, '2026-05-07 17:38:46'),
(5, 'side_image', '1778175824040-ulun-danu-bali-2026-03-16-06-29-15-utc.jpg', 0, '2026-05-07 17:43:44'),
(6, 'side_image', '1778175824112-ancient-temple-illumination-of-pura-ulun-danu-brat-2026-01-09-08-05-21-utc.jpg', 1, '2026-05-07 17:43:44'),
(7, 'side_image', '1778175824140-ulun-danu-temple-2026-03-16-06-08-05-utc.jpg', 2, '2026-05-07 17:43:44'),
(8, 'side_image', '1778175824151-pura-ulun-danu-bratan-at-sunrise-famous-temple-on-2026-03-09-23-13-17-utc.jpg', 3, '2026-05-07 17:43:44'),
(9, 'about_gallery', '1778178858925-airport-check-in-2024-10-18-04-29-37-utc.jpg', 0, '2026-05-07 18:34:18'),
(10, 'about_gallery', '1778178858957-2151700740.jpg', 0, '2026-05-07 18:34:18'),
(11, 'about_gallery', '1778178858961-dark-fantasy-scene.jpg', 0, '2026-05-07 18:34:18'),
(13, 'about_side_image', '1778255749396-pura-ulun-danu-bratan-at-sunrise-famous-temple-on-2026-03-09-23-13-17-utc.jpg', 0, '2026-05-08 15:55:49'),
(15, 'contact_image', '1778343918363-cropped-shot-of-unrecognizable-woman-freelancer-ea-2025-01-24-01-55-22-utc.jpg', 0, '2026-05-09 16:25:18');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_code` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `sub_category` varchar(100) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_code`, `title`, `category`, `sub_category`, `image_url`, `description`, `created_at`) VALUES
(1, 'waefewf', 'wefawef', 'Indoor', 'Kursi', '1778345056222-1221312022-kampung-teletubbies-2.jpg', 'awfawfwf', '2026-05-07 18:13:29'),
(2, 'awefawefw', 'awfawefaw', 'Indoor', 'Meja', '1778345037510-beautiful-white-mosque-at-sunset-2026-01-08-08-24-13-utc.jpg', 'awfawfawefawef', '2026-05-07 18:22:42'),
(4, 'se5gserg', 'segsergserg', 'Indoor', 'Sofa', '1778345029980-pura-ulun-danu-bratan-at-sunrise-famous-temple-on-2026-03-09-23-13-17-utc.jpg', 'segsergsegsegse', '2026-05-07 18:24:04'),
(5, 'esgsegsegesg', 'segsegsegseg', 'Indoor', 'Sofa', '1778345018958-ancient-temple-illumination-of-pura-ulun-danu-brat-2026-01-09-08-05-21-utc.jpg', 'segsegsegergseg', '2026-05-07 18:24:15'),
(6, 'sergergse', 'segsegserg', 'Indoor', 'Sofa', '1778345007773-ulun-danu-bali-2026-03-16-06-29-15-utc.jpg', 'esgergserg', '2026-05-07 18:24:43'),
(8, 'wewevwev', 'vweewvwev', 'Outdoor', 'Kursi Taman', '1778345479941-beautiful-white-mosque-at-sunset-2026-01-08-08-24-13-utc.jpg', 'wevwvwevwev', '2026-05-09 16:51:19'),
(9, 'wevwevwev', 'wevwevwv', 'Outdoor', 'Kursi Taman', '1778345492849-ulun-danu-bali-2026-03-16-06-29-15-utc.jpg', 'vwevewwevwe', '2026-05-09 16:51:32'),
(12, 'wrgerger', 'wvwevwev', 'Outdoor', 'Kursi Taman', '1778345515487-ancient-temple-illumination-of-pura-ulun-danu-brat-2026-01-09-08-05-21-utc.jpg', 'wvwevwev', '2026-05-09 16:51:55'),
(13, 'erberberb', 'eberbverb', 'Outdoor', 'Kursi Taman', '1778345526235-ulun-danu-temple-2026-03-16-06-08-05-utc.jpg', 'erberberberberb', '2026-05-09 16:52:06'),
(14, '2r23bveb', 'ebwerb', 'Outdoor', 'Kursi Taman', '1778345549340-1221312022-kampung-teletubbies-2.jpg', 'wevwvwev', '2026-05-09 16:52:29'),
(15, 'ww4ehg3 g ', 'aw 4gaw4 ', 'Outdoor', 'Meja Teras', '1778345653213-beautiful-white-mosque-at-sunset-2026-01-08-08-24-13-utc.jpg', ' awgwgw4g', '2026-05-09 16:54:13'),
(16, 'weqgv3 4g34g q', 'gq3 gq3 q34g ', 'Outdoor', 'Meja Teras', '1778345662727-ulun-danu-bali-2026-03-16-06-29-15-utc.jpg', 'q3g q3gq3g q34', '2026-05-09 16:54:22'),
(17, 'q43f 34fq34q', 'q3 q34fq3f ', 'Outdoor', 'Meja Teras', '1778345673111-ancient-temple-illumination-of-pura-ulun-danu-brat-2026-01-09-08-05-21-utc.jpg', ' q4fq3fq3f q3', '2026-05-09 16:54:33'),
(18, 'q2f 23f2f q23fq2', 'q2f23 q23 f', 'Outdoor', 'Meja Teras', '1778345685567-pura-ulun-danu-bratan-at-sunrise-famous-temple-on-2026-03-09-23-13-17-utc.jpg', 'qw3fq 3fqf3qwff', '2026-05-09 16:54:45'),
(19, 'w3qfq2 w3f qfq3w fq3', 'f2', 'Outdoor', 'Kursi Taman', '1778345714483-document-data-archive-storage-computer-laptop-iso-2024-12-07-22-59-57-utc.jpg', '2qf', '2026-05-09 16:55:14'),
(20, 'awe vwe vawev', 'wfwvaw vaw evaw', 'Outdoor', 'Kursi Taman', '1778345741720-dark-fantasy-scene.jpg', 'wav wevwev awevwev', '2026-05-09 16:55:41'),
(21, 'aes4ra erv erv a', 'a wervwer', 'Outdoor', 'Kursi Taman', '1778345760998-358029085_b680857d-b12c-4c76-ab1e-bfe81954b95d.jpg', 'a vvwvawev', '2026-05-09 16:56:01'),
(22, 'awaw at3', ' awfa wf', 'Craft', 'Lampu Hias', '1778346301505-beautiful-white-mosque-at-sunset-2026-01-08-08-24-13-utc.jpg', 'wa fwfw3faw', '2026-05-09 17:05:01'),
(23, 'awf awefawe fawef', 'a wfawe fawf aw', 'Craft', 'Patung Kayu', '1778346325772-ulun-danu-bali-2026-03-16-06-29-15-utc.jpg', 'awsef awe fawse fawsee fawsefawef', '2026-05-09 17:05:25'),
(24, 'waf awfawf aw3f', 'waefa wef a', 'Craft', 'Patung Kayu', '1778346344632-ancient-temple-illumination-of-pura-ulun-danu-brat-2026-01-09-08-05-21-utc.jpg', ' wafawfwef awfawf', '2026-05-09 17:05:44'),
(25, ' w4g', 'w4w5 g45 gw4', 'Craft', 'Patung Kayu', '1778346375777-cropped-shot-of-unrecognizable-woman-freelancer-ea-2025-01-24-01-55-22-utc.jpg', 'gw45g 45g', '2026-05-09 17:06:15'),
(26, '4gw4g 4', ' w4g w45', 'Craft', 'Patung Kayu', '1778346386400-pura-ulun-danu-bratan-at-sunrise-famous-temple-on-2026-03-09-23-13-17-utc.jpg', ' w45gw45 g  w', '2026-05-09 17:06:26');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `image_url`, `title`, `description`, `created_at`) VALUES
(1, '1778180320311-beautiful-white-mosque-at-sunset-2026-01-08-08-24-13-utc.jpg', 'Vila Bali Interior', ' wajfwejkfn awjenfjw knefakjwn fjkawn fkajwnef jawnefjwn jfnw fjwnfjawnefwef', '2026-05-07 18:58:40'),
(2, '1778180375572-ulun-danu-bali-2026-03-16-06-29-15-utc.jpg', 'Vila Bali Interior', 'wajfwejkfn awjenfjw knefakjwn fjkawn fkajwnef jawnefjwn jfnw fjwnfjawnefwef', '2026-05-07 18:59:35'),
(3, '1778180432534-ulun-danu-temple-2026-03-16-06-08-05-utc.jpg', 'Vila Bali Interior', 'awefnawjkf nawkej fnawkjf nawkjefnakw jfnawkfjna wkjfnawjke fn', '2026-05-07 19:00:32'),
(4, '1778180613607-pura-ulun-danu-bratan-at-sunrise-famous-temple-on-2026-03-09-23-13-17-utc.jpg', 'Vila Bali Interior', 'wefjnwefk nqwekfnqw ekfnqwekf nqwkfnw qkfn', '2026-05-07 19:03:33'),
(5, '1778180635049-ancient-temple-illumination-of-pura-ulun-danu-brat-2026-01-09-08-05-21-utc.jpg', 'Vila Bali Interior', 'qwdfkqnmwkdm qkwmd qwk dmqw kmwq', '2026-05-07 19:03:55');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `catalog_requests`
--
ALTER TABLE `catalog_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_contents`
--
ALTER TABLE `home_contents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `content_type` (`content_type`);

--
-- Indexes for table `home_sliders`
--
ALTER TABLE `home_sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_code` (`product_code`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `catalog_requests`
--
ALTER TABLE `catalog_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `home_contents`
--
ALTER TABLE `home_contents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `home_sliders`
--
ALTER TABLE `home_sliders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
