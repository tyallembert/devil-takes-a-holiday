const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export const handler = async (event) => {
    const { order, menuItemID, adjacentID, adjacentOrder } = JSON.parse(event.body);
    console.log("Order: ", order);
    console.log("MenuItemID: ", menuItemID);
    console.log("AdjacentID: ", adjacentID);
    console.log("AdjacentOrder: ", adjacentOrder);

    // const { menuItems } = JSON.parse(event.body);
    try {
        // menuItems.forEach(async (menuItem, index) => {
        //     const { id } = menuItem;
        //     await prisma.menuItem.update({
        //         where: { id: id },
        //         data: { order: index },
        //     });
        // });

        const menuItem = await prisma.menuItem.update({
            where: { id: menuItemID },
            data: { order: order },
        });
        if(adjacentID !== -1) {
            const adjacentItem = await prisma.menuItem.update({
                where: { id: adjacentID },
                data: { order: adjacentOrder },
            });
        }
        return {
            statusCode: 200,
            body: JSON.stringify("")
        };
    } catch (error) {
        console.error('Error adding menu item:', error);
        return {
            statusCode: 401,
            body: JSON.stringify(error)
        };
    }
}
