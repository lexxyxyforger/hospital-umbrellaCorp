export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  rating: number;
  reviewCount: number;
  experience: number;
  hospital: string;
  education: string;
  bio: string;
  schedule: DoctorSchedule[];
  price: number;
  isPopular: boolean;
  isRecommended: boolean;
  languages: string[];
}

export interface DoctorSchedule {
  day: string;
  times: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  date: string;
  time: string;
  complaint: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  notes?: string;
}

export interface MedicalService {
  id: string;
  slug: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  preparation: string[];
  includes: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorPhoto: string;
  thumbnail: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
}

export interface Review {
  id: string;
  patientName: string;
  patientPhoto: string;
  doctorId: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: "male" | "female";
  address: string;
  photo?: string;
  bloodType?: string;
  allergies?: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "appointment" | "health" | "promo" | "system";
  isRead: boolean;
  createdAt: string;
}

export const SPECIALTIES = [
  "Semua Spesialis",
  "Kardiologi",
  "Neurologi",
  "Ortopedi",
  "Pediatri",
  "Dermatologi",
  "Ophthalmologi",
  "Psikiatri",
  "Onkologi",
  "Urologi",
  "Ginekologi",
  "Penyakit Dalam",
  "Bedah Umum",
  "THT",
  "Gigi & Mulut",
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-001",
    name: "dr. Albert Wesker, Sp.N",
    specialty: "Neurologi",
    photo: "/dr-001.jpg",
    rating: 4.9,
    reviewCount: 512,
    experience: 20,
    hospital: "RS Umbrella Corp",
    education: "Raccoon City Medical University — Spesialis Saraf & Virologi Eksperimental",
    bio: "Peneliti utama Umbrella Corp dan mantan kepala divisi virologi. Dikenal dengan kecerdasan di atas rata-rata dan ketenangan dingin dalam menangani kasus neurologis paling kompleks. Pionir riset virus-T pada sistem saraf pusat.",
    schedule: [
      { day: "Senin", times: ["08:00", "09:00", "10:00", "14:00", "15:00"] },
      { day: "Rabu", times: ["08:00", "09:00", "10:00"] },
      { day: "Jumat", times: ["13:00", "14:00", "15:00", "16:00"] },
    ],
    price: 450000,
    isPopular: true,
    isRecommended: true,
    languages: ["Indonesia", "English", "German"],
  },
  {
    id: "dr-002",
    name: "dr. William Birkin, Sp.GK",
    specialty: "Onkologi",
    photo: "/dr-002.jpg",
    rating: 4.8,
    reviewCount: 389,
    experience: 18,
    hospital: "RS Umbrella Corp",
    education: "Raccoon City Medical University — Spesialis Genetika & Onkologi Molekuler",
    bio: "Kepala peneliti fasilitas NEST Umbrella Corp dan penemu virus-G. Keahliannya dalam onkologi genetika dan rekayasa sel tidak tertandingi di dunia medis. Penerima penghargaan riset biomedis bergengsi tingkat internasional.",
    schedule: [
      { day: "Selasa", times: ["08:00", "09:00", "10:00", "11:00"] },
      { day: "Kamis", times: ["08:00", "09:00", "10:00", "11:00"] },
      { day: "Sabtu", times: ["08:00", "09:00", "10:00"] },
    ],
    price: 400000,
    isPopular: true,
    isRecommended: true,
    languages: ["Indonesia", "English"],
  },
  {
    id: "dr-003",
    name: "dr. Alexia Ashford, Sp.OG",
    specialty: "Ginekologi",
    photo: "/dr-003.webp",
    rating: 4.9,
    reviewCount: 274,
    experience: 16,
    hospital: "RS Umbrella Corp",
    education: "Antarctic Research Institute — Spesialis Kandungan & Biologi Molekuler",
    bio: "Prodigy brilian keluarga Ashford dan kepala peneliti fasilitas Antarktika Umbrella Corp. Lulus dengan predikat tertinggi pada usia 17 tahun. Ahli terkemuka dalam ginekologi eksperimental dan riset kromosom manusia.",
    schedule: [
      { day: "Senin", times: ["11:00", "12:00", "13:00"] },
      { day: "Rabu", times: ["11:00", "12:00", "13:00"] },
      { day: "Jumat", times: ["08:00", "09:00", "10:00"] },
    ],
    price: 380000,
    isPopular: false,
    isRecommended: true,
    languages: ["Indonesia", "English", "French"],
  },
  {
    id: "dr-004",
    name: "dr. James Marcus, Sp.MK",
    specialty: "Onkologi",
    photo: "/dr-004.jpg",
    rating: 4.7,
    reviewCount: 198,
    experience: 30,
    hospital: "RS Umbrella Corp",
    education: "Raccoon City Medical University — Pendiri Divisi Riset Virus Progenitor",
    bio: "Salah satu pendiri Umbrella Corp dan penemu virus Progenitor. Dengan pengalaman riset lebih dari tiga dekade, dr. Marcus adalah otoritas tertinggi dalam bidang virologi onkologi dan modifikasi sel tingkat lanjut.",
    schedule: [
      { day: "Selasa", times: ["13:00", "14:00", "15:00", "16:00"] },
      { day: "Kamis", times: ["13:00", "14:00", "15:00", "16:00"] },
      { day: "Sabtu", times: ["10:00", "11:00", "12:00"] },
    ],
    price: 500000,
    isPopular: true,
    isRecommended: false,
    languages: ["Indonesia", "English", "Latin"],
  },
  {
    id: "dr-005",
    name: "dr. Annette Birkin, Sp.PD",
    specialty: "Penyakit Dalam",
    photo: "/dr-005.jpg",
    rating: 4.8,
    reviewCount: 301,
    experience: 15,
    hospital: "RS Umbrella Corp",
    education: "Raccoon City Medical University — Spesialis Penyakit Dalam & Imunologi",
    bio: "Peneliti senior fasilitas NEST Umbrella Corp. Spesialis imunologi yang sangat berdedikasi pada riset vaksin anti-virus. Tangguh dan metodis dalam setiap pendekatan klinis, dikenal dengan disiplin kerja yang tak tertandingi.",
    schedule: [
      { day: "Senin", times: ["08:00", "09:00", "10:00"] },
      { day: "Rabu", times: ["08:00", "09:00", "10:00", "11:00"] },
      { day: "Kamis", times: ["14:00", "15:00", "16:00"] },
    ],
    price: 320000,
    isPopular: false,
    isRecommended: true,
    languages: ["Indonesia", "English"],
  },
  {
    id: "dr-006",
    name: "dr. Morpheus D. Duvall, Sp.KK",
    specialty: "Dermatologi",
    photo: "/dr-006.webp",
    rating: 4.6,
    reviewCount: 167,
    experience: 12,
    hospital: "RS Umbrella Corp",
    education: "European Medical Institute — Spesialis Kulit & Mutasi Jaringan",
    bio: "Mantan peneliti Umbrella Corp divisi senjata biologis yang kini berfokus pada dermatologi klinis. Keahliannya dalam menangani kelainan kulit akibat paparan agen kimia dan biologis sangat langka di dunia medis.",
    schedule: [
      { day: "Selasa", times: ["08:00", "09:00", "10:00", "11:00"] },
      { day: "Jumat", times: ["08:00", "09:00", "10:00"] },
    ],
    price: 290000,
    isPopular: false,
    isRecommended: false,
    languages: ["Indonesia", "English", "French"],
  },
  {
    id: "dr-007",
    name: "dr. Brandon Bailey, Sp.A",
    specialty: "Pediatri",
    photo: "/dr-007.webp",
    rating: 4.8,
    reviewCount: 245,
    experience: 14,
    hospital: "RS Umbrella Corp",
    education: "Ndipaya Research Institute — Spesialis Anak & Imunologi Pediatrik",
    bio: "Asisten pribadi dr. James Marcus dan mantan direktur pertama Ndipaya Institute. Spesialis anak yang peduli terhadap kesehatan generasi penerus, dengan fokus imunisasi anak dan penyakit langka pada masa pertumbuhan.",
    schedule: [
      { day: "Senin", times: ["09:00", "10:00", "11:00"] },
      { day: "Rabu", times: ["09:00", "10:00", "11:00"] },
      { day: "Sabtu", times: ["08:00", "09:00", "10:00"] },
    ],
    price: 270000,
    isPopular: true,
    isRecommended: true,
    languages: ["Indonesia", "English"],
  },
  {
    id: "dr-008",
    name: "dr. Sergei Vladimir, Sp.OT",
    specialty: "Ortopedi",
    photo: "/dr-008.webp",
    rating: 4.7,
    reviewCount: 312,
    experience: 22,
    hospital: "RS Umbrella Corp",
    education: "Soviet Military Medical Academy — Spesialis Ortopedi & Bedah Trauma",
    bio: "Mantan kolonel Soviet yang bergabung dengan Umbrella Corp sebagai kepala cabang Rusia. Memimpin divisi ortopedi dengan disiplin tinggi. Ahli dalam penanganan trauma tulang berat dan rekonstruksi sendi pasca-ledakan.",
    schedule: [
      { day: "Selasa", times: ["10:00", "11:00", "14:00", "15:00"] },
      { day: "Kamis", times: ["10:00", "11:00", "14:00", "15:00"] },
      { day: "Jumat", times: ["09:00", "10:00", "11:00"] },
    ],
    price: 350000,
    isPopular: true,
    isRecommended: true,
    languages: ["Indonesia", "English", "Russian"],
  },
  {
    id: "dr-009",
    name: "dr. Christine Henri, Sp.THT",
    specialty: "THT",
    photo: "/dr-009.webp",
    rating: 4.9,
    reviewCount: 189,
    experience: 17,
    hospital: "RS Umbrella Corp",
    education: "Paris Medical University — Kepala R&D Umbrella Europe, Spesialis THT",
    bio: "Kepala Manajer Riset & Pengembangan cabang Eropa Umbrella Corp. Spesialis THT kelas dunia dengan teknik operasi presisi tinggi pada telinga tengah dan penanganan gangguan pendengaran akibat gelombang suara ekstrem.",
    schedule: [
      { day: "Senin", times: ["13:00", "14:00", "15:00", "16:00"] },
      { day: "Rabu", times: ["13:00", "14:00", "15:00"] },
      { day: "Jumat", times: ["10:00", "11:00", "12:00"] },
    ],
    price: 310000,
    isPopular: false,
    isRecommended: true,
    languages: ["Indonesia", "English", "French"],
  },
];

