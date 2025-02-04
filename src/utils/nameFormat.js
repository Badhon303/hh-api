export const NameFormat = async (args) => {
  const files = args.req?.files
  if (
    files !== undefined &&
    files !== null &&
    typeof files === "object" &&
    files.file !== undefined &&
    files.file !== null &&
    typeof files.file === "object" &&
    files.file.name !== undefined &&
    files.file.name !== null &&
    typeof files.file.name === "string"
  ) {
    files.file.name = files.file.name.replace(/[^a-z0-9.]/gi, "_").toLowerCase()
  }
}
