import React from 'react';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
    }).format(value);
};

const SummaryItem = ({ label, value, subValue, isGreen, isLarge }) => (
    <div className="flex flex-col">
        <span className="text-sm text-gray-500 mb-1">{label}</span>
        <span className={`font-bold ${isLarge ? 'text-2xl' : 'text-lg'} ${isGreen ? 'text-green-600' : 'text-gray-900'}`}>
            {typeof value === 'number' ? formatCurrency(value) : value}
        </span>
        {subValue && <span className="text-xs text-gray-400">{subValue}</span>}
    </div>
);

const SummaryCard = ({ results }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">MTF Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                <SummaryItem label="Your Funds" value={results.marginRequired} />
                <SummaryItem label="Leverage" value={`${results.leverage}X`} />
                <SummaryItem label="Funded by MTF" value={results.loanAmount} />

                <SummaryItem label="Buy Value" value={results.buyValue} />
                <SummaryItem label="Sell Value" value={results.sellValue} />
                <SummaryItem label="Gross Profit" value={results.grossProfit} isGreen={results.grossProfit > 0} />

                <SummaryItem label="Transaction Charges" value={results.transactionCharges} />
                <SummaryItem label="Interest Amount" value={results.interestAmount} />
                <SummaryItem label="Net Profit" value={results.netProfit} isGreen={results.netProfit > 0} isLarge />
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-sm text-gray-600">Breakeven</span>
                    <span className="text-xl font-bold text-gray-900">{results.breakevenPercentage}%</span>
                </div>
                <div className="h-8 w-px bg-green-200 hidden md:block"></div>
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-sm text-gray-600">Returns without MTF (%)</span>
                    <span className="text-xl font-bold text-gray-900">{results.returnsWithoutMTF}%</span>
                </div>
                <div className="h-8 w-px bg-green-200 hidden md:block"></div>
                <div className="flex flex-col items-center md:items-start">
                    <span className="text-sm text-gray-600">Returns with MTF (%)</span>
                    <span className="text-2xl font-bold text-green-600">{results.returnsWithMTF}%</span>
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;