export const SERVICES: MedicalService[] = [
  {
    id: "svc-001",
    slug: "medical-checkup",
    name: "Paket Medical Checkup",
    icon: "stethoscope",
    category: "Checkup",
    description: "Pemeriksaan kesehatan komprehensif berstandar protokol Umbrella Corp untuk mengetahui kondisi kesehatan Anda secara menyeluruh.",
    price: 500000,
    duration: "3-4 jam",
    preparation: ["Puasa 8-10 jam sebelum pemeriksaan", "Tidak merokok 24 jam sebelumnya", "Tidur cukup malam sebelumnya"],
    includes: ["Pemeriksaan fisik lengkap", "Lab darah rutin", "EKG", "Rontgen dada", "USG abdomen", "Konsultasi dokter"],
  },
  {
    id: "svc-002",
    slug: "vaksinasi",
    name: "Paket Vaksinasi",
    icon: "syringe",
    category: "Vaksin",
    description: "Layanan vaksinasi lengkap dengan formula vaksin eksklusif Umbrella Corp untuk perlindungan optimal terhadap berbagai agen biohazard.",
    price: 150000,
    duration: "30-60 menit",
    preparation: ["Kondisi kesehatan baik", "Tidak sedang demam", "Membawa kartu vaksin sebelumnya"],
    includes: ["Konsultasi pra-vaksinasi", "Vaksinasi", "Observasi 30 menit", "Kartu vaksin"],
  },
  {
    id: "svc-003",
    slug: "igd-24-jam",
    name: "IGD 24 Jam",
    icon: "ambulance",
    category: "Darurat",
    description: "Unit gawat darurat Umbrella Corp beroperasi penuh 24 jam dengan protokol respons cepat dan tenaga medis elite siaga sepanjang waktu.",
    price: 0,
    duration: "Sesuai kebutuhan",
    preparation: [],
    includes: ["Penanganan darurat", "Stabilisasi kondisi", "Konsultasi spesialis on-call", "Observasi"],
  },
  {
    id: "svc-004",
    slug: "kardiologi",
    name: "Poli Kardiologi",
    icon: "heart",
    category: "Spesialis",
    description: "Layanan diagnosis dan pengobatan penyakit jantung dengan teknologi terkini milik Umbrella Corp.",
    price: 250000,
    duration: "45-60 menit",
    preparation: ["Bawa rekam medis sebelumnya", "Daftar obat yang dikonsumsi"],
    includes: ["Konsultasi dokter spesialis", "EKG", "Ekokardiografi", "Resep obat"],
  },
  {
    id: "svc-005",
    slug: "laboratorium",
    name: "Laboratorium Klinik",
    icon: "flask",
    category: "Lab",
    description: "Pemeriksaan laboratorium berteknologi tinggi dengan akurasi setara fasilitas riset NEST Umbrella Corp.",
    price: 75000,
    duration: "30 menit - 2 hari",
    preparation: ["Puasa untuk tes tertentu", "Hindari olahraga berat"],
    includes: ["Pengambilan sampel", "Pemeriksaan", "Hasil digital", "Interpretasi"],
  },
  {
    id: "svc-006",
    slug: "radiologi",
    name: "Radiologi & Imaging",
    icon: "scan",
    category: "Diagnostik",
    description: "Pencitraan medis canggih dengan perangkat imaging generasi terbaru dari divisi teknologi Umbrella Corp.",
    price: 200000,
    duration: "30-90 menit",
    preparation: ["Lepas perhiasan logam", "Beritahu jika hamil", "Puasa untuk CT tertentu"],
    includes: ["Pemeriksaan imaging", "Bacaan radiologi", "Laporan digital", "CD hasil"],
  },
];

