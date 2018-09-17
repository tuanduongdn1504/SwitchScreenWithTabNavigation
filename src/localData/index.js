export const CITY = ['Hà Nội', 'Đà Nẵng', 'Hồ Chí Minh', 'Huế', 'Quang Ninh', 'Thanh Hoá'];
export const SEX = [
  {
    value: 0,
    title: 'Male',
  },
  {
    value: 1,
    title: 'Female',
  },
];

export const APPOINTMENTS_TYPE = [
  {
    value: 0,
    text: 'Đăng ký khám ngay',
  },
  {
    value: 1,
    text: 'Đăng ký trước',
  },
];

export const STATUS = ['Đang đợi', 'Đang khám', 'Đã Khám'];

export const SEARCH_TYPE_DATA = [
  { id: 'tc-ho-so', name: 'Tra cứu hồ sơ', icon: 'ios-clipboard' },
  { id: 'tc-xe-buyt', name: 'Tra cứu xe buýt', icon: 'ios-bus' },
  { id: 'tc-diem-thi', name: 'Tra cứu điểm thi', icon: 'ios-school' },
  {
    id: 'tc-an-toan-thuc-pham',
    name: 'An toàn vệ sinh thực phẩm',
    icon: 'ios-restaurant',
  },
  {
    id: 'tc-tt-hanh-chinh',
    name: 'Tra cứu thủ tục hành chính',
    icon: 'ios-briefcase',
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

export const TYPES = [
  {
    id: 0,
    value: 'Online',
  },
  {
    id: 1,
    value: 'Offline',
  },
];
export const LEVELS = [
  {
    id: 0,
    value: 'Associate degree',
  },
  {
    id: 1,
    value: "Bachelor's degree",
  },
  {
    id: 2,
    value: 'Specialist degree',
  },
  {
    id: 3,
    value: "Master's degree",
  },
  {
    id: 4,
    value: 'Postgraduate study',
  },
];

export const SUBJECTS = [
  {
    id: 0,
    value: 'math',
  },
  {
    id: 1,
    value: 'literality',
  },
  {
    id: 2,
    value: 'English',
  },
  {
    id: 3,
    value: 'chemistry',
  },
  {
    id: 4,
    value: 'physics',
  },
];

export const FILTER = [
  {
    id: 0,
    value: 'Tutor name',
  },
  {
    id: 1,
    value: 'Subject',
  },
  {
    id: 2,
    value: 'ZIP code',
  },
  {
    id: 3,
    value: 'City',
  },
];

export const TUTOR_INFO = {
  levels: LEVELS,
  types: TYPES,
  subjects: SUBJECTS,
  filter: FILTER,
};

export const ROLES = [
  {
    title: 'Student',
    id: 'student',
  },
  {
    title: 'Tutor',
    id: 'tutor',
  },
];

export const DUMMY_SUBJECTS = [
  {
    name: 'Subjects',
    id: 'Subjects',
  },
  {
    name: 'Mathematics',
    id: 'Mathematics',
  },
  {
    name: 'Chemistry',
    id: 'Chemistry',
  },
  {
    name: 'Physics',
    id: 'Physics',
  },
  {
    name: 'Statistics',
    id: 'Statistics',
  },
  {
    name: 'Finance',
    id: 'Finance',
  },
  {
    name: 'Accounting',
    id: 'Accounting',
  },
  {
    name: 'Economics',
    id: 'Economics',
  },
  {
    name: 'English',
    id: 'English',
  },
  {
    name: 'Spanish',
    id: 'Spanish',
  },
  {
    name: 'Business',
    id: 'Business',
  },
  {
    name: 'History',
    id: 'History',
  },
  {
    name: 'Entrepreneurship',
    id: 'Entrepreneurship',
  },
  {
    name: 'Health',
    id: 'Health',
  },
  {
    name: 'Biology',
    id: 'Biology',
  },
];
