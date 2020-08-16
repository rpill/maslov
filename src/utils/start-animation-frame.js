/**
 * Starts a startAnimationFrame loop. Reduces the boilerplate for using requestAnimationFrame.
 * @param callback {function} the function that is called on each animation frame
 * @return {function} call this function to cancel the animation frame
 */
export const startAnimationFrame = (callback) => {
    let startTime = undefined;
    let cancelled = false;
    let rafId = -1;

    const cancel = () => {
        cancelAnimationFrame(rafId);
        cancelled = true;
    };

    const frame = (time) => {
        if (startTime === undefined) {
            startTime = time;
        }
        if (cancelled) {
            return;
        }

        rafId = requestAnimationFrame(frame);
        callback(time - startTime, cancel);
    };

    rafId = requestAnimationFrame(frame);

    return cancel;
};
