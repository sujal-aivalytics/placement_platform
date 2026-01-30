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
    console.log('🌱 Adding Subtopics to Topic Tests...');

    // Find existing topic tests
    const mathTest = await prisma.test.findFirst({
        where: { title: 'Basic Mathematics' }
    });

    const logicTest = await prisma.test.findFirst({
        where: { title: 'Logical Reasoning' }
    });

    const verbalTest = await prisma.test.findFirst({
        where: { title: 'Verbal Ability' }
    });

    if (!mathTest || !logicTest || !verbalTest) {
        console.error('❌ Topic tests not found. Please run the main seed first: npm run seed');
        process.exit(1);
    }

    // ===== MATHEMATICS SUBTOPICS =====
    console.log('\n📐 Adding Mathematics Subtopics...');

    const arithmeticSubtopic = await prisma.subtopic.create({
        data: {
            testId: mathTest.id,
            name: 'Arithmetic',
            description: 'Basic arithmetic operations and calculations',
            order: 1,
            type: 'assessment',
            totalQuestions: 0,
        }
    });

    const algebraSubtopic = await prisma.subtopic.create({
        data: {
            testId: mathTest.id,
            name: 'Algebra',
            description: 'Equations, expressions, and algebraic concepts',
            order: 2,
            type: 'assessment',
            totalQuestions: 0,
        }
    });

    const geometrySubtopic = await prisma.subtopic.create({
        data: {
            testId: mathTest.id,
            name: 'Geometry',
            description: 'Shapes, areas, and spatial reasoning',
            order: 3,
            type: 'assessment',
            totalQuestions: 0,
        }
    });

    const percentageSubtopic = await prisma.subtopic.create({
        data: {
            testId: mathTest.id,
            name: 'Percentage & Ratio',
            description: 'Percentage calculations and ratio problems',
            order: 4,
            type: 'assessment',
            totalQuestions: 0,
        }
    });

    console.log('✅ Created 4 Mathematics subtopics');

    // ===== LOGICAL REASONING SUBTOPICS =====
    console.log('\n🧠 Adding Logical Reasoning Subtopics...');

    const syllogismSubtopic = await prisma.subtopic.create({
        data: {
            testId: logicTest.id,
            name: 'Syllogism',
            description: 'Deductive reasoning and logical conclusions',
            order: 1,
            type: 'assessment',
            totalQuestions: 0,
        }
    });

    const seriesSubtopic = await prisma.subtopic.create({
        data: {
            testId: logicTest.id,
            name: 'Number Series',
            description: 'Pattern recognition in number sequences',
            order: 2,
            type: 'assessment',
            totalQuestions: 0,
        }
    });

    const codingDecodingSubtopic = await prisma.subtopic.create({
        data: {
            testId: logicTest.id,
            name: 'Coding-Decoding',
            description: 'Letter and word pattern problems',
            order: 3,
            type: 'assessment',
            totalQuestions: 0,
        }
    });

    const puzzlesSubtopic = await prisma.subtopic.create({
        data: {
            testId: logicTest.id,
            name: 'Puzzles & Arrangements',
            description: 'Seating arrangements and logical puzzles',
            order: 4,
            type: 'assessment',
            totalQuestions: 0,
        }
    });

    console.log('✅ Created 4 Logical Reasoning subtopics');

    // ===== VERBAL ABILITY SUBTOPICS =====
    console.log('\n📚 Adding Verbal Ability Subtopics...');

    const synonymsSubtopic = await prisma.subtopic.create({
        data: {
            testId: verbalTest.id,
            name: 'Synonyms & Antonyms',
            description: 'Word meanings and opposites',
            order: 1,
            type: 'assessment',
            totalQuestions: 0,
        }
    });

    const grammarSubtopic = await prisma.subtopic.create({
        data: {
            testId: verbalTest.id,
            name: 'Grammar',
            description: 'Sentence correction and error detection',
            order: 2,
            type: 'assessment',
            totalQuestions: 0,
        }
    });

    const comprehensionSubtopic = await prisma.subtopic.create({
        data: {
            testId: verbalTest.id,
            name: 'Reading Comprehension',
            description: 'Passage reading and understanding',
            order: 3,
            type: 'assessment',
            totalQuestions: 0,
        }
    });

    const idiomsSubtopic = await prisma.subtopic.create({
        data: {
            testId: verbalTest.id,
            name: 'Idioms & Phrases',
            description: 'Common expressions and their meanings',
            order: 4,
            type: 'assessment',
            totalQuestions: 0,
        }
    });

    console.log('✅ Created 4 Verbal Ability subtopics');

    // ===== ADD SAMPLE QUESTIONS TO SUBTOPICS =====
    console.log('\n📝 Adding sample questions to subtopics...');

    // Arithmetic questions
    const arithmeticQuestions = [
        { text: "What is 15 + 27?", options: ["42", "41", "43", "40"], correct: 0 },
        { text: "What is 144 ÷ 12?", options: ["10", "11", "12", "13"], correct: 2 },
        { text: "What is 8 × 7?", options: ["54", "56", "58", "60"], correct: 1 },
        { text: "What is 100 - 37?", options: ["63", "64", "65", "66"], correct: 0 },
        { text: "What is 25 + 35?", options: ["50", "55", "60", "65"], correct: 2 },
    ];

    for (let i = 0; i < arithmeticQuestions.length; i++) {
        const q = arithmeticQuestions[i];
        await prisma.question.create({
            data: {
                testId: mathTest.id,
                subtopicId: arithmeticSubtopic.id,
                text: q.text,
                type: 'multiple-choice',
                category: 'Arithmetic',
                difficulty: 'Easy',
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

    // Algebra questions
    const algebraQuestions = [
        { text: "If 2x + 5 = 15, what is x?", options: ["3", "4", "5", "6"], correct: 2 },
        { text: "What is the square root of 81?", options: ["7", "8", "9", "10"], correct: 2 },
        { text: "Solve: 3x - 7 = 14", options: ["5", "6", "7", "8"], correct: 2 },
        { text: "If x² = 16, what is x?", options: ["2", "3", "4", "5"], correct: 2 },
        { text: "What is 5² + 3²?", options: ["30", "32", "34", "36"], correct: 2 },
    ];

    for (let i = 0; i < algebraQuestions.length; i++) {
        const q = algebraQuestions[i];
        await prisma.question.create({
            data: {
                testId: mathTest.id,
                subtopicId: algebraSubtopic.id,
                text: q.text,
                type: 'multiple-choice',
                category: 'Algebra',
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

    // Percentage questions
    const percentageQuestions = [
        { text: "What is 25% of 200?", options: ["40", "45", "50", "55"], correct: 2 },
        { text: "What is 10% of 500?", options: ["40", "45", "50", "55"], correct: 2 },
        { text: "If a:b = 2:3, and b = 15, what is a?", options: ["8", "9", "10", "11"], correct: 2 },
        { text: "What is 50% of 80?", options: ["30", "35", "40", "45"], correct: 2 },
        { text: "What is 20% of 150?", options: ["25", "30", "35", "40"], correct: 1 },
    ];

    for (let i = 0; i < percentageQuestions.length; i++) {
        const q = percentageQuestions[i];
        await prisma.question.create({
            data: {
                testId: mathTest.id,
                subtopicId: percentageSubtopic.id,
                text: q.text,
                type: 'multiple-choice',
                category: 'Percentage',
                difficulty: 'Easy',
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

    // Update totalQuestions for each subtopic
    await prisma.subtopic.update({
        where: { id: arithmeticSubtopic.id },
        data: { totalQuestions: arithmeticQuestions.length }
    });
    await prisma.subtopic.update({
        where: { id: algebraSubtopic.id },
        data: { totalQuestions: algebraQuestions.length }
    });
    await prisma.subtopic.update({
        where: { id: percentageSubtopic.id },
        data: { totalQuestions: percentageQuestions.length }
    });

    console.log('✅ Added sample questions to Mathematics subtopics');

    console.log('\n🎉 Subtopics Added Successfully!');
    console.log('📊 Summary:');
    console.log('  - Mathematics: 4 subtopics (15 questions)');
    console.log('  - Logical Reasoning: 4 subtopics');
    console.log('  - Verbal Ability: 4 subtopics');
    console.log('\n💡 Now users can practice topic-wise on the Topics page!');
}

main()
    .catch((e) => {
        console.error('❌ Error adding subtopics:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
