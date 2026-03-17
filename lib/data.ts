// ============= TYPES =============

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

// ============= MOCK DATA =============

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
    // RE0 — Rebecca Chambers
    id: "dr-001",
    name: "dr. Rebecca Chambers, Sp.JP",
    specialty: "Kardiologi",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    rating: 4.9,
    reviewCount: 245,
    experience: 12,
    hospital: "RS Umbrella Corp",
    education: "Raccoon City Medical University - Spesialis Jantung",
    bio: "Mantan anggota S.T.A.R.S. Bravo Team yang kini berdedikasi di bidang kardiologi. Dikenal sangat teliti dan berani dalam menangani kasus-kasus jantung yang kompleks.",
    schedule: [
      { day: "Senin", times: ["08:00", "09:00", "10:00", "14:00", "15:00"] },
      { day: "Rabu", times: ["08:00", "09:00", "10:00"] },
      { day: "Jumat", times: ["13:00", "14:00", "15:00", "16:00"] },
    ],
    price: 250000,
    isPopular: true,
    isRecommended: true,
    languages: ["Indonesia", "English"],
  },
  {
    // RE1 — Jill Valentine
    id: "dr-002",
    name: "dr. Jill Valentine, Sp.A",
    specialty: "Pediatri",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    rating: 4.8,
    reviewCount: 312,
    experience: 8,
    hospital: "RS Umbrella Corp",
    education: "Raccoon City Medical University - Spesialis Anak",
    bio: "Master of Unlocking sekaligus master of pediatri. dr. Jill dikenal sabar dan cermat dalam menangani pasien anak, terutama kasus infeksi virus langka.",
    schedule: [
      { day: "Selasa", times: ["08:00", "09:00", "10:00", "11:00"] },
      { day: "Kamis", times: ["08:00", "09:00", "10:00", "11:00"] },
      { day: "Sabtu", times: ["08:00", "09:00", "10:00"] },
    ],
    price: 200000,
    isPopular: true,
    isRecommended: true,
    languages: ["Indonesia", "English", "French"],
  },
  {
    // RE2 — Leon S. Kennedy
    id: "dr-003",
    name: "dr. Leon S. Kennedy, Sp.N",
    specialty: "Neurologi",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
    rating: 4.7,
    reviewCount: 189,
    experience: 15,
    hospital: "RS Umbrella Corp",
    education: "Raccoon City Medical University - Spesialis Saraf",
    bio: "Spesialis neurologi yang pernah menangani wabah virus T di Raccoon City. Keahliannya dalam mendeteksi infeksi parasit saraf tidak tertandingi.",
    schedule: [
      { day: "Senin", times: ["11:00", "12:00", "13:00"] },
      { day: "Rabu", times: ["11:00", "12:00", "13:00"] },
      { day: "Jumat", times: ["08:00", "09:00", "10:00"] },
    ],
    price: 300000,
    isPopular: false,
    isRecommended: true,
    languages: ["Indonesia", "English", "Spanish"],
  },
  {
    // RE3 — Carlos Oliveira
    id: "dr-004",
    name: "dr. Carlos Oliveira, Sp.KK",
    specialty: "Dermatologi",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    rating: 4.9,
    reviewCount: 428,
    experience: 10,
    hospital: "RS Umbrella Corp",
    education: "Raccoon City Medical University - Spesialis Kulit",
    bio: "Mantan tentara bayaran yang beralih ke dermatologi setelah menyadari pentingnya kesehatan kulit pasca-infeksi virus. Ahli dalam penanganan mutasi kulit dan luka kimia.",
    schedule: [
      { day: "Selasa", times: ["13:00", "14:00", "15:00", "16:00"] },
      { day: "Kamis", times: ["13:00", "14:00", "15:00", "16:00"] },
      { day: "Sabtu", times: ["10:00", "11:00", "12:00"] },
    ],
    price: 280000,
    isPopular: true,
    isRecommended: false,
    languages: ["Indonesia", "English", "Portuguese"],
  },
  {
    // RE4 — Ada Wong
    id: "dr-005",
    name: "dr. Ada Wong, Sp.OG",
    specialty: "Ginekologi",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80",
    rating: 4.8,
    reviewCount: 267,
    experience: 14,
    hospital: "RS Umbrella Corp",
    education: "Shanghai Medical University - Spesialis Kandungan",
    bio: "Dokter misterius dengan keahlian ginekologi kelas dunia. Pernah meneliti efek Las Plagas terhadap sistem reproduksi. Sangat profesional dan terampil.",
    schedule: [
      { day: "Senin", times: ["08:00", "09:00", "10:00"] },
      { day: "Rabu", times: ["08:00", "09:00", "10:00", "11:00"] },
      { day: "Kamis", times: ["14:00", "15:00", "16:00"] },
    ],
    price: 275000,
    isPopular: false,
    isRecommended: true,
    languages: ["Indonesia", "English", "Mandarin"],
  },
  {
    // RE5 — Sheva Alomar
    id: "dr-006",
    name: "dr. Sheva Alomar, Sp.M",
    specialty: "Ophthalmologi",
    photo: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&q=80",
    rating: 4.7,
    reviewCount: 156,
    experience: 9,
    hospital: "RS Umbrella Corp",
    education: "African Medical University - Spesialis Mata",
    bio: "Spesialis mata berpengalaman yang meneliti dampak virus Uroboros pada penglihatan. Berdedikasi tinggi dalam memberikan pelayanan kepada masyarakat.",
    schedule: [
      { day: "Selasa", times: ["08:00", "09:00", "10:00", "11:00"] },
      { day: "Jumat", times: ["08:00", "09:00", "10:00"] },
    ],
    price: 220000,
    isPopular: false,
    isRecommended: false,
    languages: ["Indonesia", "English", "Swahili"],
  },
  {
    // RE6 — Helena Harper
    id: "dr-007",
    name: "dr. Helena Harper, Sp.PD",
    specialty: "Penyakit Dalam",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    rating: 4.8,
    reviewCount: 203,
    experience: 11,
    hospital: "RS Umbrella Corp",
    education: "Tall Oaks Medical University - Spesialis Penyakit Dalam",
    bio: "Spesialis penyakit dalam yang pernah menangani wabah virus C di Tall Oaks. Sangat teliti dalam diagnosis dan penanganan penyakit infeksi kompleks.",
    schedule: [
      { day: "Senin", times: ["09:00", "10:00", "11:00"] },
      { day: "Rabu", times: ["09:00", "10:00", "11:00"] },
      { day: "Sabtu", times: ["08:00", "09:00", "10:00"] },
    ],
    price: 260000,
    isPopular: true,
    isRecommended: true,
    languages: ["Indonesia", "English"],
  },
  {
    // RE7 — Ethan Winters
    id: "dr-008",
    name: "dr. Ethan Winters, Sp.OT",
    specialty: "Ortopedi",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80",
    rating: 4.9,
    reviewCount: 334,
    experience: 7,
    hospital: "RS Umbrella Corp",
    education: "Louisiana Medical University - Spesialis Ortopedi",
    bio: "Dokter ortopedi yang terkenal dengan kemampuan regenerasi jaringan yang luar biasa. Ahli dalam bedah rekonstruksi tulang dan sendi, terutama kasus trauma berat.",
    schedule: [
      { day: "Selasa", times: ["10:00", "11:00", "14:00", "15:00"] },
      { day: "Kamis", times: ["10:00", "11:00", "14:00", "15:00"] },
      { day: "Jumat", times: ["09:00", "10:00", "11:00"] },
    ],
    price: 320000,
    isPopular: true,
    isRecommended: true,
    languages: ["Indonesia", "English"],
  },
  {
    // RE8 — Lady Dimitrescu (Alcina)
    id: "dr-009",
    name: "dr. Alcina Dimitrescu, Sp.THT",
    specialty: "THT",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
    rating: 4.6,
    reviewCount: 178,
    experience: 20,
    hospital: "RS Umbrella Corp",
    education: "Eastern European Medical University - Spesialis THT",
    bio: "Dokter THT berpengalaman 20 tahun dengan tinggi badan dan wibawa yang memukau. Ahli dalam penanganan kelainan kongenital tenggorokan dan infeksi telinga kronis.",
    schedule: [
      { day: "Senin", times: ["13:00", "14:00", "15:00", "16:00"] },
      { day: "Rabu", times: ["13:00", "14:00", "15:00"] },
      { day: "Jumat", times: ["10:00", "11:00", "12:00"] },
    ],
    price: 290000,
    isPopular: false,
    isRecommended: true,
    languages: ["Indonesia", "English", "Romanian"],
  },
];

