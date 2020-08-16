export const normalize = (value, min, max) => {
    if(min === max) return 0;
    return (value - min) / (max - min);
};

export const clamp = (value, min, max) => {
    return value < min ? min : (value > max ? max : value);
};

export const inertia = (duration = 150, ease = n => n) => {
    let prevValue = null;
    let prevTime = null;
    return (newValue, time) => {
        if (prevValue === null) {
            prevValue = newValue;
        }
        if (prevTime === null) {
            prevTime = time;
        }
        const timeDelta = time - prevTime;
        prevTime = time;
        const slopedRatio = ease(Math.min(timeDelta / duration, 1));
        const slopedResult = prevValue * (1 - slopedRatio) + newValue * slopedRatio;
        prevValue = slopedResult;
        return slopedResult;
    };
};
