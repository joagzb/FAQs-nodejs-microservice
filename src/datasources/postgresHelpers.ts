import {DataSource} from 'typeorm';

/**
  @description install all necessary postgres extensions
*/
export const installExtensions = async (dataSource: DataSource, schema = 'public'): Promise<void> => {
  const extensions = ['btree_gin', 'pg_trgm'];
  for (const extension of extensions) {
    const query = `CREATE EXTENSION IF NOT EXISTS ${extension} WITH SCHEMA ${schema}`;
    await dataSource.query(query);
  }
};

/**
  @description create indexes on DB to speed-up searchs
*/
export const generateSearchIndex = async (dataSource: DataSource, table: string, schema?: string) => {
  const indexQuery = `
    CREATE INDEX IF NOT EXISTS idx_tsvector_message ON ${schema ? `${schema}.` : ''}"${table}" USING GIN(tags);
    `;

  await dataSource.query(indexQuery);
};
