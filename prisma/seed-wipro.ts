import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Seeding Wipro Assessment with Subtopics...');

    // 1. Create the Wipro Test
    const wiproTest = await prisma.test.create({
        data: {
            title: 'Wipro National Talent Hunt 2026',
            description: 'Comprehensive assessment covering Aptitude, Logical Reasoning, Verbal Ability, and Coding.',
            duration: 120, // 2 hours
            difficulty: 'Hard',
            type: 'company',
            company: 'Wipro',
        }
    });

    console.log('✅ Created Test:', wiproTest.title);

    // 2. Create Subtopics
    const aptitudeSubtopic = await prisma.subtopic.create({
        data: {
            testId: wiproTest.id,
            name: 'Quantitative Aptitude',
            description: 'Mathematical and numerical reasoning questions',
            order: 1,
            roundTitle: 'Online Assessment',
            type: 'assessment',
            totalQuestions: 10,
        }
    });

    const logicalSubtopic = await prisma.subtopic.create({
        data: {
            testId: wiproTest.id,
            name: 'Logical Reasoning',
            description: 'Pattern recognition and logical thinking',
            order: 2,
            roundTitle: 'Online Assessment',
            type: 'assessment',
            totalQuestions: 10,
        }
    });

    const verbalSubtopic = await prisma.subtopic.create({
        data: {
            testId: wiproTest.id,
            name: 'Verbal Ability',
            description: 'English comprehension and grammar',
            order: 3,
            roundTitle: 'Online Assessment',
            type: 'assessment',
            totalQuestions: 10,
        }
    });

    const codingSubtopic = await prisma.subtopic.create({
        data: {
            testId: wiproTest.id,
            name: 'Coding Challenge',
            description: 'Programming and problem-solving skills',
            order: 4,
            roundTitle: 'Technical Round',
            type: 'coding',
            totalQuestions: 2,
        }
    });

    console.log('✅ Created 4 Subtopics');

    // 3. Create Aptitude Questions (10 questions)
    const aptitudeQuestions = [
        { text: "If 5x + 3 = 28, what is the value of x?", options: ["4", "5", "6", "7"], correct: 1 },
        { text: "What is 15% of 200?", options: ["25", "30", "35", "40"], correct: 1 },
        { text: "A train travels 120 km in 2 hours. What is its speed?", options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"], correct: 1 },
        { text: "If a:b = 2:3 and b:c = 4:5, what is a:c?", options: ["8:15", "6:15", "2:5", "3:5"], correct: 0 },
        { text: "What is the next number in the series: 2, 6, 12, 20, ?", options: ["28", "30", "32", "34"], correct: 1 },
        { text: "A shopkeeper offers 20% discount. If marked price is ₹500, what is the selling price?", options: ["₹400", "₹420", "₹450", "₹480"], correct: 0 },
        { text: "What is the area of a circle with radius 7 cm? (π = 22/7)", options: ["144 cm²", "154 cm²", "164 cm²", "174 cm²"], correct: 1 },
        { text: "If 3^x = 81, what is x?", options: ["3", "4", "5", "6"], correct: 1 },
        { text: "A sum of ₹1000 at 10% simple interest for 2 years gives?", options: ["₹100", "₹150", "₹200", "₹250"], correct: 2 },
        { text: "What is the HCF of 24 and 36?", options: ["6", "8", "12", "18"], correct: 2 },
    ];

    for (let i = 0; i < aptitudeQuestions.length; i++) {
        const q = aptitudeQuestions[i];
        await prisma.question.create({
            data: {
                testId: wiproTest.id,
                subtopicId: aptitudeSubtopic.id,
                text: q.text,
                type: 'multiple-choice',
                category: 'Aptitude',
                difficulty: 'Medium',
                order: i + 1,
                options: {
                    create: q.options.map((opt, idx) => ({
                        text: opt,
                        isCorrect: idx === q.correct,
                    }))
                }
            }
        });
    }
    console.log('✅ Created 10 Aptitude Questions');

    // 4. Create Logical Reasoning Questions (10 questions)
    const logicalQuestions = [
        { text: "If all roses are flowers and some flowers are red, which is true?", options: ["All roses are red", "Some roses may be red", "No roses are red", "All flowers are roses"], correct: 1 },
        { text: "Find the odd one out: 2, 4, 6, 9, 10", options: ["2", "4", "6", "9"], correct: 3 },
        { text: "If CODING is written as DPEJOH, how is BASIC written?", options: ["CBTJD", "CBTJE", "CBTID", "CBTIF"], correct: 0 },
        { text: "Complete the series: A, C, F, J, ?", options: ["M", "N", "O", "P"], correct: 2 },
        { text: "If South-East becomes North, what will West become?", options: ["North-East", "South-East", "South-West", "North-West"], correct: 1 },
        { text: "Which number is wrong in the series: 1, 4, 9, 15, 25, 36?", options: ["4", "9", "15", "25"], correct: 2 },
        { text: "If + means ×, × means -, - means ÷, ÷ means +, then 8 + 2 - 4 × 3 ÷ 6 = ?", options: ["7", "8", "9", "10"], correct: 0 },
        { text: "Find the missing number: 3, 7, 15, 31, ?", options: ["55", "63", "71", "79"], correct: 1 },
        { text: "In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written?", options: ["EOJDEJFM", "EOJDJEFM", "EOJDEJNF", "EOJDJFEM"], correct: 1 },
        { text: "If A = 1, B = 2, C = 3, what is the value of CAB?", options: ["312", "321", "123", "132"], correct: 0 },
    ];

    for (let i = 0; i < logicalQuestions.length; i++) {
        const q = logicalQuestions[i];
        await prisma.question.create({
            data: {
                testId: wiproTest.id,
                subtopicId: logicalSubtopic.id,
                text: q.text,
                type: 'multiple-choice',
                category: 'Logical',
                difficulty: 'Medium',
                order: i + 1,
                options: {
                    create: q.options.map((opt, idx) => ({
                        text: opt,
                        isCorrect: idx === q.correct,
                    }))
                }
            }
        });
    }
    console.log('✅ Created 10 Logical Reasoning Questions');

    // 5. Create Verbal Ability Questions (10 questions)
    const verbalQuestions = [
        { text: "Choose the synonym of 'Abundant':", options: ["Scarce", "Plentiful", "Rare", "Limited"], correct: 1 },
        { text: "Choose the antonym of 'Ancient':", options: ["Old", "Modern", "Historic", "Traditional"], correct: 1 },
        { text: "Fill in the blank: She is _____ intelligent than her sister.", options: ["more", "most", "much", "many"], correct: 0 },
        { text: "Identify the error: 'He don't like coffee.'", options: ["He", "don't", "like", "No error"], correct: 1 },
        { text: "Choose the correct spelling:", options: ["Accomodate", "Accommodate", "Acommodate", "Acomodate"], correct: 1 },
        { text: "What is the meaning of the idiom 'Break the ice'?", options: ["To start a conversation", "To break something", "To be cold", "To make ice"], correct: 0 },
        { text: "Choose the correct sentence:", options: ["She is taller than me", "She is taller than I", "She is more taller than me", "She is tallest than me"], correct: 0 },
        { text: "Fill in the blank: Neither of the boys _____ present.", options: ["is", "are", "was", "were"], correct: 2 },
        { text: "Choose the one-word substitution for 'A person who loves books':", options: ["Bibliophile", "Bibliophobe", "Librarian", "Author"], correct: 0 },
        { text: "Identify the part of speech of the underlined word: 'She runs *quickly*.'", options: ["Noun", "Verb", "Adjective", "Adverb"], correct: 3 },
    ];

    for (let i = 0; i < verbalQuestions.length; i++) {
        const q = verbalQuestions[i];
        await prisma.question.create({
            data: {
                testId: wiproTest.id,
                subtopicId: verbalSubtopic.id,
                text: q.text,
                type: 'multiple-choice',
                category: 'Verbal',
                difficulty: 'Medium',
                order: i + 1,
                options: {
                    create: q.options.map((opt, idx) => ({
                        text: opt,
                        isCorrect: idx === q.correct,
                    }))
                }
            }
        });
    }
    console.log('✅ Created 10 Verbal Ability Questions');

    // 6. Create Coding Questions (2 questions)
    const codingQuestions = [
        {
            text: "Reverse Words in a String",
            metadata: JSON.stringify({
                description: "Write a program to reverse the order of words in a given string.",
                inputFormat: "A single line containing multiple words separated by spaces.",
                outputFormat: "Print the words in reverse order.",
                constraints: "1 ≤ length of string ≤ 1000",
                testCases: [
                    { input: "Hello World", output: "World Hello" },
                    { input: "The quick brown fox", output: "fox brown quick The" },
                    { input: "Wipro", output: "Wipro" }
                ]
            })
        },
        {
            text: "Check for Balanced Parentheses",
            metadata: JSON.stringify({
                description: "Write a program to check if parentheses are balanced in a given string.",
                inputFormat: "A string containing '(', ')', '{', '}', '[' and ']'.",
                outputFormat: "Print 'true' if balanced, 'false' otherwise.",
                constraints: "1 ≤ length of string ≤ 1000",
                testCases: [
                    { input: "{[]}", output: "true" },
                    { input: "([)]", output: "false" },
                    { input: "((()))", output: "true" }
                ]
            })
        }
    ];

    for (let i = 0; i < codingQuestions.length; i++) {
        const q = codingQuestions[i];
        await prisma.question.create({
            data: {
                testId: wiproTest.id,
                subtopicId: codingSubtopic.id,
                text: q.text,
                type: 'coding',
                category: 'Coding',
                difficulty: 'Hard',
                order: i + 1,
                metadata: q.metadata,
            }
        });
    }
    console.log('✅ Created 2 Coding Questions');

    console.log('🎉 Wipro Assessment with Subtopics Seeded Successfully!');
    console.log(`📊 Total: 4 Subtopics, 32 Questions`);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding Wipro test:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
