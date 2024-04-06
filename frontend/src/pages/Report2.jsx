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

  // Fetch Transactions
  const fetchTransactions = async () => {
    const response = await api.get("/transactions/")
    console.log(response)
    setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

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
