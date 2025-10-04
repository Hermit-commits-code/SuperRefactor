module.exports = {
  run: async (context, options) => {
    // Example: log all JS files in the workspace
    const jsFiles = context.getFilesByExtension(".js");
    console.log("JS files:", jsFiles);
    return { success: true, changes: [] };
  },
  onInit: () => {
    console.log("Example plugin initialized");
  },
  onBeforeRefactor: () => {},
  onAfterRefactor: () => {},
  onError: (err) => {
    console.error(err);
  },
};
