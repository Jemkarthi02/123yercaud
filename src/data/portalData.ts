import { Business, Category, BloodDonor, CityEvent } from '../types';

export const PORTAL_CATEGORIES: Category[] = [
  {
    id: 'advocates',
    name: 'Advocates',
    iconName: 'Scale',
    color: 'bg-red-50 text-red-700 border-red-200',
    description: 'High Court lawyers, civil advocates, criminal defense, notary public, and property legal advisors',
    count: 38,
    subcategories: [
      'Attestation Services',
      'Civil Lawyers',
      'Criminal Advocates',
      'Document Writer',
      'Government Approved Valuers',
      'Lawyers',
      'Notary Advocate',
      'Property Lawyers',
      'Corporate Legal Advisors',
      'Family Court Counsellors'
    ],
  },
  {
    id: 'ac-dealers',
    name: 'AC Dealers',
    iconName: 'Wind',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Daikin, Voltas, Blue Star, LG, Mitsubishi inverter and commercial split air conditioner dealers',
    count: 26,
    subcategories: [
      'Split AC Dealers',
      'Inverter AC Dealers',
      'Commercial VRV / VRF Systems',
      'Window AC Units',
      'Cassette AC Dealers',
      'Pre-Insulated Ducting'
    ],
  },
  {
    id: 'ac-repair',
    name: 'AC Repair and Service',
    iconName: 'Wrench',
    color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    description: 'Gas charging, jet pump chemical cleaning, cooling coil repair, PCB repair, and annual maintenance',
    count: 34,
    subcategories: [
      'Chemical Jet Foam Wash',
      'Gas Refilling & Leak Arrest',
      'AC PCB Board Repair',
      'Compressor Replacement',
      'AC Uninstallation & Shifting',
      'Annual Maintenance Contracts (AMC)'
    ],
  },
  {
    id: 'acting-drivers',
    name: 'Acting Drivers',
    iconName: 'UserCheck',
    color: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'Experienced call drivers for hourly city rides, outstation trips, night shifts, and ghat hill driving',
    count: 22,
    subcategories: [
      'Hourly Call Drivers',
      'Outstation Return Trip Drivers',
      '20 Hairpin Ghat Road Drivers',
      'Luxury Automatic Car Drivers',
      'Monthly Dedicated Drivers'
    ],
  },
  {
    id: 'acupuncture',
    name: 'Acupuncture Clinics',
    iconName: 'Activity',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Traditional Chinese medicine, pain relief therapy, cupping therapy, and chronic ailment healing',
    count: 14,
    subcategories: [
      'Traditional Pulse Diagnosis',
      'Knee & Joint Pain Therapy',
      'Cupping & Moxibustion',
      'Migraine & Stress Relief',
      'Weight Loss Acupuncture'
    ],
  },
  {
    id: 'advertising',
    name: 'Advertising Agencies',
    iconName: 'Megaphone',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'Hoardings, digital marketing, newspaper classifieds, bus shelter branding, and TV commercials',
    count: 19,
    subcategories: [
      'Highway Hoardings & Billboards',
      'Digital & Social Media Marketing',
      'Newspaper Display & Classifieds',
      'Bus & Auto Rickshaw Branding',
      'Commercial Video Production'
    ],
  },
  {
    id: 'agro-products',
    name: 'Agro Products',
    iconName: 'Apple',
    color: 'bg-green-50 text-green-700 border-green-200',
    description: 'Organic manures, seeds, plantation inputs, drip irrigation components, and bio-fertilizers',
    count: 29,
    subcategories: [
      'Organic Vermicompost',
      'Drip Irrigation Pipes & Valves',
      'Plantation Spices Seedlings',
      'Hybrid Vegetable Seeds',
      'Bio-Pesticides & Growth Boosters'
    ],
  },
  {
    id: 'aluminium',
    name: 'Aluminium Fabricators',
    iconName: 'Square',
    color: 'bg-slate-50 text-slate-700 border-slate-200',
    description: 'Sliding windows, structural glazing, modular office partitions, ACP cladding, and mesh doors',
    count: 24,
    subcategories: [
      'Aluminium Sliding Windows',
      'Office Glass & Board Partitions',
      'ACP Sheet Elevation Cladding',
      'Mosquito Net Shutter Frames',
      'Toughened Glass Doors'
    ],
  },
  {
    id: 'aquariums',
    name: 'Aquariums',
    iconName: 'Fish',
    color: 'bg-sky-50 text-sky-700 border-sky-200',
    description: 'Custom glass fish tanks, exotic tropical fish, imported aquatic filters, and live planted aquascapes',
    count: 18,
    subcategories: [
      'Custom Marine & Freshwater Tanks',
      'Planted Aquascaping Design',
      'Exotic Cichlids & Arowana',
      'Canister Filters & LED Lights',
      'Aquarium Maintenance Service'
    ],
  },
  {
    id: 'astrologers',
    name: 'Astrologers',
    iconName: 'Moon',
    color: 'bg-orange-50 text-orange-800 border-orange-200',
    description: 'Vedic astrology, horoscope matching, numerology, Nadi astrology, and Vastu consultations',
    count: 27,
    subcategories: [
      'Horoscope & Jathagam Matching',
      'Vastu Shastra Consultation',
      'Numerology & Name Correction',
      'Prasanna Astrology',
      'Navagraha Remedial Gemstones'
    ],
  },
  {
    id: 'auditors',
    name: 'Auditors',
    iconName: 'FileSpreadsheet',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    description: 'Chartered Accountants (CA), GST filing, company registration, income tax returns, and statutory audits',
    count: 32,
    subcategories: [
      'GST Monthly / Annual Filings',
      'Income Tax Returns (ITR)',
      'Company & LLP Incorporation',
      'Statutory & Tax Auditing',
      'Project Financial Reports'
    ],
  },
  {
    id: 'auto-spare-parts',
    name: 'Automobile Spare Parts',
    iconName: 'Cog',
    color: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    description: 'Genuine OEM car spares, brake pads, suspension kits, engine oils, batteries, and accessories',
    count: 41,
    subcategories: [
      'OEM Engine Spares & Filters',
      'Suspension & Shock Absorbers',
      'Brake Liners & Calipers',
      'Synthetic Engine Lubricants',
      'Car Battery Sales & Exchange'
    ],
  },
  {
    id: 'ayurvedic-massage',
    name: 'Ayurvedic Body Massage Centre',
    iconName: 'Sparkle',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description: 'Authentic Kerala Panchakarma, herbal steam bath, Shirodhara, and rejuvenation oil therapy',
    count: 16,
    subcategories: [
      'Kerala Abhyanga Oil Massage',
      'Shirodhara Stress Relief',
      'Kizhi Herbal Potli Therapy',
      'Herbal Steam Detox Bath',
      'Post-Natal Mother Wellness'
    ],
  },
  {
    id: 'bakery-equipment',
    name: 'Bakery Equipment Manufacturers',
    iconName: 'Flame',
    color: 'bg-red-50 text-red-800 border-red-200',
    description: 'Rotary rack ovens, planetary dough mixers, bread slicers, and stainless steel display counters',
    count: 15,
    subcategories: [
      'Rotary Deck & Rack Ovens',
      'Spiral & Planetary Dough Mixers',
      'Electric Bread Slicers',
      'Cake Showcase Chilling Units',
      'Cookie Extruder Machines'
    ],
  },
  {
    id: 'banquet-halls',
    name: 'Banquet Halls',
    iconName: 'Building2',
    color: 'bg-amber-50 text-amber-900 border-amber-200',
    description: 'Air conditioned marriage halls, mini banquet suites, birthday party halls, and conference venues',
    count: 35,
    subcategories: [
      'Central AC Marriage Mandapams',
      'Mini Party Halls (50-200 pax)',
      'Corporate Conference Venues',
      'Lawn & Open Terrace Banquet',
      'In-House Catering & Decoration'
    ],
  },
  {
    id: 'beauty-parlours',
    name: 'Beauty Parlours',
    iconName: 'Smile',
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Bridal makeover, Hydra facials, hair smoothening, keratin spa, and skin whitening treatments',
    count: 48,
    subcategories: [
      'Bridal HD Make-Up Packages',
      'Hydra Facial & Skin Glow',
      'Keratin & Hair Botox Therapy',
      'Threading, Waxing & Bleach',
      'Nail Extensions & Gel Art'
    ],
  },
  {
    id: 'beauty-spa',
    name: 'Beauty Spa',
    iconName: 'HeartHandshake',
    color: 'bg-teal-50 text-teal-700 border-teal-200',
    description: 'Luxury aroma therapy, Swedish body massage, head spa, foot reflexology, and Turkish hammam',
    count: 21,
    subcategories: [
      'Swedish Deep Tissue Massage',
      'Aromatherapy Essential Oil Spa',
      'Foot Reflexology Lounge',
      'Hot Stone Muscle Relaxer',
      'Couples Jacuzzi Suite'
    ],
  },
  {
    id: 'body-massage',
    name: 'Body Massage Centre',
    iconName: 'Zap',
    color: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    description: 'Professional sports massage, pain management therapy, full body relaxation, and thermal therapy',
    count: 18,
    subcategories: [
      'Sports Muscle Injury Massage',
      'Thai Yoga Dry Stretch Therapy',
      'Deep Tissue Spine Realignment',
      'Corporate Chair Quick Massage'
    ],
  },
  {
    id: 'borewell',
    name: 'Borewell Contractors',
    iconName: 'Compass',
    color: 'bg-blue-50 text-blue-900 border-blue-200',
    description: 'Hydraulic sensor rig drilling, water point groundwater survey, borewell flushing, and casing pipe installation',
    count: 27,
    subcategories: [
      'Slow & High Pressure Rig Drilling',
      'Geophysical Groundwater Survey',
      'Borewell Air Compressor Flushing',
      'PVC & Iron Casing Pipes',
      'Submersible Motor Installation'
    ],
  },
  {
    id: 'brick-manufacturers',
    name: 'Brick Manufacturers',
    iconName: 'Box',
    color: 'bg-orange-50 text-orange-900 border-orange-200',
    description: 'Wire cut red chamber bricks, hollow fly ash bricks, eco-friendly interlock bricks, and refractory clay',
    count: 23,
    subcategories: [
      'Red Country Chamber Bricks',
      'Fly Ash Lightweight Bricks',
      'Interlocking Paver Blocks',
      'Wire-Cut High Density Bricks',
      'Refractory Fire Bricks'
    ],
  },
  {
    id: 'builders',
    name: 'Builders',
    iconName: 'HardHat',
    color: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'Civil construction, residential luxury villas, turnkey commercial complexes, and renovation contracts',
    count: 42,
    subcategories: [
      'Turnkey Villa Construction',
      'Gated Community Plots & Villas',
      'Structural Architectural Plans',
      'Building Renovation & Remodelling',
      'CMDA / DTCP Approved Layouts'
    ],
  },
  {
    id: 'resorts-cottages',
    name: 'Resorts & Cottages',
    iconName: 'Mountain',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description: 'Valley view mountain chalets, colonial estate bungalows, campfire homestays, and family suites',
    count: 40,
    subcategories: [
      'Valley View Cliffside Resorts',
      'Private Estate Homestays',
      'Wooden Attic Cottages',
      'Campfire & Barbecue Stays',
      'Budget Family Rooms'
    ],
  },
  {
    id: 'coffee-spices',
    name: 'Coffee Estates & Spices',
    iconName: 'Coffee',
    color: 'bg-amber-50 text-amber-900 border-amber-200',
    description: 'Single-origin Arabica & Robusta roasted coffee powder, Tellicherry black pepper, and plantation tours',
    count: 25,
    subcategories: [
      'Fresh Roasted Arabica Beans',
      'Estate Peaberry Filter Coffee',
      'Direct Estate Tellicherry Pepper',
      'Cardamom, Clove & Spices',
      'Guided Plantation Walks'
    ],
  },
  {
    id: 'chocolates',
    name: 'Homemade Chocolates',
    iconName: 'Cookie',
    color: 'bg-rose-50 text-rose-800 border-rose-200',
    description: 'Artisanal hand-rolled dark chocolates, roasted almond rocher, natural forest honey, and fruit fondue',
    count: 19,
    subcategories: [
      'Handcrafted Dark Chocolates',
      'Roasted Almond & Cashew Rocher',
      'Pure Shevaroy Forest Honey',
      'Hill Station Fruit Jams',
      'Nilgiri Eucalyptus Oils'
    ],
  },
  {
    id: 'tour-operators',
    name: 'Tour Operators',
    iconName: 'Car',
    color: 'bg-blue-50 text-blue-800 border-blue-200',
    description: 'Salem to Yercaud 20-hairpin ghat cabs, 4x4 off-road jeep safari, and customized sightseeing tours',
    count: 31,
    subcategories: [
      'Salem to Yercaud Ghat Taxis',
      '4x4 Off-Road Viewpoint Jeeps',
      'Full Day Sightseeing Packages',
      'Airport & Railway Pickups',
      'Tempo Traveller Group Rentals'
    ],
  },
  {
    id: 'restaurants',
    name: 'Non Veg Restaurants',
    iconName: 'UtensilsCrossed',
    color: 'bg-red-50 text-red-900 border-red-200',
    description: 'Authentic Kongu country chicken fry, Chettinad mutton biryani, fresh river fish, and tandoori grills',
    count: 37,
    subcategories: [
      'Country Chicken (Nattu Kozhi)',
      'Chettinad Mutton Biryani',
      'Pepper Chicken Fry',
      'Tandoori & Chinese Grills',
      'Family Dining Lounges'
    ],
  },
  {
    id: 'water-purifier',
    name: 'Water Purifier',
    iconName: 'Droplet',
    color: 'bg-sky-50 text-sky-800 border-sky-200',
    description: 'Kent, Aquaguard, Pureit RO UV alkaline purifiers, water softeners, and membrane replacements',
    count: 28,
    subcategories: [
      'Domestic RO + UV Water Purifiers',
      'Commercial RO Plants (25-500 LPH)',
      'Water Softeners for Hard Water',
      'Filter Candle & Membrane Service',
      'Alkaline Mineral Enhancers'
    ],
  },
  {
    id: 'marriage-halls',
    name: 'Marriage Halls',
    iconName: 'Church',
    color: 'bg-purple-50 text-purple-900 border-purple-200',
    description: 'Spacious wedding halls with modern dining, bridal dressing suites, generator backup, and vast parking',
    count: 33,
    subcategories: [
      'Traditional Hindu Kalyana Mandapam',
      'Centralized Air Conditioned Halls',
      'Grand Dining (500+ Seating)',
      'Groom & Bride Deluxe AC Rooms',
      'Ample Vehicle Valet Parking'
    ],
  },
  {
    id: 'concrete-blocks',
    name: 'Concrete Blocks Manufacturers',
    iconName: 'Layers',
    color: 'bg-stone-50 text-stone-800 border-stone-200',
    description: 'Solid concrete building blocks, cellular lightweight blocks (AAC), curb stones, and designer pavers',
    count: 20,
    subcategories: [
      'Solid Concrete Masonry Blocks',
      'Hollow Load-Bearing Blocks',
      'Autoclaved Aerated Concrete (AAC)',
      'Highway Kerb & Gutter Stones',
      'Vibrator Compound Wall Slabs'
    ],
  },
  {
    id: 'chimney-dealers',
    name: 'Chimney Dealers',
    iconName: 'Shield',
    color: 'bg-slate-50 text-slate-800 border-slate-200',
    description: 'Faber, Elica, Glen, Hindware auto-clean baffle filter kitchen chimneys and built-in glass gas hobs',
    count: 17,
    subcategories: [
      'Thermal Auto-Clean Chimneys',
      'Curved Glass Touch Chimneys',
      'Built-In 3 & 4 Burner Glass Hobs',
      'Ductless Carbon Filter Chimneys',
      'Chimney Deep Cleaning Service'
    ],
  }
];

