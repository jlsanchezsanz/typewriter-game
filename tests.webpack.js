var context = require.context('./js/components', true, /\.js$/);
context.keys().forEach(context);