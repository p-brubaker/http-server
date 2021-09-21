import fs from 'fs/promises';
import path from 'path';

class SimpleDb {
    constructor(rootDir) {
        this.path = rootDir;
    }

    generateId() {
        return Math.round(Math.random() * 100000000000).toString(16);
    }

    save(obj) {
        obj.id = this.generateId() + '.json';
        const pathToWrite = path.join(this.path, obj.id);
        return fs.writeFile(pathToWrite, JSON.stringify(obj)).then(() => {
            return obj.id;
        });
    }

    get(id) {
        const fileToRead = path.join(this.path, id);
        return fs
            .readFile(fileToRead, 'utf-8')
            .then((result) => {
                return result;
            })
            .catch(() => {
                return null;
            });
    }

    getAll() {
        return fs.readdir(this.path).then((files) => {
            return Promise.all(
                files.map((file) => {
                    return this.get(file);
                })
            );
        });
    }

    remove(id) {
        const fileToRemove = path.join(this.path, id);
        return fs.rm(fileToRemove);
    }

    update(id, obj) {
        const pathToWrite = path.join(this.path, id);
        return fs.writeFile(pathToWrite, JSON.stringify(obj)).then(() => {
            return id;
        });
    }
}

export default SimpleDb;
