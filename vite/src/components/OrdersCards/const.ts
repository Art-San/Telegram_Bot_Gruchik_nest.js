// Мебель
///<Refrigerator />
// <WashingMachine />
// <Package />
// <Package2 />
// <ArchiveRestore />
// <Archive />
// <Sofa />
// <Lamp />
// <BedDouble />

// Дверь
// <DoorOpen />
// <DoorClosed />

// Строй
// <HardHat />
// <Cuboid />
// <Trash2 />
// <BrickWall />
// <Fence />
// <Anvil />

// Пианино
// <Piano />
// <KeyboardMusic />

// const orders = [
//   {
//     id: 2,
//     authorId: '721836748',
//     authorName: '@gruzz70tomsk',
//     startTime: '15:00',
//     typeWork: 'construction',
//     numExecutors: 1,
//     address: 'Кирова',
//     text: 'Под',
//     hourCost: 450,
//     hourCount: 1,
//     createdAt: 2024-05-23T15:57:20.792Z,
//     updatedAt: 2024-05-23T15:58:07.046Z,
//     potentialExecutors: [ '6162144186' ],
//     status: 'created'
//   },
//   {
//     id: 3,
//     authorId: '721836748',
//     authorName: '@gruzz70tomsk',
//     startTime: '16:00',
//     typeWork: 'construction',
//     numExecutors: 1,
//     address: 'Кулагина ',
//     text: 'Ку',
//     hourCost: 450,
//     hourCount: 1,
//     createdAt: 2024-05-23T16:12:34.176Z,
//     updatedAt: 2024-05-23T16:13:03.326Z,
//     potentialExecutors: [ '6162144186' ],
//     status: 'created'
//   },
//   {
//     id: 4,
//     authorId: '721836748',
//     authorName: '@gruzz70tomsk',
//     startTime: '16:00',
//     typeWork: 'rigging',
//     numExecutors: 1,
//     address: 'Ленина 1',
//     text: 'Рояль, 300кг',
//     hourCost: 450,
//     hourCount: 1,
//     createdAt: 2024-05-23T16:19:45.394Z,
//     updatedAt: 2024-05-23T16:20:19.905Z,
//     potentialExecutors: [ '6162144186' ],
//     status: 'created'
//   },
//   {
//     id: 1,
//     authorId: '721836748',
//     authorName: '@gruzz70tomsk',
//     startTime: '14:00',
//     typeWork: 'moving',
//     numExecutors: 1,
//     address: 'Кирова',
//     text: 'Только погрузить в машину',
//     hourCost: 450,
//     hourCount: 1,
//     createdAt: 2024-05-23T15:37:30.253Z,
//     updatedAt: 2024-05-23T15:38:10.111Z,
//     potentialExecutors: [ '6162144186' ],
//     status: 'created'
//   },
//   {
//     id: 5,
//     authorId: '721836748',
//     authorName: '@gruzz70tomsk',
//     startTime: '14:00',
//     typeWork: 'moving',
//     numExecutors: 3,
//     address: 'Красноармейская ',
//     text: 'Все подряд',
//     hourCost: 600,
//     hourCount: 1,
//     createdAt: 2024-05-24T05:43:26.211Z,
//     updatedAt: 2024-05-24T06:32:48.410Z,
//     potentialExecutors: [ '6162144186' ],
//     status: 'created'
//   },
//   {
//     id: 6,
//     authorId: '721836748',
//     authorName: '@gruzz70tomsk',
//     startTime: 'ближайшие',
//     typeWork: 'construction',
//     numExecutors: 2,
//     address: 'Вершинено 34',
//     text: 'поднять и спустить',
//     hourCost: 450,
//     hourCount: 1,
//     createdAt: 2024-05-24T08:46:39.648Z,
//     updatedAt: 2024-05-24T08:46:39.648Z,
//     potentialExecutors: [],
//     status: 'created'
//   },
//   {
//     id: 7,
//     authorId: '721836748',
//     authorName: '@gruzz70tomsk',
//     startTime: '18:00',
//     typeWork: 'moving',
//     numExecutors: 3,
//     address: 'Айвазовского ',
//     text: 'Переезд ',
//     hourCost: 450,
//     hourCount: 1,
//     createdAt: 2024-05-24T09:44:08.229Z,
//     updatedAt: 2024-05-24T09:45:17.673Z,
//     potentialExecutors: [ '6162144186' ],
//     status: 'created'
//   },
//   {
//     id: 8,
//     authorId: '721836748',
//     authorName: '@gruzz70tomsk',
//     startTime: '10:00',
//     typeWork: 'construction',
//     numExecutors: 1,
//     address: 'Пушкина ',
//     text: 'Кирпич в мешках 300',
//     hourCost: 500,
//     hourCount: 1,
//     createdAt: 2024-05-24T10:00:45.790Z,
//     updatedAt: 2024-05-24T10:01:28.492Z,
//     potentialExecutors: [ '6162144186' ],
//     status: 'created'
//   },
//   {
//     id: 9,
//     authorId: '721836748',
//     authorName: '@gruzz70tomsk',
//     startTime: '11:00',
//     typeWork: 'rigging',
//     numExecutors: 2,
//     address: 'Гоголя',
//     text: 'Сейф',
//     hourCost: 450,
//     hourCount: 1,
//     createdAt: 2024-05-24T10:03:10.189Z,
//     updatedAt: 2024-05-24T10:03:47.642Z,
//     potentialExecutors: [ '6162144186' ],
//     status: 'created'
//   },
//   {
//     id: 10,
//     authorId: '721836748',
//     authorName: '@gruzz70tomsk',
//     startTime: '14:00',
//     typeWork: null,
//     numExecutors: 3,
//     address: 'Алтайская',
//     text: 'Прод',
//     hourCost: 1500,
//     hourCount: 1,
//     createdAt: 2024-05-24T10:12:15.151Z,
//     updatedAt: 2024-05-24T10:13:12.638Z,
//     potentialExecutors: [ '6162144186' ],
//     status: 'created'
//   }
// ]
