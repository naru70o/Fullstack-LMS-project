export type Option = {
  label: string;
  value: string;
  category?: string;
};

export const expertiseOptions: Option[] = [
  // Technology & Programming
  {
    label: "Web Development",
    value: "web-development",
    category: "Technology & Programming",
  },
  {
    label: "Mobile Development",
    value: "mobile-development",
    category: "Technology & Programming",
  },
  {
    label: "Data Science",
    value: "data-science",
    category: "Technology & Programming",
  },
  {
    label: "Artificial Intelligence",
    value: "ai",
    category: "Technology & Programming",
  },
  {
    label: "Cybersecurity",
    value: "cybersecurity",
    category: "Technology & Programming",
  },
  {
    label: "Cloud Computing",
    value: "cloud-computing",
    category: "Technology & Programming",
  },
  {
    label: "Game Development",
    value: "game-development",
    category: "Technology & Programming",
  },
  { label: "DevOps", value: "devops", category: "Technology & Programming" },

  // Business & Entrepreneurship
  {
    label: "Digital Marketing",
    value: "digital-marketing",
    category: "Business & Entrepreneurship",
  },
  {
    label: "Social Media Marketing",
    value: "social-media-marketing",
    category: "Business & Entrepreneurship",
  },
  { label: "SEO", value: "seo", category: "Business & Entrepreneurship" },
  {
    label: "Business Strategy",
    value: "business-strategy",
    category: "Business & Entrepreneurship",
  },
  {
    label: "Startups",
    value: "startups",
    category: "Business & Entrepreneurship",
  },
  {
    label: "E-commerce",
    value: "ecommerce",
    category: "Business & Entrepreneurship",
  },
  {
    label: "Finance & Investing",
    value: "finance-investing",
    category: "Business & Entrepreneurship",
  },
  { label: "Sales", value: "sales", category: "Business & Entrepreneurship" },

  // Creative Arts
  {
    label: "Graphic Design",
    value: "graphic-design",
    category: "Creative Arts",
  },
  { label: "UI/UX Design", value: "ui-ux-design", category: "Creative Arts" },
  { label: "Photography", value: "photography", category: "Creative Arts" },
  {
    label: "Video Production",
    value: "video-production",
    category: "Creative Arts",
  },
  {
    label: "Music Production",
    value: "music-production",
    category: "Creative Arts",
  },
  {
    label: "Drawing & Painting",
    value: "drawing-painting",
    category: "Creative Arts",
  },
  { label: "3D Modeling", value: "3d-modeling", category: "Creative Arts" },
  {
    label: "Writing & Publishing",
    value: "writing-publishing",
    category: "Creative Arts",
  },

  // Health & Wellness
  {
    label: "Fitness & Exercise",
    value: "fitness-exercise",
    category: "Health & Wellness",
  },
  { label: "Yoga", value: "yoga", category: "Health & Wellness" },
  { label: "Nutrition", value: "nutrition", category: "Health & Wellness" },
  {
    label: "Mental Health",
    value: "mental-health",
    category: "Health & Wellness",
  },
  { label: "Meditation", value: "meditation", category: "Health & Wellness" },
  {
    label: "Physical Therapy",
    value: "physical-therapy",
    category: "Health & Wellness",
  },

  // Academic & Test Prep
  {
    label: "Mathematics",
    value: "mathematics",
    category: "Academic & Test Prep",
  },
  { label: "Science", value: "science", category: "Academic & Test Prep" },
  {
    label: "Language Learning",
    value: "language-learning",
    category: "Academic & Test Prep",
  },
  {
    label: "Test Preparation",
    value: "test-preparation",
    category: "Academic & Test Prep",
  },
  {
    label: "Study Skills",
    value: "study-skills",
    category: "Academic & Test Prep",
  },

  // Professional Skills
  { label: "Leadership", value: "leadership", category: "Professional Skills" },
  {
    label: "Project Management",
    value: "project-management",
    category: "Professional Skills",
  },
  {
    label: "Public Speaking",
    value: "public-speaking",
    category: "Professional Skills",
  },
  {
    label: "Communication Skills",
    value: "communication-skills",
    category: "Professional Skills",
  },
  {
    label: "Time Management",
    value: "time-management",
    category: "Professional Skills",
  },

  // Lifestyle & Hobbies
  {
    label: "Cooking & Baking",
    value: "cooking-baking",
    category: "Lifestyle & Hobbies",
  },
  { label: "Gardening", value: "gardening", category: "Lifestyle & Hobbies" },
  {
    label: "Personal Finance",
    value: "personal-finance",
    category: "Lifestyle & Hobbies",
  },
  { label: "Parenting", value: "parenting", category: "Lifestyle & Hobbies" },
  { label: "Travel", value: "travel", category: "Lifestyle & Hobbies" },
];

