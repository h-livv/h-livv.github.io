const { marked } = require('marked');
const markedKatex = require('marked-katex-extension').default || require('marked-katex-extension');

marked.use(markedKatex({ throwOnError: false }));
const text = `So, I sought a way to understand the meaning of higher derivatives. First, I started with a physical example. Position and time.
$dy/dt$ is how position changes - velocity, 
$d^2y/dt^2$ is how velocity changes - acceleration, 
$d^3y/dt^3$ is how acceleration changes - jerk and so on. 
It's easy to imagine these as they are phenomena we can experience - like a roller coaster.`;
console.log(marked.parse(text));
