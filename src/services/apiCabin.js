import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export async function getAllCabins() {
  let { data, error } = await supabase.from("cabins").select("*").order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = hasImagePath
    ? newCabin.image
    : `${uuidv4()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // B) EDIT
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Cabin cannot be created`);
  }

  // 2. upload image
  let storageError = null;

  if (!hasImagePath) {
    const { error } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    storageError = error;
  }

  // 3. delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      `Cabin image could not be uploaded and the cabin was not created`,
    );
  }

  return data;
}

export async function deleteCabin(id) {
  // 1. Get image path
  const { data: cabin, error: fetchError } = await supabase
    .from("cabins")
    .select("image")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error(fetchError);
    throw new Error(`Cabin id ${id} cannot be found`);
  }

  // 2. Delete cabin row
  const { error: deleteError } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error(deleteError);
    throw new Error(`Cabin id ${id} cannot be found`);
  }

  // 3. Delete image file from storage
  if (cabin?.image) {
    const imageName = cabin.image.split("/").pop();

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .remove([imageName]);

    if (storageError) {
      console.error(storageError);
      throw new Error("Cabin image cannot be deleted");
    }
  }
}
