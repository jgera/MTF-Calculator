import React from 'react';

const InputField = ({ label, value, onChange, type = "number", prefix = "" }) => (
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-500 mb-1">{label}</label>
        <div className="relative">
            {prefix && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                    {prefix}
                </span>
            )}
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full bg-white border border-gray-200 rounded-lg py-2 px-3 ${prefix ? 'pl-7' : ''} text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
            />
        </div>
    </div>
);

const InputSection = ({ values, onChange }) => {
    const handleChange = (field, value) => {
        onChange({ ...values, [field]: value });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                <div className="md:col-span-2">
                    <InputField
                        label="Find the Stock or ETFs"
                        value={values.stockName}
                        onChange={(v) => handleChange('stockName', v)}
                        type="text"
                        prefix="🔍"
                    />
                </div>
                <InputField
                    label="Buy Price"
                    value={values.buyPrice}
                    onChange={(v) => handleChange('buyPrice', Number(v))}
                    prefix="₹"
                />
                <InputField
                    label="Sell Price"
                    value={values.sellPrice}
                    onChange={(v) => handleChange('sellPrice', Number(v))}
                    prefix="₹"
                />
                <InputField
                    label="Quantity"
                    value={values.quantity}
                    onChange={(v) => handleChange('quantity', Number(v))}
                />
                <InputField
                    label="Holding Period (Days)"
                    value={values.holdingPeriod}
                    onChange={(v) => handleChange('holdingPeriod', Number(v))}
                />
            </div>
        </div>
    );
};

export default InputSection;
