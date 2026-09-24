import { Business, Category, CityAttraction, EmergencyContact } from '../types';

export const YERCAUD_LOCALITIES = [
  'All Localities',
  'Lake Road & Boathouse',
  'Lady\'s Seat Road',
  'Pagoda Point Road',
  'Ondikadai',
  'Shevaroy Temple Road',
  'Asambur',
  'Manjakuttai Viewpoint',
  'Nagalur',
  'Kombaikkadu',
  'Semmantham',
  'Salem-Yercaud Ghat Road',
  'Yercaud Town / Bus Stand',
  'Five Roads Junction',
  'Killiyur Falls Route',
];

export const DIRECTORY_CATEGORIES: Category[] = [
  {
    id: 'resorts-homestays',
    name: 'Resorts, Cottages & Homestays',
    iconName: 'Building',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Luxury valley-view resorts, cozy estate homestays, wooden chalets, and budget cottages',
    count: 36,
    subcategories: ['Valley View Resorts', 'Estate Homestays', 'Private Cottages & Villas', 'Budget Lodges', 'Tented Camping Sites', 'Pet-Friendly Stays'],
  },
  {
    id: 'coffee-spices-estates',
    name: 'Coffee Estates & Spice Plantations',
    iconName: 'Flame',
    color: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'Fresh Arabica & Robusta coffee beans, pepper, cardamom, clove estates, and plantation walk tours',
    count: 24,
    subcategories: ['Arabica & Robusta Coffee', 'Estate Guided Walks', 'Black Pepper & Spices', 'Organic Fruit Orchards (Orange, Pear)', 'Wholesale Coffee Suppliers'],
  },
  {
    id: 'chocolates-hill-products',
    name: 'Homemade Chocolates & Hill Treats',
    iconName: 'Sparkles',
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Artisanal chocolates, fruit fondue, natural forest honey, homemade jams, and fresh tea powders',
    count: 18,
    subcategories: ['Homemade Dark Chocolates', 'Almond & Cashew Rocher', 'Wild Forest Honey', 'Homemade Hill Jams & Pickles', 'Shevaroy Green Tea & Masala Chai'],
  },
  {
    id: 'cabs-tours-travels',
    name: 'Cabs, Ghat Transport & Jeep Safari',
    iconName: 'Car',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Salem to Yercaud 20 hairpin ghat road cabs, off-road 4x4 jeep safaris, and local sightseeing taxis',
    count: 22,
    subcategories: ['Salem to Yercaud Ghat Cabs', 'Local Sightseeing Packages', '4x4 Off-Road Jeep Safari', 'Two Wheeler Bike Rentals', 'Airport & Railway Station Pickup'],
  },
  {
    id: 'restaurants-cafes',
    name: 'Restaurants & Hilltop Cafes',
    iconName: 'Utensils',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    description: 'Authentic Kongu Nadu non-veg, South Indian vegetarian meals, fresh brewed coffee, and barbecue dinners',
    count: 28,
    subcategories: ['Pure Veg South Indian Mess', 'Hill Station Non-Veg Cuisine', 'Valley View Cafes & Coffee Lounges', 'Campfire Barbecue Dinners', 'Bakery & Wood-Fired Pizza'],
  },
  {
    id: 'sightseeing-adventure',
    name: 'Sightseeing, Boating & Adventure Parks',
    iconName: 'Compass',
    color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    description: 'Lake boating, zip-lining, ATV quad bike tracks, viewpoint entry, and botanical garden eco tours',
    count: 20,
    subcategories: ['Yercaud Lake Boating', 'ATV Rides & High Rope Zip-line', 'Trekking & Forest Nature Walks', 'Viewpoint Binocular Telescopes', 'Camping & Campfire Grounds'],
  },
  {
    id: 'herbal-essential-oils',
    name: 'Essential Oils, Herbal & Nurseries',
    iconName: 'Activity',
    color: 'bg-teal-50 text-teal-700 border-teal-200',
    description: 'Pure Nilgiri Eucalyptus oil, Citronella mosquito oil, pain relief herbal liniments, and exotic plant nurseries',
    count: 16,
    subcategories: ['Pure Nilgiri Eucalyptus Oil', 'Citronella & Lemongrass Oils', 'Ayurvedic Herbal Balms', 'Orchid & Rose Nurseries', 'Succulents & Hill Ornamental Flora'],
  },
  {
    id: 'estate-real-estate',
    name: 'Estate Lands, Farmhouses & Real Estate',
    iconName: 'Briefcase',
    color: 'bg-slate-50 text-slate-800 border-slate-200',
    description: 'Coffee plantation parcels, scenic hilltop holiday home plots, farmhouse lands, and commercial cottages',
    count: 15,
    subcategories: ['Coffee & Pepper Estate Lands', 'Hill View Residential Plots', 'Holiday Home & Villa Promoters', 'Commercial Resort Leases', 'Survey & Legal Property Verification'],
  },
  {
    id: 'schools-heritage',
    name: 'Schools & Heritage Institutions',
    iconName: 'GraduationCap',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'Historic British colonial boarding schools, convent academies, and hill station educational centers',
    count: 12,
    subcategories: ['Anglo-Indian Boarding Schools', 'Residential Academies', 'Heritage Mission Libraries', 'Nature Camps & Educational Retreats'],
  },
  {
    id: 'emergency-health',
    name: 'Healthcare, Clinic & Emergency Hub',
    iconName: 'Shield',
    color: 'bg-red-50 text-red-700 border-red-200',
    description: 'Government Hospital, 24x7 ambulance, medical pharmacies, hill rescue, and first aid centres',
    count: 10,
    subcategories: ['Primary Health Centres', '24x7 Pharmacy & First Aid', 'Ghat Road Emergency Ambulance', 'Veterinary Clinic & Pet Aid'],
  }
];

