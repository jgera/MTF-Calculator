import React from 'react';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
    }).format(value);
};

const ChargeRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium text-gray-900">{formatCurrency(value)}</span>
    </div>
);

const ChargesBreakdown = ({ breakdown }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <h3 className="text-md font-bold text-gray-800 mb-4">Charges Breakdown</h3>
            <div className="flex flex-col">
                <ChargeRow label="Exchange Turnover" value={breakdown.turnover} />
                <ChargeRow label="Brokerage" value={breakdown.brokerage} />
                <ChargeRow label="Exchange Transaction Charges" value={breakdown.exchangeTxnCharge} />
                <ChargeRow label="Securities Transaction Tax (STT)" value={breakdown.stt} />
                <ChargeRow label="GST (18%)" value={breakdown.gst} />
                <ChargeRow label="SEBI Turnover Charges" value={breakdown.sebiCharges} />
                <ChargeRow label="Stamp Duty" value={breakdown.stampDuty} />
                <ChargeRow label="DP Charges" value={breakdown.dpCharges} />
                <ChargeRow label="Pledge / Unpledge Charges" value={breakdown.pledgeCharges} />
                <ChargeRow label="Interest Amount" value={breakdown.interest} />
                <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-100">
                    <span className="font-bold text-gray-800">Total Tax & Charges</span>
                    <span className="font-bold text-gray-900">{formatCurrency(breakdown.totalCharges)}</span>
                </div>
            </div>
        </div>
    );
};

export default ChargesBreakdown;