export const ARTICLES: Article[] = [
  {
    id: "art-001",
    slug: "riset-virus-t-sistem-saraf",
    title: "Dampak Virus-T pada Sistem Saraf Pusat: Temuan Terbaru Umbrella Corp",
    excerpt: "Tim riset dr. Wesker merilis laporan eksklusif tentang mekanisme infeksi virus-T pada neuron dan cara mitigasinya secara klinis.",
    content: "",
    category: "Neurologi",
    author: "dr. Albert Wesker",
    authorPhoto: "/dr-001.jpg",
    thumbnail: "/thumbnails/art-001.jpg",
    publishedAt: "2024-12-15",
    readTime: 6,
    tags: ["neurologi", "virus-t", "riset", "umbrella"],
  },
  {
    id: "art-002",
    slug: "rekayasa-genetika-onkologi",
    title: "Terobosan Virus-G: Implikasi pada Terapi Onkologi Masa Depan",
    excerpt: "dr. William Birkin membahas potensi modifikasi sel kanker menggunakan platform G-Virus dalam jurnal medis internal Umbrella Corp.",
    content: "",
    category: "Onkologi",
    author: "dr. William Birkin",
    authorPhoto: "/dr-002.jpg",
    thumbnail: "/thumbnails/art-002.jpg",
    publishedAt: "2024-12-10",
    readTime: 8,
    tags: ["onkologi", "genetika", "virus-g", "riset"],
  },
  {
    id: "art-003",
    slug: "imunisasi-agen-biohazard",
    title: "Protokol Imunisasi Darurat: Panduan Resmi Umbrella Corp",
    excerpt: "Panduan lengkap dari divisi R&D Umbrella Corp mengenai prosedur imunisasi pasca-paparan agen biohazard kelas-A.",
    content: "",
    category: "Pediatri",
    author: "dr. Brandon Bailey",
    authorPhoto: "/dr-007.webp",
    thumbnail: "/thumbnails/art-003.jpg",
    publishedAt: "2024-12-05",
    readTime: 5,
    tags: ["imunisasi", "biohazard", "protokol", "darurat"],
  },
  {
    id: "art-004",
    slug: "mutasi-kulit-paparan-kimia",
    title: "Penanganan Mutasi Dermal Akibat Paparan Agen Kimia Eksperimental",
    excerpt: "dr. Morpheus D. Duvall mengulas pendekatan klinis terbaru dalam menangani perubahan jaringan kulit pasca-paparan senyawa T-Virus.",
    content: "",
    category: "Dermatologi",
    author: "dr. Morpheus D. Duvall",
    authorPhoto: "/dr-006.webp",
    thumbnail: "/thumbnails/art-004.jpg",
    publishedAt: "2024-11-28",
    readTime: 7,
    tags: ["dermatologi", "mutasi", "kimia", "umbrella"],
  },
];

