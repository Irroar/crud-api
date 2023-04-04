import cluster from 'cluster';
import process from 'process';
import os from 'os';

void (async () => {
  if (cluster.isPrimary) {
    const numberOfCpus = os.cpus().length;
    console.log(`Master process id: ${process.pid}`);
    console.log(`Starting ${numberOfCpus} number of forks`);
    for (let i = 0; i < numberOfCpus; i++) {
      cluster.fork();
    }
  } else {
    await import('./index');
    const id = cluster.worker?.id;
    console.log(`Worker id: ${id}, process id: ${process.pid}`);
  }
})();