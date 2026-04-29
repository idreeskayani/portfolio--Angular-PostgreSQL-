export const PORTFOLIO = {
  name: 'Muhammad Idrees Kayani',
  title: 'Mobile & Web Application Developer',
  location: 'Islamabad, Pakistan',
  email: 'idreeskayani420@gmail.com',
  phone: '+92 347 5945299',
  github: 'https://github.com/idreeskayani',
  linkedin: 'https://linkedin.com/in/idrees-kayani-5b4050301',
  profilePic: 'assets/imagepp.png',
  resumeUrl: 'assets/Resume_Idrees.pdf',

  aboutParagraphs: [
    'I am a passionate and detail-oriented Mobile & Web Application Developer with a strong focus on building real-world solutions using modern technologies like React Native, React.js, and Node.js.',
    'My journey in development started with web technologies and gradually evolved into creating full-scale mobile applications that solve practical problems. I enjoy transforming ideas into functional, user-friendly products with clean architecture and scalable code.',
    'I have hands-on experience in developing production-level applications, integrating APIs, managing real-time data, and optimizing performance. My approach to development is centered around code quality, reusability, and seamless user experience.'
  ],

  interests: [
    'Building high-performance mobile applications',
    'Designing clean and scalable architectures',
    'Working on real-time systems and user-centric applications',
    'Contributing to impactful and challenging projects in the tech industry'
  ],

  education: {
    degree: 'Bachelor of Computer Science',
    institution: 'International Islamic University, Islamabad',
    period: '2021 – 2025'
  },

  experience: [
    {
      title: 'Mobile Application Developer',
      company: 'UExel Solutions Pvt Ltd',
      period: 'Mar 2025 – Present',
      highlights: [
        'Developed high-performance applications using React Native with a focus on smooth UI and fast performance',
        'Built scalable and reusable components, improving development efficiency and maintainability',
        'Integrated REST APIs and third-party services to enable dynamic data handling',
        'Improved application performance through debugging, optimization, and efficient state management',
        'Collaborated with teams to deliver reliable and production-ready applications'
      ]
    },
    {
      title: 'Frontend Developer Intern',
      company: 'Zekab Pvt Ltd',
      period: 'Aug 2022 – Sep 2022',
      highlights: [
        'Developed a HubSpot clone using HTML, CSS, Bootstrap, and JavaScript',
        'Focused on creating responsive and user-friendly interfaces',
        'Implemented interactive features using JavaScript to enhance user experience',
        'Worked on improving existing web pages and maintaining design consistency',
        'Strengthened my foundation in web development and modern UI/UX practices'
      ]
    }
  ],

  mobileProjects: [
    {
      name: 'Kalash Kitchen POS',
      type: 'Restaurant Management System · POS App',
      description: 'A complete Point of Sale mobile application built for restaurant staff to efficiently manage orders, kitchen workflows, and payments in a fast-paced environment. Designed exclusively for internal use, focusing on speed, accuracy, and operational efficiency.',
      features: [
        'Full order management system — create, update, and track orders in real time',
        'Order lifecycle tracking: Preparing → Ready → Served',
        'Kitchen workflow management with food prep and serving time tracking',
        'Stripe payment gateway integration for secure digital transactions',
        'Real-time updates and notifications for staff order progress',
        'Redux Toolkit (Slices) for efficient state management',
        'Authentication & authorization for secure staff access',
        'Email notifications via Nodemailer',
        'PostgreSQL database for structured and reliable data storage'
      ],
      tech: ['React Native', 'Redux Toolkit', 'Node.js', 'Express', 'PostgreSQL', 'Stripe', 'Nodemailer']
    },
    {
      name: 'Pharmacy Management System',
      type: 'POS & Inventory Solution',
      description: 'A complete Point of Sale and inventory management mobile application designed to streamline pharmacy operations, manage medicines, and handle daily sales efficiently. Built for real-world business usage with a focus on accuracy, role-based control, and smooth workflow management.',
      features: [
        'Full POS system for medicine sales, billing, and transactions',
        'Multi-role access control (Admin, Staff) for permission management',
        'Inventory management to track medicines, stock levels, and availability',
        'Add, update, and manage products (medicines) with ease',
        'Efficient order processing and billing workflows',
        'Authentication & authorization for secure system access',
        'Backend API integration for users, inventory, and transactions',
        'Performance-optimized for continuous daily business usage'
      ],
      tech: ['React Native', 'Node.js', 'Express', 'PostgreSQL', 'Redux', 'REST APIs']
    },
    {
      name: 'ParkSense',
      type: 'Smart Parking Solution · Final Year Project',
      description: 'Solves the everyday problem of wrongly parked vehicles using QR-based identification and anonymous communication between reporter and vehicle owner.',
      features: [
        'QR-based vehicle identification system',
        'Real-time anonymous chat for privacy',
        'Masked calling feature to hide phone numbers',
        'Firebase for real-time messaging & notifications',
        'Image and video proof sharing',
        'Intuitive and responsive UI'
      ],
      tech: ['React Native', 'Firebase', 'Node.js', 'Express']
    },
    {
      name: 'DTS-GB',
      type: 'Government · Inspection & Document Management System',
      description: 'Production-level government application for managing inspections, permits, and official documents with complex workflows and multiple user roles. Built for official government use with a strong focus on security and data integrity.',
      features: [
        'Swagger-based REST API integration',
        'Document upload, view & management (PDFs & images)',
        'Role-based access control (Admin, Inspector, User)',
        'FLAG_SECURE for enhanced government-grade data security',
        'Optimized navigation and error handling',
        'Smooth performance with large datasets'
      ],
      tech: ['React Native', 'JavaScript', 'REST APIs', 'WebView']
    },
    {
      name: 'SOS Emergency Alert App',
      type: 'Emergency Response System',
      description: 'Provides instant help during emergency situations by minimizing response time with one-tap alerts and real-time location tracking.',
      features: [
        'One-tap SOS alert feature',
        'Real-time location tracking',
        'Simple and fast UI for critical situations',
        'Emergency forms for first-aid requests',
        'Device permissions management'
      ],
      tech: ['React Native']
    }
  ],

  webProjects: [
    {
      name: 'TNI Enterprises',
      type: 'Business Web Application',
      description: 'A business web application developed to improve enterprise workflows and operational efficiency with clean architecture and scalable components.',
      features: [
        'Reusable and scalable UI components',
        'API integration for business data management',
        'Performance-optimized design and structure',
        'Clean architecture for long-term maintainability'
      ],
      tech: ['React.js', 'REST APIs']
    },
    {
      name: 'E-Commerce Website',
      type: 'MERN Stack',
      description: 'Full-stack eCommerce application simulating a real online shopping experience with product browsing, cart, and order management.',
      features: [
        'Product browsing, selection, and purchasing',
        'Responsive UI across all devices',
        'Backend logic for users, products, and orders',
        'Modern development practices for scalability'
      ],
      tech: ['MongoDB', 'Express', 'React.js', 'Node.js']
    },
    {
      name: 'Frontend Projects & Clones',
      type: 'UI Development',
      description: 'Multiple UI-based projects and clones built to sharpen frontend skills and practice responsive design.',
      features: [
        'HubSpot clone with responsive and interactive UI',
        'LMS and landing page designs',
        'Improved user experience and layout design',
        'Cross-browser compatibility'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'React.js']
    }
  ],

  skillCategories: [
    {
      category: 'Mobile Development',
      icon: '📱',
      skills: ['React Native', 'JavaScript (ES6+)', 'Redux']
    },
    {
      category: 'Web Development',
      icon: '🌐',
      skills: ['React.js', 'HTML', 'CSS', 'JavaScript', 'Bootstrap']
    },
    {
      category: 'Backend & Databases',
      icon: '🗄️',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'Firebase']
    },
    {
      category: 'Tools & Technologies',
      icon: '🛠️',
      skills: ['Git & GitHub', 'REST APIs', 'Swagger', 'Debugging & Optimization', 'TestFlight']
    }
  ],

  strengths: [
    'Build real-world mobile applications from scratch',
    'Strong focus on clean, reusable, and scalable code',
    'Excellent problem-solving and debugging skills',
    'Experience with API integration and real-time systems',
    'Passion for creating user-friendly, high-performance applications'
  ]
};
