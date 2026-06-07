// Mock data for all HMS modules

export type Role = "admin" | "doctor" | "nurse" | "receptionist";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  bloodType: string;
  phone: string;
  email: string;
  address: string;
  condition: string;
  status: "Active" | "Discharged" | "Critical" | "Scheduled";
  admittedDate: string;
  doctor: string;
  room: string;
  avatar: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  phone: string;
  email: string;
  status: "Available" | "Busy" | "Off Duty";
  experience: number;
  patients: number;
  rating: number;
  avatar: string;
  schedule: string;
}

export interface Appointment {
  id: string;
  patient: string;
  patientAvatar: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  type: "Consultation" | "Follow-up" | "Emergency" | "Surgery" | "Check-up";
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  notes: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  totalStaff: number;
  totalPatients: number;
  beds: number;
  bedsAvailable: number;
  icon: string;
  color: string;
}

export const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "Sarah Johnson",
    age: 34,
    gender: "Female",
    bloodType: "O+",
    phone: "+1 (555) 234-5678",
    email: "sarah.johnson@email.com",
    address: "123 Maple St, New York, NY",
    condition: "Hypertension",
    status: "Active",
    admittedDate: "2024-05-20",
    doctor: "Dr. Michael Chen",
    room: "204A",
    avatar: "SJ",
  },
  {
    id: "P002",
    name: "Robert Martinez",
    age: 58,
    gender: "Male",
    bloodType: "A-",
    phone: "+1 (555) 345-6789",
    email: "r.martinez@email.com",
    address: "456 Oak Ave, Los Angeles, CA",
    condition: "Diabetes Type II",
    status: "Critical",
    admittedDate: "2024-05-18",
    doctor: "Dr. Emily Clarke",
    room: "ICU-3",
    avatar: "RM",
  },
  {
    id: "P003",
    name: "Emily Watson",
    age: 27,
    gender: "Female",
    bloodType: "B+",
    phone: "+1 (555) 456-7890",
    email: "emily.w@email.com",
    address: "789 Pine Rd, Chicago, IL",
    condition: "Fracture - Left Arm",
    status: "Scheduled",
    admittedDate: "2024-06-01",
    doctor: "Dr. James Wilson",
    room: "308B",
    avatar: "EW",
  },
  {
    id: "P004",
    name: "David Thompson",
    age: 45,
    gender: "Male",
    bloodType: "AB+",
    phone: "+1 (555) 567-8901",
    email: "d.thompson@email.com",
    address: "321 Elm St, Houston, TX",
    condition: "Appendicitis",
    status: "Active",
    admittedDate: "2024-05-25",
    doctor: "Dr. Lisa Park",
    room: "112C",
    avatar: "DT",
  },
  {
    id: "P005",
    name: "Maria Garcia",
    age: 62,
    gender: "Female",
    bloodType: "O-",
    phone: "+1 (555) 678-9012",
    email: "m.garcia@email.com",
    address: "654 Birch Ln, Phoenix, AZ",
    condition: "Cardiac Arrhythmia",
    status: "Active",
    admittedDate: "2024-05-22",
    doctor: "Dr. Michael Chen",
    room: "Cardio-5",
    avatar: "MG",
  },
  {
    id: "P006",
    name: "James Lee",
    age: 39,
    gender: "Male",
    bloodType: "B-",
    phone: "+1 (555) 789-0123",
    email: "james.lee@email.com",
    address: "987 Cedar Ave, San Antonio, TX",
    condition: "Pneumonia",
    status: "Discharged",
    admittedDate: "2024-05-10",
    doctor: "Dr. Emily Clarke",
    room: "—",
    avatar: "JL",
  },
  {
    id: "P007",
    name: "Aisha Patel",
    age: 31,
    gender: "Female",
    bloodType: "A+",
    phone: "+1 (555) 890-1234",
    email: "a.patel@email.com",
    address: "159 Walnut Dr, Philadelphia, PA",
    condition: "Asthma",
    status: "Active",
    admittedDate: "2024-05-28",
    doctor: "Dr. James Wilson",
    room: "217A",
    avatar: "AP",
  },
  {
    id: "P008",
    name: "Carlos Rivera",
    age: 55,
    gender: "Male",
    bloodType: "O+",
    phone: "+1 (555) 901-2345",
    email: "c.rivera@email.com",
    address: "753 Spruce Blvd, San Diego, CA",
    condition: "Kidney Stones",
    status: "Scheduled",
    admittedDate: "2024-06-03",
    doctor: "Dr. Lisa Park",
    room: "—",
    avatar: "CR",
  },
];

