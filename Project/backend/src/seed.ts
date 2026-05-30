import prisma from "./lib/prisma.js"

async function main() {
    await prisma.achievement.createMany({
        data: [
            { name: "Log In", description: "Log in for the first time." },
            { name: "Win 1 Game", description: "Win your first game." },
            { name: "Score 1000 Points", description: "Reach 1000 points." },
            { name: "Play 10 Games", description: "Play 10 games." },
        ]
    })
    console.log("Achievements seeded!")
}

main()