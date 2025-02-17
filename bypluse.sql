-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Feb 17, 2025 at 10:29 AM
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
-- Database: `bypluse`
--

-- --------------------------------------------------------

--
-- Table structure for table `f_admins`
--

CREATE TABLE `f_admins` (
  `uid` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `f_admins`
--

INSERT INTO `f_admins` (`uid`, `username`, `fullname`, `email`, `phone_number`, `password`, `avatar`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Bobcarly', 'bobcarly@gmail.com', '+447399675963', '$2a$09$thoihFePltczN0ASDwkc4.h3cVcgOiUrmSAZ9wXdTJ0h4ln/yCaDS', NULL, 1, '2021-11-05 20:11:38', '2025-02-16 10:09:46'),
(4, 'super', 'super', 'testing@gmail.com', '0912907219450', '$2a$09$CsICaDyjTadz5/jaZAsuZuL7iBj1AqIfqft4Me0bxWqqOX7j6ujsq', '/img/avatar/avatar-21032257387.jpg', 1, '2021-11-05 20:11:38', '2025-02-16 10:09:11');

-- --------------------------------------------------------

--
-- Table structure for table `f_bonus`
--

CREATE TABLE `f_bonus` (
  `b_id` bigint(20) UNSIGNED NOT NULL,
  `b_register_bonus` decimal(25,19) NOT NULL DEFAULT 0.0000000000000000000,
  `b_share_bonus` decimal(25,19) NOT NULL DEFAULT 0.0000000000000000000
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `f_bonus`
--

INSERT INTO `f_bonus` (`b_id`, `b_register_bonus`, `b_share_bonus`) VALUES
(1, 2000.0000000000000000000, 250.0000000000000000000);

-- --------------------------------------------------------

--
-- Table structure for table `f_coupons`
--

CREATE TABLE `f_coupons` (
  `c_id` bigint(20) UNSIGNED NOT NULL,
  `c_code` varchar(255) NOT NULL,
  `c_amount` decimal(25,19) NOT NULL,
  `c_author` bigint(20) NOT NULL,
  `c_usedby` bigint(20) DEFAULT NULL,
  `c_status` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `f_coupons`
--

INSERT INTO `f_coupons` (`c_id`, `c_code`, `c_amount`, `c_author`, `c_usedby`, `c_status`) VALUES
(11811, 'E701-056C-8A18-ECED', 20.0000000000000000000, 1, NULL, 0),
(11812, '024B-2B51-ED98-DE90', 20.0000000000000000000, 1, 26168, 1),
(11813, 'EFC4-B9F9-7482-5EBE', 20.0000000000000000000, 1, NULL, 0),
(11814, 'D318-3467-08E4-F078', 20.0000000000000000000, 1, NULL, 0),
(11815, '4D76-3526-8755-6195', 20.0000000000000000000, 1, NULL, 0),
(11816, '3551-6121-642D-8DB7', 20.0000000000000000000, 1, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `f_earning_history`
--

CREATE TABLE `f_earning_history` (
  `h_id` bigint(20) UNSIGNED NOT NULL,
  `h_user_id` bigint(20) NOT NULL,
  `h_amount` decimal(25,19) NOT NULL,
  `h_text` varchar(255) NOT NULL,
  `h_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `f_earning_history`
--

INSERT INTO `f_earning_history` (`h_id`, `h_user_id`, `h_amount`, `h_text`, `h_created_at`) VALUES
(49578, 26168, 2000.0000000000000000000, 'Registration Bonus', '2025-02-16 10:38:23');

-- --------------------------------------------------------

--
-- Table structure for table `f_mining_history`
--

CREATE TABLE `f_mining_history` (
  `m_id` bigint(20) UNSIGNED NOT NULL,
  `m_user_id` bigint(20) NOT NULL,
  `m_start_time` varchar(255) NOT NULL,
  `m_end_time` varchar(255) NOT NULL,
  `m_amount` decimal(25,19) NOT NULL DEFAULT 0.0000000000000000000,
  `m_seconds` bigint(20) NOT NULL DEFAULT 0,
  `m_text` varchar(20) NOT NULL,
  `m_balance` decimal(25,19) NOT NULL DEFAULT 0.0000000000000000000,
  `m_status` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `f_mining_history`
--

INSERT INTO `f_mining_history` (`m_id`, `m_user_id`, `m_start_time`, `m_end_time`, `m_amount`, `m_seconds`, `m_text`, `m_balance`, `m_status`) VALUES
(201497, 26168, '2025-02-16 12:50:12.222', '2025-02-16 12:52:12.222', 3.0000000000000000000, 120, 'Mining Reward', 3.0000000000000000000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `f_notice`
--

CREATE TABLE `f_notice` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `notice_title` varchar(255) DEFAULT NULL,
  `notice_body` text DEFAULT NULL,
  `notice_status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `f_pages`
--

CREATE TABLE `f_pages` (
  `page_id` bigint(20) NOT NULL,
  `page_title` text NOT NULL,
  `page_slug` text NOT NULL,
  `page_author` bigint(20) NOT NULL,
  `page_status` tinyint(4) DEFAULT 1,
  `page_description` longtext NOT NULL,
  `page_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `page_updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `f_plans`
--

CREATE TABLE `f_plans` (
  `plan_id` bigint(20) UNSIGNED NOT NULL,
  `plan_name` varchar(255) NOT NULL,
  `plan_price` decimal(25,19) NOT NULL,
  `plan_mining_amount` decimal(25,19) NOT NULL,
  `plan_mining_minute` decimal(25,19) NOT NULL,
  `plan_auto_mining` tinyint(4) NOT NULL DEFAULT 0,
  `plan_min_withdrawal` decimal(25,19) NOT NULL DEFAULT 0.0000000000000000000,
  `plan_max_withdrawal` decimal(25,19) NOT NULL DEFAULT 0.0000000000000000000,
  `plan_vendor_coupon_commission` decimal(25,19) NOT NULL DEFAULT 0.0000000000000000000,
  `plan_status` tinyint(4) NOT NULL DEFAULT 1,
  `plan_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `plan_updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `f_plans`
--

INSERT INTO `f_plans` (`plan_id`, `plan_name`, `plan_price`, `plan_mining_amount`, `plan_mining_minute`, `plan_auto_mining`, `plan_min_withdrawal`, `plan_max_withdrawal`, `plan_vendor_coupon_commission`, `plan_status`, `plan_created_at`, `plan_updated_at`) VALUES
(1, 'Bypluse', 10.0000000000000000000, 200.0000000000000000000, 600.0000000000000000000, 0, 10.0000000000000000000, 20.0000000000000000000, 0.0000000000000000000, 1, '2021-11-09 05:09:26', '2025-02-16 02:06:31'),
(8, 'Master', 5.0000000000000000000, 0.0000000000000000000, 0.0000000000000000000, 0, 0.0000000000000000000, 0.0000000000000000000, 0.0000000000000000000, 0, '2022-02-10 10:30:45', '2022-02-10 15:45:05'),
(9, 'Pluse', 20.0000000000000000000, 3.0000000000000000000, 2.0000000000000000000, 0, 3000.0000000000000000000, 222.0000000000000000000, 1.0000000000000000000, 1, '2025-02-16 04:43:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `f_posts`
--

CREATE TABLE `f_posts` (
  `post_id` bigint(20) NOT NULL,
  `post_title` text NOT NULL,
  `post_image` varchar(255) DEFAULT NULL,
  `post_slug` text NOT NULL,
  `post_author` bigint(20) NOT NULL,
  `post_status` tinyint(4) DEFAULT 1,
  `post_description` longtext NOT NULL,
  `post_views` bigint(20) DEFAULT 0,
  `post_earnable` tinyint(4) NOT NULL DEFAULT 0,
  `post_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `post_updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `f_posts_track`
--

CREATE TABLE `f_posts_track` (
  `t_id` bigint(20) UNSIGNED NOT NULL,
  `t_post_id` bigint(20) NOT NULL,
  `t_user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `f_referrals`
--

CREATE TABLE `f_referrals` (
  `r_id` bigint(20) UNSIGNED NOT NULL,
  `r1_id` bigint(20) NOT NULL,
  `r2_id` bigint(20) NOT NULL,
  `r_amount` decimal(25,19) DEFAULT 0.0000000000000000000,
  `r_status` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `f_upline_generation`
--

CREATE TABLE `f_upline_generation` (
  `g_id` bigint(20) NOT NULL,
  `g_name` varchar(255) NOT NULL,
  `g_percent` bigint(20) NOT NULL,
  `g_plan_percent` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `f_upline_generation`
--

INSERT INTO `f_upline_generation` (`g_id`, `g_name`, `g_percent`, `g_plan_percent`) VALUES
(4, 'Direct referral', 35, 0),
(5, '2nd generation', 10, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `f_users`
--

CREATE TABLE `f_users` (
  `uid` bigint(20) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `is_vendor` tinyint(4) DEFAULT 0,
  `mining_balance` decimal(25,19) DEFAULT 0.0000000000000000000,
  `activities_balance` decimal(25,19) DEFAULT 0.0000000000000000000,
  `referral_balance` decimal(25,19) DEFAULT 0.0000000000000000000,
  `vendor_balance` decimal(25,19) DEFAULT 0.0000000000000000000,
  `is_verify` tinyint(4) DEFAULT 0,
  `is_paid` tinyint(4) DEFAULT 0,
  `plan_id` bigint(20) DEFAULT NULL,
  `plan_name` varchar(255) DEFAULT NULL,
  `plan_mining_amount` bigint(20) DEFAULT 0,
  `plan_mining_minute` bigint(20) DEFAULT 0,
  `notice` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `f_users`
--

INSERT INTO `f_users` (`uid`, `username`, `fullname`, `email`, `phone_number`, `password`, `country`, `avatar`, `is_vendor`, `mining_balance`, `activities_balance`, `referral_balance`, `vendor_balance`, `is_verify`, `is_paid`, `plan_id`, `plan_name`, `plan_mining_amount`, `plan_mining_minute`, `notice`, `created_at`, `updated_at`) VALUES
(26168, 'Alphatech', 'ITODO GABRIEL EJEH', 'alphatechmultimedia@gmail.com', '09129079450', '$2a$09$IiVJLwfEbhKsKCZ5gE8.h.1WWYDKumoXI48DShw1hAon3/HxuVr4u', 'Nigeria', NULL, 1, 3.0000000000000000000, 2000.0000000000000000000, 0.0000000000000000000, 0.0000000000000000000, 1, 1, 9, 'Pluse', 3, 2, 0, '2025-02-16 10:28:36', '2025-02-16 11:52:13');

-- --------------------------------------------------------

--
-- Table structure for table `f_wallet`
--

CREATE TABLE `f_wallet` (
  `w_id` bigint(20) UNSIGNED NOT NULL,
  `w_user_id` bigint(20) NOT NULL,
  `w_type` varchar(255) NOT NULL,
  `w_fullname` varchar(255) DEFAULT NULL,
  `w_phone_number` varchar(255) DEFAULT NULL,
  `w_coin_name` varchar(255) DEFAULT NULL,
  `w_coin_address` varchar(255) DEFAULT NULL,
  `w_coin_network` varchar(255) DEFAULT NULL,
  `w_coin_memo` varchar(255) DEFAULT NULL,
  `w_account_name` varchar(255) DEFAULT NULL,
  `w_account_number` varchar(255) DEFAULT NULL,
  `w_account_bank_name` varchar(255) DEFAULT NULL,
  `w_account_bank_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `f_website_settings`
--

CREATE TABLE `f_website_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `website_title` varchar(255) NOT NULL DEFAULT 'My Website',
  `website_tagline` varchar(255) NOT NULL DEFAULT 'Cool Website',
  `website_description` text NOT NULL,
  `website_keyword` text NOT NULL,
  `website_url` varchar(255) NOT NULL,
  `website_logo` varchar(255) DEFAULT NULL,
  `website_favicon` varchar(255) DEFAULT NULL,
  `website_phone_number` varchar(255) NOT NULL,
  `website_address` varchar(255) NOT NULL,
  `website_email` varchar(255) NOT NULL,
  `website_author` varchar(255) NOT NULL,
  `website_dev_name` varchar(255) NOT NULL,
  `website_dev_link` text NOT NULL,
  `website_facebook` varchar(255) DEFAULT NULL,
  `website_twitter` varchar(255) DEFAULT NULL,
  `website_youtube` varchar(255) DEFAULT NULL,
  `website_instagram` varchar(255) DEFAULT NULL,
  `website_currency` varchar(10) NOT NULL DEFAULT '$',
  `website_header_code` longtext DEFAULT NULL,
  `website_footer_code` longtext DEFAULT NULL,
  `website_per_coin` decimal(25,19) NOT NULL,
  `website_act_withdrawal_status` tinyint(4) NOT NULL DEFAULT 1,
  `website_ref_withdrawal_status` tinyint(4) NOT NULL DEFAULT 1,
  `website_min_withdrawal` decimal(25,19) DEFAULT 1.0000000000000000000,
  `website_max_withdrawal` decimal(25,19) DEFAULT 1.0000000000000000000,
  `website_reward_name` varchar(255) NOT NULL,
  `website_facebook_code` varchar(255) NOT NULL,
  `website_coinbase_key` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `f_website_settings`
--

INSERT INTO `f_website_settings` (`id`, `website_title`, `website_tagline`, `website_description`, `website_keyword`, `website_url`, `website_logo`, `website_favicon`, `website_phone_number`, `website_address`, `website_email`, `website_author`, `website_dev_name`, `website_dev_link`, `website_facebook`, `website_twitter`, `website_youtube`, `website_instagram`, `website_currency`, `website_header_code`, `website_footer_code`, `website_per_coin`, `website_act_withdrawal_status`, `website_ref_withdrawal_status`, `website_min_withdrawal`, `website_max_withdrawal`, `website_reward_name`, `website_facebook_code`, `website_coinbase_key`) VALUES
(2, 'Bypluse', 'Earn. Engage. Elevate', 'Welcome to Bypluse, where opportunity meets innovation. Earn real reward by participating in interactive challenges, completing engaging tasks, and unlocking exciting opportunities. No limit, no distraction-just seamless financial growth paired with entertainment. ', 'Maximize Earning , Enjoy the experience, Elevate effortlessly\nBypluse-Earn. Engage. Elevate', 'https://bypluse.com', NULL, NULL, '1234567', 'cameroon', 'info@bypluse.com', 'Bypluse', 'Alphatech Multimedia Technologies', '', NULL, NULL, NULL, NULL, '$', '', '', 0.0100000000000000000, 0, 0, 1.0000000000000000000, 1.0000000000000000000, 'BYP', '1234', '12');

-- --------------------------------------------------------

--
-- Table structure for table `f_withdrawal_history`
--

CREATE TABLE `f_withdrawal_history` (
  `w_wid` bigint(20) UNSIGNED NOT NULL,
  `w_trx_id` varchar(15) NOT NULL,
  `w_user_id` bigint(20) NOT NULL,
  `w_wtype` varchar(5) NOT NULL,
  `w_amount` decimal(25,19) NOT NULL,
  `w_status` tinyint(4) NOT NULL DEFAULT 0,
  `w_created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `f_admins`
--
ALTER TABLE `f_admins`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_number` (`phone_number`);

--
-- Indexes for table `f_bonus`
--
ALTER TABLE `f_bonus`
  ADD UNIQUE KEY `b_id` (`b_id`);

--
-- Indexes for table `f_coupons`
--
ALTER TABLE `f_coupons`
  ADD UNIQUE KEY `c_id` (`c_id`),
  ADD UNIQUE KEY `c_code` (`c_code`),
  ADD KEY `c_usedby` (`c_usedby`),
  ADD KEY `c_author` (`c_author`);

--
-- Indexes for table `f_earning_history`
--
ALTER TABLE `f_earning_history`
  ADD UNIQUE KEY `h_id` (`h_id`),
  ADD KEY `h_user_id` (`h_user_id`);

--
-- Indexes for table `f_mining_history`
--
ALTER TABLE `f_mining_history`
  ADD UNIQUE KEY `m_id` (`m_id`),
  ADD KEY `m_user_id` (`m_user_id`);

--
-- Indexes for table `f_notice`
--
ALTER TABLE `f_notice`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `f_pages`
--
ALTER TABLE `f_pages`
  ADD PRIMARY KEY (`page_id`),
  ADD KEY `page_author` (`page_author`);

--
-- Indexes for table `f_plans`
--
ALTER TABLE `f_plans`
  ADD UNIQUE KEY `plan_id` (`plan_id`);

--
-- Indexes for table `f_posts`
--
ALTER TABLE `f_posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `post_author` (`post_author`);

--
-- Indexes for table `f_posts_track`
--
ALTER TABLE `f_posts_track`
  ADD UNIQUE KEY `t_id` (`t_id`),
  ADD KEY `t_post_id` (`t_post_id`),
  ADD KEY `t_user_id` (`t_user_id`);

--
-- Indexes for table `f_referrals`
--
ALTER TABLE `f_referrals`
  ADD UNIQUE KEY `r_id` (`r_id`),
  ADD KEY `r1_id` (`r1_id`),
  ADD KEY `r2_id` (`r2_id`);

--
-- Indexes for table `f_upline_generation`
--
ALTER TABLE `f_upline_generation`
  ADD PRIMARY KEY (`g_id`);

--
-- Indexes for table `f_users`
--
ALTER TABLE `f_users`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_number` (`phone_number`);

--
-- Indexes for table `f_wallet`
--
ALTER TABLE `f_wallet`
  ADD UNIQUE KEY `w_id` (`w_id`),
  ADD KEY `w_user_id` (`w_user_id`);

--
-- Indexes for table `f_website_settings`
--
ALTER TABLE `f_website_settings`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `f_withdrawal_history`
--
ALTER TABLE `f_withdrawal_history`
  ADD UNIQUE KEY `w_wid` (`w_wid`),
  ADD KEY `w_user_id` (`w_user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `f_admins`
--
ALTER TABLE `f_admins`
  MODIFY `uid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `f_bonus`
--
ALTER TABLE `f_bonus`
  MODIFY `b_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `f_coupons`
--
ALTER TABLE `f_coupons`
  MODIFY `c_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11817;

--
-- AUTO_INCREMENT for table `f_earning_history`
--
ALTER TABLE `f_earning_history`
  MODIFY `h_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49579;

--
-- AUTO_INCREMENT for table `f_mining_history`
--
ALTER TABLE `f_mining_history`
  MODIFY `m_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201498;

--
-- AUTO_INCREMENT for table `f_notice`
--
ALTER TABLE `f_notice`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `f_pages`
--
ALTER TABLE `f_pages`
  MODIFY `page_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `f_plans`
--
ALTER TABLE `f_plans`
  MODIFY `plan_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `f_posts`
--
ALTER TABLE `f_posts`
  MODIFY `post_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `f_posts_track`
--
ALTER TABLE `f_posts_track`
  MODIFY `t_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35827;

--
-- AUTO_INCREMENT for table `f_referrals`
--
ALTER TABLE `f_referrals`
  MODIFY `r_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11664;

--
-- AUTO_INCREMENT for table `f_upline_generation`
--
ALTER TABLE `f_upline_generation`
  MODIFY `g_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `f_users`
--
ALTER TABLE `f_users`
  MODIFY `uid` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26169;

--
-- AUTO_INCREMENT for table `f_wallet`
--
ALTER TABLE `f_wallet`
  MODIFY `w_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4673;

--
-- AUTO_INCREMENT for table `f_website_settings`
--
ALTER TABLE `f_website_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `f_withdrawal_history`
--
ALTER TABLE `f_withdrawal_history`
  MODIFY `w_wid` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2401;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `f_coupons`
--
ALTER TABLE `f_coupons`
  ADD CONSTRAINT `f_coupons_ibfk_1` FOREIGN KEY (`c_usedby`) REFERENCES `f_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `f_earning_history`
--
ALTER TABLE `f_earning_history`
  ADD CONSTRAINT `f_earning_history_ibfk_1` FOREIGN KEY (`h_user_id`) REFERENCES `f_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `f_mining_history`
--
ALTER TABLE `f_mining_history`
  ADD CONSTRAINT `f_mining_history_ibfk_1` FOREIGN KEY (`m_user_id`) REFERENCES `f_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `f_pages`
--
ALTER TABLE `f_pages`
  ADD CONSTRAINT `f_pages_ibfk_1` FOREIGN KEY (`page_author`) REFERENCES `f_admins` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `f_posts`
--
ALTER TABLE `f_posts`
  ADD CONSTRAINT `f_posts_ibfk_1` FOREIGN KEY (`post_author`) REFERENCES `f_admins` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `f_posts_track`
--
ALTER TABLE `f_posts_track`
  ADD CONSTRAINT `f_posts_track_ibfk_1` FOREIGN KEY (`t_post_id`) REFERENCES `f_posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `f_posts_track_ibfk_2` FOREIGN KEY (`t_user_id`) REFERENCES `f_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `f_referrals`
--
ALTER TABLE `f_referrals`
  ADD CONSTRAINT `f_referrals_ibfk_1` FOREIGN KEY (`r1_id`) REFERENCES `f_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `f_referrals_ibfk_2` FOREIGN KEY (`r2_id`) REFERENCES `f_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `f_wallet`
--
ALTER TABLE `f_wallet`
  ADD CONSTRAINT `f_wallet_ibfk_1` FOREIGN KEY (`w_user_id`) REFERENCES `f_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `f_withdrawal_history`
--
ALTER TABLE `f_withdrawal_history`
  ADD CONSTRAINT `f_withdrawal_history_ibfk_1` FOREIGN KEY (`w_user_id`) REFERENCES `f_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
