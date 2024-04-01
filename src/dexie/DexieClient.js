import Dexie from 'dexie'

class DexieClient {
    constructor() {
        this.dexie = new Dexie('database');

        this.buildSchema()
    }

    buildSchema() {
        this.dexie.version(1).stores({
            comment: '++id, pseudo, date, content, movieId',
        });
    }

    getDatabase() {
        return this.dexie
    }

    async addComment({pseudo, date, content, movieId}) {
        await this.dexie.comment.add({pseudo, date, content, movieId})
    }
}

const dexieClient = new DexieClient()

export default dexieClient