export const SERVICES: MedicalService[] = [
  {
    id: "svc-001",
    slug: "medical-checkup",
    name: "Paket Medical Checkup",
    icon: "stethoscope",
    category: "Checkup",
    description: "Pemeriksaan kesehatan komprehensif untuk mengetahui kondisi kesehatan Anda secara menyeluruh.",
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
    description: "Layanan vaksinasi lengkap untuk anak, remaja, dan dewasa dengan vaksin berkualitas tinggi.",
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
    description: "Unit gawat darurat yang beroperasi 24 jam dengan tenaga medis profesional dan peralatan lengkap.",
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
    description: "Layanan diagnosis dan pengobatan penyakit jantung dengan teknologi terkini.",
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
    description: "Pemeriksaan laboratorium lengkap dengan hasil akurat dan cepat.",
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
    description: "Pemeriksaan pencitraan medis termasuk rontgen, CT-scan, dan MRI.",
    price: 200000,
    duration: "30-90 menit",
    preparation: ["Lepas perhiasan logam", "Beritahu jika hamil", "Puasa untuk CT tertentu"],
    includes: ["Pemeriksaan imaging", "Bacaan radiologi", "Laporan digital", "CD hasil"],
  },
];

export const ARTICLES: Article[] = [
  {
    id: "art-001",
    slug: "menjaga-kesehatan-jantung",
    title: "7 Cara Efektif Menjaga Kesehatan Jantung di Usia 40-an",
    excerpt: "Penyakit jantung masih menjadi penyebab kematian utama di Indonesia. Pelajari cara-cara efektif untuk menjaga kesehatan jantung Anda.",
    content: "",
    category: "Kardiologi",
    author: "dr. Rebecca Chambers",
    authorPhoto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&q=80",
    thumbnail: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
    publishedAt: "2024-12-15",
    readTime: 5,
    tags: ["jantung", "kardiovaskular", "kesehatan"],
  },
  {
    id: "art-002",
    slug: "panduan-mpmikanan-sehat",
    title: "Panduan Lengkap MPASI untuk Bayi 6-12 Bulan",
    excerpt: "Memulai MPASI adalah momen penting dalam tumbuh kembang bayi. Berikut panduan lengkap yang perlu Anda ketahui.",
    content: "",
    category: "Pediatri",
    author: "dr. Jill Valentine",
    authorPhoto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80",
    thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    publishedAt: "2024-12-10",
    readTime: 7,
    tags: ["mpasi", "bayi", "nutrisi", "anak"],
  },
  {
    id: "art-003",
    slug: "mengenal-gejala-stroke",
    title: "Kenali Gejala Stroke Sejak Dini dengan Metode FAST",
    excerpt: "Stroke adalah kondisi darurat medis yang membutuhkan penanganan segera. Pelajari cara mengenali gejalanya dengan metode FAST.",
    content: "",
    category: "Neurologi",
    author: "dr. Leon S. Kennedy",
    authorPhoto: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&q=80",
    thumbnail: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
    publishedAt: "2024-12-05",
    readTime: 4,
    tags: ["stroke", "neurologi", "darurat"],
  },
  {
    id: "art-004",
    slug: "kulit-sehat-alami",
    title: "Rahasia Kulit Sehat Alami: Tips dari Dokter Kulit",
    excerpt: "Kulit sehat bukan hanya soal penampilan, tapi juga cerminan kesehatan tubuh secara keseluruhan. Simak tips dari dokter kulit.",
    content: "",
    category: "Dermatologi",
    author: "dr. Carlos Oliveira",
    authorPhoto: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&q=80",
    thumbnail: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
    publishedAt: "2024-11-28",
    readTime: 6,
    tags: ["kulit", "skincare", "dermatologi"],
  },
];

