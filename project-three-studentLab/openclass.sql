-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 31, 2026 at 01:39 PM
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
(5, 'Zahra', 'Mohamed', 'Undergraduate', 'Ardhi University', 'zahra.mohamed@aru.ac.tz', '$2y$10$PYOvjnWbXNAzc2cCFCGgoOP/6oqHUclUWRIDuEHqPKct3ZvPi2ZgG', 'Dar es Salaam, Tanzania', '255716789012'),
(6, 'Abdul', 'Khamis', 'Postgraduate', 'Nelson Mandela African Institute of Science and Technology', 'abdul.khamis@nmaist.ac.tz', '$2y$10$kr7GI0ylwtRzgquz5v2uJe.Rx9t7hYvgt5sbfLAoEC2yXO2R6XxFC', 'Arusha, Tanzania', '255717890123'),
(7, 'Saida', 'Yusuf', 'Undergraduate', 'Mzumbe University', 'saida.yusuf@mzumbe.ac.tz', '$2y$10$6Lxvnn4l1SGkv/wB.Co0SO1CyFw8Qa4ok5.7yy5Ffm1STKoBA2MJW', 'Morogoro, Tanzania', '255718901234'),
(8, 'Salma', 'Hussein', 'Diploma', 'Zanzibar University', 'salma.hussein@zu.ac.tz', '$2y$10$cfwt7X0EZIgsPflUwWf7Y.K9lchg0HD86qMIblZ8CK5k9sVz6Y0yS', 'Chukwani, Zanzibar', '255719012345'),
(9, 'Ali', 'Mwinyi', 'Undergraduate', 'University of Dar es Salaam', 'ali.mwinyi@udsm.ac.tz', '$2y$10$/2NpzIq1B7AMnVkAV5PfGOxS.pGYH86YwlvquPSZqSX.C2wleDCtK', 'Kijichi, Dar es Salaam', '255710123456'),
(10, 'Halima', 'Juma', 'Postgraduate', 'State University of Zanzibar', 'halima.juma@suza.ac.tz', '$2y$10$fkS34OxT8kje9MkYvP6b0enrWIC9D7fV1z6k225b0abpr2069mYja', 'Bububu, Zanzibar', '255711234567');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
