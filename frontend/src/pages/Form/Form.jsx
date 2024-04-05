import React, { useState, useEffect, useMemo } from "react"
import api from "../../services/axios"
import "./Form.css"

const Form = () => {
  const [transactions, setTransactions] = useState([])
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    is_income: false,
    date: "",
  })

  const fetchTransactions = async () => {
    const response = await api.get("/transactions/") // Fixed typo here
    setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    setFormData({
      ...formData,
      [event.target.name]: value,
    })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    await api.post("/transactions/", formData)
    fetchTransactions()
    setFormData({
      amount: "",
      category: "",
      description: "",
      is_income: false,
      date: "",
    })
  }

  return (
    <div>
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="text"
              className="form-control"
              id="amount"
              name="amount"
              onChange={handleInputChange}
              value={formData.amount}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              onChange={handleInputChange}
              value={formData.category}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={handleInputChange}
              value={formData.description}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="is_income" className="form-label">
              Income?
            </label>
            <input
              type="checkbox"
              id="is_income"
              name="is_income"
              onChange={handleInputChange}
              value={formData.is_income}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="text"
              className="form-control"
              id="date"
              name="date"
              onChange={handleInputChange}
              value={formData.date}
            ></input>
          </div>

          <button type="submit" className="btn btn-primary">
            submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form
