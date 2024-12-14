import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singleton for the "About" schema
      S.listItem()
        .title("About")
        .child(
          S.document()
            .schemaType("about")
            .documentId("about") // Use a fixed ID
        ),
      // Singleton for the "General Info" schema
      S.listItem()
        .title("General Info")
        .child(
          S.document()
            .schemaType("generalInfo")
            .documentId("generalInfo") // Use a fixed ID for the general info
        ),
      // Include other document types if needed
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "about" && item.getId() !== "generalInfo"
      ),
    ]);