export const REVIEWS: Review[] = [
  {
    id: "rev-001",
    patientName: "Siti Nurhaliza",
    patientPhoto: "https://randomuser.me/api/portraits/women/1.jpg",
    doctorId: "dr-001",
    rating: 5,
    comment: "dr. Rebecca sangat profesional dan sabar menjelaskan kondisi jantung saya. Beliau memberikan penanganan yang tepat dan saya merasa jauh lebih baik setelah berkonsultasi.",
    date: "2024-12-10",
    isVerified: true,
  },
  {
    id: "rev-002",
    patientName: "Budi Hartono",
    patientPhoto: "https://randomuser.me/api/portraits/men/2.jpg",
    doctorId: "dr-002",
    rating: 5,
    comment: "dr. Jill adalah dokter anak terbaik yang pernah saya temui. Beliau sangat ramah kepada anak saya dan penjelasannya mudah dipahami oleh orang tua.",
    date: "2024-12-08",
    isVerified: true,
  },
  {
    id: "rev-003",
    patientName: "Dewi Rahayu",
    patientPhoto: "https://randomuser.me/api/portraits/women/3.jpg",
    doctorId: "dr-004",
    rating: 5,
    comment: "Pelayanan sangat memuaskan. dr. Carlos sangat teliti dalam memeriksa kondisi kulit saya dan memberikan solusi yang tepat. Hasilnya pun luar biasa!",
    date: "2024-12-05",
    isVerified: true,
  },
  {
    id: "rev-004",
    patientName: "Ahmad Fauzi",
    patientPhoto: "https://randomuser.me/api/portraits/men/4.jpg",
    doctorId: "dr-003",
    rating: 4,
    comment: "dr. Leon sangat berpengalaman. Penjelasannya detail dan mudah dipahami. Fasilitas RS Umbrella Corp juga sangat baik.",
    date: "2024-11-30",
    isVerified: true,
  },
  {
    id: "rev-005",
    patientName: "Rina Susanti",
    patientPhoto: "https://randomuser.me/api/portraits/women/5.jpg",
    doctorId: "dr-008",
    rating: 5,
    comment: "dr. Ethan luar biasa! Kemampuannya dalam bedah rekonstruksi tulang tidak ada duanya. Pasca operasi saya pulih jauh lebih cepat dari perkiraan.",
    date: "2024-11-25",
    isVerified: true,
  },
  {
    id: "rev-006",
    patientName: "Doni Kusuma",
    patientPhoto: "https://randomuser.me/api/portraits/men/6.jpg",
    doctorId: "dr-007",
    rating: 5,
    comment: "dr. Helena sangat cermat dalam mendiagnosis penyakit saya. Penanganannya cepat dan tepat, saya sangat berterima kasih.",
    date: "2024-11-20",
    isVerified: true,
  },
];

// LocalStorage helpers
export const LS_KEYS = {
  FAVORITES: "rs_sehat_favorites",
  BOOKINGS: "rs_sehat_bookings",
  PATIENT: "rs_sehat_patient",
  DARK_MODE: "rs_sehat_dark_mode",
  READ_ARTICLES: "rs_sehat_read_articles",
  NOTIFICATIONS: "rs_sehat_notifications",
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