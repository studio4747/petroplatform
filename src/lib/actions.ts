import pb from "@/lib/pocketbase";
export async function getCompaniesList() {
  try {
    const result = await pb.collection("companies").getFullList({
      sort: "-created",
    });
    console.log("Fetched companies:", result); // 👈 Add this line
    return result;
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
}