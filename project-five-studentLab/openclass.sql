-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2026 at 02:57 PM
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
-- Database: `openclass`
--

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` int(11) NOT NULL,
  `resource_name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `maintainer` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `resource_name`, `description`, `maintainer`, `url`) VALUES
(2, 'CSS Basics', 'Introduction to styling with CSS.', 'Mariam', 'https://developer.mozilla.org/en-US/docs/Web/CSS'),
(3, 'JavaScript Guide', 'Core concepts of JavaScript programming.', 'Hassan', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'),
(4, 'PHP Manual', 'Official PHP documentation and tutorials.', 'Yusuf', 'https://www.php.net/manual/en/'),
(5, 'MySQL Reference', 'Database design and SQL queries.', 'Amina', 'https://dev.mysql.com/doc/'),
(6, 'Docker Docs', 'Containerization and DevOps basics.', 'Hassan', 'https://docs.docker.com/'),
(7, 'Networking Fundamentals 2', 'Basic networking concepts and protocols.', 'Abdulhamid', 'https://www.cisco.com/c/en/us/training-events/training-certifications/exams/current-list/ccna.html'),
(8, 'Security Essentials', 'Introduction to cybersecurity principles.', 'Salma', 'https://owasp.org/'),
(9, 'React Guide', 'Frontend development with React library.', 'Mariam', 'https://react.dev/'),
(10, 'Django Framework', 'Backend development with Django.', 'Abubakar', 'https://docs.djangoproject.com/en/stable/');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `first_name` varchar(200) DEFAULT NULL,
  `last_name` varchar(200) DEFAULT NULL,
  `studentlevel` varchar(200) DEFAULT NULL,
  `university` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phonenumber` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `first_name`, `last_name`, `studentlevel`, `university`, `email`, `password`, `address`, `phonenumber`) VALUES
(1, 'Amina', 'Salim', 'Undergraduate', 'University of Dar es Salaam', 'amina.salim@udsm.ac.tz', '$2y$10$etlMbO89ntf5pRPylGIpGuYjmXfXeFkc7UThN.CBRfQcENRU9Sh/2', 'Stone Town, Zanzibar', '255712345678'),
(2, 'Juma', 'Ali', 'Postgraduate', 'State University of Zanzibar', 'juma.ali@suza.ac.tz', '$2y$10$y5iwZJum1EUrI3ac6oOlhuvRjpwfeg08cMlbHQMUAy163qMqc1OFK', 'Mkokotoni, Zanzibar', '255713456789'),
(3, 'Fatma', 'Omar', 'Undergraduate', 'University of Dodoma', 'fatma.omar@udom.ac.tz', '$2y$10$YIfIVQDvTtljPML72tYJ7uYh7idG5xGjlYTTGHEn09jeZ6Vgm.gEK', 'Dodoma, Tanzania', '255714567890'),
(4, 'Hassan', 'Bakari', 'Diploma', 'Zanzibar Institute of Tourism Development', 'hassan.bakari@zitd.ac.tz', '$2y$10$6.o6n8dfDhUJuJ9hVmHxUORnrm2GZ36eMhe7/9cs2YBu.o.60TtG6', 'Nungwi, Zanzibar', '255715678901'),
(17, 'Husna', 'Osman', 'Certificate', 'State University of Zanzibar', 'husna@osman.com', '$2y$10$Tz1A791bbN8Nbm3.cAL85.0QxJ/ooKgdfN5sYT8GMUK.vGwsauNX.', 'Michenzani', '+2557778899911'),
(18, 'Adil', 'Osman', 'Undergraduate', 'University of Dar es Salaam', 'adil@osman.com', '$2y$10$So5IyY9n4.fxIiOyAtSmGuqPAbffLytOWZYbeCXTAZ.qCdpGWsVee', 'Michenzani', '+2557778899911'),
(23, 'Abubakar', 'Yussuf', 'Degree', 'ZU', 'abuu.yus@gmail.com', '$2y$10$Ps2yYb2h1aPs0zknyMocYelv1d.6S5T.EO4SRAq0MhX90d2tDKdTi', 'Moli', '0778015959');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `subject_name` varchar(150) NOT NULL,
  `category` varchar(100) NOT NULL,
  `subject_level` varchar(50) NOT NULL,
  `instructor` varchar(100) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `subject_name`, `category`, `subject_level`, `instructor`, `description`) VALUES
(1, 'Introduction to Linux', 'Operating Systems', 'Beginner', 'Mr. Ali', 'Learn the basics of Linux commands and environment.'),
(2, 'Web Development Basics', 'Programming', 'Intermediate', 'Ms. Mariam', 'HTML, CSS, and JavaScript fundamentals for beginners.'),
(3, 'Docker & Containers', 'DevOps', 'Advanced', 'Mr. Hassan', 'Hands-on introduction to containerization using Docker.'),
(4, 'Database Design', 'Databases', 'Intermediate', 'Dr. Amina', 'Principles of relational database design and SQL queries.'),
(18, 'Java Course', 'Java Essentials', 'Begginer', 'Mr RAshid', 'Tunaanza kufanya decoration ya Webpages'),
(20, 'Python Course', 'Python', 'Begginer', 'Mr RAshid', 'Tunaanza kufanya decoration ya Webpages');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
