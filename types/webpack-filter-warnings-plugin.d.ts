// types/webpack-filter-warnings-plugin.d.ts
declare module "webpack-filter-warnings-plugin" {
  import type { Compiler } from "webpack";

  interface FilterWarningsPluginOptions {
    exclude?: (RegExp | string)[];
    include?: (RegExp | string)[];
  }

  class FilterWarningsPlugin {
    constructor(options?: FilterWarningsPluginOptions);
    apply(compiler: Compiler): void;
  }

  export = FilterWarningsPlugin;
}
