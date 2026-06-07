// import type { Client, PoolProfile, Matchmaker, Gender, MaritalStatus, DietaryPref, FamilyType, TriBool } from '../types';

// export const MATCHMAKER: Matchmaker = {
//   id: 'mm-001',
//   username: 'admin',
//   name: 'Priya Sharma',
//   avatar: 'PS',
// };

// const maleFirstNames = ['Aarav','Vivaan','Aditya','Vihaan','Arjun','Sai','Reyansh','Krishna','Ishaan','Shaurya','Ananya','Rohan','Karan','Rahul','Vikram','Amit','Suresh','Rajesh','Deepak','Manish','Nikhil','Varun','Sachin','Gaurav','Pankaj','Sunil','Dinesh','Ashok','Ramesh','Suresh','Mohit','Rajat','Pulkit','Harsh','Yash','Aakash','Chirag','Naveen','Prateek','Tarun','Siddharth','Kunal','Abhishek','Sanjay','Mukesh','Ravi','Anil','Prakash','Jitendra','Vijay'];
// const femaleFirstNames = ['Aanya','Diya','Myra','Sara','Aadhya','Kiara','Riya','Anika','Nisha','Pooja','Meera','Kavita','Sunita','Rekha','Anjali','Neha','Shruti','Swati','Preeti','Divya','Simran','Nidhi','Aarti','Bhavna','Chitra','Deepa','Ekta','Falguni','Geeta','Harshita','Isha','Jaya','Kamini','Lata','Madhuri','Namrata','Ojaswi','Parul','Rashmi','Shalini','Tanvi','Uma','Vandana','Wasuli','Xena','Yamini','Zara','Amita','Babita','Chandni'];
// const lastNames = ['Sharma','Patel','Kumar','Singh','Agarwal','Gupta','Joshi','Mehta','Shah','Verma','Reddy','Nair','Iyer','Rao','Chopra','Malhotra','Bhatia','Chadha','Dhawan','Khanna','Kapoor','Malhotra','Oberoi','Puri','Saxena','Tandon','Wadhwa','Bansal','Chauhan','Dubey','Eshwar','Fadnavis','Gokhale','Hegde','Iyengar','Jain','Kulkarni','Luthra','Mishra','Nanda'];
// const cities = ['Mumbai','Delhi','Bangalore','Hyderabad','Chennai','Pune','Kolkata','Ahmedabad','Jaipur','Lucknow','Chandigarh','Indore','Bhopal','Nagpur','Kochi','Coimbatore','Vizag','Surat','Vadodara','Goa'];
// const companies = ['TCS','Infosys','Wipro','HCL','Reliance','ICICI Bank','HDFC','Google','Amazon','Microsoft','Flipkart','Razorpay','Zerodha','Swiggy','Zomato','Paytm','PhonePe','CRED','Meesho','Upgrad','Byju\'s','Ola','Lenskart','Boat','CarDekho','Cure.fit','BigBasket','Urban Company','Deloitte','PwC','EY','KPMG','McKinsey','BCG','Bain','Goldman Sachs','JP Morgan','Deutsche Bank','Citi'];
// const designations = ['Software Engineer','Senior Engineer','Tech Lead','Engineering Manager','Director','VP','Product Manager','Data Scientist','Analyst','Consultant','Associate','Architect','CTO','CEO','COO','Founder','Co-Founder','Head of Sales','Marketing Lead','HR Manager'];
// const degrees = ['B.Tech','B.E.','B.Sc','B.Com','BBA','MBA','M.Tech','M.S.','CA','MBBS','LLB'];
// const colleges = ['IIT Bombay','IIT Delhi','IIT Madras','IIT Kanpur','IIT Kharagpur','IIM Ahmedabad','IIM Bangalore','BITS Pilani','NIT Trichy','NIT Warangal','DTU','IIIT Hyderabad','ISB','XLRI','FMS Delhi','JBIMS','SP Jain','MDI Gurgaon','SRCC','LSR'];
// const religions = ['Hindu','Muslim','Sikh','Christian','Jain','Buddhist'];
// const castes = ['Brahmin','Kshatriya','Vaishya','Agarwal','Gupta','Jat','Rajput','Maratha','Reddy','Kamma','Nair','Iyer','Patel','Singh','Khatri','Arora','Lohana','Baniya','Yadav','Lingayat'];
// const gotras = ['Kashyap','Bharadwaj','Vatsa','Garga','Vashishtha','Kaundinyasa','Maudgalya','Sandilya','Haritasa','Atri','Shandilya','Parashara','Vishwamitra','Jamadagni','Bhrgu','Angirasa'];
// const languages = ['Hindi','English','Marathi','Tamil','Telugu','Kannada','Malayalam','Bengali','Gujarati','Punjabi','Odia','Assamese','Urdu','Sanskrit'];

