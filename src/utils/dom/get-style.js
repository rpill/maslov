export default (el, property) => {
    const value = window.getComputedStyle(el, null).getPropertyValue(property);
    return parseFloat(value);
};
