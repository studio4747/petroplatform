export async function getCompaniesList() {
  try {
    const result = await pb.collection("companies").getFullList({
      sort: "-created",
    });
    return result;
  } catch (error: any) {
    console.error("Error fetching companies:", error?.message || error);
    return [];
  }
}