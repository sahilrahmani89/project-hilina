import React from 'react'

const TestimonialCard = ({ item }: { item: any }) => {
    return (
        <div
            key={item}
            className="rounded-xl bg-white p-6 shadow-md"
        >
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-gray-600">Mumbai, India</p>
                </div>
            </div>
            <p className="mt-4 text-gray-700">
                "Best travel platform I've used! Discovered amazing hidden gems
                through their recommendations."
            </p>
            <div className="mt-4 flex text-yellow-400">
                ★★★★★
            </div>
        </div>
    )
}

export default TestimonialCard
