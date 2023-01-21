-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2023 at 09:06 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_furniture_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(120) NOT NULL,
  `narration` varchar(200) DEFAULT NULL,
  `creation_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category_name`, `narration`, `creation_time`, `updated_at`) VALUES
(1, 'Table', 'all types of table well furnished', '2022-06-21 12:21:02', '2022-06-21 12:47:15'),
(3, 'Chairs', 'Chair related category', '2022-07-01 05:42:37', '2022-12-22 15:56:48'),
(8, 'Storage Systems', 'This is all about storage Systems', '2022-07-27 07:41:03', NULL),
(10, 'Sofa Sets', 'Adorable designs best Quality', '2022-11-21 12:57:10', NULL),
(15, 'Tv Units', 'Best Quality Tv Units', '2023-01-20 12:50:06', NULL),
(16, 'Beds', 'Best Quality Bedroom Furnitures', '2023-01-20 13:14:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_price` double NOT NULL DEFAULT 0,
  `product_description` varchar(1000) DEFAULT NULL,
  `quantity` double NOT NULL DEFAULT 0,
  `in_stock` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1-in stock, 0 out of stock',
  `creation_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `sku` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `category_id`, `product_name`, `product_price`, `product_description`, `quantity`, `in_stock`, `creation_time`, `updated_at`, `sku`) VALUES
(25, 10, 'Wooden Sofa', 34999, 'This Aker sofa cum bed is an elegant furniture piece that never goes out of style, especially when combined with functionality. This sofa cum Bed is also available in a king size bed option, Brand :UrbanWood\n,Dimensions :72 L x 31 W x 31 H', 35, 1, '2022-12-27 12:06:26', '2023-01-20 12:53:59', NULL),
(26, 15, 'Anvil TV Unit ', 20199, ',Its slim design keeps your space free. It has a spacious top that allows you to keep your essentials. It also has alternate open and closed shelves to store other storage essentials.Brand :UrbanWood,Dimensions :48 L x 19 W x 20 H,', 20, 1, '2023-01-20 12:52:27', NULL, NULL),
(27, 10, 'Abro 3 Seater Fabric Sofa', 43999, '(Cotton, Navy blue) Abro 3 seater sofa in an attractive navy blue colour is a great option for the traditional home interior designs. The dotted border with a beautifully carved wooden frame can give a royal look,Brand :UrbanWood,\nDimensions :76 L x 32 W ', 10, 1, '2023-01-20 12:56:25', '2023-01-20 13:00:02', NULL),
(28, 8, '2 Door Multi Utility Wardrobe', 75899, 'Highly spacious, Wardrobish2 Door Multi-Utility Wardrobe is a perfect example of simplicity. It’s simple and straight silhouette structure provides ample of storage to accommodate all the essentials. With attractive honey finish wooden patterns.', 15, 1, '2023-01-20 12:58:23', '2023-01-20 13:18:20', NULL),
(29, 3, 'Deck Dining chairs', 10999, 'This Deck dining chair provides you fashionable, well-design yet affordable dining furniture, giving you an ideal solution to decorate your home. Brand :UrbanWood,\nDimensions :19 L x 20 W x 36 H', 39, 1, '2023-01-20 13:06:00', NULL, NULL),
(30, 3, 'Oreo Dining chair', 9999, ' ( Cotton, Steel grey ),The amazing classy look with soft durable upholstery gives a creative Oreo dining chair design. With this dining chair from Urbanwood turns out to be the much-loved chair for the winter season. Brand:UrbanWood.', 30, 1, '2023-01-20 13:07:49', '2023-01-20 13:18:39', NULL),
(31, 1, 'Groupe Study Tables', 34999, 'With the amazing sleek pattern and spacious slots, Groupe study table is quite stylish for matching your modern-day interior. Known for its spaciousness and large storage, the table sticks to functionality at par.\nBrand :\nUrbanWood.', 29, 1, '2023-01-20 13:09:10', '2023-01-20 13:18:53', NULL),
(32, 1, '6-Seater Dining Table ', 33999, '( Walnut Finish ),This Woodora 6- Seater Dining Table is made for a great addition to your home. The table gives modern and contemporary look that delivers stylish dining space look.Brand :\nUrbanWood\nDimensions :\n60 L x 36 W x 30 H\n', 28, 1, '2023-01-20 13:13:19', '2023-01-20 13:16:37', NULL),
(33, 16, 'Wooden Diwan Bed ', 29999, 'The Ara wooden diwan bed made using premium quality Sheesham wood comes with an elegant finish. It has a classic design which makes it a perfect fit for a variety of interiors. This bed is designed to be ergonomic so that it not only looks good.Brand :\nUrbanWood\nDimensions :\n77 L x 32 W x 20 H', 23, 1, '2023-01-20 13:16:00', '2023-01-20 13:17:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_cart`
--

CREATE TABLE `product_cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` double NOT NULL,
  `creation_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_cart`
--

INSERT INTO `product_cart` (`id`, `user_id`, `product_id`, `quantity`, `price`, `creation_time`, `updated_at`) VALUES
(68, 13, 26, 1, 20199, '2023-01-21 11:13:14', NULL),
(70, 13, 29, 2, 10999, '2023-01-21 13:20:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_type` varchar(100) DEFAULT NULL,
  `image_url` varchar(120) DEFAULT NULL,
  `creation_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`id`, `product_id`, `image_type`, `image_url`, `creation_time`, `updated_at`) VALUES
(20, 25, NULL, 'file-1672122957979.jpg', '2022-12-27 12:06:26', NULL),
(21, 26, NULL, 'file-1674199217579.jpg', '2023-01-20 12:52:27', NULL),
(22, 27, NULL, 'file-1674199522376.jpg', '2023-01-20 12:56:25', NULL),
(23, 28, NULL, 'file-1674199655516.jpg', '2023-01-20 12:58:23', NULL),
(24, 29, NULL, 'file-1674200116378.jpg', '2023-01-20 13:06:00', NULL),
(25, 30, NULL, 'file-1674200204997.jpg', '2023-01-20 13:07:49', NULL),
(26, 31, NULL, 'file-1674200315247.jpg', '2023-01-20 13:09:10', NULL),
(27, 32, NULL, 'file-1674200554455.jpg', '2023-01-20 13:13:19', NULL),
(28, 33, NULL, 'file-1674200726091.jpg', '2023-01-20 13:16:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_orders`
--

CREATE TABLE `product_orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `customer_address1` varchar(200) DEFAULT NULL,
  `customer_address2` varchar(200) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `pincode` varchar(100) DEFAULT NULL,
  `contact_number` varchar(100) DEFAULT NULL,
  `creation_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_orders`
--

INSERT INTO `product_orders` (`id`, `user_id`, `full_name`, `customer_address1`, `customer_address2`, `email`, `pincode`, `contact_number`, `creation_time`, `updated_at`) VALUES
(48, 13, 'abhishek', 'kuntagni,ankola', 'home ', 'abhi@gmail.com', '581344', '9900551246', '2023-01-16 12:40:49', NULL),
(49, 13, 'Abhsihek', 'kuntagni achave', 'Ankola uttarakannda', 'abhi@gmail.com', '581344', '1234567890', '2023-01-16 12:58:22', NULL),
(50, 13, 'Abhishek Nayak', '1st cross kuntagani ankola', 'landmark bridge', 'abhi05@gmail.com', '581344', '8277519304', '2023-01-20 15:14:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_order_items`
--

CREATE TABLE `product_order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(150) NOT NULL,
  `quantity` double NOT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  `product_price` double NOT NULL,
  `total_price` double NOT NULL,
  `delivery_status` varchar(100) NOT NULL DEFAULT 'placed' COMMENT 'placed, cancelled, shipped, delivered, returned',
  `creation_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_order_items`
--

INSERT INTO `product_order_items` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `image_url`, `product_price`, `total_price`, `delivery_status`, `creation_time`, `updated_at`) VALUES
(35, 48, 15, 'Gaming Chair', 1, 'file-1671691884488.jpg', 10299, 0, 'Cancelled', '2023-01-16 12:40:49', '2023-01-16 14:38:13'),
(36, 48, 25, 'Wooden Sofa', 2, 'file-1672122957979.jpg', 34999, 0, 'Cancelled', '2023-01-16 12:40:49', '2023-01-16 14:38:17'),
(37, 49, 15, 'Gaming Chair', 1, 'file-1671691884488.jpg', 10299, 10299, 'placed', '2023-01-16 12:58:22', NULL),
(38, 49, 25, 'Wooden Sofa', 2, 'file-1672122957979.jpg', 34999, 69998, 'placed', '2023-01-16 12:58:22', NULL),
(39, 50, 25, 'Wooden Sofa', 1, 'file-1672122957979.jpg', 34999, 34999, 'placed', '2023-01-20 15:14:40', NULL),
(40, 50, 26, 'Anvil TV Unit ', 1, 'file-1674199217579.jpg', 20199, 20199, 'placed', '2023-01-20 15:14:40', NULL),
(41, 50, 30, 'Oreo Dining chair', 2, 'file-1674200204997.jpg', 9999, 19998, 'placed', '2023-01-20 15:14:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_request`
--

CREATE TABLE `product_request` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `requirement_description` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_number` varchar(100) NOT NULL,
  `creation_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_request`
--

INSERT INTO `product_request` (`id`, `title`, `requirement_description`, `email`, `contact_number`, `creation_time`, `updated_at`) VALUES
(12, 'tv unit', 'i want tv unit well designed', 'abhi@gmail.com', '9087654321', '2023-01-16 16:11:22', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `user_type` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(150) NOT NULL,
  `gender` enum('male','female','oher') NOT NULL,
  `phone` varchar(100) NOT NULL,
  `dob` varchar(20) NOT NULL,
  `creation_time` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `user_type`, `email`, `password`, `gender`, `phone`, `dob`, `creation_time`, `updated_at`) VALUES
(4, 'Abhishek Nayak', 'admin', 'abhi05admin@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'male', '8277519304', '05-02-1999', '2022-11-19 14:18:19', NULL),
(13, 'Abhishek nayak', 'customer', 'abhi05@gmail.com', '25d55ad283aa400af464c76d713c07ad', 'male', '9900551246', '1999-02-05', '2022-12-20 11:20:23', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_cart`
--
ALTER TABLE `product_cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_orders`
--
ALTER TABLE `product_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_order_items`
--
ALTER TABLE `product_order_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_request`
--
ALTER TABLE `product_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `product_cart`
--
ALTER TABLE `product_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `product_orders`
--
ALTER TABLE `product_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `product_order_items`
--
ALTER TABLE `product_order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `product_request`
--
ALTER TABLE `product_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