export const PORTAL_BUSINESSES: Business[] = [
  // ADVOCATES (Matches Screenshot 2!)
  {
    id: 'adv-1',
    name: 'Advocate K K Natesan',
    category: 'Advocates',
    subcategory: 'Notary Advocate',
    rating: 4.9,
    reviewCount: 48,
    address: 'No. 14, Lawyer Chamber, Race Course Road',
    locality: 'Race Course',
    pincode: '641018',
    phone: '9443211112',
    alternatePhone: '0422 2301112',
    whatsapp: '919443211112',
    email: 'adv.kknatesan@gmail.com',
    openingHours: '9:00 AM - 8:30 PM (Mon - Sat)',
    isVerified: true,
    isFeatured: true,
    slotBadge: 'S1',
    contactPerson: 'Mr . Natesan Kss',
    tags: ['Notary Advocate', 'Civil Lawyers', 'Criminal Advocates'],
    description: 'Senior legal practitioner with over 32 years of standing at District Courts and Madras High Court. Specialized in civil disputes, property title verification, notary attestations, and criminal appeals.',
    services: [
      'Notary Public Attestations & Affidavits',
      'Property Title Search & Legal Opinion',
      'Civil Suits & Partition Disputes',
      'Criminal Bail & Trial Defense',
      'Registration & Power of Attorney Drafting'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    reviews: [
      {
        id: 'rev-adv1',
        author: 'S. Rajagopalan',
        rating: 5,
        date: '14 Jan 2024',
        comment: 'Extremely knowledgeable advocate. Helped resolve our long-pending property title clearance in record time.',
        verifiedUser: true
      }
    ]
  },
  {
    id: 'adv-2',
    name: 'Valarmathis',
    category: 'Advocates',
    subcategory: 'Criminal Advocates',
    rating: 4.8,
    reviewCount: 36,
    address: 'Near Sivan Temple, Rathnapuri Main Road',
    locality: 'Rathnapuri',
    pincode: '641027',
    phone: '7339112313',
    alternatePhone: '0422 2492313',
    whatsapp: '917339112313',
    openingHours: '9:30 AM - 8:00 PM',
    isVerified: true,
    isFeatured: true,
    contactPerson: 'Mrs . Valarmathiss',
    tags: ['Criminal Advocates', 'Women Rights', 'Cyber Crime Legal'],
    description: 'Dedicated legal counsel handling criminal trials, anticipatory bails, matrimonial disputes, cyber crime complaints, and human rights advocacy with strong courtroom track record.',
    services: [
      'Criminal Defense & Bail Petitions',
      'Matrimonial & Family Court Settlement',
      'Cheque Bounce (Sec 138 NI Act) Proceedings',
      'Consumer Forum Grievances',
      'Cyber Fraud & Police Liaison'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1453733197783-64ac7dedc24c?auto=format&fit=crop&w=800&q=80',
    reviews: [
      {
        id: 'rev-adv2',
        author: 'K. Meenakshi',
        rating: 5,
        date: '02 Feb 2024',
        comment: 'Very empathetic and professional guidance in our family dispute. Highly recommended.',
        verifiedUser: true
      }
    ]
  },
  {
    id: 'adv-3',
    name: 'Advocate A Prabu Armugam',
    category: 'Advocates',
    subcategory: 'Civil Lawyers',
    rating: 4.9,
    reviewCount: 52,
    address: 'Second Floor, Cross Cut Road, Gandhipuram',
    locality: 'Gandhipuram',
    pincode: '641012',
    phone: '9894223783',
    alternatePhone: '0422 2233783',
    whatsapp: '919894223783',
    openingHours: '9:00 AM - 9:00 PM',
    isVerified: true,
    isFeatured: true,
    contactPerson: 'Mr . Prabu Armugamss',
    tags: ['Civil Lawyers', 'Property Lawyers', 'Document Writer'],
    description: 'Expertise in real estate contract structuring, sale deed scrutiny, tenant eviction suits, inheritance wills, partition deeds, and encumbrance certificate verification.',
    services: [
      'Sale Deed, Lease & Trust Drafting',
      'Property Encumbrance & Legal Scrutiny',
      'Injunction & Land Encroachment Lawsuits',
      'Succession Certificates & Probate',
      'Revenue Court & Patta Transfer Matters'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
    reviews: [
      {
        id: 'rev-adv3',
        author: 'Dharmalingam V',
        rating: 5,
        date: '20 Dec 2023',
        comment: 'Clear and transparent legal advice before buying our industrial land. Prevented a major litigation.',
        verifiedUser: true
      }
    ]
  },
  {
    id: 'adv-4',
    name: 'Advocate R Soundararajan LLB',
    category: 'Advocates',
    subcategory: 'Property Lawyers',
    rating: 4.8,
    reviewCount: 39,
    address: 'Near District Court Complex, Gopalapuram',
    locality: 'Gopalapuram',
    pincode: '641018',
    phone: '9443312290',
    whatsapp: '919443312290',
    openingHours: '10:00 AM - 8:00 PM',
    isVerified: true,
    isFeatured: true,
    slotBadge: 'S2',
    contactPerson: 'Mr . Soundararajan LLB',
    tags: ['Notary Advocate', 'High Court Vakil', 'Corporate Legal'],
    description: 'High Court advocate handling complex corporate litigation, arbitration, labor tribunal matters, trademark registrations, and government approved notary services.',
    services: [
      'Commercial Arbitration & Mediation',
      'Labor Dispute Settlements & Factory Compliance',
      'Trademark & Copyright Filings',
      'Writ Petitions before Madras High Court',
      'Government Notary Attestations'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=800&q=80',
    reviews: []
  },

  // AC DEALERS
  {
    id: 'ac-1',
    name: 'Cool Tech Air Conditioners',
    category: 'AC Dealers',
    subcategory: 'Split AC Dealers',
    rating: 4.9,
    reviewCount: 64,
    address: 'No. 88, 100 Feet Road, Near Gandhipuram Signal',
    locality: 'Gandhipuram',
    pincode: '641012',
    phone: '9842233441',
    whatsapp: '919842233441',
    openingHours: '9:30 AM - 9:00 PM',
    isVerified: true,
    isFeatured: true,
    slotBadge: 'S1',
    contactPerson: 'Mr . Sridhar Raj',
    tags: ['Daikin Authorized', 'Inverter Split AC', 'Free Delivery'],
    description: 'Multi-brand showroom for Daikin, Voltas, O General, and Mitsubishi Air Conditioners with live demo display, zero-percent EMI schemes, and guaranteed 4-hour quick installation.',
    services: [
      '1 Ton, 1.5 Ton, 2 Ton 5-Star Inverter ACs',
      'Free Home Delivery & Standard Installation',
      '0% Interest Bajaj Finserv EMI Options',
      'Old AC Exchange Bonus up to ₹4,000',
      'Commercial Cassette & Ductable Units'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    reviews: []
  },
  {
    id: 'ac-2',
    name: 'Sri Krishna Climate Solutions',
    category: 'AC Dealers',
    subcategory: 'Inverter AC Dealers',
    rating: 4.7,
    reviewCount: 42,
    address: 'Avinashi Road, Near Lakshmi Mills Junction',
    locality: 'Peelamedu',
    pincode: '641004',
    phone: '9443188992',
    whatsapp: '919443188992',
    openingHours: '10:00 AM - 8:30 PM',
    isVerified: true,
    isFeatured: false,
    contactPerson: 'Mr . Krishnan K',
    tags: ['Blue Star', 'Carrier', 'VRV Commercial'],
    description: 'Specialists in residential and heavy commercial central AC setups, clean room air filtration, and energy saving inverter systems.',
    services: [
      'Blue Star & Carrier AC Sales',
      'Commercial VRF Air Conditioning',
      'Copper Pipe Pre-Installation for New Homes',
      'Extended 5-Year Compressor Warranty'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    reviews: []
  },

  // RESORTS & COTTAGES (123yercaud / Hill Stays)
  {
    id: 'res-1',
    name: 'Great Trails Yercaud by GRT Hotels',
    category: 'Resorts & Cottages',
    subcategory: 'Valley View Cliffside Resorts',
    rating: 4.9,
    reviewCount: 340,
    address: 'Five Roads, Shevaroy Hills, Yercaud',
    locality: 'Five Roads Junction',
    pincode: '636601',
    phone: '04281 222277',
    alternatePhone: '9442700077',
    whatsapp: '919442700077',
    openingHours: 'Open 24 Hours',
    isVerified: true,
    isFeatured: true,
    slotBadge: 'S1',
    contactPerson: 'Mr . Rajendran K',
    tags: ['Sky Rocca Glass Deck', 'Valley View Suites', 'Infinity Pool'],
    description: 'Perched on the cliff edge of the Shevaroy Hills offering panoramic vistas of the 20 hairpin curves and Salem valley. Featuring Sky Rocca cantilever glass deck restaurant, heated pool, and private chalets.',
    services: [
      'Cantilever Glass Skywalk Restaurant',
      'Salem Valley & Ghat View Balcony Rooms',
      'Heated Outdoor Swimming Pool & Spa',
      'Guided Coffee Estate Walks & Campfire Nights'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: []
  },
  {
    id: 'res-2',
    name: 'Sterling Yercaud (Rock Perch)',
    category: 'Resorts & Cottages',
    subcategory: 'Valley View Cliffside Resorts',
    rating: 4.8,
    reviewCount: 295,
    address: 'Lady\'s Seat Road, Near Gent\'s Seat Viewpoint',
    locality: 'Lady\'s Seat Road',
    pincode: '636601',
    phone: '04281 227000',
    whatsapp: '919442227000',
    openingHours: 'Open 24 Hours',
    isVerified: true,
    isFeatured: true,
    slotBadge: 'S2',
    contactPerson: 'Guest Relations Desk',
    tags: ['Cliffside Cottages', 'Stargazing Telescope', 'Bonfire Dinners'],
    description: 'Perched directly on the cliff beside Lady’s Seat viewpoint. By night, enjoy gazing at the sparkling city lights of Salem 4,000 feet below through mounted telescopes.',
    services: [
      'Duplex Wooden Cottages & Suites',
      'High-Power Telescope Night Stargazing',
      'Subburayan Ayurvedic Wellness Spa',
      'Amphitheatre Cultural Shows & Campfire'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: []
  },

  // COFFEE ESTATES & SPICES
  {
    id: 'cof-1',
    name: 'MSP Coffee Plantation & Heritage Estate',
    category: 'Coffee Estates & Spices',
    subcategory: 'Fresh Roasted Arabica Beans',
    rating: 4.9,
    reviewCount: 210,
    address: 'Cauvery Peak Road, Near Nagalur, Shevaroy Hills',
    locality: 'Nagalur',
    pincode: '636602',
    phone: '04281 222410',
    whatsapp: '919842722410',
    openingHours: '8:30 AM - 6:00 PM (Daily)',
    isVerified: true,
    isFeatured: true,
    slotBadge: 'S1',
    contactPerson: 'Mr . Navin MSP',
    tags: ['Single Origin Arabica', 'Peaberry Filter Coffee', 'Estate Pepper'],
    description: 'Heritage coffee plantation established in 1920. Conducts guided agro-tourism walks, coffee bean harvesting, cupping sessions, and offers freshly roasted Peaberry and Arabica powder.',
    services: [
      'Guided Coffee Estate Agro-Tourism Tours',
      'Coffee Cupping & Tasting Masterclasses',
      'Single-Origin Roasted Beans & Peaberry Powder',
      'Organic Tellicherry Black Pepper & Cloves'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: []
  },

  // HOMEMADE CHOCOLATES
  {
    id: 'choc-1',
    name: 'Royal Homemade Chocolates & Spices Store',
    category: 'Homemade Chocolates',
    subcategory: 'Handcrafted Dark Chocolates',
    rating: 4.8,
    reviewCount: 320,
    address: 'Shop No. 4, Lake View Road, Near Anna Park',
    locality: 'Lake Road & Boathouse',
    pincode: '636601',
    phone: '04281 222555',
    whatsapp: '919842222555',
    openingHours: '8:00 AM - 10:00 PM (Daily)',
    isVerified: true,
    isFeatured: true,
    slotBadge: 'S1',
    contactPerson: 'Mr . Farooq K',
    tags: ['Almond Rocher', 'Dark Truffles', 'Wild Forest Honey'],
    description: 'Famous confectionery landmark crafting hand-rolled dark chocolates, roasted hazelnut clusters, fruit & nut slabs, pure eucalyptus oils, and wild forest honey directly from Shevaroy hills.',
    services: [
      'Artisanal Melt-in-Mouth Dark & Milk Chocolates',
      'Almond, Cashew & Walnut Rochers',
      'Pure Shevaroy Wild Forest Honey',
      'Gift Packaging & Safe Domestic Courier'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: []
  },

  // TOUR OPERATORS & CABS
  {
    id: 'tour-1',
    name: 'Salem - Yercaud 20 Hairpin Ghat Cabs & Tours',
    category: 'Tour Operators',
    subcategory: 'Salem to Yercaud Ghat Taxis',
    rating: 4.8,
    reviewCount: 195,
    address: 'Near Yercaud Main Bus Stand, Ondikadai Signal',
    locality: 'Yercaud Town / Bus Stand',
    pincode: '636601',
    phone: '04281 222999',
    alternatePhone: '9443122999',
    whatsapp: '919443122999',
    openingHours: '24 Hours Open (On-Call Drivers)',
    isVerified: true,
    isFeatured: true,
    slotBadge: 'S1',
    contactPerson: 'Mr . Senthilvel K',
    tags: ['20 Hairpin Ghat Experts', '4x4 Off-Road Jeeps', 'Salem Pickup'],
    description: 'Expert hill drivers specializing in the scenic 32-km Salem to Yercaud mountain road featuring 20 sharp hairpin bends. Offering Innova, Ertiga, and 4x4 open jeep safaris to offbeat viewpoints.',
    services: [
      'Salem Junction Railway Station Pick-Up & Drop',
      'Salem Airport & Coimbatore Airport Transfers',
      'Complete 1-Day & 2-Day Yercaud Sightseeing Packages',
      'Manjakuttai Sunrise 4x4 Off-Road Jeep Trips'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: []
  },

  // BUILDERS
  {
    id: 'bld-1',
    name: 'Sri Ram Builders & Promoters',
    category: 'Builders',
    subcategory: 'Turnkey Villa Construction',
    rating: 4.9,
    reviewCount: 78,
    address: 'No. 45, DB Road, RS Puram',
    locality: 'RS Puram',
    pincode: '641002',
    phone: '9843322119',
    whatsapp: '919843322119',
    openingHours: '9:00 AM - 7:30 PM',
    isVerified: true,
    isFeatured: true,
    slotBadge: 'S1',
    contactPerson: 'Er . S. Ramachandran ME',
    tags: ['DTCP Approved', 'Turnkey Construction', 'Architectural Vastu'],
    description: 'Over 25 years of quality construction across residential gated communities, individual luxury villas, and commercial spaces with strict earthquake-resistant structural standards.',
    services: [
      'Turnkey House & Villa Construction',
      'Architectural 3D Elevation & Structural Designs',
      'Building Approval & Plan Clearance',
      'Interior Modular Kitchens & Wardrobes'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    reviews: []
  },

  // NON VEG RESTAURANTS
  {
    id: 'rest-1',
    name: 'Shevaroys Hotel & Silver Oak Restaurant',
    category: 'Non Veg Restaurants',
    subcategory: 'Pepper Chicken Fry',
    rating: 4.8,
    reviewCount: 260,
    address: 'Hospital Road, Near Bus Stand, Yercaud',
    locality: 'Yercaud Town / Bus Stand',
    pincode: '636601',
    phone: '04281 222288',
    whatsapp: '919842222288',
    openingHours: '7:00 AM - 10:30 PM (Daily)',
    isVerified: true,
    isFeatured: true,
    slotBadge: 'S1',
    contactPerson: 'Mr . Selvamani Manager',
    tags: ['Kongu Country Chicken', 'Biryani Special', 'Family Garden Dining'],
    description: 'Legendary restaurant famous for authentic Kongu country chicken fry, tender mutton pepper masala, freshly baked rotis, and Malabar seafood curries in a charming wooden hill atmosphere.',
    services: [
      'Kongu Nadu Country Chicken & Pepper Fry',
      'Seeraga Samba Mutton & Chicken Biryani',
      'Silver Oak Garden Restaurant & Bar Lounge',
      'Freshly Brewed Shevaroy Filter Coffee'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    reviews: []
  }
];

export const BLOOD_DONORS: BloodDonor[] = [
  { id: 'bd-1', name: 'R. Karthik', bloodGroup: 'O+', phone: '98422 11234', locality: 'Gandhipuram / Yercaud Main', lastDonationDate: '3 months ago', available: true },
  { id: 'bd-2', name: 'S. Priya', bloodGroup: 'A+', phone: '94431 88721', locality: 'RS Puram / Lady\'s Seat', lastDonationDate: '5 months ago', available: true },
  { id: 'bd-3', name: 'M. Senthil Kumar', bloodGroup: 'B+', phone: '98942 55612', locality: 'Peelamedu / Ondikadai', lastDonationDate: '2 months ago', available: true },
  { id: 'bd-4', name: 'Dr. A. Vignesh', bloodGroup: 'AB+', phone: '94427 44109', locality: 'Town Hall / Nagalur', lastDonationDate: '6 months ago', available: true },
  { id: 'bd-5', name: 'K. Anand', bloodGroup: 'O-', phone: '98433 99201', locality: 'Race Course / Five Roads', lastDonationDate: '4 months ago', available: true },
  { id: 'bd-6', name: 'P. Deepa', bloodGroup: 'A-', phone: '97891 33451', locality: 'Saibaba Colony / Asambur', lastDonationDate: '1 month ago', available: true },
  { id: 'bd-7', name: 'V. Murugan', bloodGroup: 'B-', phone: '94432 77123', locality: 'Singanallur / Manjakuttai', lastDonationDate: '3 months ago', available: true },
  { id: 'bd-8', name: 'G. Mohan', bloodGroup: 'AB-', phone: '98421 66504', locality: 'Saravanampatti / Semmantham', lastDonationDate: '7 months ago', available: true },
];

export const getBusinessesWithFallback = (
  categoryName: string, 
  existingBusinesses: Business[],
  allCategories?: Category[]
): Business[] => {
  const matched = existingBusinesses.filter(
    (b) => b.category.toLowerCase() === categoryName.toLowerCase()
  );
  if (matched.length > 0) return matched;

  // Generate realistic fallback listings for any category clicked
  const categoryPool = allCategories && allCategories.length > 0 ? allCategories : PORTAL_CATEGORIES;
  const catObj = categoryPool.find((c) => c.name.toLowerCase() === categoryName.toLowerCase());
  const sub1 = catObj?.subcategories[0] || 'Sales & Service';
  const sub2 = catObj?.subcategories[1] || 'Authorized Dealer';
  const sub3 = catObj?.subcategories[2] || 'Repair & Maintenance';

  return [
    {
      id: `gen-${categoryName}-1`,
      name: `Sri ${categoryName} Care & Services`,
      category: categoryName,
      subcategory: sub1,
      rating: 4.8,
      reviewCount: 34,
      address: 'No. 24, Main Road, Near Bus Stand',
      locality: 'Town Centre',
      pincode: '636601',
      phone: '9842211990',
      whatsapp: '919842211990',
      openingHours: '9:00 AM - 8:00 PM',
      isVerified: true,
      isFeatured: true,
      slotBadge: 'S1',
      contactPerson: 'Mr . S. Murugesan',
      tags: [sub1, sub2, sub3],
      description: `Leading provider of ${categoryName} services with over 15 years of industry experience, verified quality, and prompt customer support.`,
      services: [`Quality ${sub1}`, `Authorized ${sub2}`, 'Prompt Customer Support', 'Doorstep Service'],
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      reviews: []
    },
    {
      id: `gen-${categoryName}-2`,
      name: `Star ${categoryName} Solutions`,
      category: categoryName,
      subcategory: sub2,
      rating: 4.7,
      reviewCount: 28,
      address: 'Shop No. 7, Commercial Complex, Lake Road',
      locality: 'Lake Road',
      pincode: '636601',
      phone: '9443122880',
      whatsapp: '919443122880',
      openingHours: '9:30 AM - 8:30 PM',
      isVerified: true,
      isFeatured: true,
      slotBadge: 'S2',
      contactPerson: 'Mr . R. Venkatesh',
      tags: [sub2, sub1, 'Annual Maintenance'],
      description: `Trusted specialist for ${categoryName}. Offering genuine parts, certified technicians, and reasonable pricing.`,
      services: [`Specialist in ${sub2}`, 'On-Site Inspection', 'Warranty Support'],
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      reviews: []
    }
  ];
};

export const CITY_EVENTS: CityEvent[] = [
  {
    id: 'ev-1',
    title: 'Yercaud Summer Festival & Annual Flower Show 2026',
    date: 'May 22 - May 28, 2026',
    day: '22',
    month: 'MAY',
    time: '9:00 AM - 6:00 PM',
    location: 'Anna Park & Botanical Garden, Yercaud',
    category: 'Festival & Flower Show',
    description: 'Spectacular annual hill festival with over 100,000 blooming flowers, vegetable carvings, cultural dances, dog shows, and boat races on Yercaud Lake.',
    fullDetails: 'The grand annual festival organized by the Horticulture Department featuring exotic orchids, rose exhibits, musical nights, and tourist competitions.',
    organizer: 'Tamil Nadu Tourism & Horticulture Dept',
    organizerPhone: '+91 94439 16492',
    entryFee: 'Free Entry',
    imageUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    status: 'upcoming'
  },
  {
    id: 'ev-2',
    title: 'Shevaroy Hills Coffee Plantation & Agro Expo',
    date: 'June 15 - June 17, 2026',
    day: '15',
    month: 'JUN',
    time: '10:00 AM - 5:00 PM',
    location: 'Yercaud Town Hall Grounds',
    category: 'Agriculture & Coffee',
    description: 'Exhibition of single-origin coffee roasting, spice processing technologies, organic agricultural inputs, and artisanal confectionery stalls.',
    fullDetails: 'Featuring estate tours, barista workshops, and authentic Yercaud pepper and honey tastings from local plantation owners.',
    organizer: 'Shevaroys Planters Association',
    organizerPhone: '+91 94439 16492',
    entryFee: 'Free Entry',
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    status: 'upcoming'
  },
  {
    id: 'ev-3',
    title: 'Ghat Road Hill Marathon & Cycling Challenge',
    date: 'July 10, 2026',
    day: '10',
    month: 'JUL',
    time: '6:00 AM - 12:00 PM',
    location: 'Salem Foothills to Yercaud Lake (32 km)',
    category: 'Sports & Adventure',
    description: 'Thrilling hill climb cycling and marathon through the 20 scenic hairpin curves up to 1,515 metres elevation.',
    fullDetails: 'Open for amateur and professional endurance athletes with medal distribution at Yercaud Boathouse lawns.',
    organizer: 'Salem-Yercaud Adventure Sports Club',
    organizerPhone: '+91 94439 16492',
    entryFee: '₹250 / Participant',
    imageUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    status: 'upcoming'
  }
];