// function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
// function pickN<T>(arr: T[], n: number): T[] {
//   const shuffled = [...arr].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, n);
// }
// function randInt(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }
// function formatINR(n: number): string { return `₹${(n / 100000).toFixed(1)}L`; }

// function generateId(): string { return `p-${Math.random().toString(36).slice(2, 9)}`; }

// function generateProfile(gender: Gender): PoolProfile {
//   const firstName = gender === 'Male' ? pick(maleFirstNames) : pick(femaleFirstNames);
//   const age = randInt(24, 40);
//   const dob = `${randInt(1, 28)}/${randInt(1, 12)}/${new Date().getFullYear() - age}`;
//   const height = gender === 'Male' ? `${randInt(165, 190)}cm` : `${randInt(152, 175)}cm`;
//   const income = randInt(8, 120) * 100000;

//   return {
//     id: generateId(),
//     personal: {
//       firstName,
//       lastName: pick(lastNames),
//       gender,
//       dob,
//       height,
//       languages: pickN(languages, randInt(2, 4)),
//       email: `${firstName.toLowerCase()}.${pick(lastNames).toLowerCase()}@email.com`,
//       phone: `+91 ${randInt(70000, 99999)} ${randInt(10000, 99999)}`,
//     },
//     professional: {
//       company: pick(companies),
//       designation: pick(designations),
//       income,
//       ugCollege: pick(colleges),
//       ugDegree: pick(degrees),
//     },
//     socioCultural: {
//       religion: pick(religions),
//       caste: pick(castes),
//       gotra: pick(gotras),
//       manglik: Math.random() > 0.8,
//       dietary: pick<DietaryPref>(['Veg','Non-Veg','Jain']),
//       familyType: pick<FamilyType>(['Joint','Nuclear']),
//       siblings: randInt(0, 3),
//     },
//     preferences: {
//       wantKids: pick<TriBool>(['Yes','No','Maybe']),
//       openToRelocate: pick<TriBool>(['Yes','No','Maybe']),
//       openToPets: pick<TriBool>(['Yes','No','Maybe']),
//     },
//     maritalStatus: pick<MaritalStatus>(['Never Married','Divorced','Widowed']),
//     city: pick(cities),
//     avatar: `${firstName[0]}${pick(lastNames)[0]}`,
//   };
// }

// export const ACTIVE_CLIENTS: Client[] = [
//   {
//     id: 'cl-001',
//     personal: {
//       firstName: 'Rohan',
//       lastName: 'Kapoor',
//       gender: 'Male',
//       dob: '15/03/1992',
//       height: '178cm',
//       languages: ['Hindi', 'English', 'Punjabi'],
//       email: 'rohan.kapoor@email.com',
//       phone: '+91 98765 43210',
//     },
//     professional: {
//       company: 'Google',
//       designation: 'Senior Engineer',
//       income: 5500000,
//       ugCollege: 'IIT Bombay',
//       ugDegree: 'B.Tech',
//     },
//     socioCultural: {
//       religion: 'Hindu',
//       caste: 'Khatri',
//       gotra: 'Kashyap',
//       manglik: false,
//       dietary: 'Non-Veg',
//       familyType: 'Nuclear',
//       siblings: 1,
//     },
//     preferences: {
//       wantKids: 'Yes',
//       openToRelocate: 'Maybe',
//       openToPets: 'Yes',
//     },
//     maritalStatus: 'Never Married',
//     city: 'Mumbai',
//     journeyStatus: 'Searching',
//     avatar: 'RK',
//     matchmakerId: 'mm-001',
//     notes: [
//       { id: 'n-001', text: 'Initial consultation completed. Client is looking for a partner with similar professional background. Prefers someone based in metro cities.', timestamp: '2026-05-28T10:30:00' },
//       { id: 'n-002', text: 'Shared 2 profiles. Client liked the first one (Anika Mehta). Arranging a call with her family.', timestamp: '2026-06-01T14:15:00' },
//       { id: 'n-003', text: 'Call went well. Client wants to proceed. Sending formal match introduction.', timestamp: '2026-06-03T09:00:00' },
//     ],
//   },
//   {
//     id: 'cl-002',
//     personal: {
//       firstName: 'Diya',
//       lastName: 'Mehta',
//       gender: 'Female',
//       dob: '22/08/1994',
//       height: '163cm',
//       languages: ['Hindi', 'English', 'Marathi'],
//       email: 'diya.mehta@email.com',
//       phone: '+91 87654 32109',
//     },
//     professional: {
//       company: 'Razorpay',
//       designation: 'Product Manager',
//       income: 3200000,
//       ugCollege: 'BITS Pilani',
//       ugDegree: 'B.E.',
//     },
//     socioCultural: {
//       religion: 'Hindu',
//       caste: 'Brahmin',
//       gotra: 'Bharadwaj',
//       manglik: true,
//       dietary: 'Veg',
//       familyType: 'Joint',
//       siblings: 2,
//     },
//     preferences: {
//       wantKids: 'Yes',
//       openToRelocate: 'No',
//       openToPets: 'Maybe',
//     },
//     maritalStatus: 'Never Married',
//     city: 'Bangalore',
//     journeyStatus: 'Onboarding',
//     avatar: 'DM',
//     matchmakerId: 'mm-001',
//     notes: [
//       { id: 'n-004', text: 'First intro call. Client is very particular about caste and dietary preferences. Wants a Brahmin partner only. Manglik status is important for compatibility.', timestamp: '2026-06-02T11:00:00' },
//     ],
//   },
// ];

