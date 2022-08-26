import axios from "axios";

export class Repository {

    static repositoryFileNameUrl = "https://api.github.com/repos/JackCompass/googleme/git/trees/master?recursive=1";
    static repositoryFileContentUrl = "https://raw.githubusercontent.com/JackCompass/googleme/master/"

    static async getRepositoryFileNames() {
        const response = await axios.get(this.repositoryFileNameUrl);
        const fileNames = response.data.tree.map(file => file.path);
        console.log(fileNames);
        return fileNames;
    }

    static async getRepositoryFileContent(fileNames) {
        const contents = [];
        for (const fileName of fileNames) {
            const response = await axios.get(this.repositoryFileContentUrl + fileName);
            contents.push(response.data);
        }
        return contents
    }
}