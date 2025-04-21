import { Question } from './types';

// Function to shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Function to randomize options while maintaining correct answer
function randomizeQuestion(question: Question): Question {
  const options = [...question.options];
  const correctOption = question.correctOption;
  const correctOptionIndex = options.findIndex(opt => opt.id === correctOption);
  const correctOptionData = options[correctOptionIndex];
  
  // Remove correct option from array
  options.splice(correctOptionIndex, 1);
  
  // Shuffle remaining options
  const shuffledOptions = shuffleArray(options);
  
  // Insert correct option at random position
  const randomPosition = Math.floor(Math.random() * (shuffledOptions.length + 1));
  shuffledOptions.splice(randomPosition, 0, correctOptionData);
  
  // Update option IDs to maintain A, B, C, D order
  const newOptions = shuffledOptions.map((opt, index) => ({
    ...opt,
    id: String.fromCharCode(65 + index) // 65 is ASCII for 'A'
  }));
  
  // Find new correct option ID
  const newCorrectOption = newOptions.find(opt => opt.text === correctOptionData.text)?.id || correctOption;
  
  return {
    ...question,
    options: newOptions,
    correctOption: newCorrectOption
  };
}

// Original questions array
const originalQuestions: Question[] = [
  // Round 1
  // Easy (5)
  {
    id: '1',
    text: 'Who was the first man created by God?',
    options: [
      { id: 'A', text: 'Adam' },
      { id: 'B', text: 'Noah' },
      { id: 'C', text: 'Abraham' },
      { id: 'D', text: 'Moses' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Bible Basics'
  },
  {
    id: '2',
    text: 'Who was thrown into the lions\' den?',
    options: [
      { id: 'A', text: 'Daniel' },
      { id: 'B', text: 'David' },
      { id: 'C', text: 'Solomon' },
      { id: 'D', text: 'Joseph' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Bible Stories'
  },
  {
    id: '3',
    text: 'Who was the first Southern Baptist missionary to Nigeria?',
    options: [
      { id: 'A', text: 'Thomas Jefferson Bowen' },
      { id: 'B', text: 'William Carey' },
      { id: 'C', text: 'Adoniram Judson' },
      { id: 'D', text: 'Lott Carey' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Baptist History'
  },
  {
    id: '4',
    text: 'Who was the mother of Jesus?',
    options: [
      { id: 'A', text: 'Mary' },
      { id: 'B', text: 'Elizabeth' },
      { id: 'C', text: 'Sarah' },
      { id: 'D', text: 'Ruth' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'New Testament'
  },
  {
    id: '5',
    text: 'Baptist are popularly called or known as',
    options: [
      { id: 'A', text: 'People of the Book' },
      { id: 'B', text: 'People of Love' },
      { id: 'C', text: 'People of Faith' },
      { id: 'D', text: 'People of Money' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'BSF Knowledge'
  },

  // Medium (5)
  {
    id: '6',
    text: 'How many books are in the New Testament?',
    options: [
      { id: 'A', text: '27' },
      { id: 'B', text: '39' },
      { id: 'C', text: '66' },
      { id: 'D', text: '73' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Bible Structure'
  },
  {
    id: '7',
    text: 'Who wrote most of the Psalms?',
    options: [
      { id: 'A', text: 'David' },
      { id: 'B', text: 'Solomon' },
      { id: 'C', text: 'Moses' },
      { id: 'D', text: 'Asaph' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Bible Authors'
  },
  {
    id: '8',
    text: 'In what year was Thomas Jefferson Bowen appointed as missionary to Nigeria?',
    options: [
      { id: 'A', text: '1850' },
      { id: 'B', text: '1845' },
      { id: 'C', text: '1861' },
      { id: 'D', text: '1836' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Baptist History'
  },
  {
    id: '9',
    text: 'Who was the first Gentile to be baptized?',
    options: [
      { id: 'A', text: 'Cornelius' },
      { id: 'B', text: 'Lydia' },
      { id: 'C', text: 'The Ethiopian eunuch' },
      { id: 'D', text: 'The Philippian jailer' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'New Testament'
  },
  {
    id: '10',
    text: 'SMAC is an Acronym for',
    options: [
      { id: 'A', text: 'Salvation Mission Academic Consistency' },
      { id: 'B', text: 'Student Membership Advisory Committee' },
      { id: 'C', text: 'Student Ministries Advisory Committee' },
      { id: 'D', text: 'Senior Ministers Advisory Council' }
    ],
    correctOption: 'C',
    difficulty: 'medium',
    category: 'BSF Knowledge'
  },

  // Hard (5)
  {
    id: '11',
    text: 'Which prophet was taken to heaven in a chariot of fire?',
    options: [
      { id: 'A', text: 'Elijah' },
      { id: 'B', text: 'Elisha' },
      { id: 'C', text: 'Isaiah' },
      { id: 'D', text: 'Jeremiah' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Prophets'
  },
  {
    id: '12',
    text: 'How many years did the Israelites spend in Babylonian captivity?',
    options: [
      { id: 'A', text: '70' },
      { id: 'B', text: '40' },
      { id: 'C', text: '50' },
      { id: 'D', text: '60' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Bible Numbers'
  },
  {
    id: '13',
    text: 'Which stanza of the BSF Hymn highlights "bringing talents, time and money"?',
    options: [
      { id: 'A', text: 'Stanza 2' },
      { id: 'B', text: 'Stanza 5' },
      { id: 'C', text: 'Stanza 3' },
      { id: 'D', text: 'Stanza 4' }
    ],
    correctOption: 'B',
    difficulty: 'hard',
    category: 'BSF Knowledge'
  },
  {
    id: '14',
    text: 'The BSF motto is gotten from which book?',
    options: [
      { id: 'A', text: 'John 14:14' },
      { id: 'B', text: 'Luke 24:44' },
      { id: 'C', text: 'John 13:35' },
      { id: 'D', text: 'John 13:45' }
    ],
    correctOption: 'C',
    difficulty: 'hard',
    category: 'BSF Knowledge'
  },
  {
    id: '15',
    text: 'What was the theme for 2023 Retreat?',
    options: [
      { id: 'A', text: 'Deeper in Love' },
      { id: 'B', text: 'Parousia' },
      { id: 'C', text: 'Excellent spirit' },
      { id: 'D', text: 'Better by far' }
    ],
    correctOption: 'B',
    difficulty: 'hard',
    category: 'BSF Knowledge'
  },

  // Round 2
  // Easy (5)
  {
    id: '16',
    text: 'How many days and nights did it rain during the flood?',
    options: [
      { id: 'A', text: '40' },
      { id: 'B', text: '30' },
      { id: 'C', text: '50' },
      { id: 'D', text: '60' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Bible Numbers'
  },
  {
    id: '17',
    text: 'Who was the first king of Israel?',
    options: [
      { id: 'A', text: 'Saul' },
      { id: 'B', text: 'David' },
      { id: 'C', text: 'Solomon' },
      { id: 'D', text: 'Samuel' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Kings of Israel'
  },
  {
    id: '18',
    text: 'Who was the father of John the Baptist?',
    options: [
      { id: 'A', text: 'Zechariah' },
      { id: 'B', text: 'Joseph' },
      { id: 'C', text: 'Abraham' },
      { id: 'D', text: 'David' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'New Testament'
  },
  {
    id: '19',
    text: 'Who was the first martyr of the Christian church?',
    options: [
      { id: 'A', text: 'Stephen' },
      { id: 'B', text: 'Peter' },
      { id: 'C', text: 'Paul' },
      { id: 'D', text: 'John' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Church History'
  },
  {
    id: '20',
    text: 'The BSF colour is',
    options: [
      { id: 'A', text: 'Leaf light green' },
      { id: 'B', text: 'Light leaf red' },
      { id: 'C', text: 'Light green and black' },
      { id: 'D', text: 'Light leaf green' }
    ],
    correctOption: 'D',
    difficulty: 'easy',
    category: 'BSF Knowledge'
  },

  // Medium (5)
  {
    id: '21',
    text: 'How many years did the Israelites wander in the wilderness?',
    options: [
      { id: 'A', text: '40' },
      { id: 'B', text: '30' },
      { id: 'C', text: '50' },
      { id: 'D', text: '60' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Bible Numbers'
  },
  {
    id: '22',
    text: 'What is the name of the body that unites Baptist churches in Nigeria?',
    options: [
      { id: 'A', text: 'Nigeria Baptist Convention' },
      { id: 'B', text: 'Baptist World Alliance' },
      { id: 'C', text: 'Southern Baptist Convention' },
      { id: 'D', text: 'Nigerian Christian Association' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Baptist History'
  },
  {
    id: '23',
    text: 'How many books are in the Bible?',
    options: [
      { id: 'A', text: '66' },
      { id: 'B', text: '73' },
      { id: 'C', text: '39' },
      { id: 'D', text: '27' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Bible Structure'
  },
  {
    id: '24',
    text: 'One among the option is part of BSF objectives',
    options: [
      { id: 'A', text: 'Love' },
      { id: 'B', text: 'Faith' },
      { id: 'C', text: 'Patience' },
      { id: 'D', text: 'Churchmanship' }
    ],
    correctOption: 'D',
    difficulty: 'medium',
    category: 'BSF Knowledge'
  },
  {
    id: '25',
    text: 'BSF 2025 Theme is gotten from which books?',
    options: [
      { id: 'A', text: 'Ezra and Esther' },
      { id: 'B', text: 'Mathew and Mark' },
      { id: 'C', text: 'Luke and Acts' },
      { id: 'D', text: 'Jude and Acts' }
    ],
    correctOption: 'C',
    difficulty: 'medium',
    category: 'BSF Knowledge'
  },

  // Hard (5)
  {
    id: '26',
    text: 'Who was the first high priest of Israel?',
    options: [
      { id: 'A', text: 'Aaron' },
      { id: 'B', text: 'Moses' },
      { id: 'C', text: 'Joshua' },
      { id: 'D', text: 'Samuel' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Old Testament'
  },
  {
    id: '27',
    text: 'Where was Thomas Jefferson Bowen born?',
    options: [
      { id: 'A', text: 'Jackson County, Georgia' },
      { id: 'B', text: 'Richmond, Virginia' },
      { id: 'C', text: 'Charleston, South Carolina' },
      { id: 'D', text: 'Nashville, Tennessee' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Baptist History'
  },
  {
    id: '28',
    text: 'What was the theme for 2024 BSF retreat?',
    options: [
      { id: 'A', text: 'Spirit of truth' },
      { id: 'B', text: 'End times' },
      { id: 'C', text: 'Equipped for service' },
      { id: 'D', text: 'Maranatha' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'BSF Knowledge'
  },
  {
    id: '29',
    text: 'Baptist believe in baptism by',
    options: [
      { id: 'A', text: 'Immersion' },
      { id: 'B', text: 'Sprinkling' },
      { id: 'C', text: 'Washing' },
      { id: 'D', text: 'Spraying' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Baptist Doctrine'
  },
  {
    id: '30',
    text: 'Which of these is not a book in the Bible?',
    options: [
      { id: 'A', text: 'Bel and the Dragon' },
      { id: 'B', text: 'Jude' },
      { id: 'C', text: 'Philemon' },
      { id: 'D', text: 'Obadiah' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Bible Structure'
  },

  // Round 3
  // Easy (5)
  {
    id: '31',
    text: 'Which of these is not one of the Ten Commandments?',
    options: [
      { id: 'A', text: 'You shall not kill' },
      { id: 'B', text: 'You shall not steal' },
      { id: 'C', text: 'You shall recycle' },
      { id: 'D', text: 'Honor your father and mother' }
    ],
    correctOption: 'C',
    difficulty: 'easy',
    category: 'Bible Basics'
  },
  {
    id: '32',
    text: 'What is the first book of the New Testament?',
    options: [
      { id: 'A', text: 'Matthew' },
      { id: 'B', text: 'Mark' },
      { id: 'C', text: 'Luke' },
      { id: 'D', text: 'John' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Bible Structure'
  },
  {
    id: '33',
    text: 'Who betrayed Jesus?',
    options: [
      { id: 'A', text: 'Judas Iscariot' },
      { id: 'B', text: 'Peter' },
      { id: 'C', text: 'Thomas' },
      { id: 'D', text: 'John' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'New Testament'
  },
  {
    id: '34',
    text: 'What was Jesus\' first miracle?',
    options: [
      { id: 'A', text: 'Turning water into wine' },
      { id: 'B', text: 'Healing a blind man' },
      { id: 'C', text: 'Walking on water' },
      { id: 'D', text: 'Raising Lazarus' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'New Testament'
  },
  {
    id: '35',
    text: 'BSF stands for',
    options: [
      { id: 'A', text: 'Baptist Student Fellowship' },
      { id: 'B', text: 'Bible Study Fellowship' },
      { id: 'C', text: 'Believers Spiritual Foundation' },
      { id: 'D', text: 'Brothers and Sisters in Faith' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'BSF Knowledge'
  },

  // Medium (5)
  {
    id: '36',
    text: 'What is the main purpose of the Nigeria Baptist Convention?',
    options: [
      { id: 'A', text: 'To serve as a base for cooperation and unity' },
      { id: 'B', text: 'To collect tithes from churches' },
      { id: 'C', text: 'To train government officials' },
      { id: 'D', text: 'To establish political parties' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Baptist History'
  },
  {
    id: '37',
    text: 'Who was swallowed by a big fish?',
    options: [
      { id: 'A', text: 'Jonah' },
      { id: 'B', text: 'Job' },
      { id: 'C', text: 'Joel' },
      { id: 'D', text: 'John' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Bible Stories'
  },
  {
    id: '38',
    text: 'Where did Thomas Jefferson Bowen first land in Nigeria in 1850?',
    options: [
      { id: 'A', text: 'Badagry' },
      { id: 'B', text: 'Lagos' },
      { id: 'C', text: 'Calabar' },
      { id: 'D', text: 'Ogbomoso' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Baptist History'
  },
  {
    id: '39',
    text: 'The BSF year starts in which month?',
    options: [
      { id: 'A', text: 'September' },
      { id: 'B', text: 'January' },
      { id: 'C', text: 'March' },
      { id: 'D', text: 'June' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'BSF Knowledge'
  },
  {
    id: '40',
    text: 'BSF was founded in what year?',
    options: [
      { id: 'A', text: '1976' },
      { id: 'B', text: '1980' },
      { id: 'C', text: '1965' },
      { id: 'D', text: '1990' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'BSF Knowledge'
  },

  // Hard (5)
  {
    id: '41',
    text: 'Which book comes between 2 Thessalonians and 1 Timothy in the New Testament?',
    options: [
      { id: 'A', text: 'Hebrews' },
      { id: 'B', text: 'Titus' },
      { id: 'C', text: '1 Timothy' },
      { id: 'D', text: 'Philemon' }
    ],
    correctOption: 'C',
    difficulty: 'hard',
    category: 'Bible Structure'
  },
  {
    id: '42',
    text: 'Which of these is not a genuine Bible verse?',
    options: [
      { id: 'A', text: 'John 3:16' },
      { id: 'B', text: 'Genesis 1:1' },
      { id: 'C', text: 'Psalm 23:1' },
      { id: 'D', text: 'Revelation 22:21' }
    ],
    correctOption: 'D',
    difficulty: 'hard',
    category: 'Bible Trivia'
  },
  {
    id: '43',
    text: 'Who was the oldest man in the Bible?',
    options: [
      { id: 'A', text: 'Methuselah' },
      { id: 'B', text: 'Noah' },
      { id: 'C', text: 'Adam' },
      { id: 'D', text: 'Abraham' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Bible Trivia'
  },
  {
    id: '44',
    text: 'Which book in the Bible doesn\'t mention God?',
    options: [
      { id: 'A', text: 'Esther' },
      { id: 'B', text: 'Ruth' },
      { id: 'C', text: 'Song of Solomon' },
      { id: 'D', text: 'Ecclesiastes' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Bible Trivia'
  },
  {
    id: '45',
    text: 'BSF\'s motto is "By this shall all men know that ye are my disciples, if ye..."',
    options: [
      { id: 'A', text: '...have love one to another"' },
      { id: 'B', text: '...keep my commandments"' },
      { id: 'C', text: '...are faithful in all things"' },
      { id: 'D', text: '...walk in the light"' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'BSF Knowledge'
  },

  // Round 4
  // Easy (5)
  {
    id: '46',
    text: 'Who was David\'s best friend?',
    options: [
      { id: 'A', text: 'Jonathan' },
      { id: 'B', text: 'Saul' },
      { id: 'C', text: 'Samuel' },
      { id: 'D', text: 'Solomon' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Old Testament'
  },
  {
    id: '47',
    text: 'Who was the wisest king of Israel?',
    options: [
      { id: 'A', text: 'Solomon' },
      { id: 'B', text: 'David' },
      { id: 'C', text: 'Saul' },
      { id: 'D', text: 'Rehoboam' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Kings of Israel'
  },
  {
    id: '48',
    text: 'Who was the father of Isaac?',
    options: [
      { id: 'A', text: 'Abraham' },
      { id: 'B', text: 'Jacob' },
      { id: 'C', text: 'Noah' },
      { id: 'D', text: 'Moses' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Old Testament'
  },
  {
    id: '49',
    text: 'Who was the brother of Mary and Martha?',
    options: [
      { id: 'A', text: 'Lazarus' },
      { id: 'B', text: 'Simon' },
      { id: 'C', text: 'Andrew' },
      { id: 'D', text: 'John' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'New Testament'
  },
  {
    id: '50',
    text: 'BSF\'s official color represents',
    options: [
      { id: 'A', text: 'Growth and vitality' },
      { id: 'B', text: 'Peace and tranquility' },
      { id: 'C', text: 'Royalty and majesty' },
      { id: 'D', text: 'Purity and holiness' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'BSF Knowledge'
  },

  // Medium (5)
  {
    id: '53',
    text: 'What has the Nigeria Baptist Convention enabled churches to do?',
    options: [
      { id: 'A', text: 'Embark on more organized evangelism' },
      { id: 'B', text: 'Build political influence' },
      { id: 'C', text: 'Create a Baptist currency' },
      { id: 'D', text: 'Establish Baptist universities abroad' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Baptist History'
  },
  {
    id: '52',
    text: 'Who was the first king to reign over the northern kingdom of Israel?',
    options: [
      { id: 'A', text: 'Jeroboam' },
      { id: 'B', text: 'Rehoboam' },
      { id: 'C', text: 'Ahab' },
      { id: 'D', text: 'Jehu' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Kings of Israel'
  },
  {
    id: '53',
    text: 'Who was the prophet that confronted King David about his sin with Bathsheba?',
    options: [
      { id: 'A', text: 'Nathan' },
      { id: 'B', text: 'Samuel' },
      { id: 'C', text: 'Elijah' },
      { id: 'D', text: 'Isaiah' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Prophets'
  },
  {
    id: '54',
    text: 'BSF\'s four-fold objectives include all except',
    options: [
      { id: 'A', text: 'Academic Excellence' },
      { id: 'B', text: 'Spiritual Growth' },
      { id: 'C', text: 'Churchmanship' },
      { id: 'D', text: 'Christian Leadership' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'BSF Knowledge'
  },
  {
    id: '55',
    text: 'BSF\'s leadership training program is called',
    options: [
      { id: 'A', text: 'Discipleship Training School' },
      { id: 'B', text: 'Leadership Development Program' },
      { id: 'C', text: 'Timothy Leadership Institute' },
      { id: 'D', text: 'None of the above' }
    ],
    correctOption: 'D',
    difficulty: 'medium',
    category: 'BSF Knowledge'
  },

  // Hard (5)
  {
    id: '56',
    text: 'Which of these books is not part of the Pentateuch?',
    options: [
      { id: 'A', text: 'Joshua' },
      { id: 'B', text: 'Genesis' },
      { id: 'C', text: 'Exodus' },
      { id: 'D', text: 'Leviticus' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Bible Structure'
  },
  {
    id: '57',
    text: 'Which prophet married a prostitute as part of his prophetic ministry?',
    options: [
      { id: 'A', text: 'Hosea' },
      { id: 'B', text: 'Amos' },
      { id: 'C', text: 'Micah' },
      { id: 'D', text: 'Jonah' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Prophets'
  },
  {
    id: '58',
    text: 'Which king had the longest reign in Israel/Judah?',
    options: [
      { id: 'A', text: 'Manasseh' },
      { id: 'B', text: 'David' },
      { id: 'C', text: 'Solomon' },
      { id: 'D', text: 'Hezekiah' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Kings of Israel'
  },
  {
    id: '59',
    text: 'The BSF hymn has how many stanzas?',
    options: [
      { id: 'A', text: '5' },
      { id: 'B', text: '4' },
      { id: 'C', text: '6' },
      { id: 'D', text: '7' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'BSF Knowledge'
  },
  {
    id: '60',
    text: 'BSF\'s international headquarters is located in',
    options: [
      { id: 'A', text: 'Nigeria' },
      { id: 'B', text: 'USA' },
      { id: 'C', text: 'UK' },
      { id: 'D', text: 'South Africa' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'BSF Knowledge'
  },

  // Round 5
  // Easy (5)
  {
    id: '61',
    text: 'Who was the first apostle to die for his faith?',
    options: [
      { id: 'A', text: 'James son of Zebedee' },
      { id: 'B', text: 'Peter' },
      { id: 'C', text: 'Paul' },
      { id: 'D', text: 'Andrew' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'New Testament'
  },
  {
    id: '62',
    text: 'Who was the first king to unite the 12 tribes of Israel?',
    options: [
      { id: 'A', text: 'Saul' },
      { id: 'B', text: 'David' },
      { id: 'C', text: 'Solomon' },
      { id: 'D', text: 'Rehoboam' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Kings of Israel'
  },
  {
    id: '63',
    text: 'Who was the father of John the Baptist?',
    options: [
      { id: 'A', text: 'Zechariah' },
      { id: 'B', text: 'Joseph' },
      { id: 'C', text: 'Abraham' },
      { id: 'D', text: 'David' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'New Testament'
  },
  {
    id: '64',
    text: 'Who was the first martyr of the Christian church?',
    options: [
      { id: 'A', text: 'Stephen' },
      { id: 'B', text: 'Peter' },
      { id: 'C', text: 'Paul' },
      { id: 'D', text: 'John' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Church History'
  },
  {
    id: '65',
    text: 'BSF\'s official motto is taken from which book of the Bible?',
    options: [
      { id: 'A', text: 'John' },
      { id: 'B', text: 'Matthew' },
      { id: 'C', text: 'Luke' },
      { id: 'D', text: 'Acts' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'BSF Knowledge'
  },

  // Medium (5)
  {
    id: '66',
    text: 'When was the Nigerian Baptist Convention officially registered?',
    options: [
      { id: 'A', text: '1943' },
      { id: 'B', text: '1919' },
      { id: 'C', text: '1925' },
      { id: 'D', text: '1950' }
    ],
    correctOption: 'A',
    difficulty: 'easy',
    category: 'Baptist History'
  },

  {
    id: '67',
    text: 'Who was the first Gentile convert to Christianity?',
    options: [
      { id: 'A', text: 'Cornelius' },
      { id: 'B', text: 'Lydia' },
      { id: 'C', text: 'The Ethiopian eunuch' },
      { id: 'D', text: 'The Philippian jailer' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'New Testament'
  },
  {
    id: '68',
    text: 'Who was the first high priest of Israel?',
    options: [
      { id: 'A', text: 'Aaron' },
      { id: 'B', text: 'Moses' },
      { id: 'C', text: 'Joshua' },
      { id: 'D', text: 'Samuel' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'Old Testament'
  },
  {
    id: '69',
    text: 'BSF\'s leadership structure includes all except',
    options: [
      { id: 'A', text: 'President' },
      { id: 'B', text: 'Coordinator' },
      { id: 'C', text: 'Secretary' },
      { id: 'D', text: 'Treasurer' }
    ],
    correctOption: 'A',
    difficulty: 'medium',
    category: 'BSF Knowledge'
  },
  {
    id: '70',
    text: 'BSF\'s annual conference is called',
    options: [
      { id: 'A', text: 'Summit' },
      { id: 'B', text: 'Retreat' },
      { id: 'C', text: 'Conference' },
      { id: 'D', text: 'Convention' }
    ],
    correctOption: 'B',
    difficulty: 'medium',
    category: 'BSF Knowledge'
  },

  // Hard (5)
  {
    id: '71',
    text: 'Which book in the Bible has the most chapters?',
    options: [
      { id: 'A', text: 'Psalms' },
      { id: 'B', text: 'Genesis' },
      { id: 'C', text: 'Isaiah' },
      { id: 'D', text: 'Jeremiah' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Bible Structure'
  },
  {
    id: '72',
    text: 'Which book in the Bible has the fewest words?',
    options: [
      { id: 'A', text: '3 John' },
      { id: 'B', text: '2 John' },
      { id: 'C', text: 'Philemon' },
      { id: 'D', text: 'Jude' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Bible Structure'
  },
  {
    id: '73',
    text: 'Which prophet was told to marry an unfaithful wife as an object lesson?',
    options: [
      { id: 'A', text: 'Hosea' },
      { id: 'B', text: 'Amos' },
      { id: 'C', text: 'Micah' },
      { id: 'D', text: 'Jonah' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'Prophets'
  },
  {
    id: '74',
    text: 'BSF was founded by',
    options: [
      { id: 'A', text: 'Nigerian Baptist Convention' },
      { id: 'B', text: 'Southern Baptist Convention' },
      { id: 'C', text: 'A group of Christian students' },
      { id: 'D', text: 'The Nigerian government' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'BSF Knowledge'
  },
  {
    id: '75',
    text: 'BSF\'s official publication is called',
    options: [
      { id: 'A', text: 'The Baptist Student' },
      { id: 'B', text: 'The BSF Journal' },
      { id: 'C', text: 'The Baptist Voice' },
      { id: 'D', text: 'The Christian Student' }
    ],
    correctOption: 'A',
    difficulty: 'hard',
    category: 'BSF Knowledge'
  }
];

// Export randomized questions
export const questions: Question[] = originalQuestions.map(randomizeQuestion);