// // Generate 100 pool profiles (50 male, 50 female)
// const malePool: PoolProfile[] = Array.from({ length: 50 }, () => generateProfile('Male'));
// const femalePool: PoolProfile[] = Array.from({ length: 50 }, () => generateProfile('Female'));

// export const POOL: PoolProfile[] = [...malePool, ...femalePool];

// export function computeMatchScore(client: Client, profile: PoolProfile): { score: number; reasons: string[] } {
//   const reasons: string[] = [];
//   let score = 0;
//   let maxScore = 0;

//   // Age compatibility (max 20)
//   maxScore += 20;
//   const clientAge = calcAge(client.personal.dob);
//   const profileAge = calcAge(profile.personal.dob);
//   const ageDiff = Math.abs(clientAge - profileAge);
//   if (ageDiff <= 2) { score += 20; reasons.push('Age very compatible'); }
//   else if (ageDiff <= 5) { score += 15; reasons.push('Age compatible'); }
//   else if (ageDiff <= 8) { score += 8; }
//   else { score += 2; }

//   // City match (max 15)
//   maxScore += 15;
//   if (client.city === profile.city) { score += 15; reasons.push('Same city'); }
//   else if (client.preferences.openToRelocate === 'Yes' || profile.preferences.openToRelocate === 'Yes') { score += 8; }

//   // Religion (max 15)
//   maxScore += 15;
//   if (client.socioCultural.religion === profile.socioCultural.religion) { score += 15; reasons.push('Same religion'); }
//   else { score += 3; }

//   // Caste (max 10)
//   maxScore += 10;
//   if (client.socioCultural.caste === profile.socioCultural.caste) { score += 10; reasons.push('Same caste'); }
//   else { score += 2; }

//   // Manglik compatibility (max 10)
//   maxScore += 10;
//   if (client.socioCultural.manglik === profile.socioCultural.manglik) { score += 10; reasons.push('Manglik compatible'); }
//   else if (!client.socioCultural.manglik && !profile.socioCultural.manglik) { score += 10; }
//   else { score += 2; }

//   // Dietary (max 5)
//   maxScore += 5;
//   if (client.socioCultural.dietary === profile.socioCultural.dietary) { score += 5; reasons.push('Same dietary preference'); }
//   else if (client.socioCultural.dietary === 'Non-Veg') { score += 3; }
//   else { score += 1; }

//   // Income compatibility (max 10)
//   maxScore += 10;
//   const incomeRatio = profile.professional.income / client.professional.income;
//   if (incomeRatio >= 0.5 && incomeRatio <= 2) { score += 10; reasons.push('Income compatible'); }
//   else if (incomeRatio >= 0.3 && incomeRatio <= 3) { score += 5; }
//   else { score += 1; }

//   // Professional alignment (max 5)
//   maxScore += 5;
//   if (client.professional.ugCollege === profile.professional.ugCollege) { score += 5; reasons.push('Same alma mater'); }
//   else { score += 1; }

//   // Preferences alignment (max 10)
//   maxScore += 10;
//   if (client.preferences.wantKids === profile.preferences.wantKids) { score += 4; reasons.push('Aligned on kids'); }
//   if (client.preferences.openToPets === profile.preferences.openToPets) { score += 3; }
//   if (client.preferences.openToRelocate === profile.preferences.openToRelocate) { score += 3; }

//   const finalScore = Math.round((score / maxScore) * 100);
//   return { score: Math.min(finalScore, 99), reasons: reasons.slice(0, 4) };
// }

// function calcAge(dob: string): number {
//   const parts = dob.split('/');
//   const year = parseInt(parts[2]);
//   return new Date().getFullYear() - year;
// }

// export function getMatchSuggestions(client: Client): { profile: PoolProfile; score: number; reasons: string[] }[] {
//   const oppositeGender: Gender = client.personal.gender === 'Male' ? 'Female' : 'Male';
//   const oppositePool = POOL.filter(p => p.personal.gender === oppositeGender);

//   return oppositePool
//     .map(profile => {
//       const { score, reasons } = computeMatchScore(client, profile);
//       return { profile, score, reasons };
//     })
//     .sort((a, b) => b.score - a.score);
// }

// export { formatINR };
