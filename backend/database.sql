-- =====================================================================
-- 123 YERCAUD DATABASE SCHEMA (MySQL 8.0+)
-- Database: 123yercaud_db
-- Host: xiadot.com
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `123yercaud_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `123yercaud_db`;

-- ---------------------------------------------------------------------
-- TABLE 1: admins
-- Input Boxes:
--   - Username (e.g. 'admin', 'yercaud123')
--   - Password (e.g. 'admin123', '123yercaud@123')
--   - Full Name (e.g. 'Administrator')
--   - Role ('superadmin', 'editor', 'moderator')
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE COMMENT 'Admin login username input box',
  `password` VARCHAR(255) NOT NULL COMMENT 'Admin login password input box',
  `name` VARCHAR(100) NOT NULL DEFAULT 'Administrator' COMMENT 'Admin full name input box',
  `role` VARCHAR(50) NOT NULL DEFAULT 'superadmin' COMMENT 'Admin role dropdown/selection',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ---------------------------------------------------------------------
-- TABLE 2: categories
-- Input Boxes (from Add Listing / Taxonomy Management):
--   - Category ID (slug or system identifier)
--   - Category Name (e.g. 'Resorts & Cottages', 'Advocates')
--   - Icon Name (e.g. 'Home', 'Scale', 'Coffee', 'Car')
--   - Color Theme (CSS class for badge/icon styling)
--   - Description (Text area description of category)
--   - Listing Count (Auto-calculated or manually overridden)
--   - Subcategories (JSON array of subcategory names)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` VARCHAR(100) PRIMARY KEY COMMENT 'Category unique slug identifier',
  `name` VARCHAR(150) NOT NULL UNIQUE COMMENT 'Category name input box',
  `icon_name` VARCHAR(100) DEFAULT 'Layers' COMMENT 'Icon selector/name input box',
  `color` VARCHAR(100) DEFAULT 'bg-slate-50 text-slate-700 border-slate-200' COMMENT 'Color theme class',
  `description` TEXT COMMENT 'Category description text area',
  `count` INT DEFAULT 0 COMMENT 'Total indexed count',
  `subcategories` JSON COMMENT 'Subcategories list tags/input array',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ---------------------------------------------------------------------