export const REVIEWS: Review[] = [
  {
    id: "rev-001",
    patientName: "Oswell E. Spencer",
    patientPhoto: "/patients/rev-001.jpg",
    doctorId: "dr-001",
    rating: 5,
    comment: "dr. Wesker menangani kondisi neurologis saya dengan kecerdasan yang tidak tertandingi. Setiap langkah diagnosis dilakukan dengan presisi sempurna. Layanan terbaik Umbrella Corp.",
    date: "2024-12-10",
    isVerified: true,
  },
  {
    id: "rev-002",
    patientName: "Sherry Birkin",
    patientPhoto: "/patients/rev-002.jpg",
    doctorId: "dr-002",
    rating: 5,
    comment: "dr. Birkin adalah yang terbaik di bidangnya. Penanganan onkologinya revolusioner dan hasilnya melampaui ekspektasi semua pihak.",
    date: "2024-12-08",
    isVerified: true,
  },
  {
    id: "rev-003",
    patientName: "Alfred Ashford",
    patientPhoto: "/patients/rev-003.jpg",
    doctorId: "dr-003",
    rating: 5,
    comment: "dr. Alexia adalah seorang jenius yang tidak perlu diragukan lagi. Penanganannya sangat metodis dan hasilnya luar biasa.",
    date: "2024-12-05",
    isVerified: true,
  },
  {
    id: "rev-004",
    patientName: "Vincent Goldman",
    patientPhoto: "/patients/rev-004.jpg",
    doctorId: "dr-004",
    rating: 5,
    comment: "dr. Marcus adalah legenda hidup Umbrella Corp. Konsultasi dengan beliau membuka wawasan yang tidak bisa didapat di tempat manapun di dunia.",
    date: "2024-11-30",
    isVerified: true,
  },
  {
    id: "rev-005",
    patientName: "Claire Redfield",
    patientPhoto: "/patients/rev-005.jpg",
    doctorId: "dr-007",
    rating: 4,
    comment: "dr. Bailey sangat sabar menjelaskan kondisi kesehatan dengan bahasa yang mudah dipahami. Fasilitas RS Umbrella Corp memang kelas satu.",
    date: "2024-11-25",
    isVerified: true,
  },
  {
    id: "rev-006",
    patientName: "Nikolai Zinoviev",
    patientPhoto: "/patients/rev-006.jpg",
    doctorId: "dr-008",
    rating: 5,
    comment: "dr. Sergei menangani cedera tulang saya dengan efisiensi militer yang luar biasa. Pemulihan pasca operasi berjalan jauh lebih cepat dari perkiraan.",
    date: "2024-11-20",
    isVerified: true,
  },
];

export const LS_KEYS = {
  FAVORITES: "rs_umbrella_favorites",
  BOOKINGS: "rs_umbrella_bookings",
  PATIENT: "rs_umbrella_patient",
  DARK_MODE: "rs_umbrella_dark_mode",
  READ_ARTICLES: "rs_umbrella_read_articles",
  NOTIFICATIONS: "rs_umbrella_notifications",
};

export function getFromLS<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setToLS(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("LocalStorage error:", e);
  }
}