export const mockDoctors: Doctor[] = [
  {
    id: "D001",
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    department: "Cardiology",
    phone: "+1 (555) 100-0001",
    email: "m.chen@hospital.com",
    status: "Available",
    experience: 15,
    patients: 42,
    rating: 4.9,
    avatar: "MC",
    schedule: "Mon–Fri, 08:00–16:00",
  },
  {
    id: "D002",
    name: "Dr. Emily Clarke",
    specialty: "Internal Medicine",
    department: "General Medicine",
    phone: "+1 (555) 100-0002",
    email: "e.clarke@hospital.com",
    status: "Busy",
    experience: 10,
    patients: 38,
    rating: 4.8,
    avatar: "EC",
    schedule: "Mon–Fri, 09:00–17:00",
  },
  {
    id: "D003",
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    department: "Orthopedics",
    phone: "+1 (555) 100-0003",
    email: "j.wilson@hospital.com",
    status: "Available",
    experience: 20,
    patients: 55,
    rating: 4.7,
    avatar: "JW",
    schedule: "Tue–Sat, 07:00–15:00",
  },
  {
    id: "D004",
    name: "Dr. Lisa Park",
    specialty: "Surgery",
    department: "Surgery",
    phone: "+1 (555) 100-0004",
    email: "l.park@hospital.com",
    status: "Off Duty",
    experience: 12,
    patients: 29,
    rating: 4.9,
    avatar: "LP",
    schedule: "Mon–Thu, 06:00–14:00",
  },
  {
    id: "D005",
    name: "Dr. Ahmed Hassan",
    specialty: "Neurology",
    department: "Neurology",
    phone: "+1 (555) 100-0005",
    email: "a.hassan@hospital.com",
    status: "Available",
    experience: 18,
    patients: 33,
    rating: 4.8,
    avatar: "AH",
    schedule: "Mon–Fri, 08:00–16:00",
  },
  {
    id: "D006",
    name: "Dr. Sofia Rossi",
    specialty: "Pediatrics",
    department: "Pediatrics",
    phone: "+1 (555) 100-0006",
    email: "s.rossi@hospital.com",
    status: "Busy",
    experience: 8,
    patients: 61,
    rating: 4.9,
    avatar: "SR",
    schedule: "Mon–Fri, 09:00–18:00",
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: "A001",
    patient: "Sarah Johnson",
    patientAvatar: "SJ",
    doctor: "Dr. Michael Chen",
    department: "Cardiology",
    date: "2024-06-06",
    time: "09:00 AM",
    type: "Follow-up",
    status: "Confirmed",
    notes: "Blood pressure monitoring",
  },
  {
    id: "A002",
    patient: "David Thompson",
    patientAvatar: "DT",
    doctor: "Dr. Lisa Park",
    department: "Surgery",
    date: "2024-06-06",
    time: "10:30 AM",
    type: "Consultation",
    status: "Pending",
    notes: "Pre-op evaluation",
  },
  {
    id: "A003",
    patient: "Emily Watson",
    patientAvatar: "EW",
    doctor: "Dr. James Wilson",
    department: "Orthopedics",
    date: "2024-06-06",
    time: "11:00 AM",
    type: "Check-up",
    status: "Confirmed",
    notes: "Cast removal check",
  },
  {
    id: "A004",
    patient: "Robert Martinez",
    patientAvatar: "RM",
    doctor: "Dr. Emily Clarke",
    department: "General Medicine",
    date: "2024-06-06",
    time: "02:00 PM",
    type: "Emergency",
    status: "Confirmed",
    notes: "Blood sugar spike",
  },
  {
    id: "A005",
    patient: "Aisha Patel",
    patientAvatar: "AP",
    doctor: "Dr. James Wilson",
    department: "Orthopedics",
    date: "2024-06-07",
    time: "09:30 AM",
    type: "Follow-up",
    status: "Pending",
    notes: "Inhaler technique review",
  },
  {
    id: "A006",
    patient: "Carlos Rivera",
    patientAvatar: "CR",
    doctor: "Dr. Lisa Park",
    department: "Surgery",
    date: "2024-06-07",
    time: "11:30 AM",
    type: "Surgery",
    status: "Confirmed",
    notes: "Ureteroscopy procedure",
  },
  {
    id: "A007",
    patient: "Maria Garcia",
    patientAvatar: "MG",
    doctor: "Dr. Michael Chen",
    department: "Cardiology",
    date: "2024-06-07",
    time: "03:00 PM",
    type: "Consultation",
    status: "Cancelled",
    notes: "ECG interpretation",
  },
  {
    id: "A008",
    patient: "James Lee",
    patientAvatar: "JL",
    doctor: "Dr. Emily Clarke",
    department: "General Medicine",
    date: "2024-06-08",
    time: "10:00 AM",
    type: "Check-up",
    status: "Pending",
    notes: "Post-discharge review",
  },
];

export const mockDepartments: Department[] = [
  {
    id: "DEP01",
    name: "Cardiology",
    head: "Dr. Michael Chen",
    totalStaff: 24,
    totalPatients: 42,
    beds: 30,
    bedsAvailable: 8,
    icon: "❤️",
    color: "hsl(0, 84%, 60%)",
  },
  {
    id: "DEP02",
    name: "General Medicine",
    head: "Dr. Emily Clarke",
    totalStaff: 35,
    totalPatients: 68,
    beds: 50,
    bedsAvailable: 12,
    icon: "🩺",
    color: "hsl(210, 100%, 50%)",
  },
  {
    id: "DEP03",
    name: "Orthopedics",
    head: "Dr. James Wilson",
    totalStaff: 18,
    totalPatients: 35,
    beds: 25,
    bedsAvailable: 5,
    icon: "🦴",
    color: "hsl(38, 95%, 55%)",
  },
  {
    id: "DEP04",
    name: "Surgery",
    head: "Dr. Lisa Park",
    totalStaff: 20,
    totalPatients: 19,
    beds: 15,
    bedsAvailable: 3,
    icon: "🔬",
    color: "hsl(155, 70%, 45%)",
  },
  {
    id: "DEP05",
    name: "Neurology",
    head: "Dr. Ahmed Hassan",
    totalStaff: 16,
    totalPatients: 27,
    beds: 20,
    bedsAvailable: 6,
    icon: "🧠",
    color: "hsl(270, 70%, 60%)",
  },
  {
    id: "DEP06",
    name: "Pediatrics",
    head: "Dr. Sofia Rossi",
    totalStaff: 28,
    totalPatients: 55,
    beds: 40,
    bedsAvailable: 11,
    icon: "👶",
    color: "hsl(320, 70%, 60%)",
  },
];

export const dashboardStats = {
  totalPatients: 1248,
  totalDoctors: 86,
  totalAppointments: 324,
  availableBeds: 45,
  patientsTrend: +12.5,
  doctorsTrend: +3.2,
  appointmentsTrend: +8.1,
  bedsTrend: -5.4,
};

export const weeklyAdmissions = [
  { day: "Mon", admissions: 18, discharges: 14 },
  { day: "Tue", admissions: 22, discharges: 19 },
  { day: "Wed", admissions: 15, discharges: 17 },
  { day: "Thu", admissions: 28, discharges: 22 },
  { day: "Fri", admissions: 24, discharges: 20 },
  { day: "Sat", admissions: 12, discharges: 15 },
  { day: "Sun", admissions: 9, discharges: 11 },
];