export const INITIAL_BUSINESSES: Business[] = [
  {
    id: 'biz-y1',
    name: 'Great Trails Yercaud by GRT Hotels',
    category: 'Resorts, Cottages & Homestays',
    subcategory: 'Valley View Resorts',
    rating: 4.9,
    reviewCount: 340,
    address: 'Five Roads, Shevaroy Hills, Yercaud',
    locality: 'Five Roads Junction',
    pincode: '636601',
    phone: '04281 222277',
    alternatePhone: '+91 94427 00077',
    whatsapp: '919442700077',
    email: 'reservations@grthotels.com',
    website: 'https://grthotels.com/yercaud',
    openingHours: 'Open 24 Hours (Front Desk & Concierge)',
    isVerified: true,
    isFeatured: true,
    establishedYear: 2012,
    contactPerson: 'Mr. Rajendran K (General Manager)',
    description: 'Perched on the cliffside of Shevaroy Hills offering breathtaking panoramic vistas of the 20 hairpin ghat bends and Salem valley. Featuring Sky Rocca glass deck restaurant, temperature controlled infinity pool, and luxury chalets.',
    services: [
      'Sky Rocca Cantilever Glass Skywalk',
      'Salem Valley & Ghat View Private Balcony Suites',
      'Outdoor Heated Swimming Pool & Spa',
      'Salem Ghat Road Airport & Railway Transfers',
      'Guided Coffee Estate Walks & Campfire Nights',
      'Multi-Cuisine Salem & Continental Fine Dining'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-y101',
        author: 'Arunmozhi Varman',
        rating: 5,
        date: '12 Aug 2024',
        comment: 'The glass skywalk view at sunset is beyond words. Best luxury resort in Yercaud with top-class hospitality.'
      },
      {
        id: 'rev-y102',
        author: 'Dr. Sneha Pillai',
        rating: 5,
        date: '03 Jun 2024',
        comment: 'Outstanding food and quiet misty mornings. The staff took very good care of our family.'
      }
    ]
  },
  {
    id: 'biz-y2',
    name: 'Sterling Yercaud (Rock Perch)',
    category: 'Resorts, Cottages & Homestays',
    subcategory: 'Valley View Resorts',
    rating: 4.8,
    reviewCount: 295,
    address: 'Lady\'s Seat Road, Near Gent\'s Seat Viewpoint',
    locality: 'Lady\'s Seat Road',
    pincode: '636601',
    phone: '04281 227000',
    alternatePhone: '1800 102 3346',
    whatsapp: '919442227000',
    email: 'resv.yercaud@sterlingholidays.com',
    website: 'https://www.sterlingholidays.com',
    openingHours: 'Open 24 Hours',
    isVerified: true,
    isFeatured: true,
    establishedYear: 1994,
    contactPerson: 'Guest Experience Desk',
    description: 'Literally sitting atop the cliff beside Lady’s Seat viewpoint. At dusk, guests enjoy telescope stargazing and watching the sparkling city lights of Salem 4,000 feet below. Renowned for its amphitheater, organic spice dinners, and spa.',
    services: [
      'Cliff-Edge Luxury Rooms & Duplex Cottages',
      'High-Power Telescope Night Stargazing',
      'Subburayan Spa & Ayurvedic Wellness',
      'Outdoor Kids Adventure Arena & Bonfire',
      'Banquet Hall for Hill Weddings & Corporate Offsites'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-y201',
        author: 'Kishore Venkataraman',
        rating: 5,
        date: '19 Jan 2024',
        comment: 'Looking at Salem city glowing at night while sipping hot Shevaroy coffee from the balcony was an unforgettable experience.'
      }
    ]
  },
  {
    id: 'biz-y3',
    name: 'MSP Coffee Plantation & Estate Heritage',
    category: 'Coffee Estates & Spice Plantations',
    subcategory: 'Arabica & Robusta Coffee',
    rating: 4.9,
    reviewCount: 210,
    address: 'Cauvery Peak Road, Near Nagalur, Shevaroy Hills',
    locality: 'Nagalur',
    pincode: '636602',
    phone: '04281 222410',
    whatsapp: '919842722410',
    email: 'tours@mspcoffee.com',
    website: 'https://www.mspcoffee.com',
    openingHours: '8:30 AM - 6:00 PM (Daily)',
    isVerified: true,
    isFeatured: true,
    establishedYear: 1920,
    contactPerson: 'Navin & Mohan (Estate Planters)',
    description: 'Historic 4th-generation coffee plantation spread across lush Shevaroy slopes since 1920. Conducts guided coffee picking, pulp processing demonstrations, coffee cupping sessions, and offers freshly roasted single-origin Arabica & peppercorns.',
    services: [
      'Guided Coffee Estate Agro-Tourism Tours',
      'Coffee Cupping & Tasting Masterclasses',
      'Fresh Roasted Single-Origin Arabica & Peaberry Powder',
      'Estate Grown Tellicherry Black Pepper & Cloves',
      'B2B Wholesale Raw Green Coffee Beans'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-y301',
        author: 'Deepak Chawla',
        rating: 5,
        date: '14 Feb 2024',
        comment: 'A must-do when in Yercaud! The coffee cupping session taught us so much about artisan coffee. Bought 4 kilos of Peaberry beans.'
      }
    ]
  },
  {
    id: 'biz-y4',
    name: 'The Grange Resort & Adventure Camp',
    category: 'Sightseeing, Boating & Adventure Parks',
    subcategory: 'ATV Rides & High Rope Zip-line',
    rating: 4.8,
    reviewCount: 185,
    address: 'Cockburn Road, Five Roads Junction, Yercaud',
    locality: 'Five Roads Junction',
    pincode: '636601',
    phone: '04281 222180',
    whatsapp: '919443222180',
    email: 'info@grange.co.in',
    website: 'https://www.grange.co.in',
    openingHours: '9:00 AM - 6:30 PM (All Days)',
    isVerified: true,
    isFeatured: true,
    establishedYear: 1820,
    contactPerson: 'Capt. M.D. Grange',
    description: 'Built around the oldest surviving British plantation bungalow in Yercaud (circa 1820). Combines historic colonial heritage with high-octane outdoor adventure including ATV off-road track, high-wire rope course, and paintball field.',
    services: [
      'Off-Road ATV Quad Biking Track',
      'High Rope Aerial Adventure Course & Zip-line',
      'Paintball Combat Arena',
      'Colonial Heritage Stone Cottage Stays',
      'Night Campfire with Barbecue Grills'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-y401',
        author: 'Vigneshwaran P',
        rating: 5,
        date: '28 Dec 2023',
        comment: 'Great thrills for college friends and adventure enthusiasts! ATV track through coffee plants was fantastic.'
      }
    ]
  },
  {
    id: 'biz-y5',
    name: 'Royal Homemade Chocolates & Spices Store',
    category: 'Homemade Chocolates & Hill Treats',
    subcategory: 'Homemade Dark Chocolates',
    rating: 4.8,
    reviewCount: 320,
    address: 'Shop No. 4, Lake View Road, Near Anna Park',
    locality: 'Lake Road & Boathouse',
    pincode: '636601',
    phone: '04281 222555',
    whatsapp: '919842222555',
    email: 'sales@royalchocolatesyercaud.com',
    openingHours: '8:00 AM - 10:00 PM (Daily)',
    isVerified: true,
    isFeatured: true,
    establishedYear: 2004,
    contactPerson: 'K. Mohammed Farooq',
    description: 'Yercaud’s beloved confectionery landmark. Crafting hand-rolled dark chocolates, roasted hazelnut clusters, fruit & nut slabs, pure eucalyptus oils, and farm-fresh organic black pepper directly from Shevaroy estates.',
    services: [
      'Artisanal Melt-in-Mouth Dark & Milk Chocolates',
      'Almond, Cashew & Walnut Rochers',
      'Pure Shevaroy Wild Forest Honey',
      'Organically Sun-Dried Black Peppercorns & Cardamom',
      'Gift Packaging & Safe Courier Shipping Across India'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-y501',
        author: 'Lakshmi Narayanan',
        rating: 5,
        date: '15 Mar 2024',
        comment: 'The roasted almond chocolates and raw eucalyptus honey are sublime. We always take gift hampers for colleagues in Bangalore.'
      }
    ]
  },
  {
    id: 'biz-y6',
    name: 'Yercaud Lake Boathouse (TTDC)',
    category: 'Sightseeing, Boating & Adventure Parks',
    subcategory: 'Yercaud Lake Boating',
    rating: 4.7,
    reviewCount: 450,
    address: 'Emerald Lake Road, Centre of Town, Yercaud',
    locality: 'Lake Road & Boathouse',
    pincode: '636601',
    phone: '04281 222733',
    email: 'yercaudboathouse@ttdconline.com',
    website: 'https://www.tamilnadutourism.tn.gov.in',
    openingHours: '8:30 AM - 6:00 PM (All Days)',
    isVerified: true,
    isFeatured: false,
    establishedYear: 1976,
    contactPerson: 'TTDC Lake Operations Officer',
    description: 'The iconic centerpiece of Yercaud hill station. Picturesque emerald green lake encircled by gardens and weeping willows. TTDC operates 2-seater and 4-seater pedal boats, motor boats, and row boats with life-jacket safety certified.',
    services: [
      '2-Seater & 4-Seater Pedal Boats',
      'Row Boats with Experienced Boatman',
      'Motor Boat Group Cruise (10 mins)',
      'Life Jacket Safety Equipment for All Ages',
      'Adjoining Deer Park & Lake Promenade Garden'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-y601',
        author: 'Senthil Nathan',
        rating: 5,
        date: '02 Feb 2024',
        comment: 'Peaceful pedal boating in the cool morning breeze. Kids enjoyed seeing ducks in the lake.'
      }
    ]
  },
  {
    id: 'biz-y7',
    name: 'Shevaroys Hotel & Silver Oak Restaurant',
    category: 'Restaurants & Hilltop Cafes',
    subcategory: 'Hill Station Non-Veg Cuisine',
    rating: 4.8,
    reviewCount: 260,
    address: 'Hospital Road, Near Bus Stand, Yercaud',
    locality: 'Yercaud Town / Bus Stand',
    pincode: '636601',
    phone: '04281 222288',
    whatsapp: '919842222288',
    email: 'reservations@hotelshevaroys.com',
    website: 'https://www.hotelshevaroys.com',
    openingHours: '7:00 AM - 10:30 PM (Daily)',
    isVerified: true,
    isFeatured: true,
    establishedYear: 1985,
    contactPerson: 'Catering & Dining Manager',
    description: 'One of the most trusted family dining addresses in Yercaud for four decades. Famous for hot South Indian thali, Kongu style Pepper Chicken, piping hot rotis, and Malabar fish curry in a warm wooden interior.',
    services: [
      'Authentic Kongu Nadu Country Chicken & Pepper Fry',
      'Traditional South Indian Meals (Lunch & Dinner)',
      'Chinese & Tandoori Charcoal Kebabs',
      'Silver Oak Garden Restaurant & Bar Lounge',
      'Takeaway Food Delivery to Nearby Cottages'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-y701',
        author: 'Muthukrishnan S',
        rating: 5,
        date: '09 Jan 2024',
        comment: 'Best pepper chicken in the Shevaroy hills. Perfect comforting meal after riding up the ghat road.'
      }
    ]
  },
  {
    id: 'biz-y8',
    name: 'Yercaud Hills Pure Eucalyptus & Herbal Distillers',
    category: 'Essential Oils, Herbal & Nurseries',
    subcategory: 'Pure Nilgiri Eucalyptus Oil',
    rating: 4.9,
    reviewCount: 160,
    address: 'Pagoda Point Road, Near Forest Checkpost',
    locality: 'Pagoda Point Road',
    pincode: '636601',
    phone: '04281 222449',
    whatsapp: '919443222449',
    email: 'orders@yercaudoils.com',
    openingHours: '8:30 AM - 8:30 PM (All Days)',
    isVerified: true,
    isFeatured: false,
    establishedYear: 1991,
    contactPerson: 'S. Shanmugam',
    description: 'Traditional steam distillation unit extracting 100% pure Eucalyptus globulus oil from wild Shevaroy hill leaves. Also produces Citronella insect repellent, Lemongrass therapeutic aroma oils, and Wintergreen pain relief balms.',
    services: [
      '100% Pure Steam Distilled Eucalyptus Oil',
      'Citronella Natural Mosquito Repellent Spray',
      'Pain Relief Herbal Maha Narayana Thailam',
      'Pure Clove Oil for Dental Health',
      'Bulk Bottle Supply & Free Domestic Delivery'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-y801',
        author: 'Radhika Gopal',
        rating: 5,
        date: '21 Nov 2023',
        comment: 'Genuine eucalyptus oil with strong therapeutic aroma. Clears nasal congestion in minutes. Very honest shop.'
      }
    ]
  },
  {
    id: 'biz-y9',
    name: 'Salem - Yercaud 20 Hairpin Ghat Cabs & Tours',
    category: 'Cabs, Ghat Transport & Jeep Safari',
    subcategory: 'Salem to Yercaud Ghat Cabs',
    rating: 4.8,
    reviewCount: 195,
    address: 'Near Yercaud Main Bus Stand, Ondikadai Signal',
    locality: 'Yercaud Town / Bus Stand',
    pincode: '636601',
    phone: '04281 222999',
    alternatePhone: '+91 94431 22999',
    whatsapp: '919443122999',
    email: 'booking@yercaudcabs.in',
    website: 'https://www.yercaudcabs.in',
    openingHours: '24 Hours Open (On-Call Ghat Drivers)',
    isVerified: true,
    isFeatured: true,
    establishedYear: 2008,
    contactPerson: 'K. Senthilvel (Fleet Coordinator)',
    description: 'Expert hill drivers specializing in the scenic 32-km Salem to Yercaud mountain road featuring 20 sharp hairpin bends. Offering Innova, Ertiga, Etios, and 4x4 open jeep safari to offbeat viewpoints like Manjakuttai and Kottachedu teak forest.',
    services: [
      'Salem Junction Railway Station Pick-Up & Drop',
      'Salem Airport & Coimbatore Airport Transfers',
      'Complete 1-Day & 2-Day Yercaud Sightseeing Packages',
      'Manjakuttai Sunrise 4x4 Off-Road Jeep Trip',
      'Courteous Drivers Trained in Hill Driving Safety'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-y901',
        author: 'Praveen Nair',
        rating: 5,
        date: '10 Feb 2024',
        comment: 'Senthil drove us up the 20 hairpin curves very smoothly without any motion sickness. Took us to secret viewpoints tourists miss.'
      }
    ]
  },
  {
    id: 'biz-y10',
    name: 'Montfort Anglo-Indian Higher Secondary School',
    category: 'Schools & Heritage Institutions',
    subcategory: 'Anglo-Indian Boarding Schools',
    rating: 4.9,
    reviewCount: 310,
    address: 'Montfort Road, Yercaud, Salem District',
    locality: 'Yercaud Town / Bus Stand',
    pincode: '636601',
    phone: '04281 222234',
    email: 'office@montfortyercaud.com',
    website: 'https://www.montfortyercaud.com',
    openingHours: '9:00 AM - 4:30 PM (Mon - Fri)',
    isVerified: true,
    isFeatured: false,
    establishedYear: 1917,
    contactPerson: 'Office of the Principal / Brother Director',
    description: 'World-renowned co-educational residential school run by Montfort Brothers of St. Gabriel since 1917. Sprawling heritage stone campus in the hills with illustrious alumni including parliamentarians, diplomats, sportsmen, and corporate titans.',
    services: [
      'Residential ICSE & ISC Curriculum (Grades 3 to 12)',
      'World-Class Swimming Pool & Olympic Athletics Track',
      'School Philharmonic Band & Equestrian Horse Riding',
      'Advanced Robotics & Science Laboratories',
      'Comprehensive Character Formation & Leadership Cadre'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-y1001',
        author: 'Vikram Sundaram (Alumnus)',
        rating: 5,
        date: '04 Nov 2023',
        comment: 'The Pride of Yercaud! The discipline, lifelong camaraderie, and values instilled on these foggy hills shaped who I am today.'
      }
    ]
  },
  {
    id: 'biz-y11',
    name: 'Killiyur Eco Trekking & Forest Trail Guides',
    category: 'Sightseeing, Boating & Adventure Parks',
    subcategory: 'Trekking & Forest Nature Walks',
    rating: 4.8,
    reviewCount: 140,
    address: 'Killiyur Falls Trek Base, Asambur Road',
    locality: 'Killiyur Falls Route',
    pincode: '636601',
    phone: '04281 222345',
    whatsapp: '919443222345',
    email: 'treks@killiyurfalls.org',
    openingHours: '6:00 AM - 5:30 PM (Daily)',
    isVerified: true,
    isFeatured: false,
    establishedYear: 2011,
    contactPerson: 'Murugan (Local Tribal Forest Guide)',
    description: 'Certified local nature guides for the famous 250-step hiking trail down to the 300-foot cascading Killiyur Falls. Also arranges birdwatching hikes in the reserve forest, cave exploration, and eco-conservation treks.',
    services: [
      'Guided Killiyur Waterfall Base Descent Trek',
      'Shevaroy Mountain Birdwatching Excursions',
      'First-Aid Support & Walking Poles Rental',
      'Drinking Water & Forest Dept Permission Coordination',
      'Half-Day Valley Trekking Packages'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-y1101',
        author: 'Ananya Roy',
        rating: 5,
        date: '18 Jan 2024',
        comment: 'Murugan guided us down the 250 steep steps with great patience and safety. Swimming near the waterfall spray was pure magic.'
      }
    ]
  },
  {
    id: 'biz-y12',
    name: 'Green Valley Homestay & Campfire Cottages',
    category: 'Resorts, Cottages & Homestays',
    subcategory: 'Estate Homestays',
    rating: 4.7,
    reviewCount: 165,
    address: 'Near Manjakuttai Viewpoint Road, Semmantham',
    locality: 'Manjakuttai Viewpoint',
    pincode: '636602',
    phone: '04281 222789',
    whatsapp: '919842122789',
    email: 'info@greenvalleyyercaud.in',
    website: 'https://www.greenvalleyyercaud.in',
    openingHours: 'Open 24 Hours',
    isVerified: true,
    isFeatured: true,
    establishedYear: 2016,
    contactPerson: 'G. Manickam (Host)',
    description: 'Peaceful plantation homestay surrounded by silver oak trees, pepper vines, and orange fruit trees. Features cozy wooden attic rooms, home-cooked Tamil Nadu country meals, and evening music around a crackling bonfire.',
    services: [
      'Independent 2 BHK & 3 BHK Family Wooden Cottages',
      'Homely Hot Kongu Meals Cooked with Estate Spices',
      'Private Campfire with Music & Barbecue Grills',
      'Sunrise View Over the Shevaroy Valley',
      'Safe Parking & Pet Friendly Lawns'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: 'rev-y1201',
        author: 'Hariprasad K',
        rating: 5,
        date: '05 Jan 2024',
        comment: 'Warm host, serene environment far from commercial noise, and delicious hot chicken curry by the evening campfire.'
      }
    ]
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'em-y1',
    department: 'Police',
    name: 'Yercaud Police Station',
    number: '04281 222224',
    altNumber: '100',
    address: 'Main Road, Near Yercaud Town Bus Stand',
    timing: '24 Hours Open',
    type: 'police',
  },
  {
    id: 'em-y2',
    department: 'Government Hospital',
    name: 'Yercaud Government Primary Health Centre & Hospital',
    number: '04281 222233',
    altNumber: '108 (Ghat Ambulance)',
    address: 'Hospital Road, Yercaud',
    timing: '24 Hours Casualty & Emergency Care',
    type: 'hospital',
  },
  {
    id: 'em-y3',
    department: 'Fire & Rescue',
    name: 'Yercaud Fire and Rescue Station',
    number: '04281 222101',
    altNumber: '101',
    address: 'Near Panchayat Union Office, Yercaud',
    timing: '24 Hours Emergency Fire & Hill Rescue',
    type: 'fire',
  },
  {
    id: 'em-y4',
    department: 'Forest Department',
    name: 'Yercaud Forest Range Office (Wildlife & Treks)',
    number: '04281 222230',
    altNumber: '0427 2415197 (DFO Salem)',
    address: 'Forest Compound, Pagoda Point Road, Yercaud',
    timing: '8:30 AM - 6:00 PM (Emergency Call 24x7)',
    type: 'civic',
  },
  {
    id: 'em-y5',
    department: 'Civic Administration',
    name: 'Yercaud Town Panchayat Office',
    number: '04281 222225',
    altNumber: '04281 222226',
    address: 'Town Hall Compound, Yercaud',
    timing: '9:30 AM - 5:30 PM',
    type: 'civic',
  },
  {
    id: 'em-y6',
    department: 'Electricity Board (TANGEDCO)',
    name: 'TNEB Yercaud Sub-Station Fuse Call Center',
    number: '04281 222244',
    altNumber: '94987 94987',
    address: 'Ondikadai Junction, Yercaud',
    timing: '24 Hours Power Breakdown Support',
    type: 'utility',
  },
  {
    id: 'em-y7',
    department: 'Tourist Assistance',
    name: 'Tamil Nadu Tourism Development Corp (TTDC) Yercaud',
    number: '04281 222733',
    altNumber: '1800 4253 1111 (Toll-Free)',
    address: 'Hotel Tamil Nadu, Lake Road, Yercaud',
    timing: '7:00 AM - 10:00 PM',
    type: 'helpline',
  },
  {
    id: 'em-y8',
    department: 'Women Safety',
    name: 'Salem District All Women Police Station & Helpline',
    number: '1091',
    altNumber: '04281 222224',
    address: 'Shevaroy Hills Jurisdiction, Yercaud',
    timing: '24 Hours Dedicated Line',
    type: 'helpline',
  }
];

