import React from 'react';

const ConfigPanel = ({ config, onChange }) => {
    const handleChange = (field, value) => {
        onChange({ ...config, [field]: value });
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <label className="text-sm font-medium text-gray-600 whitespace-nowrap">Leverage (x):</label>
                <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={config.leverage}
                    onChange={(e) => handleChange('leverage', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <span className="font-bold text-green-700 min-w-[3rem]">{config.leverage}x</span>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
                <label className="text-sm font-medium text-gray-600 whitespace-nowrap">Interest Rate (%/day):</label>
                <div className="relative w-32">
                    <input
                        type="number"
                        step="0.001"
                        value={config.interestRateDaily}
                        onChange={(e) => handleChange('interestRateDaily', Number(e.target.value))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-1 px-2 text-right font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <span className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
                </div>
            </div>
            <div className="text-xs text-gray-400">
                Annual: {(config.interestRateDaily * 365).toFixed(2)}%
            </div>
        </div>
    );
};

export default ConfigPanel;
