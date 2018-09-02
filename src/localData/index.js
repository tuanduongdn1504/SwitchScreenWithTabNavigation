export const CITY = ['Hà Nội', 'Đà Nẵng', 'Hồ Chí Minh', 'Huế', 'Quang Ninh', 'Thanh Hoá'];
export const SEX = [
  {
    value: 0,
    title: 'Nam',
  },
  {
    value: 1,
    title: 'Nữ',
  },
];

export const DUMMY_USER_DATA = [
  {
    id: 'a',
    name: 'Đoàn Ánh',
    avatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    address: 'Ngũ Hành Sơn, TP Đà Nẵng',
    phoneNumber: '+84128947211',
    birthday: '23/4/1988',
    lastBooking: {
      date: '9/8/2018 9:10 AM',
      des: 'Bị viêm Xoang mãng tính đang theo dõi...',
    },
    bloodGroup: 'A',
  },
  {
    id: 'b',
    name: 'Nguyễn Thanh Minh Hiếu',
    avatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    address: 'Hải Châu, TP Đà Nẵng',
    phoneNumber: '+8412204422',
    birthday: '12/6/1986',
    lastBooking: {
      date: '9/8/2018 9:10 AM',
      des: 'Bị mỡ trong máu đang theo dõi...',
    },
    bloodGroup: 'B',
  },
  {
    id: 'c',
    name: 'Nguyễn Văn A',
    avatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    address: 'Ba Đình, TP Hà Nội',
    phoneNumber: '+843423122233',
    birthday: '12/6/1980',
    lastBooking: {
      date: '9/8/2018 9:10 AM',
      des: 'Bị Tiểu Đường mãng tính đang theo dõi...',
    },
    bloodGroup: 'AB',
  },
  {
    id: 'd',
    name: 'Lê thị B',
    avatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    address: 'Hà Đong, TP Hà Nội',
    phoneNumber: '+8422222333',
    birthday: '23/4/1999',
    lastBooking: {
      date: '9/8/2018 9:10 AM',
      des: 'Mắc bệnh ung thư đang theo dõi...',
    },
    bloodGroup: 'O',
  },
];

export const DUMMY_USER_HISTORY = [
  {
    id: 'a',
    userId: 'a',
    doctor: 'Doctor A',
    hospital: 'Bệnh viện ABC',
    date: '9/8/2018 9:10 AM',
    remindDate: '20/8/2018 9:10 AM',
    content: 'Nghẹt mũi, khó thở, khó ngủ, nhức đầu',
    result: 'Bị viêm Xoang mãng tính đang theo dõi...',
    medicines: [
      {
        id: 'medicines1',
        name: 'ABC',
        quantity: 3,
        unit: 'gói',
        using: '1 gói sau khi ăn sáng',
      },
      {
        id: 'medicines2',
        name: 'thuốc giảm đau Aspirin',
        quantity: 10,
        unit: 'Viên',
        using: '1 viên sau khi ăn sáng và chiều',
      },
    ],
  },
  {
    id: 'b',
    userId: 'a',
    doctor: 'Doctor A',
    hospital: 'Bệnh viện ABC',
    date: '1/8/2018 9:10 AM',
    remindDate: '9/8/2018 9:10 AM',
    content: 'Nghẹt mũi, khó thở, khó ngủ, nhức đầu',
    result: 'Bị viêm Xoang mãng tính đang theo dõi...',
    medicines: [
      {
        id: 'medicines1',
        name: 'ABC',
        quantity: 3,
        unit: 'gói',
        using: '1 gói sau khi ăn sáng',
      },
      {
        id: 'medicines2',
        name: 'thuốc giảm đau Aspirin',
        quantity: 10,
        unit: 'Viên',
        using: '1 viên sau khi ăn sáng và chiều',
      },
    ],
  },
  {
    id: 'c',
    userId: 'a',
    doctor: 'Doctor A',
    hospital: 'Bệnh viện ABC',
    date: '26/7/2018 9:10 AM',
    remindDate: '1/8/2018 9:10 AM',
    content: 'Nghẹt mũi, khó thở, khó ngủ, nhức đầu',
    result: 'Bị viêm Xoang mãng tính đang theo dõi...',
    medicines: [
      {
        id: 'medicines1',
        name: 'ABC',
        quantity: 3,
        unit: 'gói',
        using: '1 gói sau khi ăn sáng',
      },
      {
        id: 'medicines2',
        name: 'thuốc giảm đau Aspirin',
        quantity: 10,
        unit: 'Viên',
        using: '1 viên sau khi ăn sáng và chiều',
      },
    ],
  },
  {
    id: 'd',
    userId: 'a',
    doctor: 'Doctor A',
    hospital: 'Bệnh viện ABC',
    date: '19/7/2018 9:10 AM',
    remindDate: '26/7/2018 9:10 AM',
    content: 'Nghẹt mũi, khó thở, khó ngủ, nhức đầu',
    result: 'Bị viêm Xoang mãng tính đang theo dõi...',
    medicines: [
      {
        id: 'medicines1',
        name: 'ABC',
        quantity: 3,
        unit: 'gói',
        using: '1 gói sau khi ăn sáng',
      },
      {
        id: 'medicines2',
        name: 'thuốc giảm đau Aspirin',
        quantity: 10,
        unit: 'Viên',
        using: '1 viên sau khi ăn sáng và chiều',
      },
    ],
  },
  {
    id: 'e',
    userId: 'a',
    doctor: 'Doctor A',
    hospital: 'Bệnh viện ABC',
    date: '10/7/2018 9:10 AM',
    remindDate: '19/7/2018 9:10 AM',
    content: 'Nghẹt mũi, khó thở, khó ngủ, nhức đầu',
    result: 'Bị viêm Xoang mãng tính đang theo dõi...',
    medicines: [
      {
        id: 'medicines1',
        name: 'ABC',
        quantity: 3,
        unit: 'gói',
        using: '1 gói sau khi ăn sáng',
      },
      {
        id: 'medicines2',
        name: 'thuốc giảm đau Aspirin',
        quantity: 10,
        unit: 'Viên',
        using: '1 viên sau khi ăn sáng và chiều',
      },
    ],
  },
  {
    id: 'a',
    userId: 'a',
    doctor: 'Doctor A',
    hospital: 'Bệnh viện ABC',
    date: '1/7/2018 9:10 AM',
    remindDate: '10/7/2018 9:10 AM',
    content: 'Nghẹt mũi, khó thở, khó ngủ, nhức đầu',
    result: 'Bị viêm Xoang mãng tính đang theo dõi...',
    medicines: [
      {
        id: 'medicines1',
        name: 'ABC',
        quantity: 3,
        unit: 'gói',
        using: '1 gói sau khi ăn sáng',
      },
      {
        id: 'medicines2',
        name: 'thuốc giảm đau Aspirin',
        quantity: 10,
        unit: 'Viên',
        using: '1 viên sau khi ăn sáng và chiều',
      },
    ],
  },
];