export const fruits: Option[] = [
  { label: "Apple", value: "apple", category: "Fruits" },
  { label: "Banana", value: "banana", category: "Fruits" },
  { label: "Cherry", value: "cherry", category: "Fruits" },
  { label: "Date", value: "date", category: "Fruits" },
  { label: "Elderberry", value: "elderberry", category: "Fruits" },
  { label: "Carrot", value: "carrot", category: "Vegetables" },
  { label: "Broccoli", value: "broccoli", category: "Vegetables" },
  { label: "Spinach", value: "spinach", category: "Vegetables" },
  { label: "Potato", value: "potato", category: "Vegetables" },
  { label: "Tomato", value: "tomato", category: "Vegetables" },
  { label: "Milk", value: "milk", category: "Dairy" },
  { label: "Cheese", value: "cheese", category: "Dairy" },
  { label: "Yogurt", value: "yogurt", category: "Dairy" },
];

export const specificSkillsOptions: Option[] = [
  // Technology & Programming
  {
    label: "Python for Data Analysis",
    value: "python-data-analysis",
    category: "Technology & Programming",
  },
  {
    label: "JavaScript & React Development",
    value: "javascript-react",
    category: "Technology & Programming",
  },
  {
    label: "Mobile App Development with Flutter",
    value: "flutter-mobile",
    category: "Technology & Programming",
  },
  {
    label: "Machine Learning Fundamentals",
    value: "machine-learning",
    category: "Technology & Programming",
  },
  {
    label: "Web Development with HTML, CSS & JavaScript",
    value: "web-development-fundamentals",
    category: "Technology & Programming",
  },
  {
    label: "Cybersecurity for Beginners",
    value: "cybersecurity-beginners",
    category: "Technology & Programming",
  },
  {
    label: "Cloud Computing with AWS",
    value: "aws-cloud",
    category: "Technology & Programming",
  },
  {
    label: "Game Development with Unity",
    value: "unity-game-dev",
    category: "Technology & Programming",
  },
  {
    label: "iOS App Development with Swift",
    value: "ios-swift",
    category: "Technology & Programming",
  },
  {
    label: "Android App Development with Kotlin",
    value: "android-kotlin",
    category: "Technology & Programming",
  },

  // Business & Entrepreneurship
  {
    label: "Facebook Ads for E-commerce",
    value: "facebook-ads-ecommerce",
    category: "Business & Entrepreneurship",
  },
  {
    label: "SEO for Small Businesses",
    value: "seo-small-business",
    category: "Business & Entrepreneurship",
  },
  {
    label: "Startup Fundraising Strategies",
    value: "startup-fundraising",
    category: "Business & Entrepreneurship",
  },
  {
    label: "Digital Marketing Funnel Optimization",
    value: "marketing-funnels",
    category: "Business & Entrepreneurship",
  },
  {
    label: "E-commerce Store Management",
    value: "ecommerce-management",
    category: "Business & Entrepreneurship",
  },
  {
    label: "Stock Market Investing for Beginners",
    value: "stock-investing-beginners",
    category: "Business & Entrepreneurship",
  },
  {
    label: "Sales Techniques and Closing",
    value: "sales-techniques",
    category: "Business & Entrepreneurship",
  },
  {
    label: "Business Plan Development",
    value: "business-planning",
    category: "Business & Entrepreneurship",
  },
  {
    label: "Content Marketing Strategy",
    value: "content-marketing",
    category: "Business & Entrepreneurship",
  },
  {
    label: "Google Analytics Implementation",
    value: "google-analytics",
    category: "Business & Entrepreneurship",
  },

  // Creative Arts
  {
    label: "Adobe Photoshop for Beginners",
    value: "photoshop-beginners",
    category: "Creative Arts",
  },
  {
    label: "UI/UX Design Principles",
    value: "ui-ux-principles",
    category: "Creative Arts",
  },
  {
    label: "Digital Photography Basics",
    value: "digital-photography",
    category: "Creative Arts",
  },
  {
    label: "Video Editing with Adobe Premiere",
    value: "premiere-video-editing",
    category: "Creative Arts",
  },
  {
    label: "Music Production with Ableton Live",
    value: "ableton-music-production",
    category: "Creative Arts",
  },
  {
    label: "Digital Drawing with Procreate",
    value: "procreate-drawing",
    category: "Creative Arts",
  },
  {
    label: "3D Modeling with Blender",
    value: "blender-3d",
    category: "Creative Arts",
  },
  {
    label: "Creative Writing Techniques",
    value: "creative-writing",
    category: "Creative Arts",
  },
  {
    label: "Logo Design Fundamentals",
    value: "logo-design",
    category: "Creative Arts",
  },
  {
    label: "Social Media Content Creation",
    value: "social-media-content",
    category: "Creative Arts",
  },

  // Health & Wellness
  {
    label: "Yoga for Stress Relief",
    value: "yoga-stress-relief",
    category: "Health & Wellness",
  },
  {
    label: "Weight Training Fundamentals",
    value: "weight-training",
    category: "Health & Wellness",
  },
  {
    label: "Meal Planning for Weight Loss",
    value: "meal-planning-weight-loss",
    category: "Health & Wellness",
  },
  {
    label: "Meditation for Beginners",
    value: "meditation-beginners",
    category: "Health & Wellness",
  },
  {
    label: "Nutrition for Athletes",
    value: "sports-nutrition",
    category: "Health & Wellness",
  },
  {
    label: "Home Workout Routines",
    value: "home-workouts",
    category: "Health & Wellness",
  },
  {
    label: "Mindfulness Practices",
    value: "mindfulness",
    category: "Health & Wellness",
  },
  {
    label: "Injury Prevention Exercises",
    value: "injury-prevention",
    category: "Health & Wellness",
  },
  {
    label: "Healthy Cooking Techniques",
    value: "healthy-cooking",
    category: "Health & Wellness",
  },

  // Academic & Test Prep
  {
    label: "Calculus for High School Students",
    value: "high-school-calculus",
    category: "Academic & Test Prep",
  },
  {
    label: "SAT/ACT Test Preparation",
    value: "sat-act-prep",
    category: "Academic & Test Prep",
  },
  {
    label: "English as a Second Language",
    value: "esl",
    category: "Academic & Test Prep",
  },
  {
    label: "College Application Essays",
    value: "college-essays",
    category: "Academic & Test Prep",
  },
  {
    label: "Chemistry Fundamentals",
    value: "chemistry-fundamentals",
    category: "Academic & Test Prep",
  },
  {
    label: "Spanish Language for Beginners",
    value: "spanish-beginners",
    category: "Academic & Test Prep",
  },
  {
    label: "Study Skills and Time Management",
    value: "study-skills",
    category: "Academic & Test Prep",
  },
  {
    label: "Physics Problem Solving",
    value: "physics-problem-solving",
    category: "Academic & Test Prep",
  },

  // Professional Skills
  {
    label: "Public Speaking and Presentation Skills",
    value: "public-speaking",
    category: "Professional Skills",
  },
  {
    label: "Project Management Methodologies",
    value: "project-management",
    category: "Professional Skills",
  },
  {
    label: "Leadership Development",
    value: "leadership-development",
    category: "Professional Skills",
  },
  {
    label: "Effective Communication in Workplace",
    value: "workplace-communication",
    category: "Professional Skills",
  },
  {
    label: "Time Management Strategies",
    value: "time-management",
    category: "Professional Skills",
  },
  {
    label: "Conflict Resolution Techniques",
    value: "conflict-resolution",
    category: "Professional Skills",
  },
  {
    label: "Team Building Activities",
    value: "team-building",
    category: "Professional Skills",
  },
  {
    label: "Negotiation Skills",
    value: "negotiation-skills",
    category: "Professional Skills",
  },

  // Lifestyle & Hobbies
  {
    label: "Baking for Beginners",
    value: "baking-beginners",
    category: "Lifestyle & Hobbies",
  },
  {
    label: "Organic Gardening Techniques",
    value: "organic-gardening",
    category: "Lifestyle & Hobbies",
  },
  {
    label: "Personal Budgeting and Finance",
    value: "personal-budgeting",
    category: "Lifestyle & Hobbies",
  },
  {
    label: "Parenting Strategies for Toddlers",
    value: "toddler-parenting",
    category: "Lifestyle & Hobbies",
  },
  {
    label: "Travel Planning on a Budget",
    value: "budget-travel",
    category: "Lifestyle & Hobbies",
  },
  {
    label: "Home Organization Methods",
    value: "home-organization",
    category: "Lifestyle & Hobbies",
  },
  {
    label: "Basic Car Maintenance",
    value: "car-maintenance",
    category: "Lifestyle & Hobbies",
  },
  {
    label: "Knitting and Crochet Basics",
    value: "knitting-crochet",
    category: "Lifestyle & Hobbies",
  },
];

