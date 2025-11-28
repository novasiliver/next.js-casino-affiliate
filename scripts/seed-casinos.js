const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fakeCasinos = [
  {
    name: "Lucky Spin Casino",
    slug: "lucky-spin-casino",
    logo: "LUCKY",
    rating: 4.8,
    template: "template1",
    isActive: true,
    rank: 1,
    data: {
      bonus: {
        title: "Welcome Package",
        amount: "$3,000 + 150 Free Spins",
        details: "Valid on your first 3 deposits",
        code: "LUCKY300",
        wagering: "30x Bonus",
        minDeposit: "$25.00",
        expiry: "30 Days"
      },
      description: "Premium online casino with fast payouts and excellent game selection",
      tags: ["Fast Payout", "Curacao License"],
      votes: 1250,
      established: 2020,
      region: "Global",
      payoutSpeed: "24 Hours",
      rtp: "96.8%",
      verdict: "Lucky Spin Casino offers a solid gaming experience with reliable payouts and a diverse game library.",
      prosCons: {
        pros: [
          "Fast withdrawal processing",
          "Wide variety of slots",
          "24/7 customer support",
          "Mobile-friendly platform"
        ],
        cons: [
          "Limited live dealer games",
          "Some payment methods have fees"
        ]
      },
      banking: [
        { name: "Bitcoin", type: "Crypto", time: "Instant", fee: "Free", icon: "bitcoin" },
        { name: "Visa", type: "Card", time: "1-3 Days", fee: "Free", icon: "credit-card" },
        { name: "Bank Transfer", type: "Bank", time: "3-5 Days", fee: "Free", icon: "landmark" }
      ],
      gameSelection: {
        slots: 2500,
        liveTables: 45,
        jackpots: 120,
        liveAction: "Yes",
        providers: ["NetEnt", "Microgaming", "Evolution Gaming", "Pragmatic Play"]
      },
      ratingBreakdown: {
        fairness: 9.5,
        bonuses: 9.0,
        gameVariety: 9.2,
        supportSpeed: 8.8
      },
      casinoInfo: {
        established: 2020,
        license: "Curacao",
        owner: "Lucky Spin Group",
        minDeposit: "$25.00",
        vpnFriendly: true
      },
      reviewContent: {
        userExperience: "The platform is intuitive and easy to navigate, with excellent mobile optimization.",
        customerSupport: "Support team is responsive and helpful, available 24/7 via live chat."
      },
      affiliateLink: "https://tracking.example.com/lucky-spin"
    }
  },
  {
    name: "Royal Vegas Casino",
    slug: "royal-vegas-casino",
    logo: "ROYAL",
    rating: 4.9,
    template: "template1",
    isActive: true,
    rank: 2,
    data: {
      bonus: {
        title: "Mega Welcome Bonus",
        amount: "$5,500 + 200 Free Spins",
        details: "Spread across first 4 deposits",
        code: "ROYAL550",
        wagering: "35x Bonus",
        minDeposit: "$20.00",
        expiry: "45 Days"
      },
      description: "Luxury casino experience with VIP rewards and premium games",
      tags: ["VIP Program", "Malta License"],
      votes: 2100,
      established: 2019,
      region: "Global",
      payoutSpeed: "Instant",
      rtp: "97.2%",
      verdict: "Royal Vegas Casino provides a premium gaming experience with excellent bonuses and top-tier customer service.",
      prosCons: {
        pros: [
          "Instant crypto withdrawals",
          "Exclusive VIP program",
          "Premium game selection",
          "Multi-currency support"
        ],
        cons: [
          "Higher minimum deposits",
          "Limited bonus wagering time"
        ]
      },
      banking: [
        { name: "Bitcoin", type: "Crypto", time: "Instant", fee: "Free", icon: "bitcoin" },
        { name: "Ethereum", type: "Crypto", time: "Instant", fee: "Free", icon: "bitcoin" },
        { name: "Mastercard", type: "Card", time: "1-2 Days", fee: "Free", icon: "credit-card" }
      ],
      gameSelection: {
        slots: 3200,
        liveTables: 60,
        jackpots: 180,
        liveAction: "Yes",
        providers: ["NetEnt", "Evolution Gaming", "Play'n GO", "Betsoft"]
      },
      ratingBreakdown: {
        fairness: 9.8,
        bonuses: 9.5,
        gameVariety: 9.7,
        supportSpeed: 9.3
      },
      casinoInfo: {
        established: 2019,
        license: "Malta Gaming Authority",
        owner: "Royal Gaming Ltd",
        minDeposit: "$20.00",
        vpnFriendly: false
      },
      reviewContent: {
        userExperience: "Elegant design with smooth gameplay and excellent graphics quality.",
        customerSupport: "Professional support team with quick response times and multiple language options."
      },
      affiliateLink: "https://tracking.example.com/royal-vegas"
    }
  },
  {
    name: "Crypto Fortune Casino",
    slug: "crypto-fortune-casino",
    logo: "CRYPTO",
    rating: 4.7,
    template: "template1",
    isActive: true,
    rank: 3,
    data: {
      bonus: {
        title: "Crypto Welcome",
        amount: "$2,500 + 100 Free Spins",
        details: "Bitcoin deposits only",
        code: "CRYPTO250",
        wagering: "25x Bonus",
        minDeposit: "$10.00",
        expiry: "30 Days"
      },
      description: "Crypto-focused casino with instant withdrawals and anonymous gaming",
      tags: ["Crypto Only", "Anonymous"],
      votes: 980,
      established: 2021,
      region: "Global",
      payoutSpeed: "Instant",
      rtp: "96.5%",
      verdict: "Perfect for crypto enthusiasts seeking fast, anonymous transactions and modern gaming.",
      prosCons: {
        pros: [
          "Instant crypto payouts",
          "Anonymous accounts",
          "Low minimum deposits",
          "No KYC required"
        ],
        cons: [
          "No fiat currencies",
          "Limited payment options"
        ]
      },
      banking: [
        { name: "Bitcoin", type: "Crypto", time: "Instant", fee: "Free", icon: "bitcoin" },
        { name: "Ethereum", type: "Crypto", time: "Instant", fee: "Free", icon: "bitcoin" },
        { name: "Litecoin", type: "Crypto", time: "Instant", fee: "Free", icon: "bitcoin" }
      ],
      gameSelection: {
        slots: 1800,
        liveTables: 30,
        jackpots: 85,
        liveAction: "Yes",
        providers: ["Pragmatic Play", "Betsoft", "Hacksaw Gaming"]
      },
      ratingBreakdown: {
        fairness: 9.0,
        bonuses: 8.5,
        gameVariety: 8.8,
        supportSpeed: 8.2
      },
      casinoInfo: {
        established: 2021,
        license: "Curacao",
        owner: "Crypto Fortune Group",
        minDeposit: "$10.00",
        vpnFriendly: true
      },
      reviewContent: {
        userExperience: "Modern interface optimized for crypto transactions with seamless integration.",
        customerSupport: "Support available via email and Telegram, response within 24 hours."
      },
      affiliateLink: "https://tracking.example.com/crypto-fortune"
    }
  },
  {
    name: "Mega Win Casino",
    slug: "mega-win-casino",
    logo: "MEGA",
    rating: 4.6,
    template: "template1",
    isActive: true,
    rank: 4,
    data: {
      bonus: {
        title: "Mega Welcome",
        amount: "$4,000 + 180 Free Spins",
        details: "First deposit bonus",
        code: "MEGA400",
        wagering: "40x Bonus",
        minDeposit: "$30.00",
        expiry: "30 Days"
      },
      description: "High-roller friendly casino with massive jackpots and progressive slots",
      tags: ["High Roller", "Progressive Jackpots"],
      votes: 1450,
      established: 2018,
      region: "Global",
      payoutSpeed: "48 Hours",
      rtp: "97.0%",
      verdict: "Great for players seeking big wins with progressive jackpots and high betting limits.",
      prosCons: {
        pros: [
          "Massive progressive jackpots",
          "High betting limits",
          "Regular tournaments",
          "Loyalty rewards"
        ],
        cons: [
          "Slower withdrawal times",
          "Higher wagering requirements"
        ]
      },
      banking: [
        { name: "Visa", type: "Card", time: "2-3 Days", fee: "Free", icon: "credit-card" },
        { name: "Mastercard", type: "Card", time: "2-3 Days", fee: "Free", icon: "credit-card" },
        { name: "Bank Transfer", type: "Bank", time: "3-5 Days", fee: "$5", icon: "landmark" }
      ],
      gameSelection: {
        slots: 2800,
        liveTables: 50,
        jackpots: 200,
        liveAction: "Yes",
        providers: ["Microgaming", "NetEnt", "IGT", "WMS"]
      },
      ratingBreakdown: {
        fairness: 9.3,
        bonuses: 8.8,
        gameVariety: 9.5,
        supportSpeed: 8.5
      },
      casinoInfo: {
        established: 2018,
        license: "Malta Gaming Authority",
        owner: "Mega Win Entertainment",
        minDeposit: "$30.00",
        vpnFriendly: false
      },
      reviewContent: {
        userExperience: "User-friendly platform with excellent jackpot tracking and tournament features.",
        customerSupport: "Support team is knowledgeable about high-roller needs and VIP services."
      },
      affiliateLink: "https://tracking.example.com/mega-win"
    }
  },
  {
    name: "Spin Palace Casino",
    slug: "spin-palace-casino",
    logo: "SPIN",
    rating: 4.5,
    template: "template1",
    isActive: true,
    rank: 5,
    data: {
      bonus: {
        title: "Palace Welcome",
        amount: "$2,000 + 120 Free Spins",
        details: "New player bonus",
        code: "PALACE200",
        wagering: "30x Bonus",
        minDeposit: "$20.00",
        expiry: "30 Days"
      },
      description: "Classic casino with traditional games and reliable service",
      tags: ["Classic Games", "Reliable"],
      votes: 1100,
      established: 2017,
      region: "Global",
      payoutSpeed: "24 Hours",
      rtp: "96.3%",
      verdict: "A trustworthy casino with a solid reputation and consistent payouts.",
      prosCons: {
        pros: [
          "Reliable payouts",
          "Classic game selection",
          "Established reputation",
          "Fair bonus terms"
        ],
        cons: [
          "Older interface design",
          "Limited modern features"
        ]
      },
      banking: [
        { name: "Visa", type: "Card", time: "1-2 Days", fee: "Free", icon: "credit-card" },
        { name: "PayPal", type: "E-wallet", time: "24 Hours", fee: "Free", icon: "credit-card" },
        { name: "Bank Transfer", type: "Bank", time: "3-5 Days", fee: "Free", icon: "landmark" }
      ],
      gameSelection: {
        slots: 2000,
        liveTables: 35,
        jackpots: 90,
        liveAction: "Yes",
        providers: ["Microgaming", "NetEnt", "Playtech"]
      },
      ratingBreakdown: {
        fairness: 9.1,
        bonuses: 8.5,
        gameVariety: 8.7,
        supportSpeed: 8.9
      },
      casinoInfo: {
        established: 2017,
        license: "Malta Gaming Authority",
        owner: "Spin Palace Group",
        minDeposit: "$20.00",
        vpnFriendly: false
      },
      reviewContent: {
        userExperience: "Traditional design that's easy to navigate, though could use a modern update.",
        customerSupport: "Helpful support with good knowledge of classic games and traditional banking."
      },
      affiliateLink: "https://tracking.example.com/spin-palace"
    }
  },
  {
    name: "Jackpot City Casino",
    slug: "jackpot-city-casino",
    logo: "JACKPOT",
    rating: 4.8,
    template: "template1",
    isActive: true,
    rank: 6,
    data: {
      bonus: {
        title: "City Welcome",
        amount: "$3,500 + 150 Free Spins",
        details: "Welcome package bonus",
        code: "CITY350",
        wagering: "35x Bonus",
        minDeposit: "$25.00",
        expiry: "30 Days"
      },
      description: "Jackpot-focused casino with daily tournaments and big prize pools",
      tags: ["Daily Tournaments", "Big Jackpots"],
      votes: 1650,
      established: 2019,
      region: "Global",
      payoutSpeed: "Instant",
      rtp: "97.1%",
      verdict: "Excellent choice for jackpot hunters with frequent tournaments and massive prize pools.",
      prosCons: {
        pros: [
          "Daily tournaments",
          "Huge jackpot prizes",
          "Fast crypto payouts",
          "Active community"
        ],
        cons: [
          "Competitive tournaments",
          "Limited table game variety"
        ]
      },
      banking: [
        { name: "Bitcoin", type: "Crypto", time: "Instant", fee: "Free", icon: "bitcoin" },
        { name: "Ethereum", type: "Crypto", time: "Instant", fee: "Free", icon: "bitcoin" },
        { name: "Visa", type: "Card", time: "1-2 Days", fee: "Free", icon: "credit-card" }
      ],
      gameSelection: {
        slots: 3000,
        liveTables: 40,
        jackpots: 250,
        liveAction: "Yes",
        providers: ["Pragmatic Play", "NetEnt", "Microgaming", "Red Tiger"]
      },
      ratingBreakdown: {
        fairness: 9.6,
        bonuses: 9.2,
        gameVariety: 9.4,
        supportSpeed: 9.0
      },
      casinoInfo: {
        established: 2019,
        license: "Curacao",
        owner: "Jackpot City Entertainment",
        minDeposit: "$25.00",
        vpnFriendly: true
      },
      reviewContent: {
        userExperience: "Engaging tournament system with real-time leaderboards and exciting prize structures.",
        customerSupport: "Tournament support team is very responsive and helpful with event questions."
      },
      affiliateLink: "https://tracking.example.com/jackpot-city"
    }
  },
  {
    name: "Elite Casino",
    slug: "elite-casino",
    logo: "ELITE",
    rating: 4.9,
    template: "template1",
    isActive: true,
    rank: 7,
    data: {
      bonus: {
        title: "Elite Welcome",
        amount: "$6,000 + 250 Free Spins",
        details: "Premium welcome package",
        code: "ELITE600",
        wagering: "30x Bonus",
        minDeposit: "$50.00",
        expiry: "45 Days"
      },
      description: "Exclusive high-end casino for VIP players with premium services",
      tags: ["VIP Only", "Premium Service"],
      votes: 850,
      established: 2020,
      region: "Global",
      payoutSpeed: "Instant",
      rtp: "97.5%",
      verdict: "Top-tier casino experience for serious players seeking premium service and exclusive games.",
      prosCons: {
        pros: [
          "Exclusive VIP treatment",
          "Premium game selection",
          "Personal account manager",
          "Highest payout rates"
        ],
        cons: [
          "High minimum deposits",
          "Invitation only"
        ]
      },
      banking: [
        { name: "Bitcoin", type: "Crypto", time: "Instant", fee: "Free", icon: "bitcoin" },
        { name: "Bank Wire", type: "Bank", time: "1-2 Days", fee: "Free", icon: "landmark" },
        { name: "VIP Transfer", type: "Bank", time: "Same Day", fee: "Free", icon: "landmark" }
      ],
      gameSelection: {
        slots: 1500,
        liveTables: 80,
        jackpots: 60,
        liveAction: "Yes",
        providers: ["Evolution Gaming", "NetEnt", "Playtech", "Authentic Gaming"]
      },
      ratingBreakdown: {
        fairness: 9.9,
        bonuses: 9.8,
        gameVariety: 9.6,
        supportSpeed: 9.9
      },
      casinoInfo: {
        established: 2020,
        license: "Malta Gaming Authority",
        owner: "Elite Gaming Group",
        minDeposit: "$50.00",
        vpnFriendly: false
      },
      reviewContent: {
        userExperience: "Luxurious interface with premium features and exclusive VIP lounge access.",
        customerSupport: "Dedicated account managers provide personalized service and priority support."
      },
      affiliateLink: "https://tracking.example.com/elite"
    }
  },
  {
    name: "Thunder Casino",
    slug: "thunder-casino",
    logo: "THUNDER",
    rating: 4.4,
    template: "template1",
    isActive: true,
    rank: 8,
    data: {
      bonus: {
        title: "Thunder Strike",
        amount: "$1,500 + 80 Free Spins",
        details: "Quick start bonus",
        code: "THUNDER150",
        wagering: "25x Bonus",
        minDeposit: "$15.00",
        expiry: "20 Days"
      },
      description: "Fast-paced casino with instant games and quick registration",
      tags: ["Fast Registration", "Instant Play"],
      votes: 750,
      established: 2022,
      region: "Global",
      payoutSpeed: "12 Hours",
      rtp: "96.2%",
      verdict: "Great for players who want to start playing quickly with minimal hassle.",
      prosCons: {
        pros: [
          "Quick registration",
          "Instant play games",
          "Low minimum deposits",
          "Fast payouts"
        ],
        cons: [
          "Smaller game library",
          "Limited bonus options"
        ]
      },
      banking: [
        { name: "Bitcoin", type: "Crypto", time: "12 Hours", fee: "Free", icon: "bitcoin" },
        { name: "Visa", type: "Card", time: "1-2 Days", fee: "Free", icon: "credit-card" },
        { name: "Skrill", type: "E-wallet", time: "24 Hours", fee: "Free", icon: "credit-card" }
      ],
      gameSelection: {
        slots: 1200,
        liveTables: 25,
        jackpots: 50,
        liveAction: "Yes",
        providers: ["Pragmatic Play", "Betsoft", "Habanero"]
      },
      ratingBreakdown: {
        fairness: 8.8,
        bonuses: 8.2,
        gameVariety: 8.5,
        supportSpeed: 8.7
      },
      casinoInfo: {
        established: 2022,
        license: "Curacao",
        owner: "Thunder Gaming",
        minDeposit: "$15.00",
        vpnFriendly: true
      },
      reviewContent: {
        userExperience: "Streamlined interface designed for quick access and instant gameplay.",
        customerSupport: "Efficient support team with fast response times for quick issue resolution."
      },
      affiliateLink: "https://tracking.example.com/thunder"
    }
  },
  {
    name: "Diamond Casino",
    slug: "diamond-casino",
    logo: "DIAMOND",
    rating: 4.7,
    template: "template1",
    isActive: true,
    rank: 9,
    data: {
      bonus: {
        title: "Diamond Welcome",
        amount: "$4,500 + 200 Free Spins",
        details: "Premium welcome offer",
        code: "DIAMOND450",
        wagering: "35x Bonus",
        minDeposit: "$30.00",
        expiry: "30 Days"
      },
      description: "Luxury-themed casino with elegant design and premium game selection",
      tags: ["Luxury Design", "Premium Games"],
      votes: 1300,
      established: 2020,
      region: "Global",
      payoutSpeed: "24 Hours",
      rtp: "96.9%",
      verdict: "Beautifully designed casino offering a premium gaming experience with excellent visuals.",
      prosCons: {
        pros: [
          "Stunning visual design",
          "Premium game selection",
          "Smooth gameplay",
          "Regular promotions"
        ],
        cons: [
          "Higher wagering requirements",
          "Limited payment methods"
        ]
      },
      banking: [
        { name: "Visa", type: "Card", time: "1-2 Days", fee: "Free", icon: "credit-card" },
        { name: "Mastercard", type: "Card", time: "1-2 Days", fee: "Free", icon: "credit-card" },
        { name: "Bank Transfer", type: "Bank", time: "3-5 Days", fee: "Free", icon: "landmark" }
      ],
      gameSelection: {
        slots: 2400,
        liveTables: 45,
        jackpots: 110,
        liveAction: "Yes",
        providers: ["NetEnt", "Microgaming", "Evolution Gaming", "Play'n GO"]
      },
      ratingBreakdown: {
        fairness: 9.4,
        bonuses: 9.1,
        gameVariety: 9.3,
        supportSpeed: 9.0
      },
      casinoInfo: {
        established: 2020,
        license: "Malta Gaming Authority",
        owner: "Diamond Gaming Ltd",
        minDeposit: "$30.00",
        vpnFriendly: false
      },
      reviewContent: {
        userExperience: "Elegant and polished interface with attention to detail in every aspect.",
        customerSupport: "Professional support team that matches the premium brand experience."
      },
      affiliateLink: "https://tracking.example.com/diamond"
    }
  },
  {
    name: "Wild West Casino",
    slug: "wild-west-casino",
    logo: "WILD",
    rating: 4.3,
    template: "template1",
    isActive: true,
    rank: 10,
    data: {
      bonus: {
        title: "Western Welcome",
        amount: "$2,500 + 100 Free Spins",
        details: "Adventure begins here",
        code: "WILD250",
        wagering: "30x Bonus",
        minDeposit: "$20.00",
        expiry: "30 Days"
      },
      description: "Themed casino with Western atmosphere and adventure games",
      tags: ["Themed Games", "Adventure"],
      votes: 650,
      established: 2021,
      region: "Global",
      payoutSpeed: "48 Hours",
      rtp: "96.0%",
      verdict: "Fun-themed casino perfect for players who enjoy immersive gaming experiences.",
      prosCons: {
        pros: [
          "Unique theme",
          "Adventure game selection",
          "Regular themed events",
          "Engaging promotions"
        ],
        cons: [
          "Slower payouts",
          "Limited traditional games"
        ]
      },
      banking: [
        { name: "Visa", type: "Card", time: "2-3 Days", fee: "Free", icon: "credit-card" },
        { name: "Mastercard", type: "Card", time: "2-3 Days", fee: "Free", icon: "credit-card" },
        { name: "PayPal", type: "E-wallet", time: "48 Hours", fee: "Free", icon: "credit-card" }
      ],
      gameSelection: {
        slots: 1500,
        liveTables: 20,
        jackpots: 60,
        liveAction: "Yes",
        providers: ["Pragmatic Play", "Betsoft", "Hacksaw Gaming", "NoLimit City"]
      },
      ratingBreakdown: {
        fairness: 8.6,
        bonuses: 8.3,
        gameVariety: 8.4,
        supportSpeed: 8.5
      },
      casinoInfo: {
        established: 2021,
        license: "Curacao",
        owner: "Wild West Gaming",
        minDeposit: "$20.00",
        vpnFriendly: true
      },
      reviewContent: {
        userExperience: "Immersive Western theme with engaging visuals and themed game selection.",
        customerSupport: "Friendly support team that matches the casual, fun atmosphere of the casino."
      },
      affiliateLink: "https://tracking.example.com/wild-west"
    }
  }
];

async function main() {
  console.log('Starting to seed casinos...');

  for (const casino of fakeCasinos) {
    try {
      // Check if casino already exists
      const existing = await prisma.casino.findUnique({
        where: { slug: casino.slug },
      });

      if (existing) {
        console.log(`Casino ${casino.name} already exists, skipping...`);
        continue;
      }

      // Create casino
      const created = await prisma.casino.create({
        data: {
          ...casino,
          data: JSON.stringify(casino.data),
        },
      });

      console.log(`✅ Created casino: ${casino.name} (${casino.slug})`);
    } catch (error) {
      console.error(`❌ Error creating casino ${casino.name}:`, error.message);
    }
  }

  console.log('\n✅ Finished seeding casinos!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

