const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export const handler = async (event, context) => {
    const { subMenuId, oldIndex, newIndex } = req.body;

  // Logic to update the order of menu items
  try {
    // Update the menu items with the new order
    await updateMenuItemOrder(subMenuId, oldIndex, newIndex);
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Order updated successfully" }),
    }
  } catch (error) {
    console.error(error);
    return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error updating order" }),
    }
  }
};

// Function to update menu item order
async function updateMenuItemOrder(subMenuId, oldIndex, newIndex) {
  // Fetch all menu items for the given submenu
  const menuItems = await prisma.menuItem.findMany({
    where: { subMenuId },
    orderBy: { order: 'asc' },
  });

  // Update the order of the items based on the change
  if (oldIndex < newIndex) {
    // Moving item down
    for (let i = oldIndex; i < newIndex; i++) {
      await prisma.menuItem.update({
        where: { id: menuItems[i].id },
        data: { order: menuItems[i + 1].order },
      });
      menuItems[i].order = menuItems[i + 1].order;
    }
  } else {
    // Moving item up
    for (let i = oldIndex; i > newIndex - 1; i--) {
      await prisma.menuItem.update({
        where: { id: menuItems[i].id },
        data: { order: menuItems[i - 1].order },
      });
      menuItems[i].order = menuItems[i - 1].order;
    }
  }

  // Update the order of the moved item
  await prisma.menuItem.update({
    where: { id: menuItems[oldIndex].id },
    data: { order: newIndex },
  });
}