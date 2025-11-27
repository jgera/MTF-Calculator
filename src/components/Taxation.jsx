import React from 'react';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
    }).format(value);
};

const Taxation = ({ profit, holdingPeriod, taxRate, onTaxRateChange, marginRequired }) => {
    // Use passed taxRate or default to logic if not provided (though we expect it provided now)
    // But user asked for editable percentage.

    const taxableProfit = Math.max(0, profit);
    const taxAmount = taxableProfit * (taxRate / 100);
    const postTaxProfit = profit - taxAmount;

    const postTaxReturn = marginRequired > 0 ? (postTaxProfit / marginRequired) * 100 : 0;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
            <h3 className="text-md font-bold text-gray-800 mb-4">Taxation (Capital Gains)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">Tax Rate (%)</span>
                    <div className="relative w-24">
                        <input
                            type="number"
                            value={taxRate}
                            onChange={(e) => onTaxRateChange(Number(e.target.value))}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-1 px-2 text-right font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <span className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">Estimated Tax</span>
                    <span className="font-semibold text-red-600 mt-1">{formatCurrency(taxAmount)}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500 mb-1">Post-Tax Profit</span>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className={`font-bold ${postTaxProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(postTaxProfit)}
                        </span>
                        <span className={`text-sm font-medium ${postTaxReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ({postTaxReturn.toFixed(2)}%)
                        </span>
                    </div>
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
                *Tax calculation is based on the editable tax rate applied to the Net Profit.
            </p>
        </div>
    );
};

export default Taxation;