export const qualificationOptions: Option[] = [
  // Formal Education
  {
    label: "High School Diploma",
    value: "high-school",
    category: "Formal Education",
  },
  {
    label: "Associate's Degree",
    value: "associate",
    category: "Formal Education",
  },
  {
    label: "Bachelor's Degree",
    value: "bachelor",
    category: "Formal Education",
  },
  { label: "Master's Degree", value: "master", category: "Formal Education" },
  { label: "PhD/Doctorate", value: "phd", category: "Formal Education" },

  // Professional Certifications
  {
    label: "Google Professional Certificate",
    value: "google-cert",
    category: "Professional Certifications",
  },
  {
    label: "AWS Certified",
    value: "aws-cert",
    category: "Professional Certifications",
  },
  {
    label: "PMI Project Management",
    value: "pmp",
    category: "Professional Certifications",
  },
  {
    label: "Microsoft Certified",
    value: "microsoft-cert",
    category: "Professional Certifications",
  },
  {
    label: "Adobe Certified Expert",
    value: "adobe-cert",
    category: "Professional Certifications",
  },

  // Industry Specific
  { label: "State Licensed", value: "state-license", category: "Licenses" },
  {
    label: "Teaching Certificate",
    value: "teaching-cert",
    category: "Licenses",
  },

  // Experience Based
  {
    label: "5+ Years Industry Experience",
    value: "5-years-exp",
    category: "Professional Experience",
  },
  {
    label: "10+ Years Industry Experience",
    value: "10-years-exp",
    category: "Professional Experience",
  },
  {
    label: "Published Author",
    value: "published-author",
    category: "Achievements",
  },
  { label: "Award Winner", value: "award-winner", category: "Achievements" },

  // Other
  { label: "Other Qualification", value: "other", category: "Other" },
];