-- TABLE 3: localities
-- Input Boxes:
--   - Locality / Area Name (e.g. 'Lake Road & Boathouse', 'Pagoda Point Road')
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `localities` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL UNIQUE COMMENT 'Locality/Area name input box',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ---------------------------------------------------------------------
-- TABLE 4: businesses
-- Input Boxes (from AddListingModal.tsx & EditBusinessModal.tsx):
--   - Business Name (input type text)
--   - Category (dropdown selection)
--   - Subcategory (dropdown selection)
--   - Locality (dropdown selection)
--   - Full Address (textarea / text input)
--   - Pincode (input type text, default 636601)
--   - Phone Number (input type tel)
--   - Alternate Phone (input type tel)
--   - WhatsApp Number (input type tel)
--   - Email Address (input type email)
--   - Website URL (input type url)
--   - Google Maps Location URL (input type url)
--   - Contact Person Name (input type text)
--   - Business Description (textarea)
--   - Opening Hours (input type text e.g. '09:00 AM - 08:00 PM')
--   - Established Year (input type number e.g. 2018)
--   - Rating (input type number, 1.0 to 5.0)
--   - Review Count (input type number)
--   - Verified Listing (checkbox boolean)
--   - Featured Listing (checkbox boolean)
--   - Slot Badge (e.g. 'Premier Choice', 'Top Rated')
--   - Tags (tags input array e.g. ['Lake View', 'Bonfire', 'Free WiFi'])
--   - Services (services offered array e.g. ['Room Service', 'Restaurant'])
--   - Primary Cover Image URL (input type url / file upload)
--   - Photo Gallery URLs (array of image URLs, up to 5 photos)
--   - Reviews (JSON array of reviews)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `businesses` (
  `id` VARCHAR(100) PRIMARY KEY COMMENT 'Unique Business ID (e.g. biz-1, res-1)',
  `name` VARCHAR(255) NOT NULL COMMENT 'Business Name input box',
  `category` VARCHAR(150) NOT NULL COMMENT 'Category dropdown selection',
  `subcategory` VARCHAR(150) DEFAULT '' COMMENT 'Subcategory dropdown selection',
  `locality` VARCHAR(150) DEFAULT 'Yercaud' COMMENT 'Locality dropdown selection',
  `address` TEXT COMMENT 'Full Street Address input box',
  `pincode` VARCHAR(20) DEFAULT '636601' COMMENT 'Postal Pincode input box',
  `phone` VARCHAR(50) NOT NULL COMMENT 'Primary Phone Number input box',
  `alternate_phone` VARCHAR(50) DEFAULT NULL COMMENT 'Alternate Phone Number input box',
  `whatsapp` VARCHAR(50) DEFAULT NULL COMMENT 'WhatsApp Number input box',
  `email` VARCHAR(100) DEFAULT NULL COMMENT 'Business Email Address input box',
  `website` VARCHAR(255) DEFAULT NULL COMMENT 'Website URL input box',
  `map_url` TEXT DEFAULT NULL COMMENT 'Google Maps Location Link input box',
  `contact_person` VARCHAR(100) DEFAULT NULL COMMENT 'Contact Person Name input box',
  `description` TEXT COMMENT 'Business Description text area',
  `opening_hours` VARCHAR(255) DEFAULT '9:00 AM - 8:00 PM' COMMENT 'Opening Hours input box',
  `established_year` INT DEFAULT 2015 COMMENT 'Established Year input box',
  `rating` DECIMAL(3, 1) DEFAULT 4.5 COMMENT 'Rating input box (1.0 to 5.0)',
  `review_count` INT DEFAULT 0 COMMENT 'Review Count input box',
  `is_verified` BOOLEAN DEFAULT TRUE COMMENT 'Is Verified checkbox',
  `is_featured` BOOLEAN DEFAULT FALSE COMMENT 'Is Featured checkbox',
  `slot_badge` VARCHAR(100) DEFAULT NULL COMMENT 'Badge input box (e.g. Top Rated)',
  `tags` JSON COMMENT 'Tags/Keywords input array',
  `services` JSON COMMENT 'Key Amenities/Services Offered input array',
  `image_url` TEXT COMMENT 'Primary Cover Photo URL input box',
  `gallery` JSON COMMENT 'Photo Gallery URLs array (up to 5 photos)',
  `reviews` JSON COMMENT 'Customer reviews JSON list',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (`category`),
  INDEX idx_locality (`locality`),
  INDEX idx_rating (`rating`),
  INDEX idx_featured (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ---------------------------------------------------------------------
-- TABLE 5: inquiries (Customer Leads)
-- Input Boxes (from EmailSmsModal.tsx, BusinessDetailModal.tsx, ContactAdminModal.tsx):
--   - Inquiry ID
--   - Business ID (hidden/associated business)
--   - Business Name (name of the business)
--   - Category (business category)
--   - Customer Name (input type text)
--   - Customer Phone (input type tel)
--   - Customer Email (input type email)
--   - Requirement / Message (textarea)
--   - Locality (preferred locality/area)
--   - Date (date string or timestamp)
--   - Time (time string)
--   - Status ('new', 'contacted', 'resolved', 'archived')
--   - Source ('email_sms', 'detail_enquiry', 'post_requirement', 'manual_phone')
--   - Notes (admin follow-up notes input box)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` VARCHAR(100) PRIMARY KEY COMMENT 'Unique Inquiry ID (e.g. inq-101)',
  `business_id` VARCHAR(100) DEFAULT NULL COMMENT 'Associated Business ID',
  `business_name` VARCHAR(255) DEFAULT NULL COMMENT 'Associated Business Name',
  `category` VARCHAR(150) DEFAULT NULL COMMENT 'Inquiry category',
  `user_name` VARCHAR(150) NOT NULL COMMENT 'Customer/User Name input box',
  `user_phone` VARCHAR(50) NOT NULL COMMENT 'Customer Phone Number input box',
  `user_email` VARCHAR(100) DEFAULT NULL COMMENT 'Customer Email Address input box',
  `requirement` TEXT COMMENT 'Requirement / Message Details text area',
  `locality` VARCHAR(150) DEFAULT 'Yercaud' COMMENT 'Customer Locality input box',
  `date` VARCHAR(50) DEFAULT 'Today' COMMENT 'Inquiry Date string',
  `time` VARCHAR(50) DEFAULT '10:00 AM' COMMENT 'Inquiry Time string',
  `status` ENUM('new', 'contacted', 'resolved', 'archived') DEFAULT 'new' COMMENT 'Lead Status dropdown',
  `source` VARCHAR(50) DEFAULT 'detail_enquiry' COMMENT 'Source form dropdown',
  `notes` TEXT DEFAULT NULL COMMENT 'Admin follow-up internal notes text area',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (`status`),
  INDEX idx_business (`business_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ---------------------------------------------------------------------
-- TABLE 6: events (Yercaud Events & Notices)
-- Input Boxes (from AdminEventsTab.tsx):
--   - Event Title (input type text)
--   - Event Date (input type date / text e.g. '2026-05-22')
--   - Day (input type text e.g. '22')
--   - Month (input type text e.g. 'MAY')
--   - Event Timing (input type text e.g. '09:00 AM - 05:00 PM')
--   - Event Location / Venue (input type text)
--   - Event Category (dropdown e.g. 'Festival & Flower Show', 'Sports & Live Screen')
--   - Short Description (textarea)
--   - Full Details (textarea)
--   - Organizer Name (input type text)
--   - Organizer Phone (input type tel)
--   - Organizer Email (input type email)
--   - Poster / Banner Image URL (input type url)
--   - Entry Fee (input type text e.g. 'Free Entry', '₹50 / Person')
--   - Is Featured Event (checkbox boolean)
--   - Event Status ('upcoming', 'ongoing', 'completed')
--   - Google Maps Venue URL (input type url)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `events` (
  `id` VARCHAR(100) PRIMARY KEY COMMENT 'Unique Event ID (e.g. ev-1)',
  `title` VARCHAR(255) NOT NULL COMMENT 'Event Title input box',
  `date` VARCHAR(50) NOT NULL COMMENT 'Event Date input box (YYYY-MM-DD)',
  `day` VARCHAR(10) DEFAULT '' COMMENT 'Event Day string (e.g. 25)',
  `month` VARCHAR(10) DEFAULT '' COMMENT 'Event Month string (e.g. APR)',
  `time` VARCHAR(100) DEFAULT '10:00 AM' COMMENT 'Event Timing input box',
  `location` VARCHAR(255) NOT NULL COMMENT 'Event Venue/Location input box',
  `category` VARCHAR(150) NOT NULL COMMENT 'Event Category dropdown',
  `description` TEXT NOT NULL COMMENT 'Event Short Summary text area',
  `full_details` TEXT DEFAULT NULL COMMENT 'Event Full Program Details text area',
  `organizer` VARCHAR(150) NOT NULL COMMENT 'Organizer Name input box',
  `organizer_phone` VARCHAR(50) DEFAULT NULL COMMENT 'Organizer Phone input box',
  `organizer_email` VARCHAR(100) DEFAULT NULL COMMENT 'Organizer Email input box',
  `image_url` TEXT NOT NULL COMMENT 'Event Poster/Banner Image URL input box',
  `entry_fee` VARCHAR(100) DEFAULT 'Free Entry' COMMENT 'Entry Ticket/Fee input box',
  `is_featured` BOOLEAN DEFAULT FALSE COMMENT 'Featured Event checkbox',
  `status` VARCHAR(50) DEFAULT 'upcoming' COMMENT 'Event Status dropdown',
  `venue_map_url` TEXT DEFAULT NULL COMMENT 'Venue Google Maps Link input box',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (`status`),
  INDEX idx_featured (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ---------------------------------------------------------------------
-- TABLE 7: settings (Portal & Admin Configuration)
-- Input Boxes (from AdminSettingsTab.tsx):
--   - Portal Name
--   - Admin Contact Phone (e.g. '+91 94439 16492')
--   - Admin WhatsApp Number
--   - Admin Timing (e.g. '10.00 AM - 5.00 PM')
--   - Admin Email (e.g. 'admin@123yercaud.com')
--   - Support Address
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `settings` (
  `setting_key` VARCHAR(100) PRIMARY KEY COMMENT 'Configuration key name',
  `setting_value` TEXT COMMENT 'Configuration value input box',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ---------------------------------------------------------------------
-- TABLE 8: blood_donors (Optional Dedicated Table for Donors)
-- Input Boxes (from BloodDonorsModal.tsx):
--   - Donor Name (input type text)
--   - Blood Group ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
--   - Phone Number (input type tel)
--   - Locality (input type text)
--   - Last Donation Date (input type date/text)
--   - Available Status (checkbox boolean)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blood_donors` (
  `id` VARCHAR(100) PRIMARY KEY COMMENT 'Unique Donor ID',
  `name` VARCHAR(150) NOT NULL COMMENT 'Donor Full Name input box',
  `blood_group` ENUM('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-') NOT NULL COMMENT 'Blood Group dropdown',
  `phone` VARCHAR(50) NOT NULL COMMENT 'Contact Phone input box',
  `locality` VARCHAR(150) NOT NULL COMMENT 'Locality input box',
  `last_donation_date` VARCHAR(50) DEFAULT 'Recent' COMMENT 'Last Donation Date input box',
  `available` BOOLEAN DEFAULT TRUE COMMENT 'Available for Emergency checkbox',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ---------------------------------------------------------------------
-- TABLE 9: emergency_contacts (Emergency Services Directory)
-- Input Boxes (from EmergencyDirectoryModal.tsx):
--   - Department (e.g. 'Yercaud Police Station', 'Government Primary Health Centre')
--   - Officer / In-Charge Name
--   - Primary Phone Number
--   - Alternate Phone Number
--   - Office Address
--   - Operating Timing
--   - Emergency Type ('police', 'hospital', 'fire', 'civic', 'utility', 'helpline')
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `emergency_contacts` (
  `id` VARCHAR(100) PRIMARY KEY COMMENT 'Unique Emergency Contact ID',
  `department` VARCHAR(150) NOT NULL COMMENT 'Department Name input box',
  `name` VARCHAR(150) NOT NULL COMMENT 'Officer / Contact Name input box',
  `number` VARCHAR(50) NOT NULL COMMENT 'Primary Phone Number input box',
  `alt_number` VARCHAR(50) DEFAULT NULL COMMENT 'Alternate Phone Number input box',
  `address` TEXT NOT NULL COMMENT 'Office Address input box',
  `timing` VARCHAR(100) DEFAULT '24 Hours Emergency' COMMENT 'Operating Hours input box',
  `type` ENUM('police', 'hospital', 'fire', 'civic', 'utility', 'helpline') NOT NULL COMMENT 'Emergency Category dropdown',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
