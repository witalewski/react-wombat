const runTask = task => task.run();
const chainTasks = (acc, task) => acc.chain(() => task);
const addTasks = (acc, task) => acc.and(task);
const mapTask = (fn, task) => (task ? task.map(fn) : object => object.map(fn));

module.exports = {
  runTask,
  chainTasks,
  addTasks,
  mapTask
};
