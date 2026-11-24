import { registerHooks } from 'node:module';

// @material/material-color-utilities ships extensionless relative ESM imports that Node can't resolve.
registerHooks({
  resolve(specifier, context, next) {
    try {
      return next(specifier, context);
    } catch (error) {
      if (specifier.startsWith('.') && !specifier.endsWith('.js'))
        return next(`${specifier}.js`, context);
      throw error;
    }
  },
});
