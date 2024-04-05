import React, { useState, useEffect, useMemo } from "react"
import api from "../services/axios"
import "./Report.css"
import Box from "@mui/material/Box"
import { DataGrid } from "@mui/x-data-grid"

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    type: "string",
    width: 110,
    editable: true,
  },
  {
    field: "is_income",
    headerName: "Income?",
    type: "boolean",
    width: 110,
    editable: true,
  },
  {
    field: "date",
    headerName: "Date?",
    type: "date",
    width: 110,
    editable: true,
  },
]

export default function Report() {
  const [transactions, setTransactions] = useState([])
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  })
  const [query, setQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Fetch Transactions
  const fetchTransactions = async () => {
    const response = await api.get("/transactions/")
    console.log(response)
    setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  // Implement Sorting

  const getSortIndicator = (columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === "ascending"
        ? "sort-ascending"
        : "sort-descending"
    }
    return ""
  }

  const sortedTransactions = useMemo(() => {
    let sortableItems = [...transactions]
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [transactions, sortConfig])

  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // 3. Implement Searching
  // Filter the transactions before sorting them based on the search query.

  const filteredTransactions = useMemo(() => {
    return sortedTransactions.filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(query.toLowerCase()) ||
        transaction.category.toLowerCase().includes(query.toLowerCase())
    )
  }, [sortedTransactions, query])

  // Implement Pagination
  // Calculate the necessary parameters for pagination based on the filtered transactions.

  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage)
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredTransactions.slice(start, start + itemsPerPage)
  }, [currentPage, itemsPerPage, filteredTransactions])

  // Update the Render Method
  // Include input fields for searching, clickable headers for sorting, and buttons for pagination.

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={transactions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}
