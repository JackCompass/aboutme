export const extractFileName = (filePath) => {
    return filePath.split('/').at(-1).split('.').at(0);
}