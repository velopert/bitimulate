function Worker(works = [], notify) {
  this.index = 0;
  this.works = works;
  this.notify = notify;
}

Worker.prototype.reset = function() {
  this.index = 0;
};

Worker.prototype.work = function() {
  const { works, notify } = this;

  const promise = new Promise((resolve, reject) => {
    const repeat = async () => {
      try {
        await works[this.index++]();
        notify();
      } catch (e) {
        console.log(e);
      }

      if(this.index >= works.length) {
        return resolve();
      }
      repeat();
    };
    
    repeat();
  });
  return promise;
};

module.exports = Worker;