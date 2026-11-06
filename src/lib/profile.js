/* Facts below are taken from the author's public profile site:
   https://sites.google.com/site/alfreddanielj85/ — nothing here is invented. */

export const PROFILE = {
  name: "Dr. J. Alfred Daniel",
  title: "Assistant Professor, Department of Computer Science and Engineering",
  institution: "Karpagam Academy of Higher Education",
  city: "Coimbatore, India - 641021",
  role2: "Head, Centre for Immersive Reality and Gaming (CIRG)",
  email: "alfreddaniel.johnwilliam@kahedu.edu.in",
  emailAlt: ["85.alfred@gmail.com", "alfreddaniel.j@outlook.com"],
  phone: "+918220261899",
  phoneDisplay: "+91 82202 61899",
};

export const IDS = {
  orcid: "0000-0003-0602-3425",
  scopus: "56313790400",
  scholar: "TcgxHf4AAAAJ",
  wos: "O-1875-2017",
  vidwan: "301908",
};

export const LINKS = {
  orcid: "https://orcid.org/0000-0003-0602-3425",
  scopus: "https://www.scopus.com/authid/detail.uri?authorId=56313790400",
  scholar: "https://scholar.google.co.in/citations?user=TcgxHf4AAAAJ",
  wos: "https://www.webofscience.com/wos/author/record/O-1875-2017",
  researchgate: "https://www.researchgate.net/profile/Alfred-Daniel",
  linkedin: "https://www.linkedin.com/in/alfreddaniel/",
  ieee: "https://ieee-collabratec.ieee.org/app/p/Alfreddaniel",
  sciprofiles: "https://sciprofiles.com/profile/alfreddaniel",
  vidwan: "https://vidwan.inflibnet.ac.in/profile/301908",
  cirg: "https://deepakkadir.wixsite.com/cirg",
  maps: "https://www.google.com/maps/search/?api=1&query=Karpagam+Academy+of+Higher+Education+Coimbatore",
};

/* Single source for the profile links (About, Credentials, Contact and the footer). */
export const PROFILES = [
  { label: "ORCID Record", detail: IDS.orcid, href: LINKS.orcid },
  { label: "Google Scholar", detail: "Public profile", href: LINKS.scholar },
  { label: "Scopus Author ID", detail: IDS.scopus, href: LINKS.scopus },
  { label: "Web of Science", detail: IDS.wos, href: LINKS.wos },
  { label: "ResearchGate Profile", detail: "Public profile", href: LINKS.researchgate },
  { label: "LinkedIn", detail: "Professional network", href: LINKS.linkedin },
];

export const EDUCATION = [
  { degree: "Master's in Computer Engineering", place: "Kyungpook National University, Korea", note: "Connected Computing and Media Processing Lab" },
  { degree: "MBA, Software Enterprise Management", place: "Anna University, Coimbatore, India" },
  { degree: "B.Tech, Information Technology", place: "Anna University, Chennai, India" },
];

/* Training, internships and competitions listed on the Research Credentials page. */
export const TRAINING = [
  { when: "Feb – Mar 2017", where: "CCMP Lab, Kyungpook National University, South Korea", what: "Internship certificate (Research Scholar)", tag: "Research internship" },
  { when: "Aug – Sep 2014", where: "Intel Labs, National Taiwan University, Taiwan", what: "Internship certificate", tag: "Industry lab internship" },
  { when: "March 2014", where: "ACM Student Research Competition", what: "Recognition certificate, sponsored by Microsoft Research", tag: "Competition" },
  { when: "March 2014", where: "ACM SAC Student Research Competition", what: "Participation certificate", tag: "Competition" },
];

export const RECOGNITION = [
  { badge: "Outstanding reviewer", venue: "Future Generation Computer Systems", detail: "Outstanding contribution in reviewing, October 2017. Recognized reviewer, July 2015 and October 2017." },
  { badge: "Outstanding reviewer", venue: "Journal of Parallel and Distributed Computing", detail: "Outstanding contribution in reviewing, October 2017. Recognized reviewer, August 2017." },
  { badge: "Recognized reviewer", venue: "Vehicular Communications", detail: "Recognized reviewer, July 2016." },
];

export const REVIEWER_FOR = [
  ["IEEE", "Transactions on Intelligent Transportation Systems; Transactions on Vehicular Technology"],
  ["Elsevier", "Journal of Medical Systems; Journal of Parallel and Distributed Computing; Future Generation Computer Systems; Journal of Systems Architecture; Vehicular Communications"],
  ["Springer", "Multimedia Tools and Applications; Journal of Real-Time Image Processing; SpringerPlus"],
  ["ACM", "Symposium on Applied Computing; Research in Adaptive and Convergent Systems"],
  ["Hindawi and Inderscience", "Mathematical Problems in Engineering; The Scientific World Journal; International Journal of High-Performance Systems Architecture"],
];

export const AWARDS = [
  { title: "Best Paper Award", detail: "ICSNS 2015, SNS College of Technology, Coimbatore" },
  { title: "ACM Travel Grant", detail: "ACM SAC 2014" },
];

export const RESEARCH_INTERESTS = [
  "Artificial Intelligence (AI) & Machine Learning (ML)",
  "Extended Reality (XR)",
  "Intelligent Transportation System (ITS)",
  "Autonomous Vehicle",
  "IoT (Internet of Things)",
];

export const PATENT_META = [
  { cc: "KR", country: "South Korea", office: "Korean patent", number: "10-2015-0046184", reg: "Reg. No. 1015891020000", status: "Granted", date: "21 January 2016", granted: true },
  { cc: "AU", country: "Australia", office: "Australian patent", number: "2020102835", reg: null, status: "Granted", date: "6 January 2021", granted: true },
  { cc: "IN", country: "India", office: "Indian patent application", number: "201941014773", reg: null, status: "Application published", date: "17 May 2019", granted: false },
  { cc: "IN", country: "India", office: "Indian patent application", number: "201941014769", reg: null, status: "Application published", date: "17 May 2019", granted: false },
];
