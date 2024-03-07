const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export const handler = async (event) => {
    const { id } = JSON.parse(event.body);
    try {
        const menu = await prisma.menuItem.delete({
            where: {
                id: parseInt(id)
            }
        });
        const menuItems = await prisma.menuItem.findMany({
            where: { 
                subMenuId: menu.subMenuId
                // order: { gt: menu.order }
            },
            orderBy: { order: 'asc' }
        });
        updateItemsOrder(menuItems);
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

const updateItemsOrder = async (menuItems) => {
    menuItems.forEach(async (menuItem, index) => {
        const { id } = menuItem;
        await prisma.menuItem.update({
            where: { id: id },
            data: { order: index },
        });
    });
}