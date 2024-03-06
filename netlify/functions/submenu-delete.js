const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export const handler = async (event) => {
    const { id } = JSON.parse(event.body);
    try {
        const menu = await prisma.subMenu.delete({
            where: {
                id: parseInt(id)
            }
        });
        return {
            statusCode: 200,
            body: JSON.stringify(menu)
        };
    } catch(error) {
        console.error('Error deleting menu:', error);
        return {
            statusCode: 401,
            body: JSON.stringify(error)
        };
    }
}