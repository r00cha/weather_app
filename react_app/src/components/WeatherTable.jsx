import React, { useState } from "react";

function WeatherTable({ hourlyData }) {
    const recordsPerPage = 10; // Number of rows to display per page
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(hourlyData.time.length / recordsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Format time to "06-11-2024 @ 12:00"
    const formatTime = (time) => {
        const date = new Date(time);
        const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
        return date.toLocaleDateString("en-GB", options).replace(", ", " - ");
    };

    // Get current records for the page
    const startIndex = (currentPage - 1) * recordsPerPage;
    const currentRecords = hourlyData.time.slice(startIndex, startIndex + recordsPerPage);
    const currentTemperatures = hourlyData.temperature_2m.slice(startIndex, startIndex + recordsPerPage);

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Date - Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Temperature (°C)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((time, index) => (
                        <tr
                            key={index}
                            className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                } border-b`}
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {formatTime(time)}
                            </td>
                            <td className="px-6 py-4">
                                {currentTemperatures[index]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 mr-2 ${currentPage === 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700 text-white"
                        } rounded`}
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 ${currentPage === totalPages
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700 text-white"
                        } rounded`}
                >
                    Next
                </button>
            </div>
            <p className="text-center mt-2">
                Page {currentPage} of {totalPages}
            </p>
        </div>
    );
}

export default WeatherTable;
