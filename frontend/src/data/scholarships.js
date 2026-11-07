// Mock scholarship dataset for GRANTLY
// All criteria, amounts, and dates are realistically structured for discovery and tracking.

export const SCHOLARSHIPS_DATA = [
  {
    id: "clean-energy-horizon-2026",
    title: "The Horizon Fellowship in Clean Energy",
    provider: "Clean Energy Research Alliance",
    amount: 18000,
    amountFormatted: "$18,000",
    deadline: "2026-11-28",
    field: "STEM",
    subfield: "Environmental Science & Energy Engineering",
    educationLevel: "Undergraduate",
    region: "United States",
    isFeatured: true,
    minGpa: 3.4,
    matchScore: 97,
    summary: "Supports undergraduate researchers designing localized renewable energy transitions, grid resilience models, or storage systems.",
    eligibilityCriteria: [
      "Enrolled full-time in an accredited US university or college",
      "Sophomore or junior standing in engineering, environmental science, or applied physics",
      "Cumulative GPA of 3.4 or higher",
      "Demonstrated commitment to renewable energy transition research"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Official Academic Transcript", completed: true },
      { id: "doc-2", name: "Research Proposal (max 1,200 words)", completed: false },
      { id: "doc-3", name: "Two Faculty Letters of Recommendation", completed: false },
      { id: "doc-4", name: "Resume / Curriculum Vitae", completed: true }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Direct to university financial aid office",
    tags: ["Renewable Energy", "Research", "Junior/Senior", "Merit-Based"]
  },
  {
    id: "ada-lovelace-computing-2026",
    title: "Ada Lovelace Computing Grant",
    provider: "Open Horizons Technology Foundation",
    amount: 12500,
    amountFormatted: "$12,500",
    deadline: "2026-12-10",
    field: "STEM",
    subfield: "Computer Science & Software Systems",
    educationLevel: "Undergraduate",
    region: "North America",
    isFeatured: true,
    minGpa: 3.2,
    matchScore: 94,
    summary: "Dedicated to advancing historically underrepresented students pursuing degrees in computer systems, algorithms, and cybersecurity.",
    eligibilityCriteria: [
      "Declared major in Computer Science, Computer Engineering, or Data Systems",
      "Enrolled at an accredited institution in the US or Canada",
      "Minimum cumulative GPA of 3.2",
      "Open to freshmen, sophomores, juniors, and seniors"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Transcript (unofficial accepted for round 1)", completed: true },
      { id: "doc-2", name: "Personal Statement on Tech Ethics (750 words)", completed: true },
      { id: "doc-3", name: "GitHub Repository or Technical Project Link", completed: true },
      { id: "doc-4", name: "One Letter of Recommendation", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Split semester payment to student bursar",
    tags: ["Computer Science", "Diversity", "Undergraduate", "Software"]
  },
  {
    id: "dubois-humanities-inquiry-2027",
    title: "W.E.B. Du Bois Humanities Inquiry Grant",
    provider: "Institute for Public History and Social Inquiry",
    amount: 10000,
    amountFormatted: "$10,000",
    deadline: "2027-01-15",
    field: "Humanities",
    subfield: "History, Sociology & Literature",
    educationLevel: "Graduate",
    region: "United States",
    isFeatured: false,
    minGpa: 3.5,
    matchScore: 89,
    summary: "Provides direct project funding and archival travel stipends for graduate scholars examining structural inequalities and civil history.",
    eligibilityCriteria: [
      "Currently enrolled in an MA, MFA, or PhD program in the humanities",
      "Proposed archival project or thesis centered on historical or cultural inquiry",
      "Minimum cumulative GPA of 3.5 in graduate coursework",
      "Institutional verification of good standing"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Graduate Coursework Transcript", completed: true },
      { id: "doc-2", name: "Archival Research Plan (1,500 words)", completed: false },
      { id: "doc-3", name: "Writing Sample (max 20 pages)", completed: false },
      { id: "doc-4", name: "Advisor Endorsement Form", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Direct stipend check to recipient",
    tags: ["Humanities", "Graduate", "Archival Research", "Thesis Funding"]
  },
  {
    id: "florence-nightingale-healthcare-2026",
    title: "Florence Healthcare Leadership Award",
    provider: "National Association of Nursing & Clinical Sciences",
    amount: 15000,
    amountFormatted: "$15,000",
    deadline: "2026-12-20",
    field: "Healthcare",
    subfield: "Nursing, Public Health & Pre-Med",
    educationLevel: "Undergraduate",
    region: "United States",
    isFeatured: true,
    minGpa: 3.3,
    matchScore: 92,
    summary: "Funds students committed to clinical healthcare delivery in rural or medically underserved communities following graduation.",
    eligibilityCriteria: [
      "Enrolled in an accredited BSN, pre-medical, or public health bachelor program",
      "Willingness to commit to 2 years of clinical practice in a recognized health shortage area",
      "Minimum 3.3 GPA",
      "Verification of completed clinical rotation hours or volunteer work"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Official College Transcripts", completed: false },
      { id: "doc-2", name: "Service Intent Statement (1,000 words)", completed: false },
      { id: "doc-3", name: "Clinical Supervisor Evaluation", completed: false },
      { id: "doc-4", name: "Proof of Program Enrollment", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Direct tuition reduction credit",
    tags: ["Healthcare", "Nursing", "Rural Service", "Undergraduate"]
  },
  {
    id: "vanguard-first-gen-leadership-2027",
    title: "Vanguard First-Generation Scholar Award",
    provider: "The New American Pathways Trust",
    amount: 8000,
    amountFormatted: "$8,000",
    deadline: "2027-02-01",
    field: "Any",
    subfield: "All Academic Disciplines",
    educationLevel: "Undergraduate",
    region: "United States",
    isFeatured: false,
    minGpa: 3.0,
    matchScore: 95,
    summary: "Awarded to first-generation college students displaying exemplary civic engagement, resilience, and campus peer mentoring.",
    eligibilityCriteria: [
      "Neither parent or legal guardian completed a four-year college degree",
      "Current undergraduate student with at least 24 completed credit hours",
      "Minimum cumulative GPA of 3.0",
      "Active participant in campus or neighborhood community service"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "FAFSA Submission Summary or Financial Aid Award Letter", completed: true },
      { id: "doc-2", name: "First-Generation Narrative Essay (800 words)", completed: true },
      { id: "doc-3", name: "One Letter of Recommendation from Community Leader", completed: false },
      { id: "doc-4", name: "Current Academic Transcript", completed: true }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Annual renewable grant divided into fall/spring installments",
    tags: ["First-Gen", "Need-Aware", "Leadership", "Renewable"]
  },
  {
    id: "bauhaus-civic-architecture-2026",
    title: "The Urban Fabric Architecture Fellowship",
    provider: "Metropolitan Design Council",
    amount: 14000,
    amountFormatted: "$14,000",
    deadline: "2026-12-05",
    field: "Arts",
    subfield: "Architecture & Urban Planning",
    educationLevel: "Undergraduate",
    region: "North America",
    isFeatured: false,
    minGpa: 3.2,
    matchScore: 88,
    summary: "Supports architecture and urban planning students exploring affordable civic infrastructure and sustainable building materials.",
    eligibilityCriteria: [
      "Currently enrolled in an accredited B.Arch or urban studies program",
      "Completed at least two studio design semesters",
      "Submission of a design portfolio highlighting community spaces",
      "Minimum cumulative GPA of 3.2"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Digital Design Portfolio (PDF format, max 15MB)", completed: true },
      { id: "doc-2", name: "Design Philosophy Statement (600 words)", completed: false },
      { id: "doc-3", name: "Academic Transcripts", completed: true },
      { id: "doc-4", name: "Studio Instructor Letter of Support", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Direct university credit toward studio fees and tuition",
    tags: ["Architecture", "Urban Planning", "Portfolio Required", "Design"]
  },
  {
    id: "marshall-economic-policy-2027",
    title: "Civic Economy Policy Grant",
    provider: "Center for Fiscal Responsibility & Public Governance",
    amount: 16000,
    amountFormatted: "$16,000",
    deadline: "2027-01-28",
    field: "Public Policy",
    subfield: "Economics, Public Policy & Governance",
    educationLevel: "Graduate",
    region: "Global",
    isFeatured: true,
    minGpa: 3.5,
    matchScore: 91,
    summary: "For graduate students researching municipal bond transparency, labor market adaptability, or tax incidence on working households.",
    eligibilityCriteria: [
      "Enrolled in a master or doctoral degree program in Economics, Public Policy, or MPA",
      "Demonstrated quantitative research background (econometrics or statistical modeling)",
      "GPA 3.5 or higher",
      "Citizens of any country eligible if enrolled at an accredited university"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Curriculum Vitae", completed: false },
      { id: "doc-2", name: "Policy Paper Abstract and Methodology (1,000 words)", completed: false },
      { id: "doc-3", name: "Two Academic Reference Letters", completed: false },
      { id: "doc-4", name: "Official Transcripts", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Quarterly research stipend deposited to scholar account",
    tags: ["Economics", "Public Policy", "Global", "Graduate"]
  },
  {
    id: "curie-biomedical-discovery-2027",
    title: "Marie Curie Laboratory Discovery Award",
    provider: "Biochemical Sciences Society",
    amount: 20000,
    amountFormatted: "$20,000",
    deadline: "2027-02-15",
    field: "STEM",
    subfield: "Molecular Biology, Biochemistry & Genetics",
    educationLevel: "Doctoral",
    region: "United States",
    isFeatured: true,
    minGpa: 3.6,
    matchScore: 96,
    summary: "Enables early-stage doctoral candidates to conduct independent benchwork experiments in molecular oncology or genetic therapies.",
    eligibilityCriteria: [
      "PhD candidate in biological sciences, biochemistry, or chemical biology",
      "Passed qualifying exams / advanced to candidacy",
      "Minimum cumulative GPA of 3.6",
      "Institutional laboratory safety clearance"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Dissertation Research Aims (max 3 pages)", completed: false },
      { id: "doc-2", name: "Lab Principal Investigator (PI) Recommendation", completed: false },
      { id: "doc-3", name: "Comprehensive Graduate Transcript", completed: false },
      { id: "doc-4", name: "Itemized Laboratory Reagent Budget", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Direct institutional research grant",
    tags: ["Biochemistry", "PhD", "Doctoral", "STEM"]
  },
  {
    id: "keynes-fintech-ethics-2026",
    title: "Financial Integrity & Ethics Scholarship",
    provider: "Foundation for Responsible Markets",
    amount: 7500,
    amountFormatted: "$7,500",
    deadline: "2026-12-18",
    field: "Business",
    subfield: "Finance, Accounting & Business Ethics",
    educationLevel: "Undergraduate",
    region: "United States",
    isFeatured: false,
    minGpa: 3.2,
    matchScore: 84,
    summary: "Recognizes undergraduate business students addressing consumer protection, algorithmic bias in credit underwriting, and fiduciary duties.",
    eligibilityCriteria: [
      "Enrolled in business administration, finance, accounting, or economics",
      "Junior or senior standing",
      "Minimum 3.2 cumulative GPA",
      "Completed at least one course in business ethics or legal studies"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Resume", completed: true },
      { id: "doc-2", name: "Ethics Case Study Response (1,000 words)", completed: false },
      { id: "doc-3", name: "Academic Transcript", completed: true }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "One-time lump sum check for academic expenses",
    tags: ["Business", "Finance", "Ethics", "Undergraduate"]
  },
  {
    id: "orwell-investigative-journalism-2027",
    title: "The Watchdog Investigative Reporting Fund",
    provider: "Independent Press Guild",
    amount: 11000,
    amountFormatted: "$11,000",
    deadline: "2027-01-20",
    field: "Humanities",
    subfield: "Journalism, Media Studies & Communications",
    educationLevel: "Undergraduate",
    region: "United States",
    isFeatured: false,
    minGpa: 3.1,
    matchScore: 87,
    summary: "Funds field reporting expenses and academic tuition for student journalists covering local government accountability and environmental impact.",
    eligibilityCriteria: [
      "Enrolled in journalism, communications, English, or related major",
      "Published at least two clips in a student or regional news publication",
      "Minimum 3.1 GPA",
      "Proposed investigative project outline"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Portfolio of 3 Published Clips (PDFs or links)", completed: true },
      { id: "doc-2", name: "Reporting Project Proposal (750 words)", completed: false },
      { id: "doc-3", name: "Letter from Student Newspaper Faculty Advisor", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Two equal installments upon project milestone review",
    tags: ["Journalism", "Media", "Field Reporting", "Undergraduate"]
  },
  {
    id: "turing-open-source-2027",
    title: "Alan Turing Open Source Engineering Grant",
    provider: "Free & Open Computing Initiative",
    amount: 9000,
    amountFormatted: "$9,000",
    deadline: "2027-02-10",
    field: "STEM",
    subfield: "Open Source Software & Systems",
    educationLevel: "All",
    region: "Global",
    isFeatured: false,
    minGpa: null,
    matchScore: 93,
    summary: "Awards developers contributing meaningfully to public good open source repositories, accessibility tools, or cryptographic libraries.",
    eligibilityCriteria: [
      "Verifiable contribution history on public open source repositories",
      "Enrolled in any higher education degree or vocational coding program worldwide",
      "No minimum GPA requirement (assessed strictly on codebase contributions)",
      "Project code must be licensed under MIT, Apache 2.0, or GPL"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Overview of Merged Pull Requests & Contributions", completed: true },
      { id: "doc-2", name: "Brief Statement on Open Source Philosophy (500 words)", completed: true },
      { id: "doc-3", name: "Proof of Current Academic Enrollment", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Direct stipend payout via wire or institutional credit",
    tags: ["Open Source", "Global", "No GPA Req", "Software"]
  },
  {
    id: "franklin-civic-engagement-2026",
    title: "Benjamin Franklin Community Democracy Fellowship",
    provider: "Public Good Leadership Coalition",
    amount: 6000,
    amountFormatted: "$6,000",
    deadline: "2026-12-01",
    field: "Public Policy",
    subfield: "Civic Leadership & Political Science",
    educationLevel: "Undergraduate",
    region: "United States",
    isFeatured: false,
    minGpa: 3.0,
    matchScore: 82,
    summary: "Supports students organizing voter education, non-partisan municipal participation, and neighborhood council initiatives.",
    eligibilityCriteria: [
      "Active undergraduate student in good academic standing",
      "Minimum 100 hours of verifiable civic or neighborhood volunteer service",
      "Cumulative GPA of 3.0 or higher",
      "Commitment to completing a semester-long community project"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Community Service Verification Log", completed: true },
      { id: "doc-2", name: "Essay on Local Democratic Participation (750 words)", completed: false },
      { id: "doc-3", name: "One Letter of Reference from Community Organizer", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Direct grant split between tuition and project materials",
    tags: ["Civic", "Democracy", "Service", "Undergraduate"]
  },
  {
    id: "carson-marine-conservation-2027",
    title: "Rachel Carson Marine Ecology Award",
    provider: "Coastal Waters Preservation Society",
    amount: 13500,
    amountFormatted: "$13,500",
    deadline: "2027-03-01",
    field: "STEM",
    subfield: "Marine Biology, Oceanography & Conservation",
    educationLevel: "Undergraduate",
    region: "North America",
    isFeatured: false,
    minGpa: 3.3,
    matchScore: 90,
    summary: "Dedicated to students researching coastal marshland erosion, marine biodiversity, or microplastic filtration in aquatic estuaries.",
    eligibilityCriteria: [
      "Majoring in Marine Biology, Oceanography, Ecology, or Earth Sciences",
      "Junior or senior standing during award period",
      "Minimum 3.3 GPA",
      "Fieldwork or laboratory experience documented in coursework"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Unofficial Transcript", completed: false },
      { id: "doc-2", name: "Fieldwork Research Summary (800 words)", completed: false },
      { id: "doc-3", name: "Faculty Recommendation Letter", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Direct payment to university financial office",
    tags: ["Marine Biology", "Ecology", "Conservation", "STEM"]
  },
  {
    id: "hypatia-mathematics-fellowship-2027",
    title: "Hypatia Pure Mathematics Fellowship",
    provider: "North American Mathematical Council",
    amount: 17000,
    amountFormatted: "$17,000",
    deadline: "2027-02-28",
    field: "STEM",
    subfield: "Pure & Applied Mathematics, Topology",
    educationLevel: "Doctoral",
    region: "United States",
    isFeatured: false,
    minGpa: 3.7,
    matchScore: 86,
    summary: "Provides unrestricted doctoral research support for promising mathematicians specializing in algebraic topology, number theory, or dynamical systems.",
    eligibilityCriteria: [
      "Currently enrolled in a PhD program in mathematics",
      "Passed all preliminary or comprehensive qualifying examinations",
      "Demonstrated excellence in mathematical proofs or published seminar preprints",
      "Minimum 3.7 graduate GPA"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "CV with Coursework and Colloquium Presentations", completed: false },
      { id: "doc-2", name: "Statement of Research Program (max 4 pages)", completed: false },
      { id: "doc-3", name: "Two Confidential Letters from Department Faculty", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Unrestricted research fellowship stipend",
    tags: ["Mathematics", "Doctoral", "Pure Math", "Fellowship"]
  },
  {
    id: "beethoven-contemporary-composition-2026",
    title: "Acoustic Arts & Modern Composition Prize",
    provider: "National Conservatory for Contemporary Music",
    amount: 8500,
    amountFormatted: "$8,500",
    deadline: "2026-12-15",
    field: "Arts",
    subfield: "Music Composition, Audio Production & Sound Design",
    educationLevel: "Undergraduate",
    region: "United States",
    isFeatured: false,
    minGpa: 3.0,
    matchScore: 81,
    summary: "Recognizes innovative undergraduate composers blending classical instrumentation with contemporary electronic acoustic design.",
    eligibilityCriteria: [
      "Enrolled in a music performance, composition, or audio engineering curriculum",
      "Submission of two original recorded scores or compositions",
      "Minimum 3.0 cumulative GPA",
      "Letter of endorsement from composition instructor"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Two Original Audio Recordings and Sheet Music (PDF/WAV)", completed: false },
      { id: "doc-2", name: "Artistic Statement (500 words)", completed: false },
      { id: "doc-3", name: "Instructor Endorsement Letter", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "One-time scholarship check issued directly to recipient",
    tags: ["Music", "Arts", "Audio", "Composition"]
  },
  {
    id: "hamilton-public-finance-2027",
    title: "Municipal Infrastructure Finance Grant",
    provider: "Public Treasury & Infrastructure Roundtable",
    amount: 11500,
    amountFormatted: "$11,500",
    deadline: "2027-01-10",
    field: "Business",
    subfield: "Public Finance, Urban Development & Accounting",
    educationLevel: "Graduate",
    region: "United States",
    isFeatured: false,
    minGpa: 3.4,
    matchScore: 85,
    summary: "Prepares future public sector financial officers and municipal analysts managing water, transit, and public school capital programs.",
    eligibilityCriteria: [
      "Enrolled in an MPA, MBA, or MS in Finance program",
      "Focus area in public sector finance, municipal bonds, or capital planning",
      "Minimum 3.4 cumulative GPA",
      "US Citizen or Permanent Resident"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Official Transcripts", completed: false },
      { id: "doc-2", name: "Case Study on Municipal Debt Financing (1,200 words)", completed: false },
      { id: "doc-3", name: "Academic Letter of Reference", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Direct tuition reduction credit",
    tags: ["Finance", "Public Sector", "Graduate", "Municipal"]
  },
  {
    id: "salk-global-infectious-disease-2027",
    title: "Jonas Salk Epidemiological Research Award",
    provider: "Global Immunology & Infectious Disease Institute",
    amount: 22000,
    amountFormatted: "$22,000",
    deadline: "2027-03-15",
    field: "Healthcare",
    subfield: "Epidemiology, Virology & Global Health",
    educationLevel: "Doctoral",
    region: "Global",
    isFeatured: true,
    minGpa: 3.6,
    matchScore: 98,
    summary: "Supports advanced research into viral surveillance, vaccine distribution equity, and predictive pandemic modeling.",
    eligibilityCriteria: [
      "Doctoral student in epidemiology, infectious disease biology, or biostatistics",
      "Proposed study addressing low-resource containment or genomic tracking",
      "Minimum 3.6 GPA",
      "Letter of institutional institutional review board (IRB) feasibility"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Epidemiological Research Protocol (max 5 pages)", completed: false },
      { id: "doc-2", name: "Department Chair Letter of Support", completed: false },
      { id: "doc-3", name: "Certified Academic Transcripts", completed: false },
      { id: "doc-4", name: "Curriculum Vitae", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Direct university sponsored research account",
    tags: ["Epidemiology", "Healthcare", "Doctoral", "Global"]
  },
  {
    id: "kahn-sustainable-materials-2026",
    title: "Louis Kahn Sustainable Materials Fellowship",
    provider: "Architectural Science Foundation",
    amount: 13000,
    amountFormatted: "$13,000",
    deadline: "2026-11-30",
    field: "Arts",
    subfield: "Architectural Engineering & Material Science",
    educationLevel: "Graduate",
    region: "North America",
    isFeatured: false,
    minGpa: 3.3,
    matchScore: 89,
    summary: "Funds research into low-carbon concrete replacements, mass timber structural analysis, and circular building teardowns.",
    eligibilityCriteria: [
      "Graduate student in architecture, civil engineering, or material science",
      "Demonstrated experience in structural modeling or physical material testing",
      "Minimum 3.3 GPA",
      "Portfolio of physical or digital structural prototypes"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Material Testing Portfolio (PDF format)", completed: false },
      { id: "doc-2", name: "Research Abstract (1,000 words)", completed: false },
      { id: "doc-3", name: "Faculty Advisor Recommendation", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Split between academic tuition and lab testing materials",
    tags: ["Architecture", "Materials", "Sustainability", "Graduate"]
  },
  {
    id: "sen-welfare-economics-2027",
    title: "Amartya Sen Human Capabilities Scholarship",
    provider: "International Development Studies Network",
    amount: 14500,
    amountFormatted: "$14,500",
    deadline: "2027-02-20",
    field: "Public Policy",
    subfield: "Development Economics & Human Rights",
    educationLevel: "Undergraduate",
    region: "Global",
    isFeatured: false,
    minGpa: 3.4,
    matchScore: 92,
    summary: "Recognizes undergraduate scholars analyzing multidimensional poverty indices, clean water access, and gender parity in agrarian regions.",
    eligibilityCriteria: [
      "Junior or senior undergraduate studying economics, political science, or development",
      "Demonstrated qualitative or quantitative analysis of poverty alleviation",
      "Minimum 3.4 cumulative GPA",
      "Open to international and domestic students alike"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Independent Research Essay (1,500 words)", completed: false },
      { id: "doc-2", name: "Official Transcripts", completed: false },
      { id: "doc-3", name: "Academic Reference Letter", completed: false }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Direct stipend check to scholar",
    tags: ["Development", "Economics", "Global", "Undergraduate"]
  },
  {
    id: "hopper-compiler-systems-2027",
    title: "Grace Hopper Systems & Compilers Grant",
    provider: "Open Source Computing Systems Group",
    amount: 16500,
    amountFormatted: "$16,500",
    deadline: "2027-01-05",
    field: "STEM",
    subfield: "Compilers, Operating Systems & Distributed Compute",
    educationLevel: "Undergraduate",
    region: "United States",
    isFeatured: true,
    minGpa: 3.5,
    matchScore: 95,
    summary: "Honors undergraduate engineers contributing to compiler toolchains, memory-safe operating systems, and distributed verification systems.",
    eligibilityCriteria: [
      "Undergraduate computer science, software engineering, or computer engineering student",
      "Completed foundational coursework in operating systems or programming language theory",
      "Minimum cumulative GPA of 3.5",
      "Commitment to publicly document code written during the grant period"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "Code Sample (Compiler or OS project link)", completed: true },
      { id: "doc-2", name: "Systems Architecture Statement (1,000 words)", completed: false },
      { id: "doc-3", name: "Faculty Recommendation Letter", completed: false },
      { id: "doc-4", name: "Academic Transcripts", completed: true }
    ],
    applicationFee: "$0 (Free)",
    disbursementType: "Two semester disbursements directly to student bursar",
    tags: ["Compilers", "Systems", "Undergraduate", "STEM"]
  }
];

// Initial mock tracker state pre-populated across 4 stages
export const INITIAL_TRACKER_ITEMS = [
  {
    id: "track-1",
    scholarshipId: "clean-energy-horizon-2026",
    stage: "in_progress", // 'saved' | 'in_progress' | 'submitted' | 'decision'
    targetDate: "2026-11-20",
    notes: "Need to finish research proposal draft. Dr. Vance agreed to write recommendation.",
    documents: [
      { id: "doc-1", name: "Official Academic Transcript", completed: true },
      { id: "doc-2", name: "Research Proposal (max 1,200 words)", completed: false },
      { id: "doc-3", name: "Two Faculty Letters of Recommendation", completed: false },
      { id: "doc-4", name: "Resume / Curriculum Vitae", completed: true }
    ],
    lastUpdated: "2026-11-06"
  },
  {
    id: "track-2",
    scholarshipId: "ada-lovelace-computing-2026",
    stage: "saved",
    targetDate: "2026-12-01",
    notes: "Review project link requirements. Check if second recommendation is optional.",
    documents: [
      { id: "doc-1", name: "Transcript (unofficial accepted for round 1)", completed: true },
      { id: "doc-2", name: "Personal Statement on Tech Ethics (750 words)", completed: true },
      { id: "doc-3", name: "GitHub Repository or Technical Project Link", completed: true },
      { id: "doc-4", name: "One Letter of Recommendation", completed: false }
    ],
    lastUpdated: "2026-11-05"
  },
  {
    id: "track-3",
    scholarshipId: "vanguard-first-gen-leadership-2027",
    stage: "submitted",
    targetDate: "2026-10-30",
    submissionConfirmation: "GRT-2026-88192",
    notes: "All 4 documents verified. Confirmation received via email. Decisions expected Jan 2027.",
    documents: [
      { id: "doc-1", name: "FAFSA Submission Summary or Financial Aid Award Letter", completed: true },
      { id: "doc-2", name: "First-Generation Narrative Essay (800 words)", completed: true },
      { id: "doc-3", name: "One Letter of Recommendation from Community Leader", completed: true },
      { id: "doc-4", name: "Current Academic Transcript", completed: true }
    ],
    lastUpdated: "2026-10-30"
  },
  {
    id: "track-4",
    scholarshipId: "bauhaus-civic-architecture-2026",
    stage: "decision",
    targetDate: "2026-10-15",
    decisionOutcome: "Awarded ($14,000)",
    notes: "Committee notified award via email on Nov 2nd. Sent thank you letter and bursar ID.",
    documents: [
      { id: "doc-1", name: "Digital Design Portfolio (PDF format, max 15MB)", completed: true },
      { id: "doc-2", name: "Design Philosophy Statement (600 words)", completed: true },
      { id: "doc-3", name: "Academic Transcripts", completed: true },
      { id: "doc-4", name: "Studio Instructor Letter of Support", completed: true }
    ],
    lastUpdated: "2026-11-02"
  }
];

// Distinct filter options for discovery
export const FILTER_OPTIONS = {
  fields: ["All Fields", "STEM", "Humanities", "Healthcare", "Business", "Arts", "Public Policy"],
  educationLevels: ["All Levels", "Undergraduate", "Graduate", "Doctoral"],
  regions: ["All Regions", "United States", "North America", "Global"],
  amountRanges: [
    { label: "All Amounts", min: 0, max: Infinity },
    { label: "Up to $10,000", min: 0, max: 10000 },
    { label: "$10,000 - $15,000", min: 10000, max: 15000 },
    { label: "$15,000+", min: 15000, max: Infinity }
  ],
  sortOptions: [
    { value: "deadline", label: "Deadline: Soonest first" },
    { value: "amount-high", label: "Award Amount: Highest first" },
    { value: "match", label: "Match Score: Highest first" },
    { value: "alphabetical", label: "Title: A to Z" }
  ]
};

