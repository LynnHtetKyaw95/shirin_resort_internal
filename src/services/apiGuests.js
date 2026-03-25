import supabase from "./supabase";

export async function getFullGuests() {
  const { data: guests, error } = await supabase
    .from("guests")
    .select("*")
    .order("fullName");

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }

  return guests;
}
