import { supabase } from "./supabase";

// ============================
// ===== Popup Functions ======
// ============================
export const getPopupInfo = async () => {
  try {
    const { data } = await supabase.from("popupInfo").select("*").single();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
}
export const savePopupInfo = async (popupInfo) => {
  try {
    await supabase.from("popupInfo").upsert([popupInfo]);
    return true;
  } catch (error) {
    console.error("Error saving data:", error);
    return false;
  }
}
export const savePopupImage = async (image) => {
  try {
    // check if image exists
    const randomString = Math.random().toString(36).substring(7);
    const imageURL = randomString+".png";

    const { error: newImageError } = await supabase.storage.from("popup-image").upload(imageURL, image);
    if (newImageError) {
      console.error("Error saving image:", newImageError);
      return false;
    }

    const { data: publicData, error: publicError } = supabase.storage.from("popup-image").getPublicUrl(imageURL);
    if (publicError) {
      console.error("Error getting image URL:", publicError);
      return false;
    }
    const { error: popupError } = await supabase.from("popupInfo").update({ imageURL: publicData.publicUrl }).eq("id", 1);
    
    if (popupError) {
      console.error("Error updating popup info:", popupError);
      return false;
    }

    return publicData.publicUrl;
    
  } catch (error) {
    console.error("Error saving image:", error);
    return false;
  }
}
// ============================
// ===== Artist Functions ======
// ============================
export async function getArtists() {
  try {
    const { data } = await supabase.from("artists").select("*");
    const newData = orderArtistsByName(data);
    return newData;
  }catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
}
function orderArtistsByName(artists) {
  return artists.sort((a, b) => a.firstName.localeCompare(b.firstName));
}

export async function getArtistsHeader() {
  try {
    const { data } = await supabase.from("artistsHeader").select("*");
    return data;
  }catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }

}
export async function updateArtistHeader(headerInfo) {
  try {
    const { data } = await supabase.from("artistsHeader").update(headerInfo).eq("id", headerInfo.id);
    return {...data, success: true};
  } catch(e) {
    console.error("Error updating: ", e);
    return {success: false};
  }
}

export async function addArtist(artist) {
  try {
    await supabase.from("artists").insert({
      firstName: artist.firstName,
      lastName: artist.lastName,
      pronouns: artist.pronouns,
      title: artist.title,
      instagramHandle: artist.instagramHandle,
      instagramURL: artist.instagramURL,
      email: artist.email,
      websiteURL: artist.websiteURL,
    });
    return true;
  } catch (error) {
    console.error("Error adding data:", error);
    return false;
  }
}
export async function updateArtist(artist) {
  try {
    await supabase.from("artists").update(artist).eq("id", artist.id);
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    return false;
  }
}
export async function deleteArtist(artistId) {
  try {
    await supabase.from("artists").delete().eq("id", artistId);
    return true;
  } catch (error) {
    console.error("Error deleting data:", error);
    return false;
  }
}

// ============================
// ===== Admin Functions ======
// ============================
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
    .order('order', {ascending: true}, {foreignTable: 'subMenu.menuItem', ascending: true});
    const menus = orderMenus(data);
    return menus;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {isError: true, error: error};
  }
}
const orderMenus = (menus) => {
  menus.sort((a, b) => a.order - b.order);
  menus.forEach((menu) => {
    menu.subMenu.sort((a, b) => a.order - b.order);
    menu.subMenu.forEach((subMenu) => {
      subMenu.menuItem.sort((a, b) => a.order - b.order);
    });
  }
  );
  return menus;
}

// ===== Insert New Data =====

// inserts a new menu 
export async function addMenu(menu) {
  try {
    await supabase.from("menu").insert({
      title: menu.title,
      tagLine: menu.tagLine
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