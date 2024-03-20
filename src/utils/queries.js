import { supabase } from "./supabase";

export async function getMenu() {
  try {
    const { data } = await supabase.from("menu")
    .select(`
    *,
    subMenu(
      *,
      menuItem(
          *
      )
    )
    `)
    .order('order', {ascending: true}, {foreignTable: 'subMenu'}, {foreignTable: 'subMenu.menuItem'});
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
}

// ===== Insert New Data =====

// inserts a new menu 
export async function addMenu(menu) {
  try {
    await supabase.from("menu").insert({
      title: menu.title
    });
    return true;
  } catch (error) {
    console.error("Error adding data:", error);
    return false;
  }
}

// inserts a new subMenu
export async function addSubMenu(subMenu) {
  try {
    await supabase.from("subMenu").insert({
      title: subMenu.title,
      tagLine: subMenu.tagLine,
      menuId: subMenu.menuId,
    });
    return true;
  } catch (error) {
    console.error("Error adding data:", error);
    return false;
  }
}

// inserts a new menuItem
export async function addMenuItem(menuItem) {
  try {
    await supabase.from("menuItem").insert({
      title: menuItem.title,
      description: menuItem.description,
      tagLine: menuItem.tagLine,
      subMenuId: menuItem.subMenuId,
      order: menuItem.order,
    
    });
    return true;
  } catch (error) {
    console.error("Error adding data:", error);
    return false;
  }
}

// ===== Update Data =====

// updates a menu
export async function updateMenu(menu) {
  try {
    await supabase.from("menu").update(menu).eq("id", menu.id);
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    return false;
  }
}

// updates a subMenu
export async function updateSubMenu(subMenu) {
  try {
    await supabase.from("subMenu").update(subMenu).eq("id", subMenu.id);
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    return false;
  }
}

// updates a menuItem
export async function updateMenuItem(menuItem) {
  try {
    await supabase.from("menuItem").update(menuItem).eq("id", menuItem.id);
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    return false;
  }
}

// ===== Delete Data =====

// deletes a menu
export async function deleteMenu(menuId) {
  try {
    await supabase.from("menu").delete().eq("id", menuId);
    return true;
  } catch (error) {
    console.error("Error deleting data:", error);
    return false;
  }
}

// deletes a subMenu
export async function deleteSubMenu(subMenuId) {
  try {
    await supabase.from("subMenu").delete().eq("id", subMenuId);
    return true;
  } catch (error) {
    console.error("Error deleting data:", error);
    return false;
  }
}

// deletes a menuItem
export async function deleteMenuItem(menuItemId) {
  try {
    await supabase.from("menuItem").delete().eq("id", menuItemId);
    return true;
  } catch (error) {
    console.error("Error deleting data:", error);
    return false;
  }
}

// ===== Order Change =====

// updates the order of a menuItem
export async function updateMenuItemOrder(menuItemOrder, menuItemId, adjacentMenuItemOrder, adjacentMenuItemId) {
  try {
    await supabase.from("menuItem").update({order: menuItemOrder}).eq("id", menuItemId);
    await supabase.from("menuItem").update({order: adjacentMenuItemOrder}).eq("id", adjacentMenuItemId);
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    return false;
  }
}