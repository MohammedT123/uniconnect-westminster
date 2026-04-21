require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("./models/job");
const Accommodation = require("./models/accommodation");
const Community = require("./models/community");

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("🌱 Seeding...");

  await Job.deleteMany({});
  await Accommodation.deleteMany({});
  await Community.deleteMany({});

  await Job.create([
    { title: "Barista", company: "Costa Coffee", location: "Marylebone, London", type: "Part-time", salary: "£11.50/hr", description: "Serve customers, prepare drinks and maintain a clean workspace. Flexible shifts available around your studies.", applyUrl: "https://www.costa.co.uk/careers" },
    { title: "Retail Assistant", company: "Zara", location: "Oxford Street, London", type: "Part-time", salary: "£11.00/hr", description: "Support customers on the shop floor, manage stock and assist with visual merchandising.", applyUrl: "https://www.zara.com/uk/" },
    { title: "Library Assistant", company: "Westminster University Library", location: "Marylebone Road, London", type: "Part-time", salary: "£12.00/hr", description: "Help students find resources, manage returns and maintain library systems. Great for CS students.", applyUrl: "https://www.westminster.ac.uk" },
    { title: "Marketing Intern", company: "Digital Marketing Agency", location: "Soho, London", type: "Internship", salary: "£10.50/hr", description: "Assist with social media campaigns, content creation and market research. Ideal for ambitious students.", applyUrl: "https://www.westminster.ac.uk" },
    { title: "Waiter/Waitress", company: "The Ivy", location: "Covent Garden, London", type: "Part-time", salary: "£11.75/hr", description: "Provide excellent customer service in a busy restaurant environment. Evening and weekend shifts available.", applyUrl: "https://www.theivycollection.com" },
    { title: "Software Dev Intern", company: "TechStart London", location: "Shoreditch, London", type: "Internship", salary: "£14.00/hr", description: "Work on real projects using React and Node.js. Perfect for CS students wanting industry experience.", applyUrl: "https://www.westminster.ac.uk" },
    { title: "Customer Service Rep", company: "Amazon", location: "Remote", type: "Part-time", salary: "£12.50/hr", description: "Handle customer queries via chat and email. Fully remote, flexible hours around your schedule.", applyUrl: "https://www.amazon.jobs" },
    { title: "Receptionist", company: "Premier Inn", location: "Paddington, London", type: "Part-time", salary: "£11.20/hr", description: "Welcome guests, manage bookings and handle queries at the front desk. Weekday and weekend shifts.", applyUrl: "https://www.premierinn.com/gb/en/jobs.html" }
  ]);

  await Accommodation.create([
    { title: "Marylebone Student Village", address: "Luxborough Street, Marylebone", type: "En-suite", price: 280, description: "Modern en-suite rooms with all bills included. Just 2 minutes walk from the Marylebone campus. High-speed WiFi, communal kitchen and study spaces.", distanceFromCampus: "2 min walk" },
    { title: "The Arcade Student Living", address: "Camden High Street, Camden", type: "Studio", price: 320, description: "Self-contained studio flats with private kitchen and bathroom. Quiet study environment with 24/7 security. 15 minutes from campus by tube.", distanceFromCampus: "15 min commute" },
    { title: "Paddington Gardens", address: "Praed Street, Paddington", type: "Shared", price: 195, description: "Affordable shared flats close to Paddington station. Great transport links across London. Weekly cleaning included.", distanceFromCampus: "20 min commute" },
    { title: "City Halls Westminster", address: "Tottenham Court Road, Fitzrovia", type: "One Bedroom", price: 350, description: "Spacious one bedroom apartments in the heart of London. Perfect for students who want their own space. All utilities included.", distanceFromCampus: "10 min walk" },
    { title: "Victoria Student House", address: "Warwick Way, Pimlico", type: "Shared", price: 175, description: "Budget-friendly shared house with a great community of students. Regular social events and close to Victoria station.", distanceFromCampus: "25 min commute" }
  ]);

  await Community.create([
    { name: "Football Society", category: "Sports", description: "Join our weekly training sessions and inter-university competitions. All skill levels welcome from beginners to experienced players. We train every Tuesday and Thursday evening.", members: 87, meetingSchedule: "Tue & Thu, 6pm", contactEmail: "football@westminster.ac.uk" },
    { name: "African & Caribbean Society", category: "Cultural", description: "Celebrating African and Caribbean culture through events, food festivals and cultural discussions. Everyone is welcome to join our vibrant community.", members: 124, meetingSchedule: "Fridays, 5pm", contactEmail: "afrocarib@westminster.ac.uk" },
    { name: "Computer Science Society", category: "Academic", description: "Connect with fellow CS students, attend tech talks, participate in hackathons and develop your programming skills. Industry speakers every month.", members: 203, meetingSchedule: "Wednesdays, 4pm", contactEmail: "cssoc@westminster.ac.uk" },
    { name: "Women in Tech", category: "Tech", description: "Empowering women in technology through networking events, mentorship programmes and industry speaker sessions. Open to all genders as allies.", members: 91, meetingSchedule: "Mondays, 5:30pm", contactEmail: "wit@westminster.ac.uk" },
    { name: "Drama & Theatre Society", category: "Arts", description: "Explore your creative side with performances, workshops and backstage opportunities. No experience necessary.", members: 56, meetingSchedule: "Thursdays, 6pm", contactEmail: "drama@westminster.ac.uk" },
    { name: "Basketball Club", category: "Sports", description: "Weekly practice sessions and inter-university competitions. Whether you are a pro or just starting out come and join us on the court.", members: 45, meetingSchedule: "Saturdays, 10am", contactEmail: "basketball@westminster.ac.uk" },
    { name: "International Students Society", category: "Social", description: "A welcoming community for international and home students to share cultures, organise trips and make lifelong friends. Monthly cultural nights.", members: 178, meetingSchedule: "Every other Friday", contactEmail: "international@westminster.ac.uk" },
    { name: "Entrepreneurship Society", category: "Academic", description: "For aspiring entrepreneurs and innovators. Learn from successful founders, pitch your ideas and build your network. Monthly pitch competitions.", members: 112, meetingSchedule: "Tuesdays, 6:30pm", contactEmail: "entrepreneurs@westminster.ac.uk" }
  ]);

  console.log("✅ Seed complete!");
  process.exit();
};

seed().catch(err => { console.error(err); process.exit(1); });