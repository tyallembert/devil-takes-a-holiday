const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export const handler = async () => {
  try {
    const menu = await prisma.menu.findMany({
      include: {
        subMenus: {
          include: {
            menuItems: {
              orderBy: { order: 'asc' }, // Order by even if no items present
            },
          },
          // Include even if no submenus present
        },
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify(menu)
    };
  } catch (error) {
    console.log('Error fetching data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
}
