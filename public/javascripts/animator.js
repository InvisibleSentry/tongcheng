/**
 * Created by ${蔡佳玉} on 2017/4/12.
 */
function Animator(duration, ease, dosomething) {
    this.duration = duration;
    this.ease = ease;
    this.dosomething = dosomething;
}
Animator.prototype = {

    start: function (count) {
        if (typeof count == 'number') {
            if (count <= 0) {
                return;
            }
        }
        else {
            if (count == "infinity") {
                var loop = true;
            }
            else {
                return
            }
        }
        var startTime = new Date();
        var duration = this.duration;
        var self = this;
        this.id = requestAnimationFrame(function step() {
            var p = Math.min(1, (new Date() - startTime) /self.duration);
            self.dosomething(self.ease(p));
            if (p == 1 && (loop || --count > 0)) {
                startTime = new Date();
                p = 0;
            }

            p < 1 && (requestAnimationFrame(step));
        })

    },
    //用于有顺的运动
    reStart: function (count, obj) {
        var isthat = [true];
        var startTime = new Date();
        var p = 0;
        for (var i = 0; i < arguments.length; i += 4) {
            var count = arguments[i];
            var duration = arguments[i + 1];
            var ease = arguments[i + 2];
            var obj = arguments[i + 3];
            if (typeof obj != 'function' && typeof ease != 'function') {
                return;
            }
            if (typeof count == 'number' && typeof duration == 'number') {
                if (count <= 0) {
                    return;
                }
            }
            else {
                if (count == "infinity") {
                    var loop = true;
                }
                else {
                    return
                }
            }

            (function (i) {
                var counts = count;
                var durations = duration;
                var eases = ease;
                var objs = obj;

                console.log(i)
                console.log(isthat[i])
                var self = this;
                this.id = requestAnimationFrame(function step() {
                        if (isthat[i]) {
                            var time = (new Date() - startTime) / durations;
                            p = Math.min(Math.ceil(time), time);
                            objs(eases(p));
                            if(i==0){console.log('ok')}
                        }
                        if (p < counts) {
                            self.id = requestAnimationFrame(step);
                        }
                        else {
                            isthat[i + 4] = true;
                            startTime = new Date();
                            p = 0;
                        }
                    }
                )
            }(i))
        }
    },
    stop: function () {
        cancelAnimationFrame(this.id)

    }
}
