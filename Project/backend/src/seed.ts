import prisma from "./lib/prisma.js"

const achievements = [
    { name: "Log In",            description: "Log in for the first time." },
    { name: "Win 1 Game",        description: "Win your first game."       },
    { name: "Score 1000 Points", description: "Reach 1000 points."         },
    { name: "Play 10 Games",     description: "Play 10 games."             },
]

async function main() {
    for (const a of achievements) {
        await prisma.achievement.upsert({
            where:  { name: a.name },
            update: {},
            create: a,
        })
    }
    console.log("Achievements seeded!")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())