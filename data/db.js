import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('expenseTrackerPro.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS expenseTrackerPro (id TEXT NOT NULL, categoryNm TEXT NOT NULL, itemNm TEXT NOT NULL, amount INT NOT NULL, insDate TEXT NOT NULL, PRIMARY KEY (id, categoryNm, amount));',
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



export const insertItem = (id, categoryNm, itemNm, amount, date) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            `INSERT OR IGNORE INTO expenseTrackerPro (id, categoryNm, itemNm, amount, insDate) VALUES (?, ?, ?, ?, ?);`,
            [id, categoryNm, itemNm, amount, date],
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


export const fetchAllItems = () => {
         const promise = new Promise((resolve, reject) => {
            db.transaction(tx => {
              tx.executeSql(
                `SELECT *  FROM expenseTrackerPro order by insDate desc;`,
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

    export const fetchSums = () => {
      const promise = new Promise((resolve, reject) => {
         db.transaction(tx => {
           tx.executeSql(
            `SELECT distinct categoryNm, sum(amount) as total FROM expenseTrackerPro group by categoryNm;`,
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



    export const removeItem = (id) => {
      const promise = new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM expenseTrackerPro WHERE id = ?;`,
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

    export const removeAll = () => {
      const promise = new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `DELETE FROM expenseTrackerPro;`,
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
    
    
