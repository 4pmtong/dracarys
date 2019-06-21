// import mockjs from 'mockjs';

// export default {
//   // Home:  api/getEvents
//   'GET /api/events': {
//     code: 200,
//     message: '',
//     data: [{
//       eid: '111',
//       name: 'hackathon',
//       image_url: 'https://cdn-images-1.medium.com/max/800/1*dE4F_nf8P60V2baaaOxgLQ.jpeg',
//       abstract: 'A design sprint-like event in which computer programmers and others involved in software development, including graphic designers, interface designers, project managers, and others, often including domain experts, collaborate intensively on software projects.',
//       intro: 'A hackathon (also known as a hack day, hackfest or codefest) is a design sprint-like event in which computer programmers and others involved in software development, including graphic designers, interface designers, project managers, and others, often including domain experts, collaborate intensively on software projects.The goal of a hackathon is to create usable software or hardware with the goal of creating a functioning product by the end of the event.[1] Hackathons tend to have a specific focus, which can include the programming language used, the operating system, an application, an API, or the subject and the demographic group of the programmers. In other cases, there is no restriction on the type of software being created.',
//       event_start_time: 1561082400000, // 2019-06-21 10:00:00
//       event_end_time: 1561212000000, // 2019-06-22 22:00:00
//       apply_start_time: 1558281600000, // 2019-05-20 00:00:00
//       apply_end_time: 1558368000000, // 2019-05-21 00:00:00
//       quota: 20,
//       lucky_quota: 5,
//       num_of_register: 20,
//       num_of_in_queue: 20,
//       venue: 'Galaxis Office',
//       contact: 'Chen Tong',
//       contact_email: 'tong.chen@shopee.com',
//       event_state: 2,
//       keyword: 'Tech',
//     }, {
//       eid: '222',
//       name: 'hackathon',
//       image_url: 'https://cdn-images-1.medium.com/max/800/1*dE4F_nf8P60V2baaaOxgLQ.jpeg',
//       abstract: 'A design sprint-like event in which computer programmers and others involved in software development, including graphic designers, interface designers, project managers, and others, often including domain experts, collaborate intensively on software projects.',
//       intro: 'A hackathon (also known as a hack day, hackfest or codefest) is a design sprint-like event in which computer programmers and others involved in software development, including graphic designers, interface designers, project managers, and others, often including domain experts, collaborate intensively on software projects.The goal of a hackathon is to create usable software or hardware with the goal of creating a functioning product by the end of the event.[1] Hackathons tend to have a specific focus, which can include the programming language used, the operating system, an application, an API, or the subject and the demographic group of the programmers. In other cases, there is no restriction on the type of software being created.',
//       event_start_time: 1559318400000, // 2019-06-01 00:00:00
//       event_end_time: 1559404800000, // 2019-06-02 00:00:00
//       apply_start_time: 1556726400000, // 2019-05-02 00:00:00
//       apply_end_time: 1557417600000, // 2019-05-10 00:00:00
//       quota: 10,
//       lucky_quota: 5,
//       num_of_register: 8,
//       num_of_in_queue: 0,
//       venue: 'Galaxis Office',
//       contact: 'Chen Tong',
//       contact_email: 'tong.chen@shopee.com',
//       event_state: 1,
//       keyword: 'Tech',
//     }, {
//       eid: '333',
//       name: 'hackathon',
//       image_url: 'https://cdn-images-1.medium.com/max/800/1*dE4F_nf8P60V2baaaOxgLQ.jpeg',
//       abstract: 'A design sprint-like event in which computer programmers and others involved in software development, including graphic designers, interface designers, project managers, and others, often including domain experts, collaborate intensively on software projects.',
//       intro: 'A hackathon (also known as a hack day, hackfest or codefest) is a design sprint-like event in which computer programmers and others involved in software development, including graphic designers, interface designers, project managers, and others, often including domain experts, collaborate intensively on software projects.The goal of a hackathon is to create usable software or hardware with the goal of creating a functioning product by the end of the event.[1] Hackathons tend to have a specific focus, which can include the programming language used, the operating system, an application, an API, or the subject and the demographic group of the programmers. In other cases, there is no restriction on the type of software being created.',
//       event_start_time: 1561082400000, // 2019-06-21 10:00:00
//       event_end_time: 1561212000000, // 2019-06-22 22:00:00
//       apply_start_time: 1558281600000, // 2019-05-20 00:00:00
//       apply_end_time: 1558368000000, // 2019-05-21 00:00:00
//       quota: 20,
//       lucky_quota: 5,
//       num_of_register: 20,
//       num_of_in_queue: 20,
//       venue: 'Galaxis Office',
//       contact: 'Chen Tong',
//       contact_email: 'tong.chen@shopee.com',
//       event_state: 2,
//       keyword: 'Tech',
//     }, {
//       eid: '444',
//       name: 'hackathon',
//       image_url: 'https://cdn-images-1.medium.com/max/800/1*dE4F_nf8P60V2baaaOxgLQ.jpeg',
//       abstract: 'A design sprint-like event in which computer programmers and others involved in software development, including graphic designers, interface designers, project managers, and others, often including domain experts, collaborate intensively on software projects.',
//       intro: 'A hackathon (also known as a hack day, hackfest or codefest) is a design sprint-like event in which computer programmers and others involved in software development, including graphic designers, interface designers, project managers, and others, often including domain experts, collaborate intensively on software projects.The goal of a hackathon is to create usable software or hardware with the goal of creating a functioning product by the end of the event.[1] Hackathons tend to have a specific focus, which can include the programming language used, the operating system, an application, an API, or the subject and the demographic group of the programmers. In other cases, there is no restriction on the type of software being created.',
//       event_start_time: 1561082400000, // 2019-06-21 10:00:00
//       event_end_time: 1561212000000, // 2019-06-22 22:00:00
//       apply_start_time: 1558281600000, // 2019-05-20 00:00:00
//       apply_end_time: 1558368000000, // 2019-05-21 00:00:00
//       quota: 20,
//       lucky_quota: 5,
//       num_of_register: 20,
//       num_of_in_queue: 20,
//       venue: 'Galaxis Office',
//       contact: 'Chen Tong',
//       contact_email: 'tong.chen@shopee.com',
//       event_state: 2,
//       keyword: 'Techasdfasdfadfafasfadfd',
//     }, {
//       eid: '555',
//       name: 'hackathon',
//       image_url: 'https://cdn-images-1.medium.com/max/800/1*dE4F_nf8P60V2baaaOxgLQ.jpeg',
//       abstract: 'A design sprint-like event in which computer programmers and others involved in software development, including graphic designers, interface designers, project managers, and others, often including domain experts, collaborate intensively on software projects.',
//       intro: 'A hackathon (also known as a hack day, hackfest or codefest) is a design sprint-like event in which computer programmers and others involved in software development, including graphic designers, interface designers, project managers, and others, often including domain experts, collaborate intensively on software projects.The goal of a hackathon is to create usable software or hardware with the goal of creating a functioning product by the end of the event.[1] Hackathons tend to have a specific focus, which can include the programming language used, the operating system, an application, an API, or the subject and the demographic group of the programmers. In other cases, there is no restriction on the type of software being created.',
//       event_start_time: 1563638400000, // 2019-07-21 10:00:00
//       event_end_time: 1563724800000, // 2019-07-22 22:00:00
//       apply_start_time: 1558281600000, // 2019-05-20 00:00:00
//       apply_end_time: 1558368000000, // 2019-05-21 00:00:00
//       quota: 20,
//       lucky_quota: 5,
//       num_of_register: 20,
//       num_of_in_queue: 20,
//       venue: 'Galaxis Office',
//       contact: 'Chen Tong',
//       contact_email: 'tong.chen@shopee.com',
//       event_state: 2,
//       keyword: 'Tech',
//     }]
//   },
// }
