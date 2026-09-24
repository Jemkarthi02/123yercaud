import pool from '../config/db.js';
import { PORTAL_CATEGORIES, PORTAL_BUSINESSES } from '../../src/data/portalData';
import { INITIAL_BUSINESSES, YERCAUD_LOCALITIES } from '../../src/data/yercaudData';
import { INITIAL_INQUIRIES } from '../../src/data/inquiriesData';
import { INITIAL_EVENTS } from '../../src/data/eventsData';

async function initDb() {
  console.log('--- Initializing 123 Yercaud MySQL Database on xiadot.com ---');
  const conn = await pool.getConnection();

  try {
    // 1. Create Admins Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100) DEFAULT 'Administrator',
        role VARCHAR(50) DEFAULT 'superadmin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Create Categories Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        icon_name VARCHAR(100) DEFAULT 'Layers',
        color VARCHAR(100) DEFAULT 'bg-slate-50 text-slate-700 border-slate-200',
        description TEXT,
        count INT DEFAULT 0,
        subcategories JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Create Localities Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS localities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Create Businesses Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS businesses (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(150) NOT NULL,
        subcategory VARCHAR(150) DEFAULT '',
        rating DECIMAL(3, 1) DEFAULT 4.5,
        review_count INT DEFAULT 0,
        address TEXT,
        locality VARCHAR(150) DEFAULT '',
        pincode VARCHAR(20) DEFAULT '636601',
        phone VARCHAR(50),
        alternate_phone VARCHAR(50),
        whatsapp VARCHAR(50),
        email VARCHAR(100),
        website VARCHAR(255),
        map_url TEXT,
        opening_hours VARCHAR(255) DEFAULT '9:00 AM - 8:00 PM',
        is_verified BOOLEAN DEFAULT TRUE,
        is_featured BOOLEAN DEFAULT FALSE,
        established_year INT DEFAULT 2015,
        contact_person VARCHAR(100),
        slot_badge VARCHAR(100),
        tags JSON,
        description TEXT,
        services JSON,
        image_url TEXT,
        gallery JSON,
        reviews JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Create Inquiries Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id VARCHAR(100) PRIMARY KEY,
        business_id VARCHAR(100),
        business_name VARCHAR(255),
        category VARCHAR(150),
        user_name VARCHAR(150) NOT NULL,
        user_phone VARCHAR(50) NOT NULL,
        user_email VARCHAR(100),
        requirement TEXT,
        locality VARCHAR(150),
        date VARCHAR(50),
        time VARCHAR(50),
        status ENUM('new', 'contacted', 'resolved', 'archived') DEFAULT 'new',
        source VARCHAR(50) DEFAULT 'detail_enquiry',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 6. Create Events Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS events (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(50),
        day VARCHAR(10),
        month VARCHAR(10),
        time VARCHAR(100),
        location VARCHAR(255),
        category VARCHAR(150),
        description TEXT,
        full_details TEXT,
        organizer VARCHAR(150),
        organizer_phone VARCHAR(50),
        organizer_email VARCHAR(100),
        image_url TEXT,
        entry_fee VARCHAR(100),
        is_featured BOOLEAN DEFAULT FALSE,
        status VARCHAR(50) DEFAULT 'upcoming',
        venue_map_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 7. Create Settings Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS settings (
        setting_key VARCHAR(100) PRIMARY KEY,
        setting_value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('✓ All database tables verified / created successfully.');

    // Seed default admin accounts
    const [existingAdmins]: any = await conn.query('SELECT COUNT(*) as cnt FROM admins');
    if (existingAdmins[0].cnt === 0) {
      await conn.query(`
        INSERT INTO admins (username, password, name, role) VALUES 
        ('admin', 'admin123', 'Super Admin', 'superadmin'),
        ('yercaud123', '123yercaud@123', 'Yercaud 123 Admin', 'superadmin')
      `);
      console.log('✓ Default admin accounts seeded.');
    }

    // Seed default settings
    const [existingSettings]: any = await conn.query('SELECT COUNT(*) as cnt FROM settings');
    if (existingSettings[0].cnt === 0) {
      const defaultSettings = [
        ['portal_name', '123 Yercaud Local Search Portal'],
        ['admin_contact_phone', '+91 94439 16492'],
        ['admin_whatsapp', '919443916492'],
        ['admin_timing', '10.00 AM - 5.00 PM'],
        ['admin_email', 'admin@123yercaud.com'],
        ['support_address', 'Yercaud Main Road, Salem - 636601, Tamil Nadu']
      ];
      for (const [key, val] of defaultSettings) {
        await conn.query('INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)', [key, val]);
      }
      console.log('✓ Default portal settings seeded.');
    }

    // Seed categories
    const [existingCategories]: any = await conn.query('SELECT COUNT(*) as cnt FROM categories');
    if (existingCategories[0].cnt === 0) {
      for (const cat of PORTAL_CATEGORIES) {
        await conn.query(
          `INSERT INTO categories (id, name, icon_name, color, description, count, subcategories) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            cat.id,
            cat.name,
            cat.iconName || 'Layers',
            cat.color || 'bg-slate-50 text-slate-700 border-slate-200',
            cat.description || '',
            cat.count || 0,
            JSON.stringify(cat.subcategories || [])
          ]
        );
      }
      console.log(`✓ Seeded ${PORTAL_CATEGORIES.length} categories.`);
    }

    // Seed localities
    const [existingLocalities]: any = await conn.query('SELECT COUNT(*) as cnt FROM localities');
    if (existingLocalities[0].cnt === 0) {
      for (const loc of YERCAUD_LOCALITIES) {
        await conn.query('INSERT IGNORE INTO localities (name) VALUES (?)', [loc]);
      }
      console.log(`✓ Seeded ${YERCAUD_LOCALITIES.length} localities.`);
    }

    // Seed businesses
    const [existingBusinesses]: any = await conn.query('SELECT COUNT(*) as cnt FROM businesses');
    if (existingBusinesses[0].cnt === 0) {
      const combined = [
        ...PORTAL_BUSINESSES,
        ...INITIAL_BUSINESSES.filter(
          (ib) => !PORTAL_BUSINESSES.some((pb) => pb.id === ib.id || pb.name.toLowerCase() === ib.name.toLowerCase())
        )
      ];

      for (const b of combined) {
        await conn.query(
          `INSERT INTO businesses (
            id, name, category, subcategory, rating, review_count, address, locality, 
            pincode, phone, alternate_phone, whatsapp, email, website, map_url, 
            opening_hours, is_verified, is_featured, established_year, contact_person, 
            slot_badge, tags, description, services, image_url, gallery, reviews
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            b.id,
            b.name,
            b.category,
            b.subcategory || '',
            b.rating || 4.5,
            b.reviewCount || 0,
            b.address || '',
            b.locality || 'Yercaud',
            b.pincode || '636601',
            b.phone || '',
            b.alternatePhone || null,
            b.whatsapp || null,
            b.email || null,
            b.website || null,
            b.mapUrl || null,
            b.openingHours || '9:00 AM - 8:00 PM',
            b.isVerified ? 1 : 0,
            b.isFeatured ? 1 : 0,
            b.establishedYear || 2015,
            b.contactPerson || null,
            b.slotBadge || null,
            JSON.stringify(b.tags || []),
            b.description || '',
            JSON.stringify(b.services || []),
            b.imageUrl || '',
            JSON.stringify(b.gallery || []),
            JSON.stringify(b.reviews || [])
          ]
        );
      }
      console.log(`✓ Seeded ${combined.length} businesses.`);
    }

    // Seed inquiries
    const [existingInquiries]: any = await conn.query('SELECT COUNT(*) as cnt FROM inquiries');
    if (existingInquiries[0].cnt === 0) {
      for (const inq of INITIAL_INQUIRIES) {
        await conn.query(
          `INSERT INTO inquiries (
            id, business_id, business_name, category, user_name, user_phone, 
            user_email, requirement, locality, date, time, status, source, notes
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            inq.id,
            inq.businessId || null,
            inq.businessName || null,
            inq.category || null,
            inq.userName,
            inq.userPhone,
            inq.userEmail || null,
            inq.requirement || '',
            inq.locality || 'Yercaud',
            inq.date || 'Today',
            inq.time || '10:00 AM',
            inq.status || 'new',
            inq.source || 'detail_enquiry',
            inq.notes || null
          ]
        );
      }
      console.log(`✓ Seeded ${INITIAL_INQUIRIES.length} inquiries.`);
    }

    // Seed events
    const [existingEvents]: any = await conn.query('SELECT COUNT(*) as cnt FROM events');
    if (existingEvents[0].cnt === 0) {
      for (const ev of INITIAL_EVENTS) {
        await conn.query(
          `INSERT INTO events (
            id, title, date, day, month, time, location, category, 
            description, full_details, organizer, organizer_phone, 
            organizer_email, image_url, entry_fee, is_featured, status, venue_map_url
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            ev.id,
            ev.title,
            ev.date || '',
            ev.day || '',
            ev.month || '',
            ev.time || '',
            ev.location || '',
            ev.category || '',
            ev.description || '',
            ev.fullDetails || null,
            ev.organizer || '',
            ev.organizerPhone || null,
            ev.organizerEmail || null,
            ev.imageUrl || '',
            ev.entryFee || 'Free Entry',
            ev.isFeatured ? 1 : 0,
            ev.status || 'upcoming',
            ev.venueMapUrl || null
          ]
        );
      }
      console.log(`✓ Seeded ${INITIAL_EVENTS.length} events.`);
    }

    console.log(' Database initialization completed successfully!');
  } catch (err) {
    console.error('Database initialization error:', err);
    throw err;
  } finally {
    conn.release();
    process.exit(0);
  }
}

initDb();
