
const requireContext = require.context("./img", true, /^\.\/.*\.png$/);
const images = requireContext.keys().map(requireContext);

