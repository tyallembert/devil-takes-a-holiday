const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export const handler = async (event) => {
    const { subMenuID, title, description, tagLine, order, menuItemID } = JSON.parse(event.body);
    try {
        const menuItem = await prisma.menuItem.upsert({
            where: { id: parseInt(menuItemID ? menuItemID: -1) },
            update: { title: title, description: description, tagLine: tagLine },
            create: {
                title: title,
                description: description,
                tagLine: tagLine,
                order: order,
                subMenu: {
                    connect: { id: parseInt(subMenuID) }
                }
            }
        });
        return {
            statusCode: 200,
            body: JSON.stringify(menuItem)
        };
    } catch (error) {
        console.error('Error adding menu item:', error);
        return {
            statusCode: 401,
            body: JSON.stringify(error)
        };
    }
}
