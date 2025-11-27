import React, { useState, useEffect } from 'react';
import InputSection from './InputSection';
import ConfigPanel from './ConfigPanel';
import SummaryCard from './SummaryCard';
import ChargesBreakdown from './ChargesBreakdown';
import Taxation from './Taxation';

const Calculator = () => {
    const [values, setValues] = useState({
        stockName: 'HDFC Bank',
        buyPrice: 1000,
        sellPrice: 1030,
        quantity: 100,
        holdingPeriod: 50,
    });

    const [config, setConfig] = useState({
        leverage: 4.0, // Default 4x
        interestRateDaily: 0.04, // Default 0.04% daily
        taxRate: 20, // Default 20%
    });

    const [results, setResults] = useState({
        marginRequired: 0,
        loanAmount: 0,
        buyValue: 0,
        sellValue: 0,
        grossProfit: 0,
        transactionCharges: 0,
        totalCharges: 0,
        interestAmount: 0,
        netProfit: 0,
        returnsWithMTF: 0,
        returnsWithoutMTF: 0,
        breakevenPercentage: 0,
        leverage: 4.0,
        breakdown: {}
    });

    useEffect(() => {
        calculate();
    }, [values, config]);

    const calculate = () => {
        const { buyPrice, sellPrice, quantity, holdingPeriod } = values;
        const { leverage, interestRateDaily } = config;

        const buyValue = buyPrice * quantity;
        const sellValue = sellPrice * quantity;
        const turnover = buyValue + sellValue;
        const grossProfit = sellValue - buyValue;

        // Margin & Loan
        // Leverage 4x means you pay 25% (1/4), Loan is 75%
        // Leverage 5x means you pay 20% (1/5), Loan is 80%
        // Formula: Margin = BuyValue / Leverage
        const marginRequired = buyValue / leverage;
        const loanAmount = buyValue - marginRequired;

        // Charges Calculation
        const brokerage = 40; // Flat 20 buy + 20 sell (approx standard)
        const exchangeTxnCharge = turnover * 0.0000345; // NSE 0.00345%
        const stt = turnover * 0.001; // 0.1% on both buy and sell (Delivery)
        const sebiCharges = turnover * 0.000001; // 10 per crore
        const stampDuty = buyValue * 0.00015; // 0.015% on buy
        const dpCharges = 13.5 + (13.5 * 0.18); // ~15.93 per scrip sell (Depository)
        const pledgeCharges = 20 + (20 * 0.18); // ~23.6 per pledge request (approx)

        // GST
        const gst = (brokerage + exchangeTxnCharge + sebiCharges) * 0.18;

        // Interest
        const interestAmount = loanAmount * (interestRateDaily / 100) * holdingPeriod;

        // Total Fees (Excluding Interest)
        const totalFees = brokerage + exchangeTxnCharge + stt + sebiCharges + stampDuty + dpCharges + pledgeCharges + gst;

        // Total Cost (Fees + Interest)
        const totalCost = totalFees + interestAmount;

        const netProfit = grossProfit - totalCost;

        // Returns
        const returnsWithMTF = marginRequired > 0 ? (netProfit / marginRequired) * 100 : 0;

        // Without MTF: You pay full buyValue, no interest, no pledge charges
        const chargesNoMTF = brokerage + exchangeTxnCharge + stt + sebiCharges + stampDuty + dpCharges + ((brokerage + exchangeTxnCharge + sebiCharges) * 0.18);
        const netProfitNoMTF = grossProfit - chargesNoMTF;
        const returnsWithoutMTF = buyValue > 0 ? (netProfitNoMTF / buyValue) * 100 : 0;

        // Breakeven % (Total Cost / Buy Value)
        const breakevenPercentage = buyValue > 0 ? (totalCost / buyValue) * 100 : 0;

        setResults({
            marginRequired,
            loanAmount,
            buyValue,
            sellValue,
            grossProfit,
            transactionCharges: totalFees,
            totalCharges: totalCost,
            interestAmount,
            netProfit,
            returnsWithMTF: returnsWithMTF.toFixed(2),
            returnsWithoutMTF: returnsWithoutMTF.toFixed(2),
            breakevenPercentage: breakevenPercentage.toFixed(2),
            leverage,
            breakdown: {
                turnover,
                brokerage,
                exchangeTxnCharge,
                stt,
                gst,
                sebiCharges,
                stampDuty,
                dpCharges,
                pledgeCharges,
                interest: interestAmount,
                totalCharges: totalCost
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">MTF Calculator</h1>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                    Calculate your potential returns with Margin Trading Facility
                </div>
            </div>

            <InputSection values={values} onChange={setValues} />
            <ConfigPanel config={config} onChange={setConfig} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <SummaryCard results={results} />
                    <Taxation
                        profit={results.netProfit}
                        holdingPeriod={values.holdingPeriod}
                        taxRate={config.taxRate}
                        onTaxRateChange={(rate) => setConfig({ ...config, taxRate: rate })}
                        marginRequired={results.marginRequired}
                    />
                </div>
                <div className="lg:col-span-1">
                    <ChargesBreakdown breakdown={results.breakdown} />
                </div>
            </div>
        </div>
    );
};

export default Calculator;
