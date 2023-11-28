import * as SQLite from 'expo-sqlite';

const db_connection = SQLite.openDatabase('university_search.db');

export const init = () => {

    const ret = new Promise((resolve, reject) => {

        db_connection.transaction((tx) => {

            tx.executeSql('CREATE TABLE IF NOT EXISTS university (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, website TEXT NOT NULL)',
                [],
                () => {
                    resolve();
                },
                (_, error) => reject(error));
        });
    });

    return ret;

}

export const insert = (name, website) => {
    const ret = new Promise((resolve, reject) => {
        db_connection.transaction((tx) => {
            tx.executeSql('SELECT * FROM university WHERE name = ? AND website = ?', [name, website], 
            (_, result) => {
                if (result.rows.length > 0) {
                    reject('University already exists');
                } else {
                    tx.executeSql('INSERT INTO university (name, website) VALUES (?, ?)', [name, website], 
                    (_, result) => {
                        resolve(result);
                    }, 
                    (_, error) => {
                        reject(error);
                    });
                }
            }, 
            (_, error) => {
                reject(error);
            });
        });
    });

    return ret;
}

export const get_unis = () => {

    const ret = new Promise((resolve, reject) => {

        db_connection.transaction((tx) => {

            tx.executeSql('SELECT * FROM university',
                null,
                (_, result) => {
                    resolve(result.rows._array);
                },
                (_, error) => reject(error));
        });
    });

    return ret;

}

export const remove = (id) => {

    const ret = new Promise((resolve, reject) => {

        db_connection.transaction((tx) => {

            tx.executeSql('DELETE FROM university WHERE id = ?',
                [id],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => reject(error));
        });
    });

    return ret;

}