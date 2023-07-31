import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    CPU: {},
    motherboard: {},
    RAM: {},
    powerSupplyUnit: {},
    storageDevice: {},
    monitor: {},
    all: [],
};

const productSlice = createSlice({
    name: "addProductForPcBuild",
    initialState,
    reducers: {
        addProductForPCBuilder: (state, action) => {
            if (action.payload.category === "CPU") {
                state.CPU = action.payload;
            } else if (action.payload.category === "Motherboard") {
                state.motherboard = action.payload;
            } else if (action.payload.category === "Power Supply Unit") {
                state.powerSupplyUnit = action.payload;
            } else if (action.payload.category === "Storage Device") {
                state.storageDevice = action.payload;
            } else if (action.payload.category === "Monitor") {
                state.monitor = action.payload;
            } else {
                state.RAM = action.payload;
            }
        },
        deleteProductForPCBuilder: (state, action) => {
            if (action.payload.category === "CPU") {
                state.CPU = {};
            } else if (action.payload.category === "Motherboard") {
                state.motherboard = {};
            } else if (action.payload.category === "Power Supply Unit") {
                state.powerSupplyUnit = {};
            } else if (action.payload.category === "Storage Device") {
                state.storageDevice = {};
            } else if (action.payload.category === "Monitor") {
                state.monitor = {};
            } else {
                state.RAM = {};
            }
        },
        deleteAllProductForPCBuilder: (state, action) => {
            state.CPU = {};
            state.motherboard = {};
            state.powerSupplyUnit = {};
            state.storageDevice = {};
            state.monitor = {};
            state.RAM = {};
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addProductForPCBuilder,
    deleteProductForPCBuilder,
    deleteAllProductForPCBuilder,
} = productSlice.actions;

export default productSlice.reducer;