export const CITY_ATTRACTIONS: CityAttraction[] = [
  {
    id: 'att-y1',
    name: 'Yercaud Lake (Emerald Lake) & Boating',
    category: 'Lake & Boating Paradise',
    location: 'Heart of Yercaud Town, Salem District',
    description: 'The crowning jewel of the hill station. Surrounded by verdant hills and weeping trees, the lake features pedal boating, row boating, and scenic walking promenades lined with street vendors and sweet corn stalls.',
    timings: '8:30 AM - 6:00 PM (Daily)',
    entryFee: 'Entry: Free | Boating: ₹120 to ₹350',
    highlights: ['Pedal & Row Boating', 'Adjacent Anna Park Flower Gardens', 'Sunset Water Reflections', 'Children’s Playgrounds'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'att-y2',
    name: 'Lady\'s Seat & Gent\'s Seat Viewpoints',
    category: 'Cliff Vistas & Night Panorama',
    location: 'Lady\'s Seat Road, 2 km from Lake',
    description: 'A natural rock formation shaped like a comfortable armchair. English ladies frequented this point to watch the plains. By night, it offers an awe-inspiring vista of the twinkling lights of Salem city below.',
    timings: '6:30 AM - 7:30 PM (Daily)',
    entryFee: '₹10 per adult (Telescope ₹20)',
    highlights: ['Salem City Ghat Curves Vista', 'Powerful Mounted Viewing Telescope', 'Sunset Colors Over Ghats', 'Adjoining Rose Garden'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'att-y3',
    name: 'Killiyur Falls (300-Ft Waterfall)',
    category: 'Cascading Waterfalls & Nature Trail',
    location: 'Shevaroy Woods, 3.5 km from Yercaud Lake',
    description: 'Formed by overflowing waters of Yercaud Lake cascading 300 feet into the dense forested Killiyur valley. A thrilling 250-step hike through tropical coffee forests leads to the mist-shrouded base.',
    timings: '8:00 AM - 5:00 PM',
    entryFee: 'Free Entry',
    highlights: ['300-Foot Natural Waterfall', 'Scenic Forest Hiking Trail', 'Wild Birds & Butterfly Haven', 'Pleasantly Cool Plunge Pool'],
    imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'att-y4',
    name: 'Shevaroyan Temple (Highest Peak - 5,326 ft)',
    category: 'Spiritual Heritage & Mountain Peak',
    location: 'Top of Shevaroy Hills, 5 km from Town',
    description: 'The highest summit in the entire Shevaroy mountain range at 5,326 feet elevation. Houses an ancient cave sanctum dedicated to Lord Shevaroyan and Goddess Kaveri, worshipped by local tribes for centuries.',
    timings: '6:00 AM - 6:30 PM (Daily)',
    entryFee: 'Free (Special Pooja ₹20)',
    highlights: ['Highest Point in Yercaud (1,623 m)', 'Mystic Natural Rock Cave Sanctum', '360-Degree Mountain Ridge Vistas', 'Coolest Temperature Zone in Hills'],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
  }
];
