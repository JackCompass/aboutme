import axios from "axios";

export class Repository {
  static repositoryFileNameUrl =
    "https://api.github.com/repos/JackCompass/googleme/git/trees/master?recursive=1";
  static repositoryFileContentUrl =
    "https://raw.githubusercontent.com/JackCompass/googleme/master/";

  static async getRepositoryFileNames() {
    const response = await axios.get(this.repositoryFileNameUrl);
    return response.data.tree.map(file => file.path);
  }

  static async getRepositoryFileContent(fileNames) {
    const contents = [];
    for (const fileName of fileNames) {
      const response = await axios.get(
        this.repositoryFileContentUrl + fileName,
      );
      contents.push({ filename: fileName, data: response.data });
    }
    return contents;
  }

  static extractFileNameUsingRegex(fileNames, patterns) {
    let previewFiles = [],
      contentFiles = [],
      discoveryFiles = [];

    // Creating regex patterns for extracting file names
    const regex = patterns.map(pattern => new RegExp(pattern));

    for (const fileName of fileNames) {
      const previewMatch = regex[0].test(fileName);
      const contentMatch = regex[1].test(fileName);
      const discoveryMatch = regex[2].test(fileName);

      if (previewMatch) {
        previewFiles.push(fileName);
      } else if (contentMatch) {
        contentFiles.push(fileName);
      }

      if (discoveryMatch) {
        discoveryFiles.push(fileName);
      }
    }
    return {
      previewFiles,
      contentFiles,
      discoveryFiles,
    };
  }
}
