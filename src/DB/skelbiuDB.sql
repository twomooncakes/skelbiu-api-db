-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2021 at 03:23 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skelbiu`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`) VALUES
(1, 'Electronics'),
(2, 'Toys'),
(3, 'Pets & pet supplies'),
(4, 'Clothing & accessories'),
(5, 'Furniture'),
(6, 'Food'),
(7, 'Games');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `listing_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `listing_id`) VALUES
(1, 9, 2),
(2, 1, 1),
(3, 4, 2),
(4, 4, 1),
(5, 1, 6),
(6, 9, 6),
(7, 4, 7),
(8, 11, 8),
(9, 11, 9),
(10, 11, 1),
(12, 9, 9),
(13, 9, 5),
(19, 9, 8);

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` int(11) NOT NULL,
  `title` varchar(40) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `image` varchar(200) DEFAULT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `archived` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `title`, `description`, `price`, `views`, `timestamp`, `image`, `cat_id`, `user_id`, `archived`) VALUES
(1, 'CODWAW', 'bla bla', '15.00', 7, '2021-12-15 13:48:50', '1639587014176-683347401.png', 1, 9, 0),
(2, 'Razer Blade 14', 'Looks still new', '1250.00', 16, '2021-12-15 13:48:57', '15769245-42455.jpg', 1, 1, 0),
(4, 'Roomba 675', 'Barely used', '299.99', 12, '2021-12-15 13:49:02', '455646-1v1589573902.jpg', 1, 4, 0),
(5, 'Old phonebooks', 'Novelty item for collectors of old obsolete things or bonfire material for your next camping trip. Only email or texts please', '0.00', 2, '2021-12-14 11:14:56', '123464564-4556.jpg', NULL, 4, 0),
(6, 'Delicacy', 'tastes good, all freshly made daily', '1.00', 0, '2021-12-15 14:14:30', '1639577514814-499333876.jpg', 6, 4, 0),
(7, 'Boris, white cat', 'fluffy, hard to please but good cat overall. giving it away cause of worsening allergy. DUMPLINGS NOT INCLUDED!!', '120.00', 0, '2021-12-15 14:17:57', '1639577775029-546374064.jpg', 3, 1, 0),
(8, 'CODMW2', 'good game, not too many scratches', '12.00', 0, '2021-12-15 22:26:20', '1639585660735-754421239.png', 7, 1, 0),
(9, 'CODWAW', 'good game, good condition', '11.00', 0, '2021-12-15 22:26:25', '1639876371532-855895686.png', 7, 1, 0),
(11, 'Doge', 'fdhjfdhjfdjhfdjhfd445', '0.00', 0, '2021-12-15 22:31:35', '1639586629056-892704740.jpg', 3, 9, 0),
(12, 'game', 'bla bla', '60.00', 0, '2021-12-15 22:26:39', '1639587014176-683347401.png', 7, 9, 0),
(13, 'Portal 2 Steam Key', 'cheaper than lowest price on steam sale. gift it to that one friend who still didn\'t play it', '0.50', 0, '2021-12-16 08:31:23', '1639643483784-688686059.png', NULL, 9, 0),
(14, 'Hammerwatch Keys', 'fun coop game, steam only', '5.00', 0, '2021-12-16 08:56:35', '1639644995093-232942627.png', NULL, 14, 0),
(15, 'Portal', 'good game', '2.00', 0, '2021-12-16 20:26:09', '1639686369904-306460074.png', NULL, 9, 0),
(16, 'Trackmania Key', 'Racing Game', '5.00', 0, '2021-12-18 15:32:02', '1639841522610-459553105.png', NULL, 12, 0),
(17, 'Zombies', 'Game', '20.00', 0, '2021-12-19 12:52:12', '1639918332350-987211531.png', NULL, 1, 0),
(18, 'Yoshi Game', 'nice game', '60.00', 0, '2021-12-19 13:01:41', '1639918901725-900631294.png', NULL, 1, 0),
(19, 'Yoshi Game 2', 'good game', '59.99', 0, '2021-12-19 13:04:11', '1639919051645-742244381.png', 7, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `city` varchar(90) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `city`, `phone`, `timestamp`) VALUES
(1, 'ona@mail.com', '$2a$10$Kxp6pETReIUxhLTk1T21U.OBrjrn/f5YIeUJgIWAIFhHr1vIH.3ny', 'Kaunas', '868686101', '2021-12-13 08:47:17'),
(4, 'aldona@mail.com', '$2a$10$zNnbD5V2PMQVpnfv.3bm7.ZJZ227Pu2TtVLG0uBYKA4Q7jnJrI2fa', 'Kaunas', '868686111', '2021-12-13 08:55:56'),
(9, 'dude@mail.com', '$2a$10$82nT11YqY/iyQM.k6izVr.GK7ccZugLKsLOFis2/eJEdM79MG1ZZC', NULL, NULL, '2021-12-13 12:53:43'),
(11, 'guy@mail.com', '$2a$10$JZX2Vf09RIwurDflj1YkA.lszuql5T93lv1b0BfPbFsDmVnOMvGsO', NULL, NULL, '2021-12-13 13:03:26'),
(12, 'john@mail.com', '$2a$10$EFsV/gUqrAz2Dl1uxYUg.ebDeCPjB1j7H.o9rWESEkyCMftW5Jq/i', NULL, '864686112', '2021-12-15 06:52:08'),
(13, 'jane@mail.com', '$2a$10$bMuEAOTmUbRsL7ljMy1yQ.7VNBIMA.pDHPPMqA32zGNBpZCdkuTWm', 'Palanga', '865544103', '2021-12-15 07:56:14'),
(14, 'sarah@mail.com', '$2a$10$XOIxAnevZo/WRQmSq2PnX.2Q9Sw/vC5nazKWnvQ0BRxd.0BRTekBi', NULL, '868626111', '2021-12-16 08:38:10'),
(15, 'gal@mail.com', '$2a$10$8TrsgEcWtdkCLYwIEYqmAeSJdR2nQHoahK/iq1HxRWQDtVR3hbfqG', 'Palanga', '868646111', '2021-12-19 14:19:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `listing_id` (`listing_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`);

--
-- Constraints for table `listings`
--
ALTER TABLE `listings`
  ADD CONSTRAINT `listings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `listings_ibfk_2` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;