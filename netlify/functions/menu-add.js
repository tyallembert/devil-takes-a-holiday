const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export const handler = async (event, context) => {
    const { title, id } = JSON.parse(event.body);
    try {
        const menu = await prisma.menu.upsert({
            where: { id: id ? id : -1},
            update: {
                title: title
            },
            create: {
                title: title
            }
        });
        return {
            statusCode: 200,
            body: JSON.stringify(menu)
        };
    } catch(error) {
        console.error('Error adding menu:', error);
        return {
            statusCode: 401,
            body: JSON.stringify(error)
        };
    }
}