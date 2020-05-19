export const getState = () => {
    try {
        const serialized = sessionStorage.getItem("cartItems");
        if (serialized === null) {
            return undefined;
        }
        return JSON.parse(serialized);
    } catch (e) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serialized = JSON.stringify(state);
        sessionStorage.setItem("cartItems", serialized);
    } catch (e) {

    }
};
