
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1,cohort_id: 1, name: 's1'},
        {id: 2, cohort_id:2, name: 's2'},
        {id: 3, cohort_id: 3, name: 's3'}
      ]);
    });
};
