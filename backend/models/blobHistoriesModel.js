const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    fileName: String,
    itemDetails: {
        pickingLists: [{
            CompanyId: [String],
            Number: [String],
            TransType: [String],
            TransRefId: [String],
            DlvDate: [String],
            DlvModeId: [String],
            ReceiptDate: [String],
            ReceiptTime: [String],
            DeliveryName: [String],
            DeliveryPhone: [String],
            DeliveryEmail: [String],
            DeliveryCountry: [String],
            DeliveryCity: [String],
            DeliveryAddress: [String],
            Lines: [{
                Line: [{
                    LineNumber: [String],
                    SKU: [String],
                    ItemId: [String],
                    InventColorId: [String],
                    InventSizeId: [String],
                    Quantity: [String],
                    InventTransId: [String],
                    InventLocationId: [String],
                    PackingGiftWrap: [String],
                    PackingGiftNote: [String],
                    Preorder: [String],
                }]
            }]
        }]
    },
    fileType: String,
    totalItems: Number,
    why: String,
    isSuccessfullyConsumed: Boolean,
    fileConsumptionDate: Date,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Record', recordSchema);
