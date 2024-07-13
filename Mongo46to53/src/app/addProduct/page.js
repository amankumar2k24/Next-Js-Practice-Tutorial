"use client"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { ScaleLoader } from "react-spinners";

export default function Page() {
    const [isLoading, setIsLoading] = useState(false)
    const [initialData, setInitialData] = useState({
        name: "",
        price: "",
        color: "",
        company: "",
        category: ""
    })

    const handleInput = (e) => {
        const { id, value } = e.target
        setInitialData((preVal => ({ ...preVal, [id]: value })))
    }
    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {
            const requiredFields = ["name", "price", "color", "company", "category"];

            if (requiredFields.some(item => !initialData[item])) {
                return toast.warning("Please fill the required fields")
            }
            const res = await axios.post("http://localhost:3000/api/products", initialData)
            // console.log(res)
            toast.success(res.data.message)
            setInitialData({
                name: "",
                price: "",
                color: "",
                company: "",
                category: ""
            })

        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <div className="w-full container mx-auto">
            <div className="max-w-3xl mt-10 px-10">
                <h1 className="text-2xl font-bold mb-5">Add your product here!</h1>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                        Name
                    </label>
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={initialData.name}
                        onChange={handleInput}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                        Price
                    </label>
                    <input type="text" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={initialData.price}
                        onChange={handleInput}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900">
                        Color
                    </label>
                    <input type="text" id="color" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={initialData.color}
                        onChange={handleInput}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900">
                        Company
                    </label>
                    <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={initialData.company}
                        onChange={handleInput}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                        Category
                    </label>
                    <input type="text" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={initialData.category}
                        onChange={handleInput}
                    />
                </div>

                <button className="px-10 py-3 rounded-lg bg-gray-600 text-white"
                    onClick={handleSubmit}
                >
                    {isLoading ? <ScaleLoader size={8} height={15} color="#fff" /> : "Submit"}
                </button>
            </div>
        </div>
    )
}