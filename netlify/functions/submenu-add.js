const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export const handler = async (event) => {
    const { menuID, title, tagLine, subMenuID } = JSON.parse(event.body);
    try {
        const subMenu = await prisma.subMenu.upsert({
            where: { id: parseInt(subMenuID ? subMenuID: -1) },
            update: { title: title, tagLine: tagLine },
            create: {
                title: title,
                tagLine: tagLine,
                menu: {
                    connect: { id: parseInt(menuID) }
                }
            }
        });
        // const subMenu = await prisma.subMenu.create({
        //     data: {
        //         title: title,
        //         tagLine: tagLine,
        //         menu: {
        //             connect: { id: parseInt(menuID) }
        //         }
        //     }
        // });
        return {
            statusCode: 200,
            body: JSON.stringify(subMenu)
        };
    } catch(error) {
        console.error('Error adding sub menu:', error);
        return {
            statusCode: 401,
            body: JSON.stringify(error)
        };
    }
}