export const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "AGE", uid: "age", sortable: true},
  {name: "ROLE", uid: "role", sortable: true},
  {name: "TEAM", uid: "team"},
  {name: "EMAIL", uid: "email"},
  {name: "STATUS", uid: "status", sortable: true},
];

export const statusOptions = [
  {name: "Open", uid: "open"},
  {name: "Progress", uid: "progress"},
  {name: "Close", uid: "close"},
];

export const perangkatOptions = [
  {name: "Available", uid: "available"},
  {name: "Not-Available", uid: "not-available"},
];

export const kategoriPeminjaman = [
  {name: "Peminjaman", uid: "peminjaman"},
  {name: "Backup", uid: "backup"},
]

export const kategoriOptions = [
  {name: "KOM", uid: "KOM"},
  {name: "INF", uid: "INF"},
  {name: "PRN", uid: "PRN"},
];

export const CategoryHadrware = [
  {key: "pc", label: "PC"},
  {key: "laptop", label: "Laptop"},
  {key: "printer", label: "Printer"},
  {key: "projector", label: "Projector"},
]

export const Inventory = [
  {
    serial: 'SN1234',
    cluster: 'SP01',
    type: 'NB-D',
    user: 'GUD',
  },
  {
    serial: 'SN1235',
    cluster: 'SP01',
    type: 'NB-D',
    user: 'GUD',
  },
  {
    serial: 'SN1236',
    cluster: 'SP01',
    type: 'NB-D',
    user: 'DIS',
  },
]

export const inventory = [
  {
    id: 1,
    sn: '5CG2173B5Y',
    csm: 'SM VI - SP 09A',
    perangkat: 'KOM',
    type: 'NBB',
    merek: 'HP 245 G8',
    use: 'NPS',
    status: 'available'
  },
  {
    id: 2,
    sn: 'C02DW4RSQ05G',
    csm: 'SM VI - SP 01B',
    perangkat: 'KOM',
    type: 'NBM-A',
    merek: 'MACBOOK PRO',
    use: 'GUD',
    status: 'not-available'
  }
]

export const peminjaman = [
  {
    id: 1,
    tiket: 'IS-PRO-009123',
    nik: 990011,
    name: 'John Doe',
    phone: '081214594538',
    status: 'close',
    kategori: ['PC', 'LAPTOP'],
    tanggal_peminjaman: '2024-06-15',
    tanggal_pengembalian: '2024-06-16',
    catatan: 'Peminjaman perangkat peruntukan untuk auction.',
    list_item: [
      {
        id: 1,
        perangkat: 'PC',
        merek: 'HP',
        serial: 'ABC123',
        kelengkapan: 'Kabel Power, Mouse, Keyboard'
      },
      {
        id: 1,
        perangkat: 'LAPTOP',
        merek: 'Asus',
        serial: 'ABC124',
        kelengkapan: 'Tas, Charger'
      }
    ]
  },
  {
    id: 2,
    tiket: 'IS-PRO-009124',
    nik: 990022,
    name: 'John Doe',
    phone: '081214594538',
    status: 'progress',
    kategori: ['PC'],
    tanggal_peminjaman: '2024-06-15',
    tanggal_pengembalian: '2024-06-16',
    catatan: 'Peminjaman perangkat peruntukan untuk auction.',
    list_item: [
      {
        id: 1,
        perangkat: 'PC',
        merek: 'HP',
        serial: 'ABC123',
        kelengkapan: 'Kabel Power, Mouse, Keyboard'
      },
    ]
  },
  {
    id: 3,
    tiket: 'IS-PC-009123',
    nik: 990033,
    name: 'John Doe',
    phone: '081214594538',
    status: 'open',
    kategori: ['LAPTOP'],
    tanggal_peminjaman: '2024-06-15',
    tanggal_pengembalian: '2024-06-16',
    catatan: 'Peminjaman perangkat peruntukan untuk auction.',
    list_item: [
      {
        id: 1,
        perangkat: 'LAPTOP',
        merek: 'Asus',
        serial: 'ABC124',
        kelengkapan: 'Tas, Charger'
      }
    ]
  }
]

export const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Sr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "C.M.",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "S. Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    name: "Brian Kim",
    role: "P. Manager",
    team: "Management",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "brian.kim@example.com",
    status: "Active",
  },
  {
    id: 7,
    name: "Michael Hunt",
    role: "Designer",
    team: "Design",
    status: "paused",
    age: "27",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    email: "michael.hunt@example.com",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    role: "HR Manager",
    team: "HR",
    status: "active",
    age: "31",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
    email: "samantha.brooks@example.com",
  },
  {
    id: 9,
    name: "Frank Harrison",
    role: "F. Manager",
    team: "Finance",
    status: "vacation",
    age: "33",
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "frank.harrison@example.com",
  },
  {
    id: 10,
    name: "Emma Adams",
    role: "Ops Manager",
    team: "Operations",
    status: "active",
    age: "35",
    avatar: "https://i.pravatar.cc/150?img=5",
    email: "emma.adams@example.com",
  },
  {
    id: 11,
    name: "Brandon Stevens",
    role: "Jr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?img=8",
    email: "brandon.stevens@example.com",
  },
  {
    id: 12,
    name: "Megan Richards",
    role: "P. Manager",
    team: "Product",
    status: "paused",
    age: "28",
    avatar: "https://i.pravatar.cc/150?img=10",
    email: "megan.richards@example.com",
  },
  {
    id: 13,
    name: "Oliver Scott",
    role: "S. Manager",
    team: "Security",
    status: "active",
    age: "37",
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "oliver.scott@example.com",
  },
  {
    id: 14,
    name: "Grace Allen",
    role: "M. Specialist",
    team: "Marketing",
    status: "active",
    age: "30",
    avatar: "https://i.pravatar.cc/150?img=16",
    email: "grace.allen@example.com",
  },
  {
    id: 15,
    name: "Noah Carter",
    role: "IT Specialist",
    team: "I. Technology",
    status: "paused",
    age: "31",
    avatar: "https://i.pravatar.cc/150?img=15",
    email: "noah.carter@example.com",
  },
  {
    id: 16,
    name: "Ava Perez",
    role: "Manager",
    team: "Sales",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?img=20",
    email: "ava.perez@example.com",
  },
  {
    id: 17,
    name: "Liam Johnson",
    role: "Data Analyst",
    team: "Analysis",
    status: "active",
    age: "28",
    avatar: "https://i.pravatar.cc/150?img=33",
    email: "liam.johnson@example.com",
  },
  {
    id: 18,
    name: "Sophia Taylor",
    role: "QA Analyst",
    team: "Testing",
    status: "active",
    age: "27",
    avatar: "https://i.pravatar.cc/150?img=29",
    email: "sophia.taylor@example.com",
  },
  {
    id: 19,
    name: "Lucas Harris",
    role: "Administrator",
    team: "Information Technology",
    status: "paused",
    age: "32",
    avatar: "https://i.pravatar.cc/150?img=50",
    email: "lucas.harris@example.com",
  },
  {
    id: 20,
    name: "Mia Robinson",
    role: "Coordinator",
    team: "Operations",
    status: "active",
    age: "26",
    avatar: "https://i.pravatar.cc/150?img=45",
    email: "mia.robinson@example.com",
  },
];