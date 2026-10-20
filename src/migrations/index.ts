import * as migration_20260912_220000_rename_components_to_sections from './20260912_220000_rename_components_to_sections';
import * as migration_20260912_221500_rename_components_id_column from './20260912_221500_rename_components_id_column';
import * as migration_20260920_145537 from './20260920_145537';

export const migrations = [
  {
    up: migration_20260912_220000_rename_components_to_sections.up,
    down: migration_20260912_220000_rename_components_to_sections.down,
    name: '20260912_220000_rename_components_to_sections',
  },
  {
    up: migration_20260912_221500_rename_components_id_column.up,
    down: migration_20260912_221500_rename_components_id_column.down,
    name: '20260912_221500_rename_components_id_column',
  },
  {
    up: migration_20260920_145537.up,
    down: migration_20260920_145537.down,
    name: '20260920_145537'
  },
];
