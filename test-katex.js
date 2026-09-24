const { marked } = require('marked');
const markedKatex = require('marked-katex-extension').default || require('marked-katex-extension');

marked.use(markedKatex({ throwOnError: false }));
const text = "$dy/dt$ is how position changes - velocity, $d^2y/dt^2$ is how velocity changes - acceleration, $d^3y/dt^3$ is how acceleration changes - jerk and so on.";
console.log(marked.parse(text));
