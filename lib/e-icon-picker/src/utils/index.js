(function (e, d, w) {
    if (!e.composedPath) {
        e.composedPath = function () {
            if (this.path) {
                return this.path;
            }
            let target = this.target;

            this.path = [];
            while (target.parentNode !== null) {
                this.path.push(target);
                target = target.parentNode;
            }
            this.path.push(d, w);
            return this.path;
        }
    }
})(Event.prototype, document, window);
export * from "./util";
export * from "./dom";
export * from "./TypeUtil";
