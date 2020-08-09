import * as SQLite from 'expo-sqlite'

const dbCategoryAlias = SQLite.openDatabase('categoryNames.db');

export const initCategory = () => {
  const promise = new Promise((resolve, reject) => {
    dbCategoryAlias.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS categoryNames (id INTEGER PRIMARY KEY NOT NULL, categoryNm TEXT NOT NULL, color TEXT NULL, UNIQUE(categoryNm));',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertCategory = (categoryNm) => {
    const promise = new Promise((resolve, reject) => {
        const date = new Date();
        dbCategoryAlias.transaction(tx => {
          tx.executeSql(
            `INSERT OR IGNORE INTO categoryNames (categoryNm) VALUES (?) EXCEPT select categoryNm from categoryNames where categoryNm = ?;`,
            [categoryNm, categoryNm],
            (_, result) => {
              resolve(result);
            },
            (_, err) => {
              reject(err);
            }
          );
        });
      });
      return promise;
};

export const removeCategory = (id) => {
  const promise = new Promise((resolve, reject) => {
      dbCategoryAlias.transaction(tx => {
        tx.executeSql(
          `DELETE FROM categoryNames WHERE id = ?;`,
          [id],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise;
};


export const loadCategories = () => {
         const promise = new Promise((resolve, reject) => {
            dbCategoryAlias.transaction(tx => {
              tx.executeSql(
                `SELECT * FROM categoryNames;`,
                [],
                (_, result) => {
                  resolve(result);
                },
                (_, err) => {
                  reject(err);
                }
              );
            });
          });
          return promise;
    };


